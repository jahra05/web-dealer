import { use, useEffect, useState } from "react";
import { BiArrowBack, BiEdit, BiTrash } from "react-icons/bi";
import { BsArrowLeft } from "react-icons/bs";
import { FaMotorcycle } from "react-icons/fa6";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import SettingProfileAdmin from "../Admin/SettingProfileAdmin";
import SettingProfileDealer from "../Admin/SettingProfileDealer";
import { RxHamburgerMenu } from "react-icons/rx";
import { pre } from "framer-motion/client";

export default function Setting() {
    const navigate = useNavigate()

    const [tabNav, setTabNav] = useState('profile_delear')
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const openSidebar = () => {
        setIsSidebarOpen(true)
    }

    const closeSidebar = () => {
        setIsSidebarOpen(false)
    }

    const toggleSidebar = () => {
        setIsSidebarOpen((prev) => !prev)
    }
    const navSetting = [
        { path: "profile_delear", label: "Profile Delear" },
        { path: "profile_admin", label: "Profile Admin" },
    ]

    const NavActiv = ({ item, isActive, onClick }) => (
        <li onClick={onClick} className={
            ` list-none cursor-pointer px-4 h-10 w-full flex rounded-xl hover:bg-red-600 hover:text-white items-center text-sm transition-all duration-300 ease-in-out ${isActive ? "bg-red-100 text-red-500" : "text-gray-700 hover:text-white"}`
        }>
            {item.label}
        </li>
    )
    return (
        <>    <button
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
        >
            <RxHamburgerMenu size={24} />
        </button>
            <div className="flex ">
                <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:flex-shrink-0 bg-white border-r border-gray-100" >
                    <div className="p-4">
                        <Link to="/admin/dashboard" className="flex items-center gap-3 no-underline" onClick={closeSidebar}>
                            <div className="w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-lg shadow-sm flex-shrink-0">
                                <FaMotorcycle size={24} />
                            </div>
                            <div className="leading-tight min-w-0">
                                <h2 className="text-base font-bold text-gray-900 truncate">Daya Motor</h2>
                                <p className="text-[10px] text-gray-500">DEALER RESMI HONDA</p>
                            </div>
                        </Link>
                    </div>

                    <nav className="flex-1 px-3 py-2 overflow-y-auto">
                        <ul className="flex flex-col gap-0.5">
                            {navSetting.map((item) => (
                                <NavActiv
                                    key={item.label}
                                    item={item}
                                    isActive={tabNav === item.path}
                                    onClick={() => setTabNav(item.path)}
                                />
                            ))}
                        </ul>
                    </nav>
                </aside>

                <div className={`lg:hidden ${isSidebarOpen ? 'visible' : 'invisible'}`}>
                    <div
                        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}
                        onClick={closeSidebar}
                    />

                    <aside
                        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                            }`}
                    >
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <Link to="/admin/dashboard" className="flex items-center gap-2 p-2">
                                <span className="bg-gray-100 p-1 rounded">
                                    <IoIosArrowBack size={18} />
                                </span>
                                <p className="text-md font-medium">Setting</p>
                            </Link>
                            <button
                                onClick={closeSidebar}
                                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
                                aria-label="Close sidebar"
                            >
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 5l10 10M15 5L5 15" />
                                </svg>
                            </button>
                        </div>

                        <nav className="flex-1 px-4 py-4 overflow-y-auto">
                            <ul className="flex flex-col gap-0.5">
                                {navSetting.map((item) => (
                                    <NavActiv
                                        key={item.label}
                                        item={item}
                                        isActive={tabNav === item.path}
                                        onClick={() => {
                                            closeSidebar(),
                                                setTabNav(item.path)
                                        }}
                                    />
                                ))}
                            </ul>
                        </nav>
                    </aside>
                </div>
                {tabNav === 'profile_delear' && (
                    <>
                        <SettingProfileDealer />
                    </>
                )}
                {tabNav === "profile_admin" && (
                    <>

                        <SettingProfileAdmin />

                    </>
                )}
            </div >
        </>
    )
}