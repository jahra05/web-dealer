import { RxHamburgerMenu } from "react-icons/rx";
import Setting from "./Setting";
import { useEffect, useState } from "react";

export default function DataMaster() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [kategori, setKategori] = useState([])
    const [tipe, setTipe] = useState([])
    const [kategoriForm, setKategoriForm] = useState({
        nama_kategori: ""
    })
    const [isKategoriModalOpen, setIskategoriModalOpen] = useState(false)
    const [editKategori, setEditKategori] = useState(null)

    const openAddKategori = () => {
        setEditKategori(null)

        setKategoriForm({
            nama_kategori: ""
        })
        setIskategoriModalOpen(true)
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



    const handleSubmitKategori = async (e) => {
        e.preventDefault();

        if (!kategoriForm.nama_kategori.trim()) {
            alert("Nama kategori wajib disis")
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

            if (!response.ok) {
                throw new Error(data.message || 'gagal menyimpan kategori');
            }
            alert(data.message)

            setIskategoriModalOpen(false)

            setKategoriForm({
                nama_kategori: ""
            })

            setEditKategori(null)

            await getKategori()

        } catch (error) {
            console.error("ERRO KATEGORI", error)

            alert(error.message || "terjadi kesalaahan")
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
            if (!response.ok) {
                throw new Error(
                    data.message || "gagal mengubah status"
                )
            }

            await getKategori()

        } catch (error) {
            console.error(error)
        }
        alert(
            "gagal mengubah status kategori"
        )
    }

    const getKategori = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/kategori`)

            const data = await response.json();

            console.log("data kategori".data)

            if (data.success) {
                setKategori(data.data)

            }
        } catch (error) {
            console.log(error)
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
            <div className="min-h-screen w-full flex gap-2 bg-gray-50 overflow-x-hidden">
                <Setting isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <div className="flex-1 min-w-0 flex flex-col bg-gray-50 overflow-x-hidden">
                    <div className="flex items-center justify-between px-0 py-4">
                        <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors bg-white shadow-sm"
                            onClick={() => setIsSidebarOpen(prev => !prev)}>
                            <RxHamburgerMenu size={24} />
                        </button>
                    </div>

                    <div className="bg-white p-4 rounded-xl w-full mb-4">
                        <div className="mb-4 border-b py-4">
                            <p className="text-lg font-medium">Data Master</p>
                            <p className="text-xs text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa, accusantium?</p>
                        </div>

                        <div className="shadow p-4 rounded-xl">
                            <div className="flex items-center justify-between mb-5" >
                                <div>
                                    <h2 className="text-lg font-semibold">Kategori</h2>
                                    <p>kelola kategori produk</p>
                                </div>
                                <button className="px-4 py-2 rounded-lg bg-[#004A7C] text-white text-sm hover:bg-[#00385d]" onClick={openAddKategori}>
                                    + tambah kategori
                                </button>
                            </div>
                            <div className="space-y">
                                {kategori.map((item) => (
                                    <div key={item.id_kategori} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-gray-100 rounded-xl p-4">
                                        <div>
                                            <p className="font-medium text-gray-800">
                                                {item.nama_kategori}
                                            </p>
                                            <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs ${item.status === 'Aktif' ? "bg-green-100 text-gray-600" : "bg-red-100 text-red-600"}`}>
                                                {item.status}
                                            </span>
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={() => openEditKategori(item)} className="px-3 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50">Edit</button>
                                            <button onClick={() => handleStatusKategori(item.id_kategori, item.status === 'Aktif' ? "Nonaktif" : "Aktif")} className={`px-3 py-2 rounded-lg text-sm ${item.status === "Aktif"
                                                ? "bg-red-50 text-red-600 hover:bg-red-100"
                                                : "bg-green-50 text-green-600 hover:bg-green-100"
                                                }`}>{item.status === 'Aktif' ? "Nonaktif" : 'Aktifkan'}</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isKategoriModalOpen && (

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
                                    setIsKategoriModalOpen(false)
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
                                        setIsKategoriModalOpen(false)
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

            )}



        </>
    )
}