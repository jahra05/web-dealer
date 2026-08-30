import { defaultEasing } from "framer-motion"
import AdminNavbar from "../../components/AdminNavbar"
import NavTop from "../../components/NavTop"
import { BiExport, BiSearch } from "react-icons/bi"
import { PiPlus } from "react-icons/pi"
import { CiFileOn } from "react-icons/ci"
import { MdDelete, MdNotificationsNone } from "react-icons/md"
import { FaEdit } from "react-icons/fa"
import { useEffect, useMemo, useState } from "react"
import CustomAlert from "../../components/CustomAlert"
import ConfirmAlert from "../../components/ConfirmAlert"
import { TbTrash } from "react-icons/tb"
import { exportExcel } from "../../utils/export/exportExcel"
import { RxHamburgerMenu } from "react-icons/rx"
import UserMenuDropdwn from "../../components/UserMenuDropdown"
import Notifikasi from "../../components/Notifikasi"

const PengajuanKredit = () => {
    const [page, setPage] = useState(1)
    const [pengajuan, setPengajuan] = useState([])
    const [selectStatus, setSelectStatus] = useState("")
    console.log("isi dari set status".selectStatus)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const rowsPerPage = 5
    const [alert, setAlert] = useState(null)
    const [confirm, setConfirm] = useState(null)

    const handleDelete = async (id) => {
        setConfirm({
            title: 'Hapus Pengajuan',
            message: 'Yakin ingin menghapus pengajuan ini?',
            onConfirm: async () => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pengajuan/${id}`, { method: 'DELETE' })
                    const data = await response.json()
                    if (data.success) {
                        getPengajuan()
                        setAlert({ type: 'success', message: data.message || 'Pengajuan berhasil dihapus' })
                    } else {
                        setAlert({ type: 'error', message: data.message })
                    }
                } catch (error) {
                    console.log(error)
                    setAlert({ type: 'error', message: 'Terjadi kesalahan saat menghapus' })
                } finally {
                    setConfirm(null)
                }
            },
            onCancel: () => setConfirm(null)
        })
    }
    const updateStatus = async (id, status) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/pengajuan/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        status
                    })
                }
            );
            const data = await response.json();
            if (data.success) {
                setAlert({ type: 'success', message: data.message || 'Status berhasil diubah' })
                getPengajuan()

            } else {
                setAlert({ type: 'error', message: data.message })
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getPengajuan = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/pengajuan`);
            const data = await response.json();

            console.log(data);

            if (data.success) {
                setPengajuan(data.data);
            }

        } catch (error) {
            console.log(error);
        }
    }

    const handleExportPengajuan = () => {
        exportExcel({
            data: pengajuan,
            fileName: 'Data pengajuan kredit',
            columns: [
                { label: "Nama", key: 'nama' },
                { label: "No Headphone", key: 'no_hp' },
                { label: "Alamat", key: 'alamat' },
                { label: "pekerjaan", key: 'pekerjaan' },
                { label: "Nama motor", key: 'nama_motor' },
                { label: "Status", key: 'status' },
            ]
        })
    }

    const statusOptions = [...new Set(pengajuan.map((item) => item.status))];

    const filter = pengajuan.filter((item) => {
        return (
            selectStatus === "" || item.status === selectStatus
        )
    })

    const totalPages = Math.max(1, Math.ceil(filter.length / rowsPerPage))
    const pageItems = filter.slice((page - 1) * rowsPerPage, page * rowsPerPage)

    useEffect(() => {
        getPengajuan()

    }, [])

    useEffect(() => {
        if (page > totalPages) setPage(totalPages)
    }, [page, totalPages])

    return (
        <div className="min-h-screen w-full flex bg-gray-50 overflow-x-hidden">
            <AdminNavbar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="flex-1 min-w-0 flex flex-col bg-gray-50 overflow-x-hidden">
                {alert && <CustomAlert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
                {confirm && <ConfirmAlert title={confirm.title} message={confirm.message} onConfirm={confirm.onConfirm} onCancel={confirm.onCancel} />}
                <div className="fixed top-0 right-0 left-0 lg:left-64 z-40 bg-gray-50 border-b border-gray-100">
                    <div className="flex items-center justify-between gap-3 p-4">

                        <div className="flex items-center gap-4 w-full sm:w-auto">

                            <button
                                className="lg:hidden flex-shrink-0 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                onClick={() => setIsSidebarOpen(prev => !prev)}
                            >
                                <RxHamburgerMenu size={24} />
                            </button>



                        </div>

                        <div className="flex items-center gap-2">
                            <UserMenuDropdwn />
                            <Notifikasi />
                        </div>

                    </div>
                </div>
                <main className="flex-1 px-4 pb-6 overflow-x-hidden mt-24">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-4">
                        <div>
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Pengajuan Kredit</h1>
                            <p className="text-sm text-gray-500 mt-1">Kelola semua pengajuan kredit pelanggan.</p>
                        </div>

                        <div className="flex flex-row items-center sm:flex-row gap-3  sm:items-center">
                            <div className="flex gap-2 w-full sm:w-auto">
                                <select
                                    value={selectStatus}
                                    onChange={(e) => setSelectStatus(e.target.value)}
                                    className="w-full sm:w-56 lg:w-72 h-10 px-4 rounded-full bg-white border border-blue-100 text-sm"
                                >
                                    <option value="">Semua Status</option>

                                    {statusOptions.map((status) => (
                                        <option
                                            key={status}
                                            value={status}
                                        >
                                            {status}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='flex gap-2 mt-2 sm:mt-0'>
                                <button onClick={handleExportPengajuan} className='inline-flex items-center gap-2 h-10 px-4 rounded-full bg-white border border-blue-100 text-slate-700 shadow-sm transition hover:shadow-md hover:border-blue-300  text-sm'>
                                    <CiFileOn size={18} />
                                    <span className="text-xs">Export</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 hidden md:block">
                        <div className="px-4 lg:px-6 py-4 bg-[#004A7C] ">
                            <p className="text-xl font-semibold text-white">Pengajuan Kredit</p>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-[800px] w-full">
                                <thead className="bg-white">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Nama Pemohon</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">No Handphone</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Motor</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Harga</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Alamat</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">pekerjaan</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {pageItems.map((item) => (
                                        <tr key={item.id_pengajuan} className="transition hover:bg-slate-50">
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.nama}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.no_hp}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.nama_motor}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">Rp. {Number(item.harga).toLocaleString('id-ID')}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.alamat}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.pekerjaan}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">
                                                <select value={item.status}
                                                    onChange={(e) => updateStatus(
                                                        item.id_pengajuan,
                                                        e.target.value
                                                    )}
                                                    className="border border-[#002446] rounded-lg px-2 py-1"
                                                >
                                                    <option value="Menunggu">Menunggu</option>
                                                    <option value="Disetujui">Disetujui</option>
                                                    <option value="Ditolak">Ditolak</option>
                                                </select>
                                            </td>
                                            <td className="px-4 py-4 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => handleDelete(item.id_pengajuan)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
                                                        <MdDelete />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </table>
                        </div>
                        <div className="px-4 lg:px-6 py-3 flex flex-wrap items-center justify-end gap-3">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition ${page === 1 ? 'text-slate-400 bg-slate-100 cursor-not-allowed' : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50'}`}>
                                Prev</button>
                            <span className="text-sm text-slate-600">Halaman {page} / {totalPages}</span>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition ${page === totalPages ? 'text-slate-400 bg-slate-100 cursor-not-allowed' : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50'}`}>
                                Next
                            </button>
                        </div>
                    </div>

                    {/* mobile */}
                    <div className="md:hidden space-y-4 bg-white p-4 rounded-xl">
                        {/* <div className="px-4 lg:px-6 py-4 bg-[#004A7C]  rounded-xl">
                            <p className="text-xl font-semibold text-white">Pengajuan Kredit</p>
                        </div> */}
                        {pageItems.map((item) => (
                            <div className="bg-white shadow p-4 rounded-xl">
                                <div className="flex justify-between">
                                    <div className="flex gap-2">
                                        <p className="bg-blue-100 text-blue-500 w-14 h-14 text-center py-3 text-2xl uppercase font-medium rounded-xl">{item.nama.charAt(0).toUpperCase()}</p>
                                        <div>
                                            <p className="text-sm text-gray-700 font-semibold">{item.nama}</p>
                                            <p className="text-sm text-gray-500 font-medium">{item.no_hp}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <select value={item.status}
                                            onChange={(e) => updateStatus(
                                                item.id_pengajuan,
                                                e.target.value
                                            )}
                                            className="border rounded-lg px-2 py-1 text-sm"
                                        >
                                            <option value="Menunggu">Menunggu</option>
                                            <option value="Disetujui">Disetujui</option>
                                            <option value="Ditolak">Ditolak</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <div className="flex justify-between items-center mb-2 py-2 border-b">
                                        <p className="text-sm text-gray-600">Motor</p>
                                        <p className="text-sm font-medium">{item.nama_motor}</p>
                                    </div>

                                    <div className="flex justify-between items-center mb-2 py-2 border-b">
                                        <p className="text-sm text-gray-600">Harga Motor</p>
                                        <p className="text-sm font-medium">Rp. {Number(item.harga).toLocaleString('id-ID')}</p>
                                    </div>

                                    <div className="flex justify-between items-center mb-2 py-2 border-b">
                                        <p className="text-sm text-gray-600">Alamat</p>
                                        <p className="text-sm font-medium">{item.alamat}</p>
                                    </div>
                                    <div className="flex justify-between items-center mb-2 py-2 border-b">
                                        <p className="text-sm text-gray-600">Pekerjaan</p>
                                        <p className="text-sm font-medium">{item.pekerjaan}</p>
                                    </div>
                                    <button onClick={() => handleDelete(item.id_pengajuan)} className="inline-flex mt-3 w-full h-10 flex-1 items-center justify-center text-sm  bg-[#004A7C] text-white rounded-md transition hover:bg-[#00345F]">
                                        <span className="mr-2">Hapus</span><MdDelete />
                                    </button>
                                </div>

                            </div>
                        ))}
                        <div className="px-4 lg:px-6 py-3 flex flex-wrap items-center justify-end gap-3">
                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition ${page === 1 ? 'text-slate-400 bg-slate-100 cursor-not-allowed' : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50'}`}>
                                Prev</button>
                            <span className="text-sm text-slate-600">Halaman {page} / {totalPages}</span>
                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className={`inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition ${page === totalPages ? 'text-slate-400 bg-slate-100 cursor-not-allowed' : 'text-slate-700 bg-white border border-slate-200 hover:bg-slate-50'}`}>
                                Next
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>

    )
}

export default PengajuanKredit