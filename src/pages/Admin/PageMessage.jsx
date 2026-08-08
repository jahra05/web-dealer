import { defaultEasing } from "framer-motion"
import AdminNavbar from "../../components/AdminNavbar"
import NavTop from "../../components/NavTop"
import { BiExport, BiSearch } from "react-icons/bi"
import { PiPlus } from "react-icons/pi"
import { CiFileOn } from "react-icons/ci"
import { MdDelete, MdNotificationsNone } from "react-icons/md"
import { FaEdit } from "react-icons/fa"
import { useEffect, useMemo, useState } from "react"
import { CgRead } from "react-icons/cg"
import { RxHamburgerMenu } from "react-icons/rx"
import UserMenuDropdwn from "../../components/UserMenuDropdown"

const PageMessage = () => {
    const [page, setPage] = useState(1)
    const [contact, setContact] = useState([])
    const [search, setSearch] = useState("")
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const rowsPerPage = 5
    const [formData, setFormData] = useState({
        id_message: "",
        nama: "",
        email: "",
        no_hp: "",
        subjek: "",
        pesan: "",
        status: "",
    })

    const handleStatus = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/${id}/status`, {
                method: "PUT"
            }

            );

            const data = await response.json();

            if (data.success) {
                getContact()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm("yakin ingin mengapus pesan ini?")) return;

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/${id}`,
                {
                    method: "DELETE"
                }
            );
            const data = await response.json();

            if (data.success) {
                getContact();
            } else {

                alert(data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getContact = async () => {

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/contact`
            );

            const data = await response.json();

            console.log(data.data);
            if (data.success) {
                setContact(data.data);
            }

        } catch (error) {

            console.log(error);

        }

    };
    useEffect(() => {
        getContact()
    }, [])

    const filteredData = contact.filter((item) =>
        (item.nama || "").toLowerCase().includes((search || "").toLowerCase())
    );

    const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage))
    const pageItems = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage)

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
                        <div>
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Message</h1>
                            <p className="text-sm text-gray-500 mt-1">Kelola pesan dan pertanyaan dari pelanggan.</p>
                        </div>
                        <div className="flex gap-4 items-center justify-start">
                        </div>
                    </div>

                    <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
                        <div className="px-4 lg:px-6 py-4 bg-red-600">
                            <p className="text-sm font-semibold text-white">Daftar Message</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-[800px] w-full">
                                <thead className="bg-white">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">NO</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Nama</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Email</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">No Headphone</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Subjek</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Message</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Tanggal</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {pageItems.map((item, index) => (
                                        <tr key={item.id_contact} className="transition hover:bg-slate-50">
                                            <td className="px-4 py-4 text-sm text-slate-700">{(page - 1) * rowsPerPage + index + 1}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.nama}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.email}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.no_hp}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.subjek}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.pesan}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">
                                                {new Date(item.created_at).toLocaleDateString("id-ID")}
                                            </td>
                                            <td className="px-4 py-4 text-sm">

                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold
                                                         ${item.status === "Belum Dibaca"
                                                            ? "bg-red-100 text-red-600"
                                                            : "bg-green-100 text-green-600"
                                                        }`}
                                                >
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-sm">
                                                <div className="flex items-center gap-2">
                                                    {item.status === "Belum Dibaca" && (
                                                        <button
                                                            onClick={() => handleStatus(item.id_message)}
                                                            className="px-3 py-1 rounded bg-blue-500 text-white text-xs"
                                                        >
                                                            Dibaca
                                                        </button>
                                                    )}
                                                    <button onClick={() => handleDelete(item.id_message)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
                                                        <MdDelete />
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

                </main>
            </div>
        </div>

    )
}

export default PageMessage