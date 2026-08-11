import React, { useState, useMemo, useEffect, useRef } from "react"
import { defaultEasing } from "framer-motion"
import AdminNavbar from "../../components/AdminNavbar"
import NavTop from "../../components/NavTop"
import { BiExport, BiSearch, BiUpArrow } from "react-icons/bi"
import { PiPlus } from "react-icons/pi"
import { CiFileOn } from "react-icons/ci"
import { MdDelete, MdMoreHoriz, MdMoreVert, MdNotificationsNone } from "react-icons/md"
import { FaEdit, FaSearch } from "react-icons/fa"
import { exportExcel } from "../../utils/export/exportExcel"
import UserMenuDropdwn from "../../components/UserMenuDropdown"
import { RxHamburgerMenu } from "react-icons/rx"
import { data } from "react-router-dom"

const KelolaProduk = () => {
    const [page, setPage] = useState(1)
    const rowsPerPage = 7
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem("token")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isModalColor, setIsModalColor] = useState(false)
    const [kategori, setKategori] = useState([])
    const [tipe, setTipe] = useState([])

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
    const dropdownRef = useRef(null);



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
        setInputWarna({ nama_warna: "", kode_warna: "#000000" })
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
        const comfirmDelete = window.confirm("yakin ingin menghaspu warna ini ? ")

        if (!comfirmDelete) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/warna/${id}`, {
                method: 'DELETE'
            })
            const data = await response.json()

            if (data.success) {
                alert(data.message)
                getWarna()
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.log(error)
        }
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
                alert(data.message);
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
                alert(data.message);
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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/warna`)
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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tipe`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();
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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/kategori`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
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
            ...prev, [name]: value
        }))
    }


    const getMotor = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/motor`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });


            const data = await response.json();
            console.log(data)
            if (data.success) {
                setProducts(data.data);
            } else {
                alert(data.message)
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
        const cocokSearch =
            item.nama_motor.toLowerCase().includes(search.toLocaleLowerCase())

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
        dataForm.append("gambar", formData.gambar);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/motor`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: dataForm
                }
            );

            const data = await response.json();
            console.log(data);

            if (data.success) {
                const idMotor = data.id;
                console.log("id motor baru", idMotor);

                alert("Produk berhasil ditambahkan");

                getMotor();
                closeModal();
                resetForm();
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
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
                alert("Produk berhasi diupdate")

                getMotor()
                closeModal()
                resetForm()

                setIsEdit(false)
                setEditId(null)
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const handleDelet = async (id) => {
        const confirmDelet = window.confirm("Yakin ingin menhapus produk ini ?")
        if (!confirmDelet) return

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

            if (data.success) {
                alert("produk berhasil dihapus");
                getMotor()
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.log(error)
        }
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
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpenDrapMenu(false);
            }
        };
        if (openDrapMenu) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [openDrapMenu]);
    return (
        <div className="min-h-screen w-full flex bg-gray-50 overflow-x-hidden">
            <AdminNavbar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="flex-1 min-w-0 flex flex-col bg-gray-50 overflow-x-hidden">
                <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between p-4'>
                    <div className='flex items-center gap-4 w-full sm:w-auto'>
                        <button className='lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors' onClick={() => setIsSidebarOpen(prev => !prev)} aria-label="Toggle sidebar">
                            <RxHamburgerMenu size={24} />
                        </button>
                        <div className="flex gap-2 bg-white border border-slate-200 w-full sm:w-64 lg:w-80 px-4 py-2 items-center rounded-full shadow-sm transition hover:shadow-md hover:border-slate-300">
                            <BiSearch size={20} />
                            <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" className="h-8 w-full outline-none rounded-full text-sm" placeholder="Search" />
                        </div>
                    </div>

                    <div className='flex items-center gap-2 self-end sm:self-auto'>
                        <UserMenuDropdwn />
                    </div>
                </div>

                <main className="flex-1 px-4 pb-6 overflow-x-hidden">
                    <div className="flex flex-col gap-4 lg:flex-row lg:justify-between lg:items-center mb-4">
                        <div>
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Kelola Produk</h1>
                            <p className="text-sm text-gray-500 mt-1">Kelola data produk motor.</p>
                        </div>
                        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                            <div className="w-full sm:w-56 lg:w-72">
                                <select
                                    value={selectKategori}
                                    onChange={(e) => setSelectKategori(e.target.value)}
                                    className="w-full h-10 px-4 rounded-full bg-white border border-slate-200 text-sm"
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

                            <div className='flex flex-wrap gap-2'>
                                <button onClick={handleExport} className='inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm transition hover:shadow-md hover:border-slate-300 hover:bg-slate-50 focus:ring-2 focus:ring-indigo-200'>
                                    <CiFileOn size={18} />
                                    <span className="text-xs">Export</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={openModal}
                                    className='inline-flex items-center justify-center h-10 w-10 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm transition hover:shadow-md hover:border-slate-300 hover:bg-slate-50 focus:ring-2 focus:ring-indigo-200'>
                                    <PiPlus size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                    {/* Desktop */}
                    <div className="mt-4 overflow-hidden bg-white shadow-sm rounded-2xl border border-slate-100 hidden md:block">
                        <div className="px-6 py-4 bg-red-600">
                            <p className="text-sm font-semibold text-white">Daftar Produk</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-[720px] w-full overflow-auto">
                                <thead className="bg-white">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">Gambar</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">Nama Motor</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">Tipe</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">warna</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">Harga</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">Stok</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white ">
                                    {pageItems.map((item) => (
                                        <tr key={item.id_motor} className="transition hover:bg-slate-50">
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="flex items-center w-10 h-10 ">
                                                    <img
                                                        src={item.gambar}
                                                        alt={item.nama_motor}
                                                        className="h-10 w-10 object-cover"
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">{item.nama_motor}</td>
                                            <td className="px-4 py-4 text-sm text-slate-600 whitespace-nowrap">{item.nama_tipe}</td>
                                            <td className="px-4 py-4 text-sm text-slate-600 whitespace-nowrap flex items-center gap-4">


                                                {warna
                                                    .filter((w) => w.id_motor === item.id_motor)
                                                    .map((w) => (
                                                        <div key={w.id_warna} className="flex items-center gap-3">
                                                            <div
                                                                className="w-8 h-8 rounded-full border"
                                                                style={{ backgroundColor: w.kode_warna }}
                                                            />
                                                        </div>
                                                    ))}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-slate-600 whitespace-nowrap">Rp {Number(item.harga).toLocaleString("id-ID")}</td>
                                            <td className="px-4 py-4 text-sm text-slate-600 whitespace-nowrap">{item.stok}</td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <button onClick={() => setOpenDrapMenu(openDrapMenu === item.id_motor ? null : item.id_motor)}><MdMoreHoriz size={20} /></button>
                                            </td>

                                            {openDrapMenu === item.id_motor && (
                                                <div ref={dropdownRef} className="absolute right-32 mt-12 w-40 bg-slate-50  shadow-xl rounded-sm flex flex-col gap-2 ">
                                                    <button onClick={() => {
                                                        setEditWarna({
                                                            id_motor: item.id_motor,
                                                            id_warna: "",
                                                            nama_warna: "",
                                                            kode_warna: "#000000",
                                                        });

                                                        setIsModalColor(true);
                                                    }} className="flex text-sm  h-10 items-center px-4 gap-2 text-slate-600 hover:bg-white font-semibold hover:text-red-500">
                                                        🎨 <span>Kelola Warna</span>
                                                    </button>

                                                    <button onClick={() => handleEdit(item)} className="flex text-sm  h-10 items-center px-4 gap-2 text-slate-600 hover:bg-white font-semibold hover:text-red-500">
                                                        ✏️ <span>Edit Produk</span>
                                                    </button>
                                                    <button onClick={() => handleDelet(item.id_motor)} className="flex text-sm  h-10 items-center px-4 gap-2 text-slate-600 hover:bg-white font-semibold hover:text-red-500">
                                                        🗑️ <span>Hapus</span>
                                                    </button>
                                                </div>
                                            )}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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
                    </div>



                    {/* mobile */}

                    <div className="md:hidden space-y-4">
                        {products.map((item) => (
                            <div className="rounded-xl border bg-white p-4 shadow-sm">
                                <div className="bg-gray-100 w-full rounded-xl h-72">
                                    <img src={item.gambar} alt={item.nama_motor} className="w-full max-w-[470px] h-72 rounded-xl object-center object-contain py-4 " />
                                </div>
                                <div className="flex justify-between mt-2">
                                    <div className="flex gap-4">
                                        <p className="bg-blue-50 rounded-md px-3 py-2 text-sm  text-center font-medium">{item.nama_kategori}</p>
                                        <p className="bg-blue-50 rounded-md px-3 py-2 text-sm  text-center font-medium">{item.nama_tipe}</p>
                                        <p className="bg-blue-50 rounded-md px-3 py-2 text-sm  text-center font-medium">{item.tahun}</p>
                                    </div>
                                    <div>
                                        <button onClick={() => setOpenDrapMenu(openDrapMenu === item.id_motor ? null : item.id_motor)}><MdMoreHoriz size={20} /></button>

                                        {openDrapMenu === item.id_motor && (
                                            <div ref={dropdownRef} className="absolute right-8  w-40 bg-slate-50  shadow-xl rounded-sm flex flex-col gap-2 ">
                                                <button onClick={() => {
                                                    setEditWarna({
                                                        id_motor: item.id_motor,
                                                        id_warna: "",
                                                        nama_warna: "",
                                                        kode_warna: "#000000",
                                                    });

                                                    setIsModalColor(true);
                                                }} className="flex text-sm  h-10 items-center px-4 gap-2 text-slate-600 hover:bg-white font-semibold hover:text-red-500">
                                                    🎨 <span>Kelola Warna</span>
                                                </button>

                                                <button onClick={() => handleEdit(item)} className="flex text-sm  h-10 items-center px-4 gap-2 text-slate-600 hover:bg-white font-semibold hover:text-red-500">
                                                    ✏️ <span>Edit Produk</span>
                                                </button>
                                                <button onClick={() => handleDelet(item.id_motor)} className="flex text-sm  h-10 items-center px-4 gap-2 text-slate-600 hover:bg-white font-semibold hover:text-red-500">
                                                    🗑️ <span>Hapus</span>
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                </div>
                                <div>
                                    <h3 className="mt-3 font-bold text-lg">{item.nama_motor}</h3>
                                    <p className="text-l text-gray-500 font-medium">Harga : Rp {Number(item.harga).toLocaleString("id-ID")}</p>
                                    <p className="text-sm mt-2">Stok : <span className="font-semibold">{item.stok}</span></p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {isModalColor && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6" onClick={() => setIsModalColor(false)} >
                            <div className="w-full max-w-lg lg:max-w-md max-h[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
                                <div className="px-6 py-5 border-b border-gray-100">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-900">Tambah Produk</h2>
                                            <p className="mt-0.5 text-sm text-gray-500">Isi color motor untuk ditampilkan di katalog.</p>
                                        </div>
                                        <button type="button" onClick={() => setIsModalColor(false)} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">✕</button>
                                    </div>
                                </div>

                                <div className="px-6 py-8 grid gap-4 md:grid-cols-2 border-b border-gray-100 ">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Color</label>
                                        <input
                                            value={editWarna.nama_warna}
                                            onChange={(e) =>
                                                setEditWarna({
                                                    ...editWarna,
                                                    nama_warna: e.target.value
                                                })
                                            }
                                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100" />
                                    </div>
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
                                                    <button onClick={() => deleteWarna(item.id_warna)} className="bg-slate-100 px-2 py-2 rounded-full text-center mb-2 "><MdDelete size={14} className="text-black/30 hover:text-red-700" /></button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-3xl">
                                    <button type="button" onClick={() => setIsModalColor(false)} className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">Batal</button>
                                    <button type="button" onClick={() => editWarna.id_warna ? updateWarna() : createWarna()} className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700">
                                        {editWarna.id_warna ? "Update" : "Tambah"}
                                    </button>
                                </div>

                            </div>

                        </div>
                    )}

                    {isModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6" onClick={closeModal}>
                            <div className="w-full max-w-lg lg:max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
                                {/* Header */}
                                <div className="px-6 py-5 border-b border-gray-100">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-900">{isEdit ? 'Edit Produk' : 'Tambah Produk'}</h2>
                                            <p className="mt-0.5 text-sm text-gray-500">Isi data motor untuk ditampilkan di katalog.</p>
                                        </div>
                                        <button type="button" onClick={closeModal} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">✕</button>
                                    </div>
                                </div>

                                {/* Body */}
                                <div className="px-6 py-5 grid gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Nama Motor</label>
                                        <input type="text" name="nama_motor" value={formData.nama_motor} onChange={handleChangeData}
                                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                                        <select name="id_kategori" value={formData.id_kategori} onChange={handleChangeData}
                                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100">
                                            <option value="">Pilih Kategori</option>
                                            {kategori.map((item) => (
                                                <option key={item.id_kategori} value={item.id_kategori}>{item.nama_kategori}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
                                        <select name="id_tipe" value={formData.id_tipe} onChange={handleChangeData}
                                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100">
                                            <option value="">Pilih Tipe</option>
                                            {tipe.map((item) => (
                                                <option key={item.id_tipe} value={item.id_tipe}>{item.nama_tipe}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Harga</label>
                                        <input type="number" name="harga" value={formData.harga} onChange={handleChangeData}
                                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Tahun</label>
                                        <input type="number" name="tahun" value={formData.tahun} onChange={handleChangeData}
                                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Stok</label>
                                        <input type="text" name="stok" value={formData.stok} onChange={handleChangeData}
                                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                                        <input type="text" name="deskripsi" value={formData.deskripsi} onChange={handleChangeData}
                                            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Gambar</label>
                                        <input accept="image/*" onChange={(e) => { setFormData({ ...formData, gambar: e.target.files[0] }) }}
                                            type="file" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-600 hover:file:bg-red-100" />
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-3xl">
                                    <button type="button" onClick={closeModal} className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">Batal</button>
                                    <button type="button" onClick={isEdit ? updateMotor : handleSubmit} className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700">{isEdit ? 'Update' : 'Simpan'}</button>
                                </div>
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </div>

    )
}

export default KelolaProduk