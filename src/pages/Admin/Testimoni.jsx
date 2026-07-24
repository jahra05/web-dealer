import { defaultEasing } from "framer-motion"
import AdminNavbar from "../../components/AdminNavbar"
import NavTop from "../../components/NavTop"
import { BiExport, BiSearch } from "react-icons/bi"
import { PiPlus } from "react-icons/pi"
import { CiFileOn } from "react-icons/ci"
import { MdDelete, MdNotificationsNone } from "react-icons/md"
import { FaEdit } from "react-icons/fa"
import { useEffect, useMemo, useState } from "react"
import { RxHamburgerMenu } from "react-icons/rx"
import UserMenuDropdwn from "../../components/UserMenuDropdown"

const Testimoni = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [testimoni, setTestimoni] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [selected, setSelected] = useState(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const [formData, setFormData] = useState({
        nama: "",
        pekerjaan: "",
        isi_testimoni: "",
        rating: "",
        foto: null
    });

    const rowsPerPage = 5;

    const openModal = () => {
        setIsEdit(false);
        setSelected(null);

        setFormData({
            nama: "",
            pekerjaan: "",
            isi_testimoni: "",
            rating: "",
            foto: null
        });

        setIsModalOpen(true);
    };

    const handleEdit = (item) => {
        console.log(item);

        setIsEdit(true)
        setSelected(item.id_testimoni)

        setFormData({
            nama: item.nama,
            pekerjaan: item.pekerjaan,
            isi_testimoni: item.isi_testimoni,
            rating: item.rating,
            foto: null
        });
        setIsModalOpen(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            foto: e.target.files[0]
        }));
    };

    const handleCreateTestimoni = async (e) => {
        e.preventDefault();

        const url = isEdit
            ? `http://localhost:3000/api/testimoni/${selected}`
            : "http://localhost:3000/api/testimoni";

        const method = isEdit ? "PUT" : "POST";
        const data = new FormData();

        data.append("nama", formData.nama);
        data.append("pekerjaan", formData.pekerjaan);
        data.append("isi_testimoni", formData.isi_testimoni);
        data.append("rating", formData.rating);
        if (formData.foto) {
            data.append("foto", formData.foto);
        }

        try {

            const response = await fetch(
                url,
                {
                    method,
                    body: data
                }
            );

            const result = await response.json();

            if (result.success) {

                alert("Testimoni berhasil ditambahkan");

                getTestimoni();

                setIsModalOpen(false);

                setFormData({
                    nama: "",
                    pekerjaan: "",
                    isi_testimoni: "",
                    rating: "",
                    foto: null
                });

            } else {

                alert(result.message);

            }

        } catch (error) {

            console.log(error);

        }
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Yakin ingin menghapus testimoni?")) return;

        try {

            const response = await fetch(
                `http://localhost:3000/api/testimoni/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (data.success) {
                getTestimoni();
            }

        } catch (error) {
            console.log(error);
        }

    }

    const getTestimoni = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/testimoni");
            const data = await response.json();

            if (data.success) {
                setTestimoni(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTestimoni();
    }, []);

    const filteredData = testimoni.filter((item) =>
        item.nama.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.max(
        1,
        Math.ceil(filteredData.length / rowsPerPage)
    );

    const pageItems = filteredData.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );


    useEffect(() => {
        if (page > totalPages) setPage(totalPages)
    }, [page, totalPages])
    return (
        <div className="min-h-screen w-full flex bg-gray-50 overflow-x-hidden">
            <AdminNavbar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="flex-1 min-w-0 flex flex-col bg-gray-50 overflow-x-hidden">
                <div className='flex items-center justify-between p-4'>
                    <div className='flex items-center gap-4'>
                        <button className='lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors' onClick={() => setIsSidebarOpen(prev => !prev)} aria-label="Toggle sidebar">
                            <RxHamburgerMenu size={24} />
                        </button>
                        <div className="flex gap-2 bg-white border border-slate-200 w-full sm:w-64 lg:w-80 px-4 py-2 items-center rounded-full shadow-sm transition hover:shadow-md hover:border-slate-300">
                            <BiSearch size={20} />
                            <input
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="h-8 w-full outline-none rounded-full text-sm"
                                placeholder="Search"
                            />
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <button
                            onClick={() => setIsNotificationOpen(true)}
                            className='relative inline-flex items-center justify-center bg-gray-200 w-10 h-10 rounded-full hover:bg-gray-300 transition'
                        >
                            <MdNotificationsNone size={24} />
                            <span className='absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white font-bold'>10</span>
                        </button>
                        <UserMenuDropdwn />
                    </div>
                </div>
                <div className="flex-1 px-4 pb-6 overflow-x-hidden">
                    <div className="mb-4">
                        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Testimoni</h1>
                        <p className="text-sm text-gray-500 mt-1">Kelola data testimoni pelanggan.</p>
                    </div>
                    <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
                        <div className="px-4 lg:px-6 py-4 flex justify-between bg-red-600 items-center">
                            <p className="text-sm font-semibold text-white">Daftar Testimoni</p>
                            <button
                                type="button"
                                onClick={openModal}
                                className='inline-flex items-center justify-center h-10 w-10 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm transition hover:shadow-md hover:border-slate-300 hover:bg-slate-50 focus:ring-2 focus:ring-indigo-200'>
                                <PiPlus size={20} />
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full overflow-auto">
                                <thead className="bg-white">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Nama</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">pekerjaa</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">testimoni</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">rating</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">foto</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {pageItems.map((item) => (
                                        <tr key={item.id_testimoni} className="transition hover:bg-slate-50">
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.nama}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.pekerjaan}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.isi_testimoni}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.rating}</td>
                                            <td className="px-4 py-4">
                                                <img
                                                    src={`http://localhost:3000/uploads/${item.foto}`}
                                                    alt={item.nama}
                                                    className="w-14 h-14 rounded-full object-cover"
                                                />
                                            </td>
                                            <td className="px-4 py-4 text-sm">
                                                <div className="flex items-center gap-2">

                                                    <button onClick={() => handleDelete(item.id_testimoni)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
                                                        <MdDelete />
                                                    </button>
                                                    <button onClick={() => handleEdit(item)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
                                                        <FaEdit />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="px-6 py-3 flex items-center justify-end gap-3">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition ${page === 1 ? 'text-slate-400 bg-slate-100' : 'text-slate-700 bg-white border border-slate-200'}`}>
                                Prev</button>
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
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6" onClick={() => setIsModalOpen(false)}>
                            <div className="w-full max-w-lg lg:max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
                                <form onSubmit={handleCreateTestimoni}>
                                    {/* Header */}
                                    <div className="px-6 py-5 border-b border-gray-100">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h2 className="text-lg font-bold text-gray-900">{isEdit ? 'Edit Testimoni' : 'Tambah Testimoni'}</h2>
                                                <p className="mt-0.5 text-sm text-gray-500">Kelola data testimoni pelanggan.</p>
                                            </div>
                                            <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">✕</button>
                                        </div>
                                    </div>
                                    {/* Body */}
                                    <div className="px-6 py-5 space-y-4">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                                                <input type="text" name="nama" value={formData.nama} onChange={handleChange} placeholder="Nama"
                                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Pekerjaan</label>
                                                <input type="text" name="pekerjaan" value={formData.pekerjaan} onChange={handleChange} placeholder="Pekerjaan"
                                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                                <select name="rating" value={formData.rating} onChange={handleChange}
                                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100">
                                                    <option value="">Pilih Rating</option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Foto</label>
                                                <input type="file" accept="image/*" onChange={handleFileChange}
                                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-red-50 file:text-red-600 hover:file:bg-red-100" />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Isi Testimoni</label>
                                            <textarea name="isi_testimoni" value={formData.isi_testimoni} onChange={handleChange} placeholder="Isi Testimoni"
                                                className="w-full h-32 rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100 resize-none" />
                                        </div>
                                    </div>
                                    {/* Footer */}
                                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-3xl">
                                        <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">Batal</button>
                                        <button type="submit" className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700">{isEdit ? 'Update' : 'Simpan'}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

            </div>
            </div>
        </div>

    )
}

export default Testimoni