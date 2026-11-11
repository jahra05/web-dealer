import React, { useState, useMemo, useEffect, useRef } from "react"
import { AnimatePresence, defaultEasing } from "framer-motion"
import AdminNavbar from "../../components/AdminNavbar"
import NavTop from "../../components/NavTop"
import { BiEdit, BiExport, BiSearch, BiTrash, BiUpArrow } from "react-icons/bi"
import { PiPlus } from "react-icons/pi"
import { CiFileOn } from "react-icons/ci"
import { MdDelete, MdMoreHoriz, MdMoreVert, MdNotificationsNone } from "react-icons/md"
import { FaEdit, FaSearch } from "react-icons/fa"
import { exportExcel } from "../../utils/export/exportExcel"
import UserMenuDropdwn from "../../components/UserMenuDropdown"
import { RxHamburgerMenu } from "react-icons/rx"
import { data, useNavigate } from "react-router-dom"
import CustomAlert from "../../components/CustomAlert"
import ConfirmAlert from "../../components/ConfirmAlert"
import Notifikasi from "../../components/Notifikasi"
import { CgClose } from "react-icons/cg"
import { motion } from 'framer-motion'
import Table from "../../components/Table"
import Modal from "../../components/Modal"
import FormField from "../../components/FormField"
import { getFunctionUrl, getSupabaseHeaders, SUPABASE_PUBLISHABLE_KEY, } from "../../config/supabase";


