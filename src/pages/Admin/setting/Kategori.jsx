import { RxHamburgerMenu } from "react-icons/rx";
import Setting from "./Setting";
import { useEffect, useState } from "react";
import ConfirmAlert from "../../../components/ConfirmAlert";
import CustomAlert from "../../../components/CustomAlert";
import { PiPlus } from "react-icons/pi";

export default function Kategori() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [kategori, setKategori] = useState([])
    const [tipe, setTipe] = useState([])
    const [kategoriForm, setKategoriForm] = useState({
        nama_kategori: ""
    })
    const [tipeForm, setTipeForm] = useState({ nama_tipe: "", id_kategori: "" })
    const [isKategoriModalOpen, setIskategoriModalOpen] = useState(false)
    const [isTipeModalOpen, setIsTipeModalOpen] = useState(false)
    const [editKategori, setEditKategori] = useState(null)
    const [editTipe, setEditTipe] = useState(null)
    const [selectKategori, setSelectKategori] = useState(null)
    const [alert, setAlert] = useState(null)
    const [page, setPage] = useState(1)
    const rowsPerPage = 5

    const [pageKategori, setPageKategori] = useState(1)
    const rowsPerPageKategori = 5

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

    const openAddTipe = () => {
        if (!selectKategori) {
            alert("pilih ktegori trlebih dahulu")
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

    const handleEditKategori = (e) => {
        const { name, value } = e.target;

        setKategoriForm((prev) => ({
            ...prev, [name]: value
        }))
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
                ? `${import.meta.env.VITE_API_URL}/api/tipe/${editTipe}`
                : `${import.meta.env.VITE_API_URL}/api/tipe`;

            const response = await fetch(url, {
                method: isEdit ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",

                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(tipeForm)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'gagal menyimpan tipe');
            }
            setAlert({
                type: 'error',
                message: data.message
            })

            setIsTipeModalOpen(false)

            setTipeForm({
                nama_kategori: ""
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
                ? `${import.meta.env.VITE_API_URL}/api/kategori/${editKategori}`
                : `${import.meta.env.VITE_API_URL}/api/kategori`;

            const response = await fetch(url, {
                method: isEdit ? "PUT" : "POST",
                headers: {
                    "Content-Type": "application/json",

                    // kalau verifyToken membaca token dari Authorization
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(kategoriForm)
            });

            const data = await response.json();
            if (data.success) {
                setAlert({
                    type: 'success',
                    message: "Status Tipe Berhasil diubah"
                })
            }

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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/kategori/${id}/status`,
                {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
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
                message: error || "Gagal mengubah Status Kategori"
            })
        }

    }

    const handleStatusTipe = async (id, status) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/tipe/${id}/status`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({ status })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Gagal mengubah status"
                );
            }

            await getTipe();

            setAlert({
                type: "success",
                message: data.message || "Status tipe berhasil diubah"
            });

        } catch (error) {
            console.error(error);

            setAlert({
                type: "error",
                message: error.message || "Gagal mengubah status tipe"
            });
        }
    };
    const getKategori = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/kategori`)

            const data = await response.json();

            console.log("data kategori".data)

            if (data.success) {
                setKategori(data.data)

            }
        } catch (error) {
            setAlert({
                type: "error",
                message: error
            })
        }
    }
    const getTipe = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tipe`)
            const data = await response.json();
            console.log(data)

            if (data.success) {
                setTipe(data.data)
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getKategori(),
            getTipe()
    }, [])

    return (
        <>
            {alert && (
                <CustomAlert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
            )}
            <div className="min-h-screen w-full flex gap-2 bg-gray-50 overflow-x-hidden">
                <Setting isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <div className="flex-1 min-w-0 flex flex-col bg-gray-50 overflow-x-hidden">
                    <div className="flex items-center justify-between px-0 py-4">
                        <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors bg-white shadow-sm"
                            onClick={() => setIsSidebarOpen(prev => !prev)}>
                            <RxHamburgerMenu size={24} />
                        </button>
                    </div>
                    <div className="flex flex-col md:flex-row gap-6 bg-white p-4 rounded-xl">
                        <div className="bg-white shadow p-4 rounded-xl w-full">
                            <div className="mb-6 border-b pt-4 pb-4 flex justify-between items-center">
                                <div>
                                    <p className="text-lg font-medium">Kategori</p>
                                    <p className="text-xs text-gray-600">Kelola Kategori produk</p>
                                </div>
                                <button onClick={openAddKategori} className="p-1 rounded-lg bg-[#004A7C] text-white text-sm hover:[#00385d]"><PiPlus size={24} /></button>
                            </div>

                            <div className="space-y-3">
                                {pageKategoriItems.map((item) => (
                                    <div key={item.id_kategori} onClick={() => setSelectKategori(item)}
                                        className={`cursor-pointer flex items-center justify-between gap-3 border rounded-xl p-4 transition ${selectKategori?.id_kategori === item.id_kategori ? "border-[#004A7C] bg-blue-50" : "border-gray-100 hover:bg-gray-50"}`}
                                    >
                                        <div className="flex gap-4 items-center">
                                            <p className="font-medium text-gray-800 text-sm">{item.nama_kategori}</p>
                                            <span className={`inline-block mt-1 px-2 py-1 rounded-md text-[10px] ${item.status === 'Aktif' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                                                {item.status}
                                            </span>
                                        </div>
                                        <div className="flex border border-gray-300 h-8 rounded-lg " onClick={(e) => e.stopPropagation()}>
                                            <button onClick={() => openEditKategori(item)} className="px-2 py-1  bg-[#004A7C] text-white text-xs  hover:bg-[#003e68] rounded-tl-lg rounded-bl-lg">
                                                Edit
                                            </button>
                                            <button onClick={() => handleStatusKategori(item.id_kategori, item.status === 'Aktif' ? "Nonaktif" : "Aktif")} className="px-2 py-1 rounded-tr-lg rounded-br-lg   text-xs hover:bg-gray-50" >
                                                {item.status === 'Aktif' ? "Nonaktif" : 'Aktif'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="px-6 py-3 flex flex-wrap items-center justify-end gap-3">
                                <button
                                    onClick={() => setPageKategori((p) => Math.max(1, p - 1))}
                                    disabled={pageKategori === 1}
                                    className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition ${pageKategori === 1 ? 'text-slate-400 bg-slate-100' : 'text-slate-700 bg-white border border-slate-200'}`}>
                                    Prev
                                </button>
                                <span className="text-sm text-slate-600">Halaman {pageKategori} / {totalPageKategori}</span>
                                <button
                                    onClick={() => setPageKategori((p) => Math.min(totalPageKategori, p + 1))}
                                    disabled={pageKategori === totalPageKategori}
                                    className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition ${pageKategori === totalPageKategori ? 'text-slate-400 bg-slate-100' : 'text-slate-700 bg-white border border-slate-200'}`}>
                                    Next
                                </button>
                            </div>
                        </div>

                        <div className="bg-white shadow p-4 rounded-xl w-full flex flex-col justify-between">

                            <div>
                                <div className="mb-4 border-b py-4">
                                    <p className="text-lg font-medium">Tipe Motor</p>
                                    <p className="text-xs text-gray-600">
                                        Kelola tipe berdasarkan kategori
                                    </p>
                                </div>

                                {!selectKategori ? (

                                    <div className="flex items-center justify-center py-20">
                                        <p className="text-sm text-gray-500">
                                            Pilih kategori terlebih dahulu
                                        </p>
                                    </div>

                                ) : (
                                    <>

                                        {/* Header tipe */}
                                        <div className="flex items-center justify-between mb-5">

                                            <div>
                                                <h2 className="text-lg font-semibold">
                                                    {selectKategori.nama_kategori}
                                                </h2>

                                                <p className="text-sm text-gray-500">
                                                    Daftar tipe motor
                                                </p>
                                            </div>

                                            <button
                                                onClick={openAddTipe}
                                                className="p-1 rounded-lg bg-[#004A7C] text-white text-sm hover:bg-[#00385d]"
                                            >
                                                <PiPlus size={24} />
                                            </button>
                                        </div>

                                        {/* Daftar tipe */}
                                        <div className="space-y-3">

                                            {pageItems.length === 0 ? (

                                                <div className="text-center py-10">

                                                    <p className="text-sm text-gray-500 mb-3">
                                                        Belum ada tipe untuk kategori ini
                                                    </p>
                                                </div>

                                            ) : (

                                                pageItems.map((item) => (

                                                    <div
                                                        key={item.id_tipe}
                                                        className="flex items-center justify-between border border-gray-100 rounded-xl p-3 hover:bg-gray-50"
                                                    >

                                                        <div className="">
                                                            <div className="flex gap-4 items-center">
                                                                <p className="font-medium text-gray-800 text-sm">
                                                                    {item.nama_tipe}
                                                                </p>
                                                                <span className={`inline-block mt-1  px-2 py-1  rounded-md text-[10px] ${item.status === 'Aktif' ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
                                                                    {item.status}
                                                                </span>
                                                            </div>

                                                            <p className="text-xs text-gray-500">
                                                                {item.nama_kategori}
                                                            </p>
                                                        </div>
                                                        <div className="flex border border-gray-300 h-8 rounded-lg " onClick={(e) => e.stopPropagation()}>
                                                            <button onClick={() => openEditTipe(item)} className="px-2 py-1  bg-[#004A7C] text-white text-xs  hover:bg-[#003e68] rounded-tl-lg rounded-bl-lg ">
                                                                Edit
                                                            </button>
                                                            <button onClick={() => handleStatusTipe(item.id_tipe, item.status === 'Aktif' ? "Nonaktif" : "Aktif")} className="px-2 py-1 rounded-tr-lg rounded-br-lg   text-xs hover:bg-gray-50" >
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

                    </div>

                </div>
            </div >

            {isTipeModalOpen && (
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
            )}

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