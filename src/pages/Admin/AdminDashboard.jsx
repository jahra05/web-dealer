import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../components/AdminNavbar';
import { RxHamburgerMenu } from 'react-icons/rx';
import { MdNotificationsNone } from 'react-icons/md';
import { FaMotorcycle, FaUserGroup } from 'react-icons/fa6';
import { RiWalletLine } from 'react-icons/ri';
import { HiOutlineMail } from 'react-icons/hi';
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import UserMenuDropdwn from '../../components/UserMenuDropdown';
import NotificationModal from '../../components/NotificationModal';

export default function AdminDashboard() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [dashboard, setDashboard] = useState({
        total_produk: 0,
        total_pengajuan: 0,
        total_testimoni: 0,
        total_faq: 0
    });
    const [chartData, setChartData] = useState([]);
    const [pengajuanTerbaru, setPengajuanTerbaru] = useState([]);
    const [contactTerbaru, setContactTerbaru] = useState([]);
    const [aktivitasTerbaru, setAktifitasTerbaru] = useState([]);


    const getDashboard = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/dashboard");
            const data = await response.json();

            if (data.success) {
                setDashboard(data.data);
                setChartData(data.data.chart_pengajuan);
                setPengajuanTerbaru(data.data.pengajuan_terbaru);
                setContactTerbaru(data.data.contact_terbaru);
                setAktifitasTerbaru(data.data.aktivitas_terbaru);
            }

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDashboard();
    }, []);

    const bulan = [
        "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
        "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
    ];
    const dataChart = bulan.map((nama, index) => {
        const item = chartData.find(d => d.bulan === index + 1);
        return { bulan: nama, jumlah: item ? item.total : 0 };
    });

    return (
        <div className="min-h-screen w-full flex bg-gray-50 overflow-x-hidden">
            <AdminNavbar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

            {/* Main content area */}
            <div className="flex-1 min-w-0 flex flex-col bg-gray-50 overflow-x-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4">
                    <button
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        onClick={() => setIsSidebarOpen(prev => !prev)}
                        aria-label="Toggle sidebar"
                    >
                        <RxHamburgerMenu size={24} />
                    </button>

                    <div className="flex items-center gap-2 ml-auto">
                        <UserMenuDropdwn />
                    </div>
                </div>

                <main className="flex-1 px-4 pb-6 overflow-x-hidden">
                    {/* Dashboard title */}
                    <div className="mb-6">
                        <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Dashboard Admin</h1>
                        <p className="text-sm text-gray-500 mt-1">Ringkasan data dan aktivitas dealer.</p>
                    </div>

                    {/* Stat cards — responsive grid */}
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 mb-6">
                        <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                            <div className="bg-red-100 p-3 w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0">
                                <FaMotorcycle size={22} className="text-red-600" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Motor Tersedia</p>
                                <p className="text-xl font-bold text-gray-900">{dashboard.total_produk} <span className="text-xs font-medium text-gray-400">Unit</span></p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                            <div className="bg-orange-100 p-3 w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0">
                                <RiWalletLine size={22} className="text-orange-600" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Pengajuan Kredit</p>
                                <p className="text-xl font-bold text-gray-900">{dashboard.total_pengajuan} <span className="text-xs font-medium text-gray-400">Masuk</span></p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                            <div className="bg-blue-100 p-3 w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0">
                                <HiOutlineMail size={22} className="text-blue-600" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Testimoni</p>
                                <p className="text-xl font-bold text-gray-900">{dashboard.total_testimoni} <span className="text-xs font-medium text-gray-400">Baru</span></p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm border border-gray-100">
                            <div className="bg-green-100 p-3 w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0">
                                <FaUserGroup size={22} className="text-green-600" />
                            </div>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">FAQ</p>
                                <p className="text-xl font-bold text-gray-900">{dashboard.total_faq} <span className="text-xs font-medium text-gray-400">Item</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Main grid: chart + side panels */}
                    <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
                        {/* Left column: chart + recent applications */}
                        <div className="lg:col-span-2 flex flex-col gap-4">
                            {/* Chart */}
                            <div className="rounded-2xl bg-white p-4 lg:p-6 shadow-sm border border-gray-100">
                                <h2 className="text-sm font-semibold text-gray-900 mb-4">Grafik Pengajuan Kredit</h2>
                                <div className="w-full overflow-x-auto">
                                    <div className="min-w-[400px] lg:min-w-0">
                                        <LineChart
                                            width={600}
                                            height={280}
                                            data={dataChart}
                                            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                                            <XAxis dataKey="bulan" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                                            <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} width={50} />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#fff',
                                                    borderColor: '#e2e8f0',
                                                    borderRadius: '0.75rem',
                                                }}
                                            />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="jumlah"
                                                stroke="#2563EB"
                                                strokeWidth={2}
                                                dot={{ fill: '#2563EB' }}
                                                activeDot={{ r: 6 }}
                                            />
                                        </LineChart>
                                    </div>
                                </div>
                            </div>

                            {/* Recent applications table */}
                            <div className="rounded-2xl bg-white p-4 lg:p-6 shadow-sm border border-gray-100">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">Pengajuan Kredit Terbaru</h2>
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Nama</th>
                                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Motor</th>
                                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Tanggal</th>
                                                <th className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {pengajuanTerbaru.map((item) => (
                                                <tr key={item.id_pengajuan} className="hover:bg-gray-50">
                                                    <td className="px-3 py-3 text-sm text-gray-700 whitespace-nowrap">{item.nama}</td>
                                                    <td className="px-3 py-3 text-sm text-gray-700 whitespace-nowrap">{item.nama_motor}</td>
                                                    <td className="px-3 py-3 text-sm text-gray-700 whitespace-nowrap">{item.tanggal_pengajuan}</td>
                                                    <td className="px-3 py-3 text-sm whitespace-nowrap">
                                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">{item.status}</span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Right column: contacts + activity */}
                        <div className="flex flex-col gap-4">
                            {/* Contact Us */}
                            <div className="rounded-2xl bg-white p-4 lg:p-6 shadow-sm border border-gray-100">
                                <h2 className="text-sm font-semibold text-gray-900 mb-4">Contact Us</h2>
                                <div className="space-y-4">
                                    {contactTerbaru.map((item) => (
                                        <div key={item.id_message} className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="bg-red-600 text-white flex items-center justify-center text-sm font-bold w-8 h-8 rounded-full flex-shrink-0">
                                                    {item.nama.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-semibold text-gray-900 truncate">{item.nama}</p>
                                                    <p className="text-xs text-gray-500 truncate">{item.subjek}</p>
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-gray-400 flex-shrink-0">
                                                {new Date(item.created_at).toLocaleDateString("id-ID")}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* Aktivitas Terbaru */}
                            <div className="rounded-2xl bg-white p-4 lg:p-6 shadow-sm border border-gray-100">
                                <h2 className="text-sm font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h2>
                                <div className="space-y-4">
                                    {aktivitasTerbaru.map((item, index) => (
                                        <div key={index} className="flex items-center justify-between gap-3">
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="bg-orange-100 w-9 h-9 flex items-center justify-center rounded-xl flex-shrink-0">
                                                    <span className="text-orange-600 text-xs font-bold">
                                                        {item.nama ? item.nama.charAt(0).toUpperCase() : '?'}
                                                    </span>
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-semibold text-gray-900 truncate">{item.nama}</p>
                                                    <p className="text-xs text-gray-500 truncate">{item.aktivitas}</p>
                                                </div>
                                            </div>
                                            <p className="text-[10px] text-gray-400 flex-shrink-0">
                                                {new Date(item.tanggal).toLocaleDateString("id-ID")}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
