import { defaultEasing } from "framer-motion"
import AdminNavbar from "../../components/AdminNavbar"
import NavTop from "../../components/NavTop"
import { BiExport, BiSearch } from "react-icons/bi"
import { PiPlus } from "react-icons/pi"
import { CiFileOn } from "react-icons/ci"
import { MdDelete, MdNotificationsNone } from "react-icons/md"
import { FaEdit } from "react-icons/fa"
import { useEffect, useMemo, useState } from "react"
import toast from "react-hot-toast"
import { i } from "framer-motion/client"
import { exportExcel } from "../../utils/export/exportExcel"
import { RxHamburgerMenu } from "react-icons/rx"
import UserMenuDropdwn from "../../components/UserMenuDropdown"

const SimulasiKredit = () => {
    const [page, setPage] = useState(1)
    const [motor, setMotor] = useState([]);
    const [simulasi, setSimulasi] = useState([])
    const [isEdit, setIsEdit] = useState(false)
    const [selected, setSelected] = useState(null)
    const [serach, serSearch] = useState("")

    const rowsPerPage = 5

    const [filterFormData, setFilterFormData] = useState({
        id_motor: "",
        dp: "",
        tenor: "",
        bunga: "",
    })
    const [modalFormData, setModalFormData] = useState({
        id_motor: "",
        dp: "",
        tenor: "12",
        bunga: "",
    })
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const selectedModalMotor = motor.find(
        (item) => item.id_motor === Number(modalFormData.id_motor)
    );

    const formatCurrency = (value) => {
        if (!value && value !== 0) return "Rp 0";
        const numberValue = typeof value === "number" ? value : Number(String(value).replace(/[^0-9]/g, ""));
        if (Number.isNaN(numberValue)) return "Rp 0";
        return `Rp ${numberValue.toLocaleString("id-ID")}`;
    };

    const calculateCicilan = () => {
        if (!selectedModalMotor || !modalFormData.dp || !modalFormData.tenor || !modalFormData.bunga) {
            return ""
        }

        const harga = Number(selectedModalMotor.harga)
        const dp = Number(modalFormData.dp)
        const tenor = Number(modalFormData.tenor)
        const bunga = Number(modalFormData.bunga)

        if (!harga || tenor <= 0) return ""

        const pokok = Math.max(0, harga - dp)
        const monthlyRate = bunga / 100 / 12

        if (monthlyRate === 0) {
            return (pokok / tenor).toFixed(0)
        }

        const cicilan = pokok * monthlyRate / (1 - Math.pow(1 + monthlyRate, -tenor))
        return Math.round(cicilan).toString()
    }

    const handleFilterChange = (e) => {
        const { name, value } = e.target;

        setFilterFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleModalChange = (e) => {
        const { name, value } = e.target;
        setModalFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const openModal = () => {
        setIsEdit(false)
        setSelected(null)

        setModalFormData({
            id_motor: "",
            dp: "",
            tenor: "12",
            bunga: "",
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handeleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Apakah andad yakin ingin menghapus simulasi ini ?"
        )

        if (!confirmDelete) return

        try {
            const response = await fetch(
                `http://localhost:3000/api/simulasi/${id}`,
                {
                    method: "DELETE"
                }
            )
            const data = await response.json()

            if (data.success) {
                toast.success("simulasi berhasil di hapus")
                getSimulasi()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("terjadi kesalahan")
        }
    }
    const handleEdit = (item) => {
        setIsEdit(true);
        setSelected(item.id_simulasi)

        setModalFormData({
            id_motor: item.id_motor.toString(),
            dp: item.dp.toString(),
            tenor: item.tenor.toString(),
            bunga: item.bunga.toString()
        })
        setIsModalOpen(true)
    }
    const handleSaveSimulasi = async (e) => {
        e.preventDefault();

        if (!modalFormData.id_motor || !modalFormData.dp || !modalFormData.tenor || !modalFormData.bunga) {
            toast.error("Lengkapi semua data simulasi terlebih dahulu.");
            return;
        }

        try {
            const url = isEdit
                ? `http://localhost:3000/api/simulasi/${selected}`
                : "http://localhost:3000/api/simulasi";

            const method = isEdit ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id_motor: Number(modalFormData.id_motor),
                    dp: Number(modalFormData.dp),
                    tenor: Number(modalFormData.tenor),
                    bunga: Number(modalFormData.bunga),
                    cicilan: calculateCicilan(),
                }),
            });

            const data = await response.json();
            if (data.success) {
                toast.success("Simulasi berhasil disimpan.");
                getSimulasi();
                closeModal();
            } else {
                toast.error(data.message || "Gagal menyimpan simulasi.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Terjadi kesalahan saat menyimpan simulasi.");
        }
    };

    const getSimulasi = async () => {

        try {

            const response = await fetch(
                "http://localhost:3000/api/simulasi"
            );

            const data = await response.json();

            if (data.success) {
                setSimulasi(data.data);
            }

        } catch (error) {

            console.log(error);

        }

    };

    const getMotor = async () => {

        try {

            const response = await fetch(
                "http://localhost:3000/api/motor"
            );

            const data = await response.json();

            if (data.success) {
                setMotor(data.data);
            }

        } catch (error) {

            console.log(error);

        }

    };

    useEffect(() => {

        getMotor();
        getSimulasi();
    }, []);

    const handleExportSimulasi = () => {
        exportExcel({
            data: simulasi,
            fileName: "Data simulai",
            columns: [
                {
                    label: 'No', key: "id_simulasi"
                },
                {
                    label: "Nama Motor",
                    key: "nama_motor"
                },
                {
                    label: "Dp",
                    key: "dp"
                },
                {
                    label: "Tenor",
                    key: "tenor"
                },
                {
                    label: "Cicilan",
                    key: "cicilan"
                }
            ]
        })
    };

    const filteredData = simulasi.filter((item) => {
        const cocokMotor =
            filterFormData.id_motor === "" || item.id_motor === Number(filterFormData.id_motor)

        const cocokSearch = item.nama_motor.toLowerCase().includes(serach.toLowerCase())

        return cocokMotor && cocokSearch
    })
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
    useEffect(() => {
        setPage(1);
    }, [serach, filterFormData.id_motor])
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
                            <input value={serach} onChange={(e) => serSearch(e.target.value)} type="search" className="h-8 w-full outline-none rounded-full text-sm" placeholder="Search" />
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
                <main className="flex-1 px-4 pb-6 overflow-x-hidden">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-4">
                        <div>
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Simulasi Kredit</h1>
                            <p className="text-sm text-gray-500 mt-1">Kelola data simulasi kredit.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                            <div className="flex gap-2 w-full sm:w-auto">
                                <select
                                    name="id_motor"
                                    value={filterFormData.id_motor}
                                    onChange={handleFilterChange}
                                    className="w-full sm:w-56 lg:w-72 h-10 px-4 rounded-full bg-white border border-slate-200 text-sm"
                                >
                                    <option value="">Pilih Motor</option>

                                    {motor.map((item) => (

                                        <option
                                            key={item.id_motor}
                                            value={item.id_motor}
                                        >
                                            {item.nama_motor}
                                        </option>

                                    ))}

                                </select>
                            </div>


                            <div className='flex gap-2'>
                                <button onClick={handleExportSimulasi} className='inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm transition hover:shadow-md hover:border-slate-300 hover:bg-slate-50 focus:ring-2 focus:ring-indigo-200'>
                                    <CiFileOn size={18} />
                                    <span className="text-xs">Export</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={openModal}
                                    className='inline-flex items-center gap-2 h-10  px-4 rounded-full bg-primary text-white shadow-sm transition hover:bg-primary/90'
                                >
                                    <PiPlus size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {isModalOpen && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6" onClick={closeModal}>
                            <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
                                {/* Header */}
                                <div className="px-6 py-5 border-b border-gray-100">
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <h2 className="text-lg font-bold text-gray-900">{isEdit ? 'Edit Simulasi Kredit' : 'Tambah Simulasi Kredit'}</h2>
                                            <p className="mt-0.5 text-sm text-gray-500">Kelola data simulasi kredit motor.</p>
                                        </div>
                                        <button type="button" onClick={closeModal} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">✕</button>
                                    </div>
                                </div>

                                {/* Body */}
                                <form onSubmit={handleSaveSimulasi}>
                                    <div className="px-6 py-5 grid gap-4 md:grid-cols-2">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Motor</label>
                                            <select name="id_motor" value={modalFormData.id_motor} onChange={handleModalChange}
                                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100">
                                                <option value="">Pilih Motor</option>
                                                {motor.map((item) => (
                                                    <option key={item.id_motor} value={item.id_motor}>{item.nama_motor}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Harga Motor</label>
                                            <div className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700">
                                                {formatCurrency(selectedModalMotor?.harga ?? 0)}
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">DP</label>
                                            <input type="number" min="0" name="dp" value={modalFormData.dp} onChange={handleModalChange}
                                                placeholder="Masukkan jumlah DP"
                                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Tenor (bulan)</label>
                                            <select name="tenor" value={modalFormData.tenor} onChange={handleModalChange}
                                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100">
                                                <option value="11">11</option>
                                                <option value="17">17</option>
                                                <option value="23">23</option>
                                                <option value="29">29</option>
                                                <option value="35">35</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Bunga (%)</label>
                                            <input type="number" min="0" step="0.01" name="bunga" value={modalFormData.bunga} onChange={handleModalChange}
                                                placeholder="Masukkan persen bunga"
                                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Cicilan</label>
                                            <input type="text" value={formatCurrency(calculateCicilan())} readOnly
                                                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-700 outline-none" />
                                        </div>
                                    </div>

                                    {/* Footer */}
                                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-3xl">
                                        <button type="button" onClick={closeModal} className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">Batal</button>
                                        <button type="submit" className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700">{isEdit ? 'Update' : 'Simpan'}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}

                    <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
                        <div className="px-4 lg:px-6 py-4 bg-red-600">
                            <p className="text-sm font-semibold text-white">Daftar Simulasi Kredit</p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-[700px] w-full">
                                <thead className="bg-white">
                                    <tr>
                                        {/* <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">NO</th>  */}
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Motor</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Harga</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Dp</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Tenor</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">bunga</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">cicilan</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {pageItems.map((item) => (
                                        <tr key={item.id} className="transition hover:bg-slate-50">
                                            {/* <td className="px-4 py-4 text-sm text-slate-700">{item.id_simulasi}</td> */}
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.nama_motor}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700"> Rp {Number(item.harga).toLocaleString("id-ID")}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">  Rp {Number(item.dp).toLocaleString("id-ID")}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.tenor} Bulan</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.bunga}%</td>
                                            <td className="px-4 py-4 text-sm text-slate-700"> Rp {Number(item.cicilan ?? 0).toLocaleString("id-ID")}</td>
                                            <td className="px-4 py-4 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => handleEdit(item)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
                                                        <FaEdit />
                                                    </button>
                                                    <button onClick={() => handeleDelete(item.id_simulasi)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
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

export default SimulasiKredit