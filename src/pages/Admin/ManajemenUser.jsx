import { defaultEasing } from "framer-motion"
import AdminNavbar from "../../components/AdminNavbar"
import NavTop from "../../components/NavTop"
import { BiArrowBack, BiExport, BiSearch } from "react-icons/bi"
import { PiPlus } from "react-icons/pi"
import { CiFileOn } from "react-icons/ci"
import { MdDelete, MdNotificationsNone } from "react-icons/md"
import { FaEdit, FaMotorcycle } from "react-icons/fa"
import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import UserMenuDropdwn from "../../components/UserMenuDropdown"
import { RxHamburgerMenu } from "react-icons/rx"

const ManajemenUser = () => {
    const [page, setPage] = useState(1)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const rowsPerPage = 5
    const navigate = useNavigate()

    const manajUser = useMemo(() => Array.from({ length: 13 }).map((_, i) => ({
        id: i + 1,
        name: 'jahra',
        email: 'jahra@ga',
        role: 'admin',
        status: 'aktif',
        iconEdit: <FaEdit size={16} />,
        iconDelet: <MdDelete size={16} />
    })), [])

    const totalPages = Math.max(1, Math.ceil(manajUser.length / rowsPerPage))
    const pageItems = manajUser.slice((page - 1) * rowsPerPage, page * rowsPerPage)

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
                            <input type="search" className="h-8 w-full outline-none rounded-full text-sm" placeholder="Search" />
                        </div>
                    </div>
                    <div className='flex items-center gap-2'>
                        <UserMenuDropdwn />
                    </div>
                </div>
                <main className="flex-1 px-4 pb-6 overflow-x-hidden">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-4">
                        <div>
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Manajemen User</h1>
                            <p className="text-sm text-gray-500 mt-1">Kelola pengguna sistem.</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className='flex gap-2'>
                                <button className='inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm transition hover:shadow-md hover:border-slate-300 hover:bg-slate-50 focus:ring-2 focus:ring-indigo-200'>
                                    <CiFileOn size={18} />
                                    <span className="text-xs">Export</span>
                                </button>
                                <button className='inline-flex items-center justify-center h-10 w-10 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm transition hover:shadow-md hover:border-slate-300 hover:bg-slate-50 focus:ring-2 focus:ring-indigo-200'>
                                    <PiPlus size={20} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
                        <div className="px-4 lg:px-6 py-4 bg-red-600">
                            <p className="text-sm font-semibold text-white">Daftar User</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-[500px] w-full">
                                <thead className="bg-white">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Nama</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Email</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Role</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {pageItems.map((item) => (
                                        <tr key={item.id} className="transition hover:bg-slate-50">
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.name}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.email}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.role}</td>
                                            <td className="px-4 py-4 text-sm">
                                                <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-emerald-700">{item.status}</span>
                                            </td>
                                            <td className="px-4 py-4 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
                                                        {item.iconEdit}
                                                    </button>
                                                    <button className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
                                                        {item.iconDelet}
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

export default ManajemenUser