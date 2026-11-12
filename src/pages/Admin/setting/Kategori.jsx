import { RxHamburgerMenu } from "react-icons/rx";
import Setting from "./Setting";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmAlert from "../../../components/ConfirmAlert";
import CustomAlert from "../../../components/CustomAlert";
import { PiPlus } from "react-icons/pi";
import { BiChevronLeft } from "react-icons/bi"
import { MdDelete } from "react-icons/md";
import { getFunctionUrl, getSupabaseHeaders, SUPABASE_PUBLISHABLE_KEY, } from "../../../config/supabase"

export default function Kategori() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [kategori, setKategori] = useState([])
    const [tipe, setTipe] = useState([])
    const [kategoriForm, setKategoriForm] = useState({
        nama_kategori: ""
    })
    const [kategoriSpesifikasiForm, setKategoriSpesifikasiFrom] = useState({ nama_kategori: "" })
    const [tipeForm, setTipeForm] = useState({ nama_tipe: "", id_kategori: "" })
    const [isKategoriModalOpen, setIskategoriModalOpen] = useState(false)
    const [isKategoriSpecModalOpen, setIsKategoriSpecModalOpen] = useState(false)
    const [isTipeModalOpen, setIsTipeModalOpen] = useState(false)
    const [editKategori, setEditKategori] = useState(null)
    const [editKategoriSpec, setEditSpec] = useState(null)
    const [editTipe, setEditTipe] = useState(null)
    const [selectKategori, setSelectKategori] = useState(null)
    const [alert, setAlert] = useState(null)
    const [page, setPage] = useState(1)
    const rowsPerPage = 5
    const [pageKategori, setPageKategori] = useState(1)
    const rowsPerPageKategori = 5

    const [kategoriSpesifikasi, setKategoriSpesifikasi] = useState([])

    const totalPageKategori = Math.max(1, Math.ceil(kategori.length / rowsPerPageKategori))
    const pageKategoriItems = kategori.slice((pageKategori - 1) * rowsPerPageKategori, pageKategori * rowsPerPageKategori)

    const handleSelectKategori = (kategori) => {
        setSelectKategori(kategori)
    }

    const filterTipe = selectKategori ? tipe.filter((item) => item.id_kategori === selectKategori.id_kategori) : [];
    const totalPages = Math.max(1, Math.ceil(filterTipe.length / rowsPerPage))
    const pageItems = filterTipe.slice((page - 1) * rowsPerPage, page * rowsPerPage)

    useEffect(() => {
        setPage(1)
    }, [selectKategori])

    const openAddKategoriSpec = () => {
        setEditSpec(null)
        setKategoriSpesifikasiFrom({ nama_kategori: "" })
        setIsKategoriSpecModalOpen(true)
    }

    const openAddTipe = () => {
        if (!selectKategori) {
            setAlert({
                type: "warning",
                message: "Pilih kategori terlebih dahulu"
            })
            return;
        }
        setEditTipe(null)

        setTipeForm({
            nama_tipe: "", id_kategori: selectKategori.id_kategori
        })
        setIsTipeModalOpen(true)
    }

    const openAddKategori = () => {
        setEditKategori(null)

        setKategoriForm({
            nama_kategori: ""
        })
        setIskategoriModalOpen(true)
    }

    const openEditKategoriSpec = (item) => {
        setEditSpec(item.id_kategori_spesifikasi);
        setKategoriSpesifikasiFrom({
            nama_kategori: item.nama_kategori
        })
        setIsKategoriSpecModalOpen(true)
    }

    const openEditTipe = (item) => {
        setEditTipe(item.id_tipe);

        setTipeForm({
            nama_tipe: item.nama_tipe, id_kategori: item.id_kategori
        })
        setIsTipeModalOpen(true)
    }



    const openEditKategori = (item) => {
        setEditKategori(item.id_kategori);

        setKategoriForm({
            nama_kategori: item.nama_kategori
        })

        setIskategoriModalOpen(true)
    }

    const handleKategoriSpecChange = (e) => {
        const { name, value } = e.target;

        setKategoriSpesifikasiFrom((prev) => ({
            ...prev, [name]: value
        }))
    }

    const handleEditKategori = (e) => {
        const { name, value } = e.target;

        setKategoriForm((prev) => ({
            ...prev, [name]: value
        }))
    }


    const deleteTipe = async (id) => {
        try {
            const response = await fetch(getFunctionUrl(`tipe/${id}`), {
                method: 'DELETE',
                headers: {
                    ...getSupabaseHeaders(),
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json();
            if (!response.ok) {
                setAlert({
                    type: "warning",
                    message: "Gagal mengahapus Tipe"
                })
                return
            }
            if (data.success) {
                setAlert({
                    type: "success",
                    message: "Tipe berhasil dihapus"
                })
                getTipe()
            }
        } catch (error) {
            console.error('Error menghapus tipe')
            setAlert({
                type: "warning",
                message: "Terjadi kesalahan"
            })
        }
    }

    const deleteKategori = async (id_kategori) => {
        try {
            const response = await fetch(getFunctionUrl(`kategori/${id_kategori}`), {
                method: "DELETE",
                headers: {
                    ...getSupabaseHeaders(),
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json();
            if (!response.ok) {
                setAlert({
                    type: "warning",
                    message: "Gagal menghapus Kategori"
                })
                return
            }
            if (data.success) {
                setAlert({
                    type: 'success',
                    message: "Kategori berhasil dihapus"
                })
                getKategori()
            }
        } catch (error) {
            console.error("Error menghapus kategori", error)
            setAlert({
                type: "warnig",
                message: "Terjadi Kesalahan"
            })
        }
    }

    const handleSubmitTipe = async (e) => {
        e.preventDefault()
        if (!tipeForm.nama_tipe.trim()) {
            setAlert({
                type: 'warning',
                message: "Nama Tipe wajib di isi"
            })
            return
        }
        try {
            const isEdit = editTipe !== null;

            const url = isEdit
                ? getFunctionUrl(`tipe/${editTipe}`)
                : getFunctionUrl('tipe');

            const response = await fetch(url, {
                method: isEdit ? "PUT" : "POST",
                headers: {
                    ...getSupabaseHeaders(),
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(tipeForm)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'gagal menyimpan tipe');
            }
            setAlert({
                type: 'success',
                message: data.message
            })

            setIsTipeModalOpen(false)

            setTipeForm({
                nama_kategori: "",
                id_kategori: ""
            })

            setEditTipe(null)

            await getTipe()

        } catch (error) {
            console.error("ERRO tipe", error)
            setAlert({
                type: 'warning',
                message: error.message || 'Terjadi Kesalahan'
            })
        }
    }

    const handleSpecKategori = async (e) => {
        e.preventDefault();

        try {
            const isEditSpec = editKategoriSpec !== null
            const url = isEditSpec ? getFunctionUrl(`kategori-spesifikasi/${editKategoriSpec}`)
                : getFunctionUrl('kategori-spesifikasi')
            const response = await fetch(url,

                {
                    method: isEditSpec ? "PUT" : "POST",
                    headers: {
                        ...getSupabaseHeaders(),
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify(kategoriSpesifikasiForm),
                }
            );

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || "Gagal menyimpan kategori spesifikasi")
            }

            setAlert({
                type: "success",
                message: data.message
            })

            setIsKategoriSpecModalOpen(false)
            setKategoriSpesifikasiFrom({ nama_kategori: "" })

            setEditSpec(null)
            await getKategoriSpesifikasi();

        } catch (error) {
            console.log(error);

            setAlert({
                type: "warning",
                message: error.message
            });
        }
    };


    const handleSubmitKategori = async (e) => {
        e.preventDefault();

        if (!kategoriForm.nama_kategori.trim()) {
            setAlert({
                type: 'warning',
                message: "Nama Kategori Wajib di isi"
            })
            return
        }
        try {
            const isEdit = editKategori !== null;

            const url = isEdit
                ? getFunctionUrl(`kategori/${editKategori}`)
                : getFunctionUrl('kategori');

            const response = await fetch(url, {
                method: isEdit ? "PUT" : "POST",
                headers: {
                    ...getSupabaseHeaders(),
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(kategoriForm)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'gagal menyimpan kategori');
            }
            setAlert({
                type: 'success',
                message: data.message
            })

            setIskategoriModalOpen(false)

            setKategoriForm({
                nama_kategori: ""
            })

            setEditKategori(null)

            await getKategori()

        } catch (error) {
            console.error("ERRO KATEGORI", error)
            setAlert({
                type: 'warning',
                message: error.message || "Terjadi Kesalahan"
            })
        }
    }


    const handleStatusKategori = async (id, status) => {
        try {
            const response = await fetch(getFunctionUrl(`kategori/${id}/status`),
                {
                    method: 'PUT',
                    headers: {
                        ...getSupabaseHeaders(),
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ status })
                }
            );

            const data = await response.json();
            if (data.success) {
                setAlert({
                    type: 'success',
                    message: 'Status Kategori Berhasil diubah'
                })
            }
            if (!response.ok) {
                throw new Error(
                    data.message || "gagal mengubah status"
                )
            }

            await getKategori()

        } catch (error) {
            setAlert({
                type: "error",
                message: error.message || "Gagal mengubah Status Kategori"
            })
        }

    }

    const handleStatusTipe = async (id, status) => {
        try {
            const response = await fetch(
                getFunctionUrl(`tipe/${id}/status`),
                {
                    method: "PUT",
                    headers: {
                        ...getSupabaseHeaders(),
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                    body: JSON.stringify({ status })
                }
            );

            const data = await response.json();

            if (data.success) {
                setAlert({
                    type: "success",
                    message: data.message || "Status tipe berhasil diubah"
                });
            }

            if (!response.ok) {
                throw new Error(
                    data.message || "Gagal mengubah status"
                );
            }

            await getTipe();


        } catch (error) {
            console.error(error);

            setAlert({
                type: "error",
                message: error.message || "Gagal mengubah status tipe"
            });
        }
    };

    const getKategoriSpesifikasi = async () => {
        try {
            const response = await fetch(
                getFunctionUrl('kategori-spesifikasi'), {
                headers: {
                    ...getSupabaseHeaders(),
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            }
            );

            const data = await response.json();

            if (data.success) {
                setKategoriSpesifikasi(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getKategori = async () => {
        try {
            const response = await fetch(getFunctionUrl('kategori'), {
                headers: {
                    ...getSupabaseHeaders(),
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })

            const data = await response.json();

            console.log("DATA KATEGORI:", data)

            if (data.success) {
                setKategori(data.data)

            }
        } catch (error) {
            setAlert({
                type: "error",
                message: error.message
            })
        }
    }
    const getTipe = async () => {
        try {
            const response = await fetch(getFunctionUrl('tipe'), {
                headers: {
                    ...getSupabaseHeaders(),
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            })
            const data = await response.json();
            console.log("DATA STATUS TIPE:", data);

            console.log(data)

            if (data.success) {
                console.log("SET TIPE:", data.data);
                setTipe(data.data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getKategori();
        getTipe();
        getKategoriSpesifikasi();
    }, []);

    return (
        <>
            {alert && (
                <CustomAlert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
            )}
            <div className="mt-4 p-4 overflow-x-hidden">
                <h3 className="text-xl font-medium hidden min-[1010px]:block">Pengaturan</h3>
                <button onClick={() => navigate('/admin/dashboard')} className="w-32 ml-4 p-1 text-lg min-[1010px]:hidden flex items-center">
                    <BiChevronLeft size={28} />Setting
                </button>

                <div className="flex flex-col w-full mt-4 md:bg-white p-4 rounded-xl">
                    <Setting isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                    {/* LAYOUT GRID 3 KOLOM */}
                    <div className="w-full min-w-0 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-x-hidden z-10">

                        {/* ==================== KOLOM 1: KATEGORI MOTOR ==================== */}
                        <div className="bg-white p-3 md:p-4 w-full flex flex-col justify-between border-r border-gray-100">
                            <div>
                                <div className="mb-4 md:mb-6 border-b pt-2 pb-4 flex justify-between items-center">
                                    <div>
                                        <p className="text-lg font-medium">Kategori</p>
                                        <p className="text-xs text-gray-600">Kelola Kategori produk</p>
                                    </div>
                                    <button onClick={openAddKategori} className="p-1 rounded-lg bg-[#004A7C] text-white text-sm hover:bg-[#00385d]">
                                        <PiPlus size={24} />
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {pageKategoriItems.map((item) => (
                                        <div
                                            key={item.id_kategori}
                                            onClick={() => setSelectKategori(item)}
                                            className={`cursor-pointer flex items-center justify-between gap-3 border rounded-xl p-3 transition ${selectKategori?.id_kategori === item.id_kategori ? "border-[#004A7C] bg-blue-50" : "border-gray-100 hover:bg-gray-50"}`}
                                        >
                                            <div className="flex gap-2 items-center">
                                                <p className="font-medium text-gray-800 text-sm">{item.nama_kategori}</p>
                                                <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] ${item.status === 'Aktif' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                            <div className="flex border border-gray-300 h-8 rounded-lg" onClick={(e) => e.stopPropagation()}>
                                                <button onClick={() => deleteKategori(item.id_kategori)} className="px-2 py-1 rounded-l-lg hover:bg-gray-100"><MdDelete /></button>
                                                <button onClick={() => openEditKategori(item)} className="px-2 py-1 bg-[#004A7C] text-white text-xs hover:bg-[#003e68]">Edit</button>
                                                <button onClick={() => handleStatusKategori(item.id_kategori, item.status === 'Aktif' ? "Nonaktif" : "Aktif")} className="px-2 py-1 rounded-r-lg text-xs hover:bg-gray-50">
                                                    {item.status === 'Aktif' ? "Nonaktif" : 'Aktif'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Pagination Kategori */}
                            <div className="px-1 py-3 flex items-center justify-between mt-4 border-t border-gray-100">
                                <span className="text-xs text-slate-600">Hal {pageKategori} / {totalPageKategori}</span>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => setPageKategori((p) => Math.max(1, p - 1))}
                                        disabled={pageKategori === 1}
                                        className={`px-2 py-1 text-xs rounded-md border ${pageKategori === 1 ? 'text-slate-400 bg-slate-100' : 'text-slate-700 bg-white'}`}>
                                        Prev
                                    </button>
                                    <button
                                        onClick={() => setPageKategori((p) => Math.min(totalPageKategori, p + 1))}
                                        disabled={pageKategori === totalPageKategori}
                                        className={`px-2 py-1 text-xs rounded-md border ${pageKategori === totalPageKategori ? 'text-slate-400 bg-slate-100' : 'text-slate-700 bg-white'}`}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ==================== KOLOM 2: TIPE MOTOR ==================== */}
                        <div className="bg-white p-3 md:p-4 w-full flex flex-col justify-between border-r border-gray-100">
                            <div>
                                <div className="mb-4 border-b py-2 md:py-3">
                                    <p className="text-lg font-medium text-[#001323]">Tipe Motor</p>
                                    <p className="text-xs text-gray-500 mt-1">Kelola tipe berdasarkan kategori</p>
                                </div>

                                {!selectKategori ? (
                                    <div className="flex items-center justify-center min-h-[180px]">
                                        <p className="text-xs text-gray-400 italic">Pilih kategori terlebih dahulu</p>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <h2 className="text-base font-semibold text-[#004A7C]">{selectKategori.nama_kategori}</h2>
                                                <p className="text-xs text-gray-500">Daftar tipe motor</p>
                                            </div>
                                            <button onClick={openAddTipe} className="p-1 rounded-lg bg-[#004A7C] text-white text-sm hover:bg-[#00385d]">
                                                <PiPlus size={24} />
                                            </button>
                                        </div>

                                        <div className="space-y-3">
                                            {pageItems.length === 0 ? (
                                                <div className="text-center py-8">
                                                    <p className="text-xs text-gray-400">Belum ada tipe untuk kategori ini</p>
                                                </div>
                                            ) : (
                                                pageItems.map((item) => (
                                                    <div key={item.id_tipe} className="flex items-center justify-between border border-gray-100 rounded-xl p-3 hover:bg-gray-50">
                                                        <div>
                                                            <div className="flex gap-2 items-center">
                                                                <p className="font-medium text-gray-800 text-sm">{item.nama_tipe}</p>
                                                                <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] ${item.status === 'Aktif' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                                                                    {item.status}
                                                                </span>
                                                            </div>
                                                            <p className="text-[11px] text-gray-400">{item.nama_kategori}</p>
                                                        </div>
                                                        <div className="flex border border-gray-300 h-8 rounded-lg" onClick={(e) => e.stopPropagation()}>
                                                            <button onClick={() => deleteTipe(item.id_tipe)} className="px-2 py-1 rounded-l-lg hover:bg-gray-100"><MdDelete /></button>
                                                            <button onClick={() => openEditTipe(item)} className="px-2 py-1 bg-[#004A7C] text-white text-xs hover:bg-[#003e68]">Edit</button>
                                                            <button onClick={() => handleStatusTipe(item.id_tipe, item.status === 'Aktif' ? "Nonaktif" : "Aktif")} className="px-2 py-1 rounded-r-lg text-xs hover:bg-gray-50">
                                                                {item.status === 'Aktif' ? "Nonaktif" : 'Aktif'}
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Pagination Tipe Motor */}
                            <div className="px-1 py-3 flex items-center justify-between mt-4 border-t border-gray-100">
                                <span className="text-xs text-slate-600">Hal {page} / {totalPages || 1}</span>
                                <div className="flex gap-1">
                                    <button
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className={`px-2 py-1 text-xs rounded-md border ${page === 1 ? 'text-slate-400 bg-slate-100' : 'text-slate-700 bg-white'}`}>
                                        Prev
                                    </button>
                                    <button
                                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages || totalPages === 0}
                                        className={`px-2 py-1 text-xs rounded-md border ${page === totalPages || totalPages === 0 ? 'text-slate-400 bg-slate-100' : 'text-slate-700 bg-white'}`}>
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* ==================== KOLOM 3: KATEGORI SPESIFIKASI ==================== */}
                        <div className="bg-white p-3 md:p-4 w-full flex flex-col justify-between">
                            <div>
                                <div className="mb-4 md:mb-6 border-b pt-2 pb-4 flex justify-between items-center">
                                    <div>
                                        <p className="text-lg font-medium">Kategori Spesifikasi</p>
                                        <p className="text-xs text-gray-600">Kelola master spesifikasi</p>
                                    </div>
                                    <button onClick={openAddKategoriSpec} className="p-1 rounded-lg bg-[#004A7C] text-white text-sm hover:bg-[#00385d]">
                                        <PiPlus size={24} />
                                    </button>
                                </div>

                                <div className="space-y-3">
                                    {kategoriSpesifikasi.map((item) => (
                                        <div key={item.id_kategoriSpesifikasi || item.id_kategori} className="flex items-center justify-between gap-3 border border-gray-100 rounded-xl p-3 hover:bg-gray-50 transition">
                                            <div className="flex gap-2 items-center">
                                                <p className="font-medium text-gray-800 text-sm">{item.nama_kategori}</p>
                                                <span className={`inline-block px-2 py-0.5 rounded-md text-[10px] ${item.status === 'Aktif' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                                                    {item.status}
                                                </span>
                                            </div>
                                            <div className="flex border border-gray-300 h-8 rounded-lg" onClick={(e) => e.stopPropagation()}>
                                                <button onClick={() => deleteKategori(item.id_kategori)} className="px-2 py-1 rounded-l-lg hover:bg-gray-100"><MdDelete /></button>
                                                <button onClick={() => openEditKategoriSpec(item)} className="px-2 py-1 bg-[#004A7C] text-white text-xs hover:bg-[#003e68]">Edit</button>
                                                <button onClick={() => handleStatusKategori(item.id_kategori, item.status === 'Aktif' ? "Nonaktif" : "Aktif")} className="px-2 py-1 rounded-r-lg text-xs hover:bg-gray-50">
                                                    {item.status === 'Aktif' ? "Nonaktif" : 'Aktif'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>


            {/* </div > */}
            {isKategoriSpecModalOpen && (
                <div
                    className="fixed inset-0 z-[40] flex items-center justify-center bg-black/50 px-4"
                    onClick={() =>
                        setIsKategoriSpecModalOpen(false)
                    }
                >

                    <div
                        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6"
                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {/* HEADER */}

                        <div className="flex items-center justify-between mb-6">

                            <div>

                                <h2 className="text-lg font-semibold">
                                    {editKategoriSpec !== null
                                        ? "Edit Kategori spesifikasi"
                                        : "Tambah Kategori spesifikasi"}
                                </h2>

                                <p className="text-xs text-gray-500 mt-1">
                                    {editKategoriSpec !== null
                                        ? "Ubah nama kategori spesifikasi"
                                        : "Tambahkan kategori spesifikasi baru"}
                                </p>

                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setIsKategoriSpecModalOpen(false)
                                }
                                className="w-8 h-8 rounded-full hover:bg-gray-100"
                            >
                                ✕
                            </button>

                        </div>

                        {/* FORM */}

                        <form onSubmit={handleSpecKategori}>

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Kategori
                                </label>

                                <input
                                    type="text"
                                    name="nama_kategori"
                                    value={kategoriSpesifikasiForm.nama_kategori}
                                    onChange={handleKategoriSpecChange}
                                    placeholder="Contoh: Matic"
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#004A7C]"
                                    autoFocus
                                />

                            </div>

                            {/* BUTTON */}

                            <div className="flex justify-end gap-3 mt-6">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsKategoriSpecModalOpen(false)
                                    }
                                    className="px-4 py-2 rounded-lg border border-gray-200 text-sm"
                                >
                                    Batal
                                </button>

                                <button
                                    type="submit"
                                    className="px-5 py-2 rounded-lg bg-[#004A7C] text-white text-sm"
                                >
                                    {editKategoriSpec !== null
                                        ? "Simpan Perubahan"
                                        : "Tambah Kategori"}
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

            {
                isTipeModalOpen && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
                        onClick={() => setIsTipeModalOpen(false)}
                    >

                        <div
                            className="w-full max-w-md bg-white rounded-2xl p-6"
                            onClick={(e) => e.stopPropagation()}
                        >

                            <h2 className="text-lg font-semibold">
                                {editTipe ? "Edit Tipe" : "Tambah Tipe"}
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                {editTipe
                                    ? "Ubah data tipe motor"
                                    : "Tambahkan tipe motor baru"
                                }
                            </p>


                            <div className="mt-5">

                                <label className="text-sm font-medium">
                                    Kategori
                                </label>

                                <select
                                    value={tipeForm.id_kategori}
                                    onChange={(e) =>
                                        setTipeForm({
                                            ...tipeForm,
                                            id_kategori: e.target.value
                                        })
                                    }
                                    className="w-full mt-1 border rounded-xl px-3 py-2"
                                >

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


                            <div className="mt-4">

                                <label className="text-sm font-medium">
                                    Nama Tipe
                                </label>

                                <input
                                    type="text"
                                    value={tipeForm.nama_tipe}
                                    onChange={(e) =>
                                        setTipeForm({
                                            ...tipeForm,
                                            nama_tipe: e.target.value
                                        })
                                    }
                                    placeholder="Contoh: Beat"
                                    className="w-full mt-1 border rounded-xl px-3 py-2"
                                />

                            </div>


                            <div className="flex justify-end gap-3 mt-6">

                                <button
                                    onClick={() => setIsTipeModalOpen(false)}
                                    className="px-4 py-2 rounded-xl border"
                                >
                                    Batal
                                </button>

                                <button
                                    onClick={handleSubmitTipe}
                                    className="px-4 py-2 rounded-xl bg-[#002446] text-white"
                                >
                                    {editTipe ? "Simpan" : "Tambah"}
                                </button>

                            </div>

                        </div>

                    </div>
                )
            }

            {
                isKategoriModalOpen && (

                    <div
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4"
                        onClick={() =>
                            setIsKategoriModalOpen(false)
                        }
                    >

                        <div
                            className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6"
                            onClick={(e) =>
                                e.stopPropagation()
                            }
                        >

                            {/* HEADER */}

                            <div className="flex items-center justify-between mb-6">

                                <div>

                                    <h2 className="text-lg font-semibold">
                                        {editKategori !== null
                                            ? "Edit Kategori"
                                            : "Tambah Kategori"}
                                    </h2>

                                    <p className="text-xs text-gray-500 mt-1">
                                        {editKategori !== null
                                            ? "Ubah nama kategori"
                                            : "Tambahkan kategori baru"}
                                    </p>

                                </div>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setIskategoriModalOpen(false)
                                    }
                                    className="w-8 h-8 rounded-full hover:bg-gray-100"
                                >
                                    ✕
                                </button>

                            </div>

                            {/* FORM */}

                            <form onSubmit={handleSubmitKategori}>

                                <div>

                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nama Kategori
                                    </label>

                                    <input
                                        type="text"
                                        name="nama_kategori"
                                        value={kategoriForm.nama_kategori}
                                        onChange={handleEditKategori}
                                        placeholder="Contoh: Matic"
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl outline-none focus:border-[#004A7C]"
                                        autoFocus
                                    />

                                </div>

                                {/* BUTTON */}

                                <div className="flex justify-end gap-3 mt-6">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIskategoriModalOpen(false)
                                        }
                                        className="px-4 py-2 rounded-lg border border-gray-200 text-sm"
                                    >
                                        Batal
                                    </button>

                                    <button
                                        type="submit"
                                        className="px-5 py-2 rounded-lg bg-[#004A7C] text-white text-sm"
                                    >
                                        {editKategori !== null
                                            ? "Simpan Perubahan"
                                            : "Tambah Kategori"}
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                )
            }



        </>
    )
}