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
import UserMenuDropdwn from "../../components/UserMenuDropdown"
import { RxHamburgerMenu } from "react-icons/rx"
import Notifikasi from "../../components/Notifikasi"
import { motion } from 'framer-motion'
import { getFunctionUrl, getSupabaseHeaders, SUPABASE_PUBLISHABLE_KEY } from "../../config/supabase";



const Spesifikasi = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [spesifikasi, setSpesifikasi] = useState([]);
    const [kategoriSpesifikasi, setKategoriSpesifikasi] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenSpec, setIsModalOpenSpec] = useState(false)

    const [isEdit, setIsEdit] = useState(false)
    const [selectedMotor, setSelectedMotor] = useState(null);
    const [selectedSpecId, setSelectedSpecId] = useState(null);
    const [motor, setMotor] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    const [formData, setFormData] = useState({
        id_motor: "",
        id_kategori_spesifikasi: "",
        nama_spesifikasi: "",
        nilai: ""
    });

    const [alert, setAlert] = useState(null)
    const [confirm, setConfirm] = useState(null)

    const rowsPerPage = 8;

    const handleKelola = (item) => {
        setSelectedMotor(item)
        setIsModalOpenSpec(true)
    }


    const openModal = () => {
        setIsEdit(false);
        setSelectedSpecId(null);
        setFormData({
            id_motor: "",
            id_kategori_spesifikasi: "",
            nama_spesifikasi: "",
            nilai: ""
        });
        setIsModalOpen(true);
    };

    const handleEdit = (item) => {
        console.log(item, "berhsil di update");
        setIsEdit(true)
        setSelectedSpecId(item.id_spesifikasi)
        setFormData({
            id_motor: item.id_motor,
            id_kategori_spesifikasi: item.id_kategori_spesifikasi,
            nama_spesifikasi: item.nama_spesifikasi,
            nilai: item.nilai
        });;
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

    const handleCreateSpesifikasi = async (e) => {
        e.preventDefault();

        const url = isEdit
            ? getFunctionUrl(`spesifikasi/${selectedSpecId}`)
            : getFunctionUrl('spesifikasi');

        const method = isEdit ? "PUT" : "POST";

        try {

            const response = await fetch(
                url,
                {
                    method,
                    headers: {
                        apikey: SUPABASE_PUBLISHABLE_KEY,
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(formData),
                }
            );

            const result = await response.json();

            if (result.success) {
                setAlert({ type: 'success', message: result.message || 'Spesifikasi berhasil ditambahkan' })

                getSpesifikasi();

                setIsModalOpen(false);

                setFormData({
                    id_motor: "",
                    id_kategori_spesifikasi: "",
                    nama_spesifikasi: "",
                    nilai: ""

                });

            } else {

                setAlert({ type: 'error', message: result.message })

            }

        } catch (error) {

            console.log(error);

        }
    };

    const handleDelete = async (id) => {
        setConfirm({
            title: 'Hapus Spesifikasi',
            message: 'Yakin ingin menghapus data spesifikasi ini?',
            onConfirm: async () => {
                try {
                    const response = await fetch(
                        getFunctionUrl(`spesifikasi/${id}`),
                        {
                            method: 'DELETE',
                            headers: {
                                ...getKategoriSpesifikasi(),
                                Authorization: `Bearer ${token}`,
                            }
                        }
                    )

                    const data = await response.json()

                    if (data.success) {
                        getSpesifikasi()
                        setAlert({ type: 'success', message: data.message || 'Spesifikasi berhasil dihapus' })
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

    const getKategoriSpesifikasi = async () => {
        try {
            const response = await fetch(
                getFunctionUrl('kategori-spesifikasi'), {
                headers: {
                    ...getKategoriSpesifikasi(),
                    Authorization: `Bearer ${token}`,
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

    const getMotor = async () => {
        try {
            const response = await fetch(getFunctionUrl('motor'), {
                headers: {
                    ...getKategoriSpesifikasi(),
                    Authorization: `Bearer ${token}`,
                }
            });


            const data = await response.json();
            console.log(data);

            if (data.success) {
                setMotor(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getSpesifikasi = async () => {
        try {
            const response = await fetch(getFunctionUrl('spesifikasi'), {
                headers: {
                    ...getKategoriSpesifikasi(),
                    Authorization: `Bearer ${token}`,
                }
            });
            const data = await response.json();

            console.log(data)
            if (data.success) {
                setSpesifikasi(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getSpesifikasi();
        getMotor()
        getKategoriSpesifikasi()

    }, []);

    const filteredData = spesifikasi.filter((item) =>
        (item.nama_motor || "").toLowerCase().includes(search.toLowerCase())
    );

    const groupedMotor = Object.values(
        filteredData.reduce((acc, item) => {
            if (!acc[item.id_motor]) {
                acc[item.id_motor] = {
                    id_motor: item.id_motor,
                    nama_motor: item.nama_motor,
                    spesifikasi: []
                }
            }
            acc[item.id_motor].spesifikasi.push(item)
            return acc
        }, {})
    )
    const totalPages = Math.max(
        1,
        Math.ceil(groupedMotor.length / rowsPerPage)
    );

    const pageItems = groupedMotor.slice(
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    );


    useEffect(() => {
        if (page > totalPages) setPage(totalPages)
    }, [page, totalPages])
    return (
        <div className="min-h-screen w-full flex bg-gray-50 overflow-x-hidden">
            <div className="flex-1 min-w-0 flex flex-col bg-gray-50 overflow-x-hidden">
                {alert && <CustomAlert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
                {confirm && <ConfirmAlert title={confirm.title} message={confirm.message} onConfirm={confirm.onConfirm} onCancel={confirm.onCancel} />}

                <main className="flex-1 px-4 pb-6 overflow-x-hidden mt-24">
                    <div className="hidden md:block">
                        <motion.div
                            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-4">
                            <div>
                                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Spesifikasi</h1>
                                <p className="text-sm text-gray-500 mt-1">Kelola data spesifikasi motor.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="mt-4 overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
                            <div className="px-4 lg:px-6 py-4 bg-[#004A7C] flex justify-between items-center">
                                <p className="text-xl font-semibold text-white">Spesifikasi</p>
                                <button
                                    type="button"
                                    onClick={openModal}
                                    className='inline-flex items-center justify-center h-10 w-10 rounded-full bg-white text-slate-700 shadow-sm transition hover:shadow-md hover:text-blue-300'>
                                    <PiPlus size={20} />
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-[900px] w-full">
                                    <thead className="bg-white">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">nama motor</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">jumlah spesifikasi</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        {pageItems.map((item) => (
                                            <tr key={item.id_spesifikasi} className="transition hover:bg-slate-50">
                                                <td className="px-4 py-4 text-sm text-slate-700">{item.nama_motor}</td>
                                                <td className="px-4 py-4 text-sm text-slate-700">{item.spesifikasi.length} spesifikasi</td>
                                                <td className="px-4 py-4 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <button type="button" onClick={() => openModal(item.id_motor)} className="inline-flex items-center gap-2 rounded-lg bg-[#004A7C] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#00395f]"
                                                        ><PiPlus size={15} />
                                                            Tambah</button>
                                                        <button type="button" onClick={() => handleKelola(item)}
                                                            className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50"
                                                        >kelola Spec</button>
                                                    </div>
                                                </td>
                                                {/* <td className="px-4 py-4 text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <button onClick={() => handleDelete(item.id_spesifikasi)} className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
                                                            <MdDelete />
                                                        </button>
                                                        <button onClick={() => handleEdit(item)} className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
                                                            <FaEdit />
                                                        </button>
                                                    </div>
                                                </td> */}
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
                        </motion.div>
                    </div>

                    {/* mobile */}
                    <div className="md:hidden space-y-4">

                        {/* HEADER MOBILE */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className="flex justify-between py-4"
                        >
                            <div>
                                <h1 className="text-xl font-bold text-gray-900">
                                    Spesifikasi
                                </h1>

                                <p className="text-sm text-gray-500 mt-1">
                                    Kelola data spesifikasi motor.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={openModal}
                                className="inline-flex items-center justify-center h-10 w-10 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm transition hover:shadow-md hover:border-slate-300 hover:bg-slate-50"
                            >
                                <PiPlus size={20} />
                            </button>
                        </motion.div>


                        {/* LIST MOTOR */}
                        <div className="space-y-4">

                            {pageItems.map((item, index) => (

                                <motion.div
                                    key={item.id_motor}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.65,
                                        delay: index * 0.07,
                                        ease: [0.16, 1, 0.3, 1],
                                    }}
                                    className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                                >

                                    {/* MOTOR */}
                                    <div className="flex items-start justify-between gap-4">

                                        <div className="min-w-0">

                                            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                                                Motor
                                            </p>

                                            <p className="text-base font-semibold text-gray-900 mt-1 truncate">
                                                {item.nama_motor}
                                            </p>

                                        </div>

                                        <div className="shrink-0 rounded-full bg-slate-100 px-3 py-1">
                                            <p className="text-xs font-medium text-slate-600">
                                                {item.spesifikasi.length} Spec
                                            </p>
                                        </div>

                                    </div>


                                    {/* PREVIEW KATEGORI */}
                                    {item.spesifikasi.length > 0 && (
                                        <div className="mt-5 pt-4 border-t border-gray-100">

                                            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-3">
                                                Kategori Spesifikasi
                                            </p>

                                            <div className="flex flex-wrap gap-2">

                                                {[
                                                    ...new Map(
                                                        item.spesifikasi.map((spec) => [
                                                            spec.id_kategori_spesifikasi,
                                                            spec.nama_kategori
                                                        ])
                                                    ).values()
                                                ].slice(0, 4).map((kategori) => (

                                                    <span
                                                        key={kategori}
                                                        className="rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1.5 text-xs text-slate-600"
                                                    >
                                                        {kategori}
                                                    </span>

                                                ))}

                                                {new Set(
                                                    item.spesifikasi.map(
                                                        (spec) => spec.id_kategori_spesifikasi
                                                    )
                                                ).size > 4 && (
                                                        <span className="rounded-lg bg-slate-50 border border-slate-200 px-2.5 py-1.5 text-xs text-slate-500">
                                                            + lainnya
                                                        </span>
                                                    )}

                                            </div>

                                        </div>
                                    )}


                                    {/* ACTION */}
                                    <div className="flex gap-2 mt-5">

                                        <button
                                            type="button"
                                            onClick={() => openModal(item.id_motor)}
                                            className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-[#004A7C] text-sm font-medium text-white transition hover:bg-[#00345F]"
                                        >
                                            <PiPlus size={16} />
                                            Tambah
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handleKelola(item)}
                                            className="inline-flex h-10 flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                                        >
                                            Kelola Spec
                                        </button>

                                    </div>

                                </motion.div>

                            ))}


                            {/* EMPTY */}
                            {pageItems.length === 0 && (
                                <div className="rounded-2xl border border-gray-200 bg-white px-4 py-10 text-center">

                                    <p className="text-sm text-slate-500">
                                        Belum ada data spesifikasi.
                                    </p>

                                </div>
                            )}


                            {/* PAGINATION */}
                            <div className="px-1 py-3 flex items-center justify-between gap-3">

                                <button
                                    type="button"
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
                                    type="button"
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

                    </div>

                    {isModalOpenSpec && selectedMotor && (
                        <div
                            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6"
                            onClick={() => setIsModalOpenSpec(false)}
                        >
                            <div
                                className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >

                                {/* HEADER */}
                                <div className="px-6 py-5 border-b border-gray-100">
                                    <div className="flex items-start justify-between gap-4">

                                        <div>
                                            <h2 className="text-lg font-bold text-gray-900">
                                                Kelola Spesifikasi
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {selectedMotor.nama_motor}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => setIsModalOpenSpec(false)}
                                            className="p-2 rounded-full hover:bg-gray-100 text-gray-400"
                                        >
                                            ✕
                                        </button>

                                    </div>
                                </div>

                                {/* BODY */}
                                <div className="px-6 py-5">

                                    {selectedMotor.spesifikasi.length === 0 ? (
                                        <div className="text-center py-10 text-sm text-gray-500">
                                            Belum ada spesifikasi.
                                        </div>
                                    ) : (
                                        <div className="space-y-6">

                                            {Object.values(
                                                selectedMotor.spesifikasi.reduce((acc, item) => {

                                                    if (!acc[item.id_kategori_spesifikasi]) {
                                                        acc[item.id_kategori_spesifikasi] = {
                                                            nama_kategori: item.nama_kategori,
                                                            items: []
                                                        };
                                                    }

                                                    acc[item.id_kategori_spesifikasi].items.push(item);

                                                    return acc;

                                                }, {})
                                            ).map((kategori) => (

                                                <div key={kategori.nama_kategori}>

                                                    <h3 className="text-sm font-semibold text-gray-900 mb-3">
                                                        {kategori.nama_kategori}
                                                    </h3>

                                                    <div className="rounded-xl border border-gray-100 overflow-hidden">

                                                        {kategori.items.map((item) => (

                                                            <div
                                                                key={item.id_spesifikasi}
                                                                className="flex items-center justify-between gap-4 px-4 py-3 border-b last:border-b-0 border-gray-100"
                                                            >

                                                                <div className="min-w-0">
                                                                    <p className="text-sm font-medium text-gray-700">
                                                                        {item.nama_spesifikasi}
                                                                    </p>

                                                                    <p className="text-sm text-gray-500 mt-0.5">
                                                                        {item.nilai}
                                                                    </p>
                                                                </div>

                                                                <div className="flex items-center gap-2 shrink-0">

                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleEdit(item)}
                                                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                                                    >
                                                                        <FaEdit />
                                                                    </button>

                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleDelete(item.id_spesifikasi)}
                                                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                                                                    >
                                                                        <MdDelete />
                                                                    </button>

                                                                </div>

                                                            </div>

                                                        ))}

                                                    </div>

                                                </div>

                                            ))}

                                        </div>
                                    )}

                                </div>

                                {/* FOOTER */}
                                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-between items-center rounded-b-3xl">

                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsModalOpenSpec(false);
                                            openModal(selectedMotor.id_motor);
                                        }}
                                        className="inline-flex items-center gap-2 rounded-full bg-[#004A7C] px-4 py-2.5 text-sm font-medium text-white"
                                    >
                                        <PiPlus size={16} />
                                        Tambah Spesifikasi
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpenSpec(false)}
                                        className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700"
                                    >
                                        Tutup
                                    </button>

                                </div>

                            </div>
                        </div>
                    )}

                    {
                        isModalOpen && (
                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6" onClick={() => setIsModalOpen(false)}>
                                <div className="w-full max-w-lg lg:max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
                                    <form onSubmit={handleCreateSpesifikasi}>
                                        {/* Header */}
                                        <div className="px-6 py-5 border-b border-gray-100">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h2 className="text-lg font-bold text-gray-900">{isEdit ? 'Edit Spesifikasi' : 'Tambah Spesifikasi'}</h2>
                                                    <p className="mt-0.5 text-sm text-gray-500">Kelola data spesifikasi motor.</p>
                                                </div>
                                                <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">✕</button>
                                            </div>
                                        </div>

                                        {/* Body */}
                                        <div className="px-6 py-5 grid gap-4 md:grid-cols-2">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Motor</label>
                                                <select name="id_motor" value={formData.id_motor} onChange={handleChange}
                                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100">
                                                    <option value="">Pilih Motor</option>
                                                    {motor.map((item) => (
                                                        <option key={item.id_motor} value={item.id_motor}>{item.nama_motor}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori Spesifikasi</label>
                                                <select name="id_kategori_spesifikasi" value={formData.id_kategori_spesifikasi} onChange={handleChange}
                                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100" >
                                                    {kategoriSpesifikasi.map((item) => (
                                                        <option key={item.id_kategori_spesifikasi} value={item.id_kategori_spesifikasi}>
                                                            {item.nama_kategori}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Spesifikasi</label>
                                                <input type="text" name="nama_spesifikasi" value={formData.nama_spesifikasi} onChange={handleChange} placeholder="Nama spesifikasi" title="Nama spesifikasi"
                                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 truncate-placeholder" />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">Nilai</label>
                                                <input type="text" name="nilai" value={formData.nilai} onChange={handleChange} placeholder="Nilai" title="Nilai"
                                                    className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 truncate-placeholder" />
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-3xl">
                                            <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">Batal</button>
                                            <button type="submit" className="rounded-full bg-[#002446] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#00182F]">{isEdit ? 'Update' : 'Simpan'}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )
                    }

                </main >
            </div >
        </div >

    )
}

export default Spesifikasi