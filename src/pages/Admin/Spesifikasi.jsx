import { defaultEasing } from "framer-motion"
import AdminNavbar from "../../components/AdminNavbar"
import NavTop from "../../components/NavTop"
import { BiExport, BiSearch } from "react-icons/bi"
import { PiPlus } from "react-icons/pi"
import { CiFileOn } from "react-icons/ci"
import { MdDelete, MdNotificationsNone } from "react-icons/md"
import { FaEdit } from "react-icons/fa"
import { useEffect, useMemo, useState } from "react"
import UserMenuDropdwn from "../../components/UserMenuDropdown"
import { RxHamburgerMenu } from "react-icons/rx"

const Spesifikasi = () => {
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [spesifikasi, setSpesifikasi] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const [selected, setSelected] = useState(null)
    const [motor, setMotor] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [formData, setFormData] = useState({
        id_motor: "",
        kapasitas_mesin: "",
        tenaga: "",
        torsi: "",
        transmisi: "",
        berat: "",
        tinggi_jok: "",
        kapasitas_tengki: "",
        mesin: ""
    });

    const rowsPerPage = 8;

    const openModal = () => {
        setIsEdit(false);
        setSelected(null);
        setFormData({
            id_motor: "",
            kapasitas_mesin: "",
            tenaga: "",
            torsi: "",
            transmisi: "",
            berat: "",
            tinggi_jok: "",
            kapasitas_tengki: "",
            mesin: ""
        });
        setIsModalOpen(true);
    };

    const handleEdit = (item) => {
        console.log(item, "berhsil di update");
        setIsEdit(true)
        setSelected(item.id_spesifikasi)
        setFormData({
            id_motor: item.id_motor,
            kapasitas_mesin: item.kapasitas_mesin,
            tenaga: item.tenaga,
            torsi: item.torsi,
            transmisi: item.transmisi,
            berat: item.berat,
            tinggi_jok: item.tinggi_jok,
            kapasitas_tengki: item.kapasitas_tengki,
            mesin: item.mesin
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
            ? `${import.meta.env.VITE_API_URL}api/spesifikasi/${selected}`
            : `${import.meta.env.VITE_API_URL}/api/spesifikasi`;

        const method = isEdit ? "PUT" : "POST";

        try {

            const response = await fetch(
                url,
                {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(formData),
                }
            );

            const result = await response.json();

            if (result.success) {

                alert("spesifikasi berhasil ditambahkan");

                getSpesifikasi();

                setIsModalOpen(false);

                setFormData({
                    id_motor: "",
                    kapasitas_mesin: "",
                    tenaga: "",
                    torsi: "",
                    transmisi: "",
                    berat: "",
                    tinggi_jok: "",
                    kapasitas_tengki: "",
                    mesin: ""
                });

            } else {

                alert(result.message);

            }

        } catch (error) {

            console.log(error);

        }
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Yakin ingin menghapus color?")) return;

        try {

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/spesifikasi/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();

            if (data.success) {
                getSpesifikasi();
            }

        } catch (error) {
            console.log(error);
        }

    }

    const getMotor = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/motor`);
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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/spesifikasi`);
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

    }, []);

    const filteredData = spesifikasi.filter((item) =>
        item.nama_motor.toLowerCase().includes(search.toLowerCase())
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
                            <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" className="h-8 w-full outline-none rounded-full text-sm" placeholder="Search" />
                        </div>
                    </div>

                    <div className='flex items-center gap-2'>
                        <UserMenuDropdwn />
                    </div>
                </div>

                <main className="flex-1 px-4 pb-6 overflow-x-hidden">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4 mb-4">
                        <div>
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Spesifikasi</h1>
                            <p className="text-sm text-gray-500 mt-1">Kelola data spesifikasi motor.</p>
                        </div>
                        <div className="flex gap-4 items-center">
                        </div>
                    </div>

                    <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100 hidden md:block">
                        <div className="px-4 lg:px-6 py-4 bg-[#004A7C] flex justify-between items-center">
                            <p className="text-sm font-semibold text-white">Daftar Spesifikasi</p>
                            <button
                                type="button"
                                onClick={openModal}
                                className='inline-flex items-center justify-center h-10 w-10 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm transition hover:shadow-md hover:border-slate-300 hover:bg-slate-50'>
                                <PiPlus size={20} />
                            </button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-[900px] w-full">
                                <thead className="bg-white">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">nama motor</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">kapasitas mesin</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">tenaga</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">torsi</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">transmisi</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">berat</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">tinggi_jok</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">kapasita tangki</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">mesin</th>
                                        <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {pageItems.map((item) => (
                                        <tr key={item.id_spesifikasi} className="transition hover:bg-slate-50">
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.nama_motor}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.kapasitas_mesin}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.tenaga}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.torsi}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.transmisi}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.berat}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.tinggi_jok}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.kapasitas_tengki}</td>
                                            <td className="px-4 py-4 text-sm text-slate-700">{item.mesin}</td>

                                            <td className="px-4 py-4 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => handleDelete(item.id_spesifikasi)} className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
                                                        <MdDelete />
                                                    </button>
                                                    <button onClick={() => handleEdit(item)} className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
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

                    <div className="md:hidden space-y-4 bg-white p-4 rounded-xl">
                        <div className="px-4 lg:px-6 py-4 bg-[#004A7C] flex justify-between items-center rounded-xl">
                            <p className="text-sm font-semibold text-white">Spesifikasi</p>
                            <button
                                type="button"
                                onClick={openModal}
                                className='inline-flex items-center justify-center h-10 w-10 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm transition hover:shadow-md hover:border-slate-300 hover:bg-slate-50'>
                                <PiPlus size={20} />
                            </button>
                        </div>
                        {pageItems.map((item) => (
                            <div className="rounded-xl border bg-white p-4 shadow-sm">

                                <div className="flex gap-4">
                                    <div className="bg-gray-100 w-20 h-20 rounded">
                                        s
                                    </div>
                                    <div>
                                        <p className="mb-2 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"><span className="text-sm text-slate-700">{item.nama_motor}</span></p>
                                        <p className=" text-left text-xs font-semibold uppercase tracking-wider text-slate-500"> Mesin : <span className=" text-sm text-slate-700">{item.mesin}</span></p>
                                    </div>
                                </div>

                                <div className="flex justify-between mb-8 mt-8">
                                    <div className="w-48 text-center p-2">
                                        <p className=" px-4 py-3  text-xs font-semibold uppercase tracking-wider text-slate-500">Tenaga</p>
                                        <p className="text-black font-medium text-sm mt-0">{item.tenaga}</p>
                                    </div>


                                    <div className="w-48 text-center p-2">
                                        <p className=" px-4 py-3  text-xs font-semibold uppercase tracking-wider text-slate-500">Bahan Bakar</p>
                                        <p className="text-black font-medium text-sm mt-0">{item.torsi}</p>
                                    </div>

                                    <div className="w-48 text-center p-2">
                                        <p className=" px-4 py-3  text-xs font-semibold uppercase tracking-wider text-slate-500">Transmisi</p>
                                        <p className="text-black font-medium text-sm mt-0">{item.transmisi}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <div className="w-48 text-center p-2">
                                        <p className=" px-4 py-3  text-xs font-semibold uppercase tracking-wider text-slate-500">Berat</p>
                                        <p className="text-black font-medium text-sm mt-0">{item.berat}</p>
                                    </div>

                                    <div className="w-48 text-center p-2">
                                        <p className=" px-4 py-3  text-xs font-semibold uppercase tracking-wider text-slate-500">Tinggi Jok</p>
                                        <p className="text-black font-medium text-sm mt-0">{item.tinggi_jok}</p>
                                    </div>

                                    <div className="w-48 text-center p-2">
                                        <p className=" px-4 py-3  text-xs font-semibold uppercase tracking-wider text-slate-500">Ban</p>
                                        <p className="text-black font-medium text-sm mt-0">{item.tinggi_jok}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 justify-between h-10 rounded-md border-1 mt-8">
                                    <button onClick={() => handleDelete(item.id_spesifikasi)} className="inline-flex h-10 flex-1 items-center justify-center text-sm  bg-blue-100 text-black rounded-md transition  hover:bg-sky-50">
                                        <span className="mr-2">Hapus</span><MdDelete />
                                    </button>
                                    <button onClick={() => handleEdit(item)} className="inline-flex h-10 flex-1 items-center justify-center  rounded-md bg-white text-black  transition hover:bg-slate-50">
                                        <span className="mr-2">Edit</span> <FaEdit />
                                    </button>
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

                    {isModalOpen && (
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
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Kapasitas Mesin</label>
                                            <input type="text" name="kapasitas_mesin" value={formData.kapasitas_mesin} onChange={handleChange} placeholder="Kapasitas mesin"
                                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Tenaga</label>
                                            <input type="text" name="tenaga" value={formData.tenaga} onChange={handleChange} placeholder="Tenaga"
                                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Torsi</label>
                                            <input type="text" name="torsi" value={formData.torsi} onChange={handleChange} placeholder="Torsi"
                                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Transmisi</label>
                                            <input type="text" name="transmisi" value={formData.transmisi} onChange={handleChange} placeholder="Transmisi"
                                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Berat</label>
                                            <input type="text" name="berat" value={formData.berat} onChange={handleChange} placeholder="Berat"
                                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Tinggi Jok</label>
                                            <input type="text" name="tinggi_jok" value={formData.tinggi_jok} onChange={handleChange} placeholder="Tinggi Jok"
                                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Kapasitas Tangki</label>
                                            <input type="text" name="kapasitas_tengki" value={formData.kapasitas_tengki} onChange={handleChange} placeholder="Kapasitas Tangki"
                                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Mesin</label>
                                            <input type="text" name="mesin" value={formData.mesin} onChange={handleChange} placeholder="Mesin"
                                                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100" />
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
                    )}

                </main>
            </div>
        </div>

    )
}

export default Spesifikasi