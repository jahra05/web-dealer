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

const FaqAdmin = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [faq, setfaq] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [selected, setSelected] = useState(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const [formData, setFormData] = useState({
        pertanyaan: "",
        jawaban: "",
    });

    const rowsPerPage = 10;

    const handleEdit = (item) => {
        setIsEdit(true)
        setSelected(item.id_faq)

        setFormData({
            pertanyaan: item.pertanyaan,
            jawaban: item.jawaban
        })

        setIsModalOpen(true)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleCreateFaq = async (e) => {
        e.preventDefault();

        try {
            const url = isEdit ? `${import.meta.env.VITE_API_URL}/api/faq/${selected}` : `${import.meta.env.VITE_API_URL}0/api/faq`
            const method = isEdit ? "PUT" : "POST"

            const response = await fetch(url,
                {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData)
                }
            );

            const result = await response.json();

            if (result.success) {

                alert("FAQ berhasil ditambahkan");

                getFaq();

                setIsModalOpen(false);

                setFormData({
                    pertanyaan: "",
                    jawaban: "",
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
                `${import.meta.env.VITE_API_URL}/api/faq/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (data.success) {
                getFaq();
            }

        } catch (error) {
            console.log(error);
        }

    }

    const getFaq = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/faq`);
            const data = await response.json();

            if (data.success) {
                setfaq(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getFaq();
    }, []);

    const filteredData = faq.filter((item) =>
        item.pertanyaan.toLowerCase().includes(search.toLowerCase())
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
                        <UserMenuDropdwn />
                    </div>
                </div>
                <main className="flex-1 px-4 pb-6 overflow-x-hidden">
                    <div className="mb-4">
                        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">FAQ</h1>
                        <p className="text-sm text-gray-500 mt-1">Kelola FAQ dan pertanyaan pelanggan.</p>
                    </div>
                    <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 hidden md:block">
                        <div className="px-4 lg:px-6 py-4 bg-red-600 flex justify-between items-center">
                            <p className="text-sm font-semibold text-white">Daftar FAQ</p>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(true)}
                                className='inline-flex items-center justify-center h-10 w-10 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm transition hover:shadow-md hover:border-slate-300 hover:bg-slate-50 focus:ring-2 focus:ring-indigo-200'>
                                <PiPlus size={20} />
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-[500px] w-full">
                                <thead className="bg-white">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">pertanyaan</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">jawaban</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {pageItems.map((item) => (
                                        <tr key={item.id_faq} className="transition hover:bg-slate-50">
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.pertanyaan}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.jawaban}</td>
                                            <td className="px-4 py-4 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => handleDelete(item.id_faq)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
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
                            <div className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
                                <form onSubmit={handleCreateFaq}>
                                    {/* Header */}
                                    <div className="px-6 py-5 border-b border-gray-100">
                                        <div className="flex items-start justify-between gap-4">
                                            <div>
                                                <h2 className="text-lg font-bold text-gray-900">{isEdit ? 'Edit FAQ' : 'Tambah FAQ'}</h2>
                                                <p className="mt-0.5 text-sm text-gray-500">Kelola data pertanyaan dan jawaban.</p>
                                            </div>
                                            <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">✕</button>
                                        </div>
                                    </div>
                                    {/* Body */}
                                    <div className="px-6 py-5 space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Pertanyaan</label>
                                            <textarea name="pertanyaan" value={formData.pertanyaan} onChange={handleChange} placeholder="Tulis pertanyaan"
                                                className="w-full h-32 rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100 resize-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Jawaban</label>
                                            <textarea name="jawaban" value={formData.jawaban} onChange={handleChange} placeholder="Tulis jawaban"
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

                    {/* mobile */}
                    <div className="md:hidden space-y-4 bg-white p-4 rounded-xl">
                        <div className="px-4 lg:px-6 py-4 bg-red-600 flex justify-between  items-center rounded-xl">
                            <p className="text-sm font-semibold text-white">Daftar FAQ</p>
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(true)}
                                className='inline-flex items-center justify-center h-10 w-10 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm transition hover:shadow-md hover:border-slate-300 hover:bg-slate-50 focus:ring-2 focus:ring-indigo-200'>
                                <PiPlus size={20} />
                            </button>
                        </div>
                        {pageItems.map((item) => (
                            <div className="bg-white shadow p-4 rounded-xl">
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleDelete(item.id_faq)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
                                        <MdDelete />
                                    </button>
                                    <button onClick={() => handleEdit(item)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
                                        <FaEdit />
                                    </button>
                                </div>

                                <div className="mt-6">
                                    <div className=" items-center mb-2">
                                        <p className="text-sm text-gray-600 mb-2">Pertanyaan</p>
                                        <p className="text-sm font-medium">{item.pertanyaan}</p>
                                    </div>

                                    <div className="items-center mb-2">
                                        <p className="text-sm text-gray-600 mb-2">Jawaban</p>
                                        <p className="text-sm font-medium">{item.jawaban}</p>
                                    </div>
                                </div>

                            </div>
                        ))}
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
                </main>


            </div>
        </div>
    )
}

export default FaqAdmin