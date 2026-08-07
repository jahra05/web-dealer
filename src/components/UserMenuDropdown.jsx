import { button, tr } from "framer-motion/client";
import { useState, useEffect, useRef } from "react";
import { BiUser } from "react-icons/bi";
import { CiSettings } from "react-icons/ci";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function UserMenuDropdwn() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const [user, setUser] = useState([])
    // Tutup dropdown saat klik di luar

    const getUser = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/user");

            const data = await response.json();
            setUser(data.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getUser()
    }, [])
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const menuSelect = [
        { label: 'Logout', icon: LuLogOut, onclick: () => { localStorage.clear(); navigate("/admin/login") } },
        { label: 'Setting', icon: CiSettings, onclick: () => navigate('/admin/setting') }
    ]

    return (
        <div ref={dropdownRef} className="relative">
            {/* Avatar button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full bg-red-600 text-white font-bold text-sm flex items-center justify-center hover:bg-red-700 transition-colors shadow-sm"
                aria-label="User menu"
            >
                <img src={`http://localhost:3000/uploads/${user.foto}`} className="rounded-full h-10 w-10 object-cover" />
            </button>

            {/* Dropdown */}
            <div
                className={`absolute right-0 z-20 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 origin-top-right ${isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                    }`}
            >
                {/* User info */}
                <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                            <img src={`http://localhost:3000/uploads/${user.foto}`} className="rounded-full h-10 w-10 object-cover" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">{user.username}</p>
                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                    </div>
                </div>

                {/* Menu items */}
                <div className="p-1.5">
                    {menuSelect.map((item) => {
                        const Icon = item.icon
                        return (
                            <button key={item.label} onClick={item.onclick}
                                className="flex items-center w-full gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                                <Icon size={20} />
                                <span className="text-ms">{item.label}</span>
                            </button>
                        )
                    })}
                </div>
            </div>
        </div >
    );
}
