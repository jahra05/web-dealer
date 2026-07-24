import React, { useState } from 'react';
import { MdClose } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';
import { IoWalletOutline, IoWallet } from 'react-icons/io5';
import { BiStore } from 'react-icons/bi';
import { MdEmail } from 'react-icons/md';

const NotificationModal = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState('semua');

    const notifications = {
        semua: [
            {
                id: 1,
                type: 'message',
                title: 'Pesan Baru dari Budi',
                desc: 'Pertanyaan tentang Honda Beat',
                time: '10:30',
                icon: 'mail',
                color: 'blue',
                isNew: true,
            },
            {
                id: 2,
                type: 'pengajuan',
                title: 'Pengajuan Kredit Pending',
                desc: 'Rini mengajukan kredit Honda Vario',
                time: '09:15',
                icon: 'wallet',
                color: 'orange',
                isNew: true,
            },
            {
                id: 3,
                type: 'produk',
                title: 'Produk Baru Ditambahkan',
                desc: 'Honda CB150R tersedia di stok',
                time: '08:45',
                icon: 'store',
                color: 'red',
                isNew: false,
            },
            {
                id: 4,
                type: 'stock',
                title: 'Stock Hampir Habis',
                desc: 'Honda PCX tersisa 5 unit',
                time: 'Kemarin',
                icon: 'alert',
                color: 'yellow',
                isNew: false,
            },
            {
                id: 5,
                type: 'pengajuan',
                title: 'Pengajuan Disetujui',
                desc: 'Siti Aisyah - Honda Scoopy disetujui',
                time: '2 hari lalu',
                icon: 'walletCheck',
                color: 'green',
                isNew: false,
            },
        ],
        message: [
            {
                id: 1,
                type: 'message',
                title: 'Pesan Baru dari Budi',
                desc: 'Pertanyaan tentang Honda Beat',
                time: '10:30',
                icon: 'mail',
                color: 'blue',
                isNew: true,
            },
        ],
        pengajuan: [
            {
                id: 2,
                type: 'pengajuan',
                title: 'Pengajuan Kredit Pending',
                desc: 'Rini mengajukan kredit Honda Vario',
                time: '09:15',
                icon: 'wallet',
                color: 'orange',
                isNew: true,
            },
            {
                id: 5,
                type: 'pengajuan',
                title: 'Pengajuan Disetujui',
                desc: 'Siti Aisyah - Honda Scoopy disetujui',
                time: '2 hari lalu',
                icon: 'walletCheck',
                color: 'green',
                isNew: false,
            },
        ],
        produk: [
            {
                id: 3,
                type: 'produk',
                title: 'Produk Baru Ditambahkan',
                desc: 'Honda CB150R tersedia di stok',
                time: '08:45',
                icon: 'store',
                color: 'red',
                isNew: false,
            },
        ],
        stock: [
            {
                id: 4,
                type: 'stock',
                title: 'Stock Hampir Habis',
                desc: 'Honda PCX tersisa 5 unit',
                time: 'Kemarin',
                icon: 'alert',
                color: 'yellow',
                isNew: false,
            },
        ],
    };

    const renderIcon = (iconType, color) => {
        const iconProps = { size: 24 };
        const bgColorMap = {
            blue: 'bg-blue-100 text-blue-600',
            orange: 'bg-orange-100 text-orange-600',
            red: 'bg-red-100 text-red-600',
            yellow: 'bg-yellow-100 text-yellow-600',
            green: 'bg-green-100 text-green-600',
        };

        const bgClass = bgColorMap[color] || 'bg-gray-100 text-gray-600';

        const iconMap = {
            mail: <MdEmail {...iconProps} />,
            wallet: <IoWalletOutline {...iconProps} />,
            walletCheck: <IoWallet {...iconProps} />,
            store: <BiStore {...iconProps} />,
            alert: <HiOutlineMail {...iconProps} />,
        };

        return (
            <div className={`p-3 rounded-lg flex items-center justify-center ${bgClass}`}>
                {iconMap[iconType] || <HiOutlineMail {...iconProps} />}
            </div>
        );
    };

    const currentNotifications = notifications[activeTab] || [];
    const unreadCount = currentNotifications.filter((n) => n.isNew).length;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-lg max-w-lg w-full max-h-96 flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex justify-between items-center px-6 py-4 border-b border-slate-200">
                    <h2 className="text-xl font-bold text-gray-900">Notifikasi</h2>
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-slate-100 rounded-full transition"
                    >
                        <MdClose size={24} />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 px-6 py-3 border-b border-slate-200 overflow-x-auto">
                    {[
                        { key: 'semua', label: 'Semua' },
                        { key: 'message', label: 'Chat' },
                        { key: 'pengajuan', label: 'Pengajuan' },
                        { key: 'produk', label: 'Produk' },
                        { key: 'stock', label: 'Stock' },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                                activeTab === tab.key
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                            }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Notification List */}
                <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
                    {currentNotifications.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-slate-500">
                            <p>Tidak ada notifikasi</p>
                        </div>
                    ) : (
                        currentNotifications.map((notif) => (
                            <div
                                key={notif.id}
                                className={`p-4 rounded-2xl border transition cursor-pointer hover:shadow-md ${
                                    notif.isNew
                                        ? 'bg-indigo-50 border-indigo-200'
                                        : 'bg-white border-slate-200'
                                }`}
                            >
                                <div className="flex gap-3">
                                    {renderIcon(notif.icon, notif.color)}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="text-sm font-semibold text-gray-900 truncate">
                                                {notif.title}
                                            </h3>
                                            {notif.isNew && (
                                                <div className="w-2 h-2 bg-indigo-600 rounded-full mt-1 flex-shrink-0"></div>
                                            )}
                                        </div>
                                        <p className="text-xs text-slate-600 mt-1 line-clamp-2">{notif.desc}</p>
                                        <p className="text-xs text-slate-500 mt-2">{notif.time}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {currentNotifications.length > 0 && (
                    <div className="px-6 py-3 border-t border-slate-200 bg-slate-50">
                        <button className="w-full text-center text-sm font-semibold text-indigo-600 hover:text-indigo-700">
                            Lihat Semua
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NotificationModal;
