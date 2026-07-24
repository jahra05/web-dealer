import React, { useState, useMemo, useEffect } from "react"
import { defaultEasing } from "framer-motion"
import AdminNavbar from "../../components/AdminNavbar"
import NavTop from "../../components/NavTop"
import { BiExport, BiSearch } from "react-icons/bi"
import { PiPlus } from "react-icons/pi"
import { CiFileOn } from "react-icons/ci"
import { MdDelete, MdNotificationsNone } from "react-icons/md"
import { FaEdit, FaSearch } from "react-icons/fa"
import { exportExcel } from "../../utils/export/exportExcel"
import UserMenuDropdwn from "../../components/UserMenuDropdown"
import { RxHamburgerMenu } from "react-icons/rx"

const KelolaProduk = () => {
    const [page, setPage] = useState(1)
    const rowsPerPage = 7
    const [products, setProducts] = useState([]);
    const token = localStorage.getItem("token")
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [kategori, setKategori] = useState([])
    const [tipe, setTipe] = useState([])
    // const [varian, setVarian] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [editId, setEditId] = useState(null)
    const [search, setSearch] = useState("")
    const [selectKategori, setSelectKategori] = useState("")
    const [isNotificationOpen, setIsNotificationOpen] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)



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

    const getTipe = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/tipe", {
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
            const response = await fetch("http://localhost:3000/api/kategori", {
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
            const response = await fetch("http://localhost:3000/api/motor", {
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
        // getVarian()
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

        return cocokSearch && cocoKategori

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
        const dataForm = new FormData()

        dataForm.append("nama_motor", formData.nama_motor)
        dataForm.append("id_kategori", formData.id_kategori);
        dataForm.append("id_tipe", formData.id_tipe);
        dataForm.append("harga", formData.harga);
        dataForm.append("stok", formData.stok);
        dataForm.append("tahun", formData.tahun);
        dataForm.append("deskripsi", formData.deskripsi);
        dataForm.append("gambar", formData.gambar);

        console.log(formData)
        try {
            const response = await fetch("http://localhost:3000/api/motor", {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: dataForm
            })
            const data = await response.json()
            if (data.success) {
                alert("produk berhasil ditambahkan");
                getMotor()
                closeModal()
                resetForm()
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

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
                `http://localhost:3000/api/motor/${editId}`,
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
            const response = await fetch(`http://localhost:3000/api/motor/${id}`,
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
        openModal()
    }
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
                        <button
                            onClick={() => setIsNotificationOpen(true)}
                            className='relative inline-block bg-gray-200 w-10 h-10 p-2 rounded-full hover:bg-gray-300 transition'
                        >
                            <MdNotificationsNone size={24} className='position' />
                            <p className='absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-semibold'>10</p>
                        </button>
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

                    <div className="mt-4 overflow-hidden bg-white shadow-sm rounded-2xl border border-slate-100">
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
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">Harga</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">Stok</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {pageItems.map((item) => (
                                        <tr key={item.id_motor} className="transition hover:bg-slate-50">
                                            <td className="px-4 py-4 whitespace-nowrap">
                                                <div className="flex items-center w-10 h-10 ">
                                                    <img
                                                        src={`http://localhost:3000/uploads/${item.gambar}`}
                                                        alt={item.nama_motor}
                                                        className="h-10 w-10 object-cover"
                                                    />
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm font-medium text-slate-900 whitespace-nowrap">{item.nama_motor}</td>
                                            <td className="px-4 py-4 text-sm text-slate-600 whitespace-nowrap">{item.nama_tipe}</td>
                                            <td className="px-4 py-4 text-sm text-slate-600 whitespace-nowrap">Rp {Number(item.harga).toLocaleString("id-ID")}</td>
                                            <td className="px-4 py-4 text-sm text-slate-600 whitespace-nowrap">{item.stok}</td>
                                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => handleEdit(item)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
                                                        <FaEdit size={16} />
                                                    </button>
                                                    <button onClick={() => handleDelet(item.id_motor)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
                                                        <MdDelete size={16} />
                                                    </button>
                                                </div>
                                            </td>
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