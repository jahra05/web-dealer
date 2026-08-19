import AdminNavbar from "../../components/AdminNavbar"
import { CiFileOn } from "react-icons/ci"
import { useEffect, useState, useCallback } from "react"
import { exportExcel } from "../../utils/export/exportExcel"
import { MdNotificationsNone } from "react-icons/md"
import { RxHamburgerMenu } from "react-icons/rx"
import UserMenuDropdwn from "../../components/UserMenuDropdown"
import Notifikasi from "../../components/Notifikasi"

const MONTHS = [
    { value: "1", label: "Januari" },
    { value: "2", label: "Februari" },
    { value: "3", label: "Maret" },
    { value: "4", label: "April" },
    { value: "5", label: "Mei" },
    { value: "6", label: "Juni" },
    { value: "7", label: "Juli" },
    { value: "8", label: "Agustus" },
    { value: "9", label: "September" },
    { value: "10", label: "Oktober" },
    { value: "11", label: "November" },
    { value: "12", label: "Desember" },
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - i);

const Exam = () => {
    const [page, setPage] = useState(1)
    const rowsPerPage = 5
    const [laporan, setLaporan] = useState([])
    const [tab, setTab] = useState("produk")
    const [periode, setPeriode] = useState("semua")
    const [bulan, setBulan] = useState("1")
    const [tahun, setTahun] = useState(CURRENT_YEAR);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeLaporan, setActiveLaporan] = useState('produk')

    const laporanMenu = [
        { key: 'produk', label: "Laporan Produk" },
        { key: 'pengajuanKredit', label: "Pengajuan Kredit" },
        { key: 'contact', label: "Laporan Message" },
        { key: 'testimoni', label: "Laporan Testimoni" },
    ]

    // Panggil API laporan dengan parameter filter
    const getLaporan = useCallback(async (tabName, filterOverride) => {
        const p = filterOverride?.periode ?? periode;
        const b = filterOverride?.bulan ?? bulan;
        const t = filterOverride?.tahun ?? tahun;

        setTab(tabName);
        let url = `${import.meta.env.VITE_API_URL}/api/laporan/${tabName}`;

        if (p === "bulanan") {
            url += `?periode=bulanan&bulan=${b}&tahun=${t}`;
        } else if (p === "tahunan") {
            url += `?periode=tahunan&tahun=${t}`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.success) {
                setLaporan(data.data);
                return data.data;
            }
        } catch (error) {
            console.log(error);
        }
    }, [periode, bulan, tahun]);

    // Fetch data saat komponen mount
    useEffect(() => {
        getLaporan(tab);
    }, []);

    // Auto reload saat periode, bulan, atau tahun berubah
    useEffect(() => {
        getLaporan(tab);
        setPage(1);
    }, [periode, bulan, tahun, tab]);

    const totalPages = Math.max(1, Math.ceil(laporan.length / rowsPerPage));
    const pageItems = laporan.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    useEffect(() => {
        if (page > totalPages) setPage(totalPages);
    }, [page, totalPages]);

    // Handler periode berubah
    const handlePeriodeChange = (e) => {
        const newPeriode = e.target.value;
        setPeriode(newPeriode);
        // Reset ke default saat pilih "semua"
        if (newPeriode === "semua") {
            setBulan("1");
            setTahun(CURRENT_YEAR);
        }
    };

    // ── Export handlers ──

    const handleExportSAllProduk = async () => {
        const dataLaporan = await getLaporan("produk");
        console.log("isi dari data laporan", dataLaporan)
        exportExcel({
            data: dataLaporan,
            fileName: "semua Data produk",
            columns: [
                { label: 'No', key: "id_motor" },
                { label: "Kategori", key: "nama_kategori" },
                { label: "Tipe", key: "nama_tipe" },
                { label: "Warna", key: "nama_warna" },
                { label: "Harga", key: "harga" },
                { label: "Stok", key: "stok" },
                { label: "Tahun", key: "tahun" },
                { label: "Deskripsi", key: "deskripsi" },
                { label: "Status", key: "status" },
            ]
        });
    };

    const handleExportAllPengajuan = async () => {
        const dataLaporanPengajuan = await getLaporan("pengajuanKredit");
        exportExcel({
            data: dataLaporanPengajuan,
            fileName: "semua data pengajuan",
            columns: [
                { label: 'No', key: "id_pengajuan" },
                { label: "Nama", key: "nama" },
                { label: "No Headphone", key: "no_hp" },
                { label: "Alamat", key: "alamat" },
                { label: "Pekerjaan", key: "pekerjaan" },
                { label: "Pengajuan", key: "nama_motor" },
                { label: "Harga", key: "harga" },
                { label: "Tanggal", key: "tanggal_pengajuan" },
                { label: "Status", key: "status" },
            ]
        });
    };

    const handleExportContact = async () => {
        const dataLaporanContact = await getLaporan("contact");
        exportExcel({
            data: dataLaporanContact,
            fileName: "semua Data contact",
            columns: [
                { label: 'No', key: "id_message" },
                { label: "Nama", key: "nama" },
                { label: "Email", key: "email" },
                { label: "Pesan", key: "pesan" },
                { label: "No Headphone", key: "no_hp" },
            ]
        });
    };

    const handleExportAllTestimoni = async () => {
        const dataLaporanTestimoni = await getLaporan("testimoni");
        exportExcel({
            data: dataLaporanTestimoni,
            fileName: "semua Data testimoni",
            columns: [
                { label: 'No', key: "id_testimoni" },
                { label: "Nama", key: "nama" },
                { label: "Pekerjaan", key: "pekerjaan" },
                { label: "Isi Testimoni", key: "isi_testimoni" },
                { label: "Rating", key: "rating" },
            ]
        });
    };

    // ── Render helpers ──

    const renderFilterSelects = () => (
        <div className="flex items-center gap-2 flex-wrap">
            {/* Periode select */}
            <select
                value={periode}
                onChange={handlePeriodeChange}
                className="h-10 px-4 rounded-full bg-white border border-white/20 text-sm text-gray-700"
            >
                <option value="semua">Semua Data</option>
                <option value="bulanan">Bulanan</option>
                <option value="tahunan">Tahunan</option>
            </select>

            {/* Bulan select — muncul hanya jika Bulanan */}
            {periode === "bulanan" && (
                <select
                    value={bulan}
                    onChange={(e) => setBulan(e.target.value)}
                    className="h-10 px-3 rounded-full bg-white border border-white/20 text-sm text-gray-700"
                >
                    {MONTHS.map((m) => (
                        <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                </select>
            )}

            {/* Tahun select — muncul jika Bulanan atau Tahunan */}
            {(periode === "bulanan" || periode === "tahunan") && (
                <select
                    value={tahun}
                    onChange={(e) => setTahun(Number(e.target.value))}
                    className="h-10 px-3 rounded-full bg-white border border-white/20 text-sm text-gray-700"
                >
                    {YEARS.map((y) => (
                        <option key={y} value={y}>{y}</option>
                    ))}
                </select>
            )}
        </div>
    );

    const renderPagination = () => (
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
    );

    return (
        <div className="min-h-screen w-full flex bg-gray-50 overflow-x-hidden">
            <AdminNavbar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="flex-1 min-w-0 flex flex-col bg-gray-50 overflow-x-hidden">
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
                            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Laporan & Export</h1>
                            <p className="text-sm text-gray-500 mt-1">Export data dan laporan.</p>
                        </div>
                        <div className="flex text-center gap-2">
                            {laporanMenu.map((item) => (
                                <button key={item.key} onClick={() => { setActiveLaporan(item.key); getLaporan(item.key) }}
                                    className={`px-3 py-2  text-l font-semibold transition ${activeLaporan === item.key ? 'border-b-[#00203b] border-b-2 transition text-black' : " hover:border-b-2 text-black"
                                        }`} > {item.label}</button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-2 hidden md:block">
                        {/* ── Tab: Produk ── */}
                        {tab === "produk" && (
                            <div className="mt-0 overflow-hidden rounded-2xl bg-white shadow-sm">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#004A7C] px-6 py-4">
                                    <p className="text-xl font-semibold text-white">Laporan Produk</p>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {renderFilterSelects()}
                                        <button onClick={handleExportSAllProduk} className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-white text-gray-700 px-3 shadow-sm transition ">
                                            <CiFileOn size={18} />
                                            <span className="text-xs">Export</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-[500px] w-full">
                                        <thead className="bg-white">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Nama Motor</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Kategori</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Tipe</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Warna</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Harga</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Stok</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Tahun</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Deskripsi</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">status</th>

                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            {pageItems.map((item) => (
                                                console.log('isis dai pageitem', pageItems),
                                                < tr key={item.id_motor} className="transition hover:bg-slate-50" >
                                                    <td className="px-4 py-4 text-sm text-slate-700">{item.nama_motor}</td>
                                                    <td className="px-4 py-4 text-sm text-slate-700">{item.nama_kategori}</td>
                                                    <td className="px-4 py-4 text-sm text-slate-700">{item.nama_tipe}</td>
                                                    <td className="px-4 py-4 text-sm text-slate-700">{item.nama_warna}</td>
                                                    <td className="px-4 py-4 text-sm text-slate-700"> Rp {Number(item.harga).toLocaleString("id-ID")}</td>
                                                    <td className="px-4 py-4 text-sm text-slate-700">{item.stok}</td>
                                                    <td className="px-4 py-4 text-sm text-slate-700">{item.tahun}</td>
                                                    <td className="px-4 py-4 text-sm text-slate-700">{item.deskripsi}</td>
                                                    <td className="px-4 py-4 text-sm text-slate-700">{item.status}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {renderPagination()}
                            </div>
                        )}

                        {/* ── Tab: Pengajuan Kredit ── */}
                        {tab === "pengajuanKredit" && (
                            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                                <div className="flex items-center justify-between bg-[#004A7C] px-6 py-4">
                                    <p className="text-xl font-semibold text-white">Laporan Pengajuan</p>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {renderFilterSelects()}
                                        <button onClick={handleExportSAllProduk} className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-white text-gray-700 px-3 shadow-sm transition ">
                                            <CiFileOn size={18} />
                                            <span className="text-xs">Export</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-[600px] w-full">
                                        <thead className="bg-white">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Nama</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">No HP</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Alamat</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Pekerjaan</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Motor</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Harga</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Tanggal</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            {pageItems.map((item) => (
                                                <tr key={item.id_pengajuan} className="transition hover:bg-slate-50">
                                                    <td className="px-4 py-4 text-sm text-slate-700">{item.nama}</td>
                                                    <td className="px-4 py-4 text-sm text-slate-700">{item.no_hp}</td>
                                                    <td className="px-4 py-4 text-sm text-slate-700">{item.alamat}</td>
                                                    <td className="px-4 py-4 text-sm text-slate-700">{item.pekerjaan}</td>
                                                    <td className="px-4 py-4 text-sm text-slate-700">{item.nama_motor}</td>
                                                    <td className="px-4 py-4 text-sm text-slate-700">Rp. {Number(item.harga).toLocaleString('id-ID')}</td>
                                                    <td className="px-4 py-4 text-sm text-slate-700"> {new Date(item.tanggal_pengajuan).toLocaleDateString("id-ID")}</td>
                                                    <td className="px-4 py-4 text-sm text-slate-700">{item.status}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {renderPagination()}
                            </div>
                        )}

                        {/* ── Tab: Contact ── */}
                        {tab === "contact" && (
                            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                                <div className="flex items-center justify-between bg-[#004A7C] px-6 py-4">
                                    <p className="text-xl font-semibold text-white">Laporan Contact</p>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {renderFilterSelects()}
                                        <button onClick={handleExportSAllProduk} className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-white text-gray-700 px-3 shadow-sm transition ">
                                            <CiFileOn size={18} />
                                            <span className="text-xs">Export</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-[600px] w-full">
                                        <thead className="bg-white">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Nama</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Email</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Subjek</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Pesan</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">No HP</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            {pageItems.map((item) => (
                                                <tr key={item.id_message} className="transition hover:bg-slate-50">
                                                    <td className="px-4 py-4 text-sm text-slate-700">{item.nama}</td>
                                                    <td className="px-4 py-4 text-sm text-slate-700">{item.email}</td>
                                                    <td className="px-4 py-4 text-sm text-slate-700">{item.subjek}</td>
                                                    <td className="px-4 py-4 text-sm text-slate-700">{item.pesan}</td>
                                                    <td className="px-4 py-4 text-sm text-slate-700">{item.no_hp}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {renderPagination()}
                            </div>
                        )}

                        {/* ── Tab: Testimoni ── */}
                        {tab === "testimoni" && (
                            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                                <div className="flex items-center justify-between bg-[#004A7C] px-6 py-4">
                                    <p className="text-xl font-semibold text-white">Laporan Testimoni</p>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {renderFilterSelects()}
                                        <button onClick={handleExportSAllProduk} className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-white text-gray-700 px-3 shadow-sm transition ">
                                            <CiFileOn size={18} />
                                            <span className="text-xs">Export</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="min-w-[600px] w-full">
                                        <thead className="bg-white">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Nama</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Pekerjaan</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Isi Testimoni</th>
                                                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Rating</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white">
                                            {pageItems.map((item) => (
                                                <tr key={item.id_testimoni} className="transition hover:bg-slate-50">
                                                    <td className="px-4 py-4 text-sm text-slate-700">{item.nama}</td>
                                                    <td className="px-4 py-4 text-sm text-slate-700">{item.pekerjaan}</td>
                                                    <td className="px-4 py-4 text-sm text-slate-700">{item.isi_testimoni}</td>
                                                    <td className="px-4 py-4 text-sm text-slate-700">{item.rating}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {renderPagination()}
                            </div>
                        )}
                    </div>

                    {/* mobile */}
                    <div className="md:hidden space-y-4  rounded-xl">
                        {/* ── Tab: Produk ── */}
                        {tab === "produk" && (
                            <div className=" rounded-xl bg-white shadow p-4">
                                <div className="flex rounded-xl sm:flex-row items-center sm:items-center justify-between gap-3 bg-[#004A7C] px-6 py-4">
                                    <p className="text-xl font-semibold text-white">Laporan Produk Motor</p>
                                    <div className="flex  items-center gap-2">
                                        {renderFilterSelects()}
                                        <button onClick={handleExportSAllProduk} className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-white text-gray-700 px-3 shadow-sm transition ">
                                            <CiFileOn size={18} />
                                            <span className="text-xs">Export</span>
                                        </button>
                                    </div>
                                </div>
                                {pageItems.map((item) => (
                                    <div className="bg-white shadow p-4 rounded-xl mb-4">
                                        <div className="mt-6">
                                            <div className="flex justify-between items-center border-b mb-2">
                                                <p className="text-sm text-gray-600 mb-2">Nama Motor</p>
                                                <p className="text-sm font-medium">{item.nama_motor}</p>
                                            </div>

                                            <div className="flex justify-between items-center border-b mb-2">
                                                <p className="text-sm text-gray-600 mb-2">Kategori</p>
                                                <p className="text-sm font-medium">{item.nama_kategori}</p>
                                            </div>
                                            <div className="flex justify-between items-center border-b mb-2">
                                                <p className="text-sm text-gray-600 mb-2">Tipe</p>
                                                <p className="text-sm font-medium">{item.nama_tipe}</p>
                                            </div>
                                            <div className="flex justify-between items-center border-b mb-2">
                                                <p className="text-sm text-gray-600 mb-2">Warna</p>
                                                <p className="text-sm font-medium">{item.nama_warna}</p>
                                            </div>
                                            <div className="flex justify-between items-center border-b mb-2">
                                                <p className="text-sm text-gray-600 mb-2">Stok</p>
                                                <p className="text-sm font-medium">{item.stok}</p>
                                            </div>
                                            <div className="flex justify-between items-center border-b mb-2">
                                                <p className="text-sm text-gray-600 mb-2">Tahun</p>
                                                <p className="text-sm font-medium">{item.tahun}</p>
                                            </div>
                                            <div className="flex justify-between items-center border-b mb-2 w-54 text-right">
                                                <p className="text-sm text-gray-600 mb-3">Deskripsi</p>
                                                <p className="text-sm font-medium mb-1">{item.deskripsi}</p>
                                            </div>
                                            <div className="flex justify-between items-center border-b mb-2">
                                                <p className="text-sm text-gray-600 mb-2">Status</p>
                                                <p className="text-sm font-medium">{item.status}</p>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                                {renderPagination()}
                            </div>
                        )}

                        {/* ── Tab: Pengajuan Kredit ── */}
                        {tab === "pengajuanKredit" && (
                            <div className=" rounded-xl bg-white shadow p-4">
                                <div className="flex rounded-xl sm:flex-row items-center sm:items-center justify-between gap-3 bg-[#004A7C] px-6 py-4">
                                    <p className="text-xl font-semibold text-white">Laporan Pengajuan Kredit</p>
                                    <div className="flex items-center gap-2">
                                        {renderFilterSelects()}
                                        <button onClick={handleExportSAllProduk} className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-white text-gray-700 px-3 shadow-sm transition ">
                                            <CiFileOn size={18} />
                                            <span className="text-xs">Export</span>
                                        </button>
                                    </div>
                                </div>
                                {pageItems.map((item) => (
                                    <div className="bg-white shadow p-4 rounded-xl mb-4">
                                        <div className="mt-6">
                                            <div className="flex justify-between items-center border-b mb-2">
                                                <p className="text-sm text-gray-600 mb-2">Nama</p>
                                                <p className="text-sm font-medium">{item.nama}</p>
                                            </div>

                                            <div className="flex justify-between items-center border-b mb-2">
                                                <p className="text-sm text-gray-600 mb-2">No Headphone</p>
                                                <p className="text-sm font-medium">{item.no_hp}</p>
                                            </div>
                                            <div className="flex justify-between items-center border-b mb-2">
                                                <p className="text-sm text-gray-600 mb-2">Alamat</p>
                                                <p className="text-sm font-medium">{item.alamat}</p>
                                            </div>

                                            <div className="flex justify-between items-center border-b mb-2">
                                                <p className="text-sm text-gray-600 mb-2">pekerjaan</p>
                                                <p className="text-sm font-medium">{item.pekerjaan}</p>
                                            </div>
                                            <div className="flex justify-between items-center border-b mb-2">
                                                <p className="text-sm text-gray-600 mb-2">Motor</p>
                                                <p className="text-sm font-medium">{item.nama_motor}</p>
                                            </div>

                                            <div className="flex justify-between items-center border-b mb-2">
                                                <p className="text-sm text-gray-600 mb-2">Tanggal</p>
                                                <p className="text-sm font-medium"> {new Date(item.tanggal_pengajuan).toLocaleDateString("id-ID")}</p>
                                            </div>
                                            <div className="flex justify-between items-center border-b mb-2">
                                                <p className="text-sm text-gray-600 mb-2">Status</p>
                                                <p className="text-sm font-medium bg-">{item.status}</p>
                                            </div>
                                        </div>

                                    </div>
                                ))}
                                {renderPagination()}
                            </div>
                        )}

                        {/* ── Tab: Contact ── */}
                        {tab === "contact" && (
                            <div className=" rounded-xl bg-white shadow p-4">
                                <div className="flex rounded-xl sm:flex-row items-center sm:items-center justify-between gap-3 bg-[#004A7C] px-6 py-4">
                                    <p className="text-xl font-semibold text-white">Laporan Contact</p>
                                    <div className="flex items-center gap-2 ">
                                        {renderFilterSelects()}
                                        <button onClick={handleExportSAllProduk} className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-white text-gray-700 px-3 shadow-sm transition ">
                                            <CiFileOn size={18} />
                                            <span className="text-xs">Export</span>
                                        </button>
                                    </div>
                                </div>
                                {pageItems.map((item) => (
                                    <div className="bg-white shadow p-4 rounded-xl mb-4">
                                        <div className="mt-6">
                                            <div className="flex justify-between items-center border-b mb-2">
                                                <p className="text-sm text-gray-600 mb-2">Nama</p>
                                                <p className="text-sm font-medium">{item.nama}</p>
                                            </div>

                                            <div className="flex justify-between items-center border-b mb-2">
                                                <p className="text-sm text-gray-600 mb-2">Email</p>
                                                <p className="text-sm font-medium">{item.email}</p>
                                            </div>
                                            <div className="flex justify-between items-center border-b mb-2">
                                                <p className="text-sm text-gray-600 mb-2">Subjek</p>
                                                <p className="text-sm font-medium">{item.subjek}</p>
                                            </div>
                                            <div className="flex justify-between items-center border-b mb-2">
                                                <p className="text-sm text-gray-600 mb-2">Pesan</p>
                                                <p className="text-sm font-medium">{item.pesan}</p>
                                            </div>
                                            <div className="flex justify-between items-center border-b mb-2">
                                                <p className="text-sm text-gray-600 mb-2">No Headphone</p>
                                                <p className="text-sm font-medium">{item.no_hp}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {renderPagination()}
                            </div>

                        )}

                        {/* ── Tab: Testimoni ── */}
                        {tab === "testimoni" && (
                            <div className=" rounded-xl bg-white shadow p-4">
                                <div className="flex rounded-xl sm:flex-row items-center sm:items-center justify-between gap-3 bg-[#004A7C] px-6 py-4">
                                    <p className="text-xl font-semibold text-white">Laporan Testimoni</p>
                                    <div className="flex items-center gap-2 ">
                                        {renderFilterSelects()}
                                        <button onClick={handleExportSAllProduk} className="inline-flex h-10 items-center gap-2 rounded-full border border-white/20 bg-white text-gray-700 px-3 shadow-sm transition ">
                                            <CiFileOn size={18} />
                                            <span className="text-xs">Export</span>
                                        </button>
                                    </div>
                                </div>
                                {pageItems.map((item) => (
                                    <div className="bg-white shadow p-4 rounded-xl mb-4">
                                        <div className="mt-6">
                                            <div className="flex justify-between items-center border-b mb-2">
                                                <p className="text-sm text-gray-600 mb-2">Nama</p>
                                                <p className="text-sm font-medium">{item.nama}</p>
                                            </div>

                                            <div className="flex justify-between items-center border-b mb-2">
                                                <p className="text-sm text-gray-600 mb-2">Pekerjaan</p>
                                                <p className="text-sm font-medium">{item.pekerjaan}</p>
                                            </div>
                                            <div className="flex justify-between items-center border-b mb-2">
                                                <p className="text-sm text-gray-600 mb-3 w-72">Isi Testimoni</p>
                                                <p className="text-sm font-medium text-right mb-2">{item.isi_testimoni}</p>
                                            </div>
                                            <div className="flex justify-between items-center border-b mb-2">
                                                <p className="text-sm text-gray-600 mb-2">Rating</p>
                                                <p className="text-sm font-medium">{item.rating}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {renderPagination()}
                            </div>
                        )}
                    </div>
                </main>
            </div >
        </div >
    )
}

export default Exam
