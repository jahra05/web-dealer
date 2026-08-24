import { use, useEffect, useState } from "react";
import { BiArrowBack, BiEdit, BiTrash } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { FaMotorcycle } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SettingProfileAdmin from "./SettingProfileAdmin";
import SettingProfileDealer from "./SettingProfileDealer";
import { RxHamburgerMenu } from "react-icons/rx";
import { pre, title } from "framer-motion/client";

export default function Setting({ isOpen, onClose }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [settingInfo, setSettingInfo] = useState([])

    const getAllInfo = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/footer`);
            const data = await response.json();
            setSettingInfo(data.data[0])
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllInfo()
    }, [])

    const navSetting = [
        {
            title: "PROFILE", items: [
                { path: "/admin/setting/profile-admin", label: "Profile Admin" },
                { path: "/admin/setting/profile-dealer", label: "profile Dealer" },

            ]
        },
        {
            title: "TAMPILAN", items: [
                { path: "/admin/setting/hero", label: "Hero" },
                { path: "/admin/setting/footer", label: "Footer" },

            ]
        },
        {
            title: "KATEGORI & TIPE", items: [
                { path: "/admin/setting/dataMaster", label: "Produk" },

            ]
        }
    ]

    return (
        <>
            {/* DESKTOP */}
            <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:flex-shrink-0 bg-white border-r border-gray-100 sticky top-0 h-screen rounded-lg">
                <div className="p-4 border-b border-gray-100">
                    <Link to="/admin/dashboard" className="flex items-center gap-3 no-underline">
                        <div className="w-14 h-14 flex items-center justify-center bg-white text-white rounded-lg shadow-sm flex-shrink-0">
                            <img src={settingInfo.logo} alt={settingInfo.nama_dealer} className='w-14 h-14 bg-white rounded-full' />
                        </div>
                        <div className="leading-tight min-w-0">
                            <h2 className="text-lg font-bold text-gray-900 truncate">{settingInfo.nama_dealer}</h2>
                            <p className="text-[10px] text-gray-500">{settingInfo.title}</p>
                        </div>
                    </Link>
                </div>
                <nav className="flex-1 px-3 py-2 overflow-y-auto">
                    <p className="px-3 mb-4 text-[13px] font-semibold tracking-wider text-gray-400">
                        PENGATURAN
                    </p>
                    {/* <div className="mb-5"> */}
                    {navSetting.map((group) => (
                        <div key={group.title} className="mb-5">
                            <p className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-gray-400">{group.title}</p>
                            <ul className="space-y-1">
                                {group.items.map((item) => {
                                    const isActive = location.pathname === item.path

                                    return (
                                        <li key={item.path} className="list-none">
                                            <Link to={item.path} onClick={onClose} className={`flex items-center px-4 py-3 w-full rounded-xl text-sm font-semibold transition-all duration-200 ${isActive
                                                ? "bg-[#002446] text-[#F2F8FC]"
                                                : "text-gray-700 hover:bg-[#F2F8FC] hover:text-[#002446]"
                                                }`}>{item.label}</Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    ))}
                    {/* </div> */}
                    {/* <ul className="space-y-1">
                        {navSetting.map((item) => {
                            const isActive = location.pathname === item.path

                            return (
                                <li key={item.path} className="list-none">
                                    <Link to={item.path} onClick={onClose} className={`flex items-center px-4 py-3 w-full rounded-xl text-sm font-semibold transition-all duration-200 ${isActive
                                        ? "bg-[#002446] text-[#F2F8FC]"
                                        : "text-gray-700 hover:bg-[#F2F8FC] hover:text-[#002446]"
                                        }`}>{item.label}</Link>
                                </li>
                            )
                        })}
                    </ul> */}
                </nav>
            </aside>

            {/* MOBILE */}
            <div className={`lg:hidden ${isOpen ? 'visible' : 'invisible'}`}>
                <div
                    className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                    onClick={onClose}
                />

                <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                    <div className="flex items-center justify-between p-4 border-b border-gray-100">
                        <Link to="/admin/dashboard" onClick={onClose} className="flex items-center gap-2">
                            <img src={settingInfo.logo} alt={settingInfo.nama_dealer} className="w-16 h-16 rounded-full object-cover" />
                        </Link>
                        <button onClick={onClose} className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors" aria-label="Close sidebar">x</button>
                    </div>
                    <nav className="flex-1 px-3 py-2 overflow-y-auto">
                        <p className="px-3 mb-4 text-[13px] font-semibold tracking-wider text-gray-400">
                            PENGATURAN
                        </p>
                        {/* <div className="mb-5"> */}
                        {navSetting.map((group) => (
                            <div key={group.title} className="mb-5">
                                <p className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-gray-400">{group.title}</p>
                                <ul className="space-y-1">
                                    {group.items.map((item) => {
                                        const isActive = location.pathname === item.path

                                        return (
                                            <li key={item.path} className="list-none">
                                                <Link to={item.path} onClick={onClose} className={`flex items-center px-4 py-3 w-full rounded-xl text-sm font-semibold transition-all duration-200 ${isActive
                                                    ? "bg-[#002446] text-[#F2F8FC]"
                                                    : "text-gray-700 hover:bg-[#F2F8FC] hover:text-[#002446]"
                                                    }`}>{item.label}</Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        ))}
                        {/* </div> */}
                        {/* <ul className="space-y-1">
                        {navSetting.map((item) => {
                            const isActive = location.pathname === item.path

                            return (
                                <li key={item.path} className="list-none">
                                    <Link to={item.path} onClick={onClose} className={`flex items-center px-4 py-3 w-full rounded-xl text-sm font-semibold transition-all duration-200 ${isActive
                                        ? "bg-[#002446] text-[#F2F8FC]"
                                        : "text-gray-700 hover:bg-[#F2F8FC] hover:text-[#002446]"
                                        }`}>{item.label}</Link>
                                </li>
                            )
                        })}
                    </ul> */}
                    </nav>
                </aside>
            </div>
        </>

    )
}