const KelolaProduk = () => {
    const [page, setPage] = useState(1)
    const rowsPerPage = 7
    const [products, setProducts] = useState([]);
    console.log('semuda data produk motor terpanggil', products)
    const token = localStorage.getItem("token")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalColor, setIsModalColor] = useState(false)
    const [kategori, setKategori] = useState([])
    const [tipe, setTipe] = useState([])
    console.log('ini data tipe', tipe)
    const [openDrapMenu, setOpenDrapMenu] = useState(false)
    const [warna, setWarna] = useState([])
    const [editWarna, setEditWarna] = useState({
        id_warna: "",
        id_motor: "",
        nama_warna: "",
        kode_warna: ""
    })

    const [selectKategori, setSelectKategori] = useState("")
    const [isEdit, setIsEdit] = useState(false)
    const [editId, setEditId] = useState(null)
    const [search, setSearch] = useState("")
    const [selectWarna, setSelectWarna] = useState("")
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(null)
    const dropdownContainerRef = useRef(null);
    const [alert, setAlert] = useState(null)
    const [confrim, setConfirm] = useState(null)
    const navigate = useNavigate()

    const columns = [
        {
            key: 'gambar', render: (item) => (
                <img src={item.gambar} alt={item.nama_motor} className="h-10 w-10 object-cover" />
            ), label: "Gambar"
        },
        { key: 'nama_motor', label: "Nama Motor" },
        { key: 'harga', label: "Harga", render: (item) => `Rp ${Number(item.harga).toLocaleString('id-ID')}` },
        { key: 'stok', label: 'Stok' },

    ]


    const handleEditWarna = (item) => {
        setEditWarna({
            id_warna: item.id_warna,
            id_motor: item.id_motor,
            nama_warna: item.nama_warna,
            kode_warna: item.kode_warna
        })
    }

    const handleOpenColor = (idMotor) => {
        setEditWarna({
            id_warna: "",
            id_motor: idMotor,
            nama_warna: "",
            kode_warna: "#000000"
        })
    }

    const saveColor = () => {

        if (editWarna.id_warna) {
            updateWarna();
        } else {
            createWarna();
        }

    }

    const openModal = () => setIsModalOpen(true)

    const closeModal = () => {
        setIsModalOpen(false);
        setIsEdit(false)
        setEditId(null)
        resetForm();
    }

    const [formData, setFormData] = useState({
        nama_motor: "",
        id_kategori: "",
        id_tipe: "",
        harga: "",
        stok: "",
        tahun: "",
        deskripsi: "",
        gambar: null
    });

    const resetForm = () => {
        setFormData({
            nama_motor: "",
            id_kategori: "",
            id_tipe: "",
            harga: "",
            stok: "",
            tahun: "",
            deskripsi: "",
            gambar: null
        })
    }


    const deleteWarna = async (id) => {

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/warna/${id}`, {
                method: 'DELETE'
            })
            const data = await response.json()

            if (data.success) {
                setAlert({
                    type: "success",
                    message: data.message || "Warna Berhasil di hapus"
                })
                getWarna()

            } else {
                setAlert({
                    type: 'error',
                    message: data.message
                })
            }
        } catch (error) {
            setAlert({
                type: 'error',
                message: data.message || 'Terjadi Kesalahan'
            })
        }

    }

    const handleDeleteWarna = (id) => {
        setConfirm({
            title: "Hapus Warna",
            message: "Yakin ingin menghapus warna ini ? ",
            onConfirm: async () => {
                setConfirm(null)
                await deleteWarna(id)
            },
            onCancel: () => setConfirm(null)
        })
    }

    const createWarna = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/warna`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_motor: editWarna.id_motor,
                    nama_warna: editWarna.nama_warna,
                    kode_warna: editWarna.kode_warna,
                }),
            });

            const data = await response.json();

            if (data.success) {
                setAlert({
                    type: 'success',
                    message: data.message
                })
                getWarna();

                setEditWarna({
                    ...editWarna,
                    id_warna: "",
                    nama_warna: "",
                    kode_warna: "#000000",
                });
            }
        } catch (error) {
            console.log(error);
            setAlert({
                type: 'error',
                message: "Gagal Create warna"
            })
        }
    };

    const updateWarna = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/warna/${editWarna.id_warna}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        id_motor: editWarna.id_motor,
                        nama_warna: editWarna.nama_warna,
                        kode_warna: editWarna.kode_warna,
                    }),
                }
            );

            const data = await response.json();

            if (data.success) {
                setAlert({ type: 'success', message: data.message })
                getWarna();

                setEditWarna({
                    id_warna: "",
                    id_motor: editWarna.id_motor,
                    nama_warna: "",
                    kode_warna: "#000000",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getWarna = async () => {
        try {
            const response = await fetch(getFunctionUrl('warna'))
            const data = await response.json()
            console.log(data.data)
            if (data.success) {
                setWarna(data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getTipe = async () => {
        try {
            const response = await fetch((getFunctionUrl('tipe')), {
                headers: {
                    ...getSupabaseHeaders(),
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();
            console.log("DATA TIPE DARI API:", data.data);

            console.log(tipe)
            if (data.success) {
                setTipe(data.data);
            }

        } catch (error) {
            console.log(error);
        }
    };



    const getKategori = async () => {
        try {
            const response = await fetch((getFunctionUrl('kategori')), {
                headers: {
                    ...getSupabaseHeaders(),
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log("DATA KATEGORI DARI KATEGORI:", data.data);
            console.log("STATUS", response.status)

            console.log(kategori)
            if (data.success) {
                setKategori(data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleChangeData = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev, [name]: name === 'harga' ? value.replace(/\D/g, "") : value
        }))
    }


    const getMotor = async () => {
        try {
            const response = await fetch(getFunctionUrl('motor'), {
                headers: {
                    ...getSupabaseHeaders(),
                    Authorization: `Bearer ${token}`,
                },
            });


            const data = await response.json();
            console.log(data)
            if (data.success) {
                setProducts(data.data);
            } else {
                setAlert({ type: 'error', message: data.message })
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getMotor()
        getKategori()
        getTipe()
        getWarna()
    }, [])

    const handleExport = () => {
        exportExcel({
            data: products,
            fileName: "Data motor Honda",
            columns: [
                {
                    label: 'ID',
                    key: "id_motor"
                },
                {
                    label: "Nama Motor",
                    key: "nama_motor"
                },
                {
                    label: "Harga",
                    key: "harga"
                },
                {
                    label: "Stok",
                    key: "stok"
                },
                {
                    label: "Kategori",
                    key: "nama_kategori"
                }
            ]
        })
    };

    const filteredProducts = products.filter((item) => {
        console.log('isi produl', products);
        const searchLower = search.toLowerCase().trim()

        const cocokSearch =
            item.nama_motor.toLowerCase().includes(searchLower) || (searchLower === 'aktif' && item.status === 'Aktif') || (searchLower === 'nonaktif' && item.status === 'Nonaktif');


        const cocoKategori = selectKategori === "" || item.id_kategori == selectKategori;
        const cockWarna = selectWarna === "" || warna.some((w) => w.id_motor === item.id_motor && w.id_warna == selectWarna);

        return cocokSearch && cocoKategori && cockWarna

    })
    const totalPages = Math.max(1, Math.ceil(filteredProducts.length / rowsPerPage))
    const pageItems = filteredProducts.slice((page - 1) * rowsPerPage, page * rowsPerPage)

    useEffect(() => {
        if (page > totalPages) setPage(totalPages)
    }, [page, totalPages])

    useEffect(() => {
        setPage(1)
    }, [search, selectKategori])

    const handleSubmit = async () => {

        const dataForm = new FormData();


        dataForm.append("nama_motor", formData.nama_motor);
        dataForm.append("id_kategori", formData.id_kategori);
        dataForm.append("id_tipe", formData.id_tipe);
        dataForm.append("harga", formData.harga);
        dataForm.append("stok", formData.stok);
        dataForm.append("tahun", formData.tahun);
        dataForm.append("deskripsi", formData.deskripsi);

        if (formData.gambar) {
            dataForm.append("gambar", formData.gambar);
        }

        try {

            console.log("DATA FORM MOTOR:", {
                nama_motor: formData.nama_motor,
                id_kategori: formData.id_kategori,
                id_tipe: formData.id_tipe,
                harga: formData.harga,
                stok: formData.stok,
                tahun: formData.tahun,
                deskripsi: formData.deskripsi,
                gambar: formData.gambar
            });

            console.log("ISI FORMDATA:");

            for (const [key, value] of dataForm.entries()) {
                console.log(key, value);
            }
            const response = await fetch(
                getFunctionUrl('motor'),
                {
                    method: "POST",
                    headers: {
                        apikey: SUPABASE_PUBLISHABLE_KEY,
                        Authorization: `Bearer ${token}`
                    },
                    body: dataForm
                }
            );

            const data = await response.json();
            console.log(data);

            if (data.success) {
                const idMotor = data.id;
                // console.log("id motor baru", idMotor);
                setAlert({
                    type: "success",
                    message: "Produk berhasil ditambahkan"
                })

                getMotor();
                closeModal();
                resetForm();
            } else {
                setAlert({
                    type: "warning",
                    message: data.message
                })
            }
        } catch (error) {
            console.log(error);
            setAlert({
                type: 'error',
                message: data.message
            })
        }
    };

    const updateMotor = async () => {
        const dataForm = new FormData();

        dataForm.append("nama_motor", formData.nama_motor);
        dataForm.append("id_kategori", formData.id_kategori);
        dataForm.append("id_tipe", formData.id_tipe);
        dataForm.append("harga", formData.harga);
        dataForm.append("stok", formData.stok);
        dataForm.append("tahun", formData.tahun);
        dataForm.append("deskripsi", formData.deskripsi);
        if (formData.gambar) {
            dataForm.append("gambar", formData.gambar)
        }
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/motor/${editId}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: dataForm
                }
            );
            const data = await response.json();

            if (data.success) {
                setAlert({ type: 'success', message: 'Produk berhasil di update' })

                getMotor()
                closeModal()
                resetForm()

                setIsEdit(false)
                setEditId(null)
            } else {
                setAlert({ type: 'error', message: data.message })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelet = async (id) => {

        setConfirm({
            title: 'Hapus Produk',
            message: "Yakin ingin menghapus produk ini ? ",
            onConfirm: async () => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/motor/${id}`,
                        {
                            method: "DELETE",
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    )
                    const data = await response.json();

                    console.log("STATUS", response.status)
                    console.log("RESPONE", data)

                    if (!response.ok) {
                        setAlert({
                            type: 'warning',
                            message: "Gagal Mengapus Motor"
                        })
                    }

                    if (data.success) {
                        setAlert({
                            type: data.message.includes('dinonaktifkan') ? 'warning' : "success",
                            message: data.message
                        })
                        await getMotor()
                        return

                    } else {
                        setAlert({
                            type: 'error',
                            message: data.message
                        })
                    }
                } catch (error) {
                    console.log(error)
                } finally {
                    setConfirm(null)
                }
            },
            onCancel: () => setConfirm(null)
        })
    }

    const handleEdit = (item) => {
        setIsEdit(true);
        setEditId(item.id_motor)
        setFormData({
            nama_motor: item.nama_motor,
            id_kategori: item.id_kategori,
            id_tipe: item.id_tipe,
            harga: item.harga,
            stok: item.stok,
            tahun: item.tahun,
            deskripsi: item.deskripsi,
            gambar: item.gambar
        })
        setEditWarna({
            id_motor: item.id_motor,
            id_warna: "",
            nama_warna: "",
            kode_warna: "#000000",
        });
        openModal()
    }

    return (
        <div className="min-h-screen w-full flex bg-gray-50 overflow-x-hidden" >
            <div className="flex-1 min-w-0 flex flex-col bg-gray-50 overflow-x-hidden">
                <main className="flex-1 px-4 pb-6 overflow-x-hidden mt-24">
                    <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center mb-4">
                        <motion.div
                            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h1 className="text-xl lg:text-2xl font-bold text-[#00182F">Produk Motor</h1>
                            <p className="text-sm text-gray-500 mt-1">Kelola data produk motor.</p>
                        </motion.div>
                        <div className="flex flex-row gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                            <div className="w-full sm:w-56 lg:w-72">
                                <select
                                    value={selectKategori}
                                    onChange={(e) => setSelectKategori(e.target.value)}
                                    className="w-full h-10 px-4 rounded-full bg-white border border-blue-100 text-sm outline-none focus:outline-none focus:ring-0 focus:border-blue-100"
                                >
                                    <option value="">Semua Kategori</option>

                                    {kategori.map((item) => (
                                        <option
                                            key={item.id_kategori}
                                            value={item.id_kategori}
                                        >
                                            {item.nama_kategori}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='flex gap-2'>
                                {/* <button onClick={handleExport} className='inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white border border-blue-100 text-slate-700 transition hover:border-blue-300  hover:shadow-md focus:ring-2 focus:ring-indigo-200'>
                                    <CiFileOn size={18} />
                                    <span className="text-xs">Export</span>
                                </button> */}
                                <button
                                    type="button"
                                    onClick={openModal}
                                    className='inline-flex items-center justify-center h-10 w-10 rounded-full bg-white border border-blue-100 text-slate-700 transition hover:shadow-md hover:border-blue-300  focus:ring-2 focus:ring-indigo-200'>
                                    <PiPlus size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Desktop */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-4 overflow-hidden bg-white shadow-sm rounded-2xl border border-slate-100 hidden md:block">
                        <div className="px-6 py-4 bg-[#004A7C]">
                            <p className="text-xl font-semibold text-white">Produk</p>
                        </div>


                        <div className="overflow-x-auto">
                            <Table onRowClick={(item) => navigate(`/admin/detailProduk/${item.id_motor}`)} columns={columns} data={pageItems} rowKey="id_motor"
                                renderActions={(item) => (
                                    <div className="p-2 text-sm flex gap-2">

                                        {/* <button
                                        type="button"
                                        onClick={() => {
                                            handleEdit(item);
                                        }}
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                                    >
                                        <FaEdit />
                                    </button> */}
                                        {/* <button
                                        type="button"
                                        onClick={() => {
                                            handleDelet(item.id_motor);
                                        }}
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
                                    >
                                        <MdDelete />
                                    </button> */}
                                    </div>
                                )} />
                        </div>

                        <div className="px-6 py-3 flex flex-wrap items-center justify-end gap-3">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition ${page === 1 ? 'text-slate-400 bg-slate-100' : 'text-slate-700 bg-white border border-slate-200'}`}>
                                Prev
                            </button>
                            <span className="text-sm text-slate-600">Halaman {page} / {totalPages}</span>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition ${page === totalPages ? 'text-slate-400 bg-slate-100' : 'text-slate-700 bg-white border border-slate-200'}`}>
                                Next
                            </button>
                        </div>
                    </motion.div>



                    {/* mobile */}

                    <div className="md:hidden space-y-4">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                direction: 0.6,
                                ease: [0.16, 1, 0.3, 1]
                            }} >


                            <div className="space-y-4">
                                {products.map((item, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.65,
                                            delay: index * 0.07,
                                            ease: [0.16, 1, 0.3, 1]
                                        }} key={item.id_motor}
                                        className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm">
                                        <div className="relative h-52 w-full overflow-hidden rounded-xl bg-gray-100">
                                            <motion.img
                                                initial={{ opacity: 0, scale: 0.02 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{
                                                    duration: 0.7,
                                                    delay: index * 0.07 + 0.08,
                                                    ease: [0.16, 1, 0.3, 1]
                                                }}
                                                src={`${import.meta.env.VITE_API_URL}${item.gambar}`}
                                                // src={item.gambar}
                                                alt={item.nama_motor} className="h-full w-full object-contain" />

                                            {/* <div> */}
                                            <span className={`absolute top-3 left-3 rounded-md px-3 py-1 text-xs font-medium ${item.status === 'Aktif' ? "bg-green-300 text-gray-700" : "bg-red-100 text-red-600"
                                                }`} >{item.status}</span>

                                            <div className="absolute top-3 right-3 ">
                                                <button type="button" onClick={() => setOpenDrapMenu(openDrapMenu === item.id_motor ? null : item.id_motor)}><MdMoreHoriz size={20}
                                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm"
                                                />
                                                </button>

                                                <AnimatePresence>
                                                    {openDrapMenu === item.id_motor && (
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.95, y: -5 }}
                                                            animate={{ opacity: 1, scale: 0.95, y: -5 }}
                                                            transition={{
                                                                duration: 0.2,
                                                                ease: [0.16, 1, 0.3, 1]
                                                            }}
                                                            className="absolute right-0 top-10 z-20 w-44 overflow-hidden rounded-xl bg-white shadow-lg border border-gray-100">
                                                            {/* < div className="flex"> */}
                                                            {/* <div className="flex"> */}
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    console.log("KLIK KELOLA WARNA");

                                                                    setEditWarna({
                                                                        id_motor: item.id_motor,
                                                                        id_warna: "",
                                                                        nama_warna: "",
                                                                        kode_warna: "#000000",
                                                                    });

                                                                    setIsModalColor(true);
                                                                    setOpenDrapMenu(null);
                                                                }}
                                                                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                                                            >
                                                                🎨

                                                                <span>Kelola Warna</span>
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    handleEdit(item);
                                                                    setOpenDrapMenu(null);
                                                                }}
                                                                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                                                            >

                                                                <FaEdit />
                                                                <span>Edit</span>
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    handleDelet(item.id_motor);
                                                                    setOpenDrapMenu(null);
                                                                }}
                                                                className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50"
                                                            >
                                                                <MdDelete />
                                                                <span>Hapus</span>
                                                            </button>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                            {/* </div> */}
                                        </div>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-gray-700">
                                                {item.nama_kategori}
                                            </span>
                                            <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-gray-700">
                                                {item.nama_tipe}
                                            </span>
                                            <span className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-gray-700">
                                                {item.tahun}
                                            </span>
                                        </div>
                                        <div className="mt-3">
                                            <h3 className="text-lg font-bold text-gray-900">{item.nama_motor}</h3>
                                            <p className="mt-1 text-sm text-gray-500">Harga : <span className="ml-1 text-gray-700 font-semibold"> Rp {Number(item.harga).toLocaleString("id-ID")}</span></p>
                                            <div className="mt-2 flex items-center justify-between">
                                                <p className="text-sm text-gray-500">Stok: <span className="ml-1 font-semibold text-gray-700">
                                                    {item.stok}
                                                </span></p>
                                                <div className="flex gap-1.5">
                                                    {warna
                                                        .filter((w) => w.id_motor === item.id_motor)
                                                        .map((w) => (
                                                            <div key={w.id_warna}>
                                                                <div
                                                                    className="h-5 w-5 rounded-full border border-gray-200"
                                                                    style={{
                                                                        backgroundColor: w.kode_warna,
                                                                    }}
                                                                />
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>


                        <div className="flex items-center justify-between px-1 py-3">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className={`rounded-md px-3 py-1.5 text-sm font-medium 
                                ${page === 1 ? 'text-gray-400 bg-gray-100' : 'text-gray-700 bg-white border border-gray-200'}`}>
                                Prev
                            </button>
                            <span className="text-sm text-gray-600"> {page} / {totalPages}</span>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className={`rounded-md px-3 py-1.5 text-sm font-medium ${page === totalPages
                                    ? "bg-gray-100 text-gray-400"
                                    : "border border-gray-200 bg-white text-gray-700"
                                    }`}>
                                Next
                            </button>
                        </div>
                    </div>



                    <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Produk" footer={
                        <div className="px-6 py-4 flex justify-end gap-3 ">
                            <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">Batal</button>
                            <button type="button" onClick={handleSubmit} className="rounded-full bg-[#002446]  hover:bg-[#00182F] px-5 py-2.5 text-sm font-medium text-white transition ">
                                Tambah
                            </button>
                        </div>
                    }>

                        <div className="grid grid-cols-2 gap-4">
                            <FormField
                                type="file" label="Foto Produk" name="gambar" accept="image/*" value={formData.gambar}
                                onChange={(file) => {
                                    setFormData({
                                        ...formData,
                                        gambar: file,
                                    })
                                }}
                            />

                            <FormField label="Nama Produk" name='nama_motor' value={formData.nama_motor}
                                onChange={(val) => setFormData((prev) => ({ ...prev, nama_motor: val }))} placeholder='Masukan nama motor' required />

                            <FormField label="Harga" name='harga' value={formData.harga}
                                onChange={(val) => setFormData((prev) => ({ ...prev, harga: val }))} placeholder='Masukan harga motor' required />

                            <FormField label="Stok" name='stok' value={formData.stok}
                                onChange={(val) => setFormData((prev) => ({ ...prev, stok: val }))} placeholder='Masukan stok motor' required />

                            <FormField label="Tahun" name='tahun' value={formData.tahun}
                                onChange={(val) => setFormData((prev) => ({ ...prev, tahun: val }))} placeholder='Masukan Tahun motor' required />

                            <FormField type='select' label='Kategori' name='id_kategori' value={formData.id_kategori}
                                onChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        id_kategori: value,
                                    })
                                } options={[
                                    { value: "", label: "Pilih kategori" },
                                    ...kategori.map((kategori) => ({
                                        value: kategori.id_kategori,
                                        label: kategori.nama_kategori
                                    }))
                                ]} />

                            <FormField type='select' label='Tipe' name='id_tipe' value={formData.id_tipe}
                                onChange={(value) =>
                                    setFormData({
                                        ...formData,
                                        id_tipe: value,
                                    })
                                } options={[
                                    { value: "", label: "Pilih kategori" },
                                    ...tipe.map((tipe) => ({
                                        value: tipe.id_tipe,
                                        label: tipe.nama_tipe
                                    }))
                                ]} />


                        </div>

                        <FormField type='textarea' label="Deskripsi" name='deskripsi' value={formData.deskripsi}
                            onChange={(val) => setFormData((prev) => ({ ...prev, deskripsi: val }))} />

                    </Modal>

                    <Modal isOpen={isModalColor} onClose={() => setIsModalColor(false)} title={isEdit ? 'Edit Produk' : 'Tambah Produk'}
                        footer={
                            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-3xl">
                                <button type="button" onClick={() => setIsModalColor(false)} className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">Batal</button>
                                <button type="button" onClick={() => editWarna.id_warna ? updateWarna() : createWarna()} className="rounded-full bg-[#002446]  hover:bg-[#00182F] px-5 py-2.5 text-sm font-medium text-white transition ">
                                    {editWarna.id_warna ? "Update" : "Tambah"}
                                </button>
                            </div>
                        }
                    >
                        <FormField label="Nama Color" name='nama_warna' value={editWarna.nama_warna} onChange={(e) => setEditWarna({ ...editWarna, nama_warna: e.target.value })} placeholder='Masukan nama motor' required />
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                            <input
                                type="color"
                                value={editWarna.kode_warna}
                                onChange={(e) =>
                                    setEditWarna({
                                        ...editWarna,
                                        kode_warna: e.target.value
                                    })
                                }
                            />
                        </div>

                        <div className="px-6 py-5 grid gap-1 md:grid-cols-1">
                            <label className="block text-sm font-medium text-gray-700">List Color</label>
                            <div className="md:col-span-1 ">
                                {warna.filter((item) => item.id_motor === editWarna.id_motor).map((item) => (
                                    <div key={item.id_warna} className="flex  justify-between items-center">
                                        <div className="flex gap-3">
                                            <div className="w-6 h-6 rounded-full" style={{ backgroundColor: item.kode_warna }} />
                                            <span>{item.nama_warna}</span>
                                        </div>
                                        <div>
                                            <button onClick={() => handleEditWarna(item)} className="bg-slate-100 px-2 py-2 rounded-full text-center mb-2 mr-2"><FaEdit size={14} className="text-black/30 hover:text-red-700" /></button>
                                            <button onClick={() => handleDeleteWarna(item.id_warna)} className="bg-slate-100 px-2 py-2 rounded-full text-center mb-2 "><MdDelete size={14} className="text-black/30 hover:text-red-700" /></button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Modal>

                    {
                        confrim && (
                            <ConfirmAlert title={confrim.title} message={confrim.message} onConfirm={confrim.onConfirm} onCancel={confrim.onCancel} />
                        )
                    }
                    {
                        alert && (
                            <CustomAlert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
                        )
                    }
                </main >
            </div >
        </div >

    )
}

export default KelolaProduk