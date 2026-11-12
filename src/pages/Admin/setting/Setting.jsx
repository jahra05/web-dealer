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
import { getFunctionUrl, getSupabaseHeaders, SUPABASE_PUBLISHABLE_KEY, } from "../../../config/supabase";


export default function Setting({ isOpen, onClose }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [settingInfo, setSettingInfo] = useState([])

    const getAllInfo = async () => {
        try {
            const response = await fetch(getFunctionUrl('footer'), {
                headers: {
                    ...getSupabaseHeaders()
                }
            });
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
        { path: "/admin/setting/profile-admin", label: "Profile Admin" },
        { path: "/admin/setting/profile-dealer", label: "profile Dealer" },

        { path: "/admin/setting/hero", label: "Hero" },
        { path: "/admin/setting/footer", label: "Footer" },

        { path: "/admin/setting/kategori", label: "Kategori & Tipe" },

    ]

    // const navSetting = [
    //     {
    //         title: "PROFILE", items: [
    //             { path: "/admin/setting/profile-admin", label: "Profile Admin" },
    //             { path: "/admin/setting/profile-dealer", label: "profile Dealer" },

    //         ]
    //     },
    //     {
    //         title: "TAMPILAN", items: [
    //             { path: "/admin/setting/hero", label: "Hero" },
    //             { path: "/admin/setting/footer", label: "Footer" },

    //         ]
    //     },
    //     {
    //         title: "KATEGORI & TIPE", items: [
    //             { path: "/admin/setting/kategori", label: "Kategori & Tipe" },

    //         ]
    //     }
    // ]

    return (
        <>
            <div className="bg-white w-full" >

                {/* Dekstop */}
                <div className="hidden md:flex gap-8 px-8 pb-4 pt-2 items-center">
                    {navSetting.map((item) => {
                        const isActive = location.pathname === item.path
                        return (
                            <Link to={item.path}
                                className={` whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-200
                            ${isActive
                                        ? "text-[#001323] border-2 border-[#001323]"
                                        : "text-gray-500 hover:text-[#001323] "
                                    }`}
                            >
                                {item.label}
                            </Link>
                        )
                    })}
                </div>
            </div>

            <div className="md:hidden overflow-x-auto scrollbar-hide" >
                <div className="flex flex-center gap-2 px-4 py-3 w-max">

                    {navSetting.map((item) => {
                        const isActive = location.pathname === item.path
                        return (
                            <Link key={item.path} to={item.path} className={`whitespace-nowrap rounded-lg px-3 py-2
                            text-xs font-semibold transition-all duration-200 ${isActive
                                    ? "text-[#001323] border-2 border-[#001323] bg-white" : "text-gray-500 hover:text-[#001323]"
                                }`}>{item.label}</Link>
                        )
                    })}
                </div>
            </div>

        </>

    )
}
