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
import { CgRead } from "react-icons/cg"
import { RxHamburgerMenu } from "react-icons/rx"
import UserMenuDropdwn from "../../components/UserMenuDropdown"
import Notifikasi from "../../components/Notifikasi"
import { motion } from 'framer-motion'
import Table from "../../components/Table"
import { getFunctionUrl, getSupabaseHeaders, } from "../../config/supabase";


const PageMessage = () => {
    const [page, setPage] = useState(1)
    const [contact, setContact] = useState([])
    const [search, setSearch] = useState("")
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const rowsPerPage = 5
    const [alert, setAlert] = useState(null)
    const [confirm, setConfirm] = useState(null)
    const [formData, setFormData] = useState({
        id_message: "",
        nama: "",
        email: "",
        no_hp: "",
        subjek: "",
        pesan: "",
        status: "",
    })

    const colunms = [
        { key: 'nama', label: 'Nama' },
        { key: 'emial', label: 'Nama' },
        { key: 'no_hp', label: 'Nama' },
        { key: 'subjek', label: 'Nama' },
        { key: 'pesan', label: 'Nama' },
        { key: 'tanggal', label: 'Tanggal', render: (item) => new Date(item.created_at).toLocaleDateString("id-ID") },
        { key: 'status', label: 'Status' },
    ]

    const handleStatus = async (id) => {
        try {
            const response = await fetch(
                getFunctionUrl(`contact/${id}/status`),
                {
                    method: "PUT",
                    headers: {
                        ...getSupabaseHeaders(),
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Gagal mengubah status");
            }

            if (data.success) {
                await getContact();

                setAlert({
                    type: "success",
                    message: data.message || "Pesan berhasil ditandai sudah dibaca"
                });
            }

        } catch (error) {

            setAlert({
                type: "error",
                message: error.message || "Gagal mengubah status pesan"
            });
        }
    };
    const handleDelete = async (id) => {
        setConfirm({
            title: 'Hapus Pesan',
            message: 'Yakin ingin menghapus pesan ini?',
            onConfirm: async () => {
                try {
                    const response = await fetch(getFunctionUrl(`contact/${id}`), {
                        method: 'DELETE',
                        headers: {
                            ...getSupabaseHeaders(),
                            Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                    })
                    const data = await response.json()
                    if (data.success) {
                        getContact();
                        setAlert({ type: 'success', message: data.message || 'Pesan berhasil dihapus' })
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

    const getContact = async () => {
        try {
            const url = getFunctionUrl('contact');

            const response = await fetch(url, {
                headers: getSupabaseHeaders()
            });
            console.log("🔗 GET CONTACT:", url);


            const data = await response.json();

            console.log("📡 STATUS:", response.status);
            console.log("📦 RESPONSE:", data);

            if (!response.ok) {
                throw new Error(data.message || "Gagal mengambil data contact");
            }

            if (data.success) {
                setContact(data.data);
            }

        } catch (error) {
            console.error("❌ ERROR GET CONTACT:", error);

            setAlert({
                type: "error",
                message: error.message || "Gagal mengambil pesan"
            });
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
            <div className="flex-1 min-w-0 flex flex-col bg-gray-50 overflow-x-hidden">

                <main className="flex-1 px-4 pb-6 overflow-x-hidden mt-24">
                    <motion.div
                        initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="mb-4">
                        <div>
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Message</h1>
                            <p className="text-sm text-gray-500 mt-1">Kelola pesan dan pertanyaan dari pelanggan.</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="mt-4 overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 hidden md:block">
                        <div className="px-4 lg:px-6 py-4 bg-[#004A7C] ">
                            <p className="text-xl font-semibold text-white">Message</p>
                        </div>

                        <div className="overflow-x-auto">
                            <Table columns={colunms} data={pageItems} rowKey="id_message"
                                renderActions={(item) => (
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
                                )} />
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
                    </motion.div>

                    {/* mobile */}
                    <div className="md:hidden space-y-4">
                        {pageItems.map((item, index) => (
                            <motion.div key={item.id_message}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.65,
                                    delay: index * 0.07,
                                    ease: [0.16, 1, 0.3, 1]
                                }}

                                className="rounded-2xl border border-gray-200  bg-white shadow-sm p-4">

                                <button
                                    onClick={() => handleStatus(item.id_message)}
                                    className={`px-3 py-1 rounded-md text-sm font-semibold transition  ${item.status === "Belum dibaca" ? "bg-red-100 text-red-400 hover:bg-red-200" : "bg-green-100 text-green-600 hover:bg-gray-200"}`}
                                >
                                    {item.status === 'Belum dibaca' ? "Belum dibaca" : "Sudah Dibaca"}  </button>

                                <div className="mt-6">
                                    <div className="grid grid-cols-[90px_1fr] gap-3 items-start py-2 border-b">
                                        <p className="text-sm text-gray-600">Tanggal</p>
                                        <p className="text-sm font-medium">{new Date(item.created_at).toLocaleDateString("id-ID")}</p>
                                    </div>

                                    <div className="grid grid-cols-[90px_1fr] gap-3 items-start py-2 border-b">
                                        <p className="text-sm text-gray-600">Nama</p>
                                        <p className="text-sm font-medium">{item.nama}</p>
                                    </div>

                                    <div className="grid grid-cols-[90px_1fr] gap-3 items-start py-2 border-b">
                                        <p className="text-sm text-gray-600">Email</p>
                                        <p className="text-sm font-medium">{item.email}</p>
                                    </div>
                                    <div className="grid grid-cols-[90px_1fr] gap-3 items-start py-2 border-b">
                                        <p className="text-sm text-gray-600">Subjek</p>
                                        <p className="text-sm font-medium">{item.subjek}</p>
                                    </div>
                                    <div className="grid grid-cols-[90px_1fr] gap-3 items-start py-2 border-b">
                                        <p className="text-sm text-gray-600">No Headphone</p>
                                        <p className="text-sm font-medium">{item.no_hp}</p>
                                    </div>
                                    <div className="grid grid-cols-[90px_1fr] gap-3 items-start py-2 border-b">
                                        <p className="text-sm text-gray-600">Pesan</p>
                                        <p className="text-sm font-medium">{item.pesan}</p>
                                    </div>
                                    <button onClick={() => handleDelete(item.id_message)} className="inline-flex mt-3 w-full h-10 flex-1 items-center justify-center text-sm  bg-[#004A7C] text-white rounded-md transition hover:bg-[#00345F]">
                                        <span className="mr-2">Hapus</span><MdDelete />
                                    </button>
                                </div>

                            </motion.div>
                        ))}
                        <div className="px-1 py-3 flex items-center justify-between gap-3">

                            <button
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${page === 1
                                    ? "text-slate-400 bg-slate-100"
                                    : "text-slate-700 bg-white border border-slate-200"
                                    }`}
                            >
                                Prev
                            </button>

                            <span className="text-sm text-slate-600">
                                {page} / {totalPages}
                            </span>

                            <button
                                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${page === totalPages
                                    ? "text-slate-400 bg-slate-100"
                                    : "text-slate-700 bg-white border border-slate-200"
                                    }`}
                            >
                                Next
                            </button>

                        </div>
                    </div>
                </main>
            </div>
            {alert && <CustomAlert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
            {confirm && <ConfirmAlert title={confirm.title} message={confirm.message} onConfirm={confirm.onConfirm} onCancel={confirm.onCancel} />}
        </div>

    )
}

export default PageMessage