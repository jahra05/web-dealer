import { useState, useEffect, useRef } from "react";
import { BiUser } from "react-icons/bi";
import { LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function UserMenuDropdwn() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    // Tutup dropdown saat klik di luar
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

    const handleLogout = () => {
        localStorage.clear();
        navigate('/admin/login');
    };

    return (
        <div ref={dropdownRef} className="relative">
            {/* Avatar button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-10 h-10 rounded-full bg-red-600 text-white font-bold text-sm flex items-center justify-center hover:bg-red-700 transition-colors shadow-sm"
                aria-label="User menu"
            >
                A
            </button>

            {/* Dropdown */}
            <div
                className={`absolute right-0 z-20 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden transition-all duration-200 origin-top-right ${
                    isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                }`}
            >
                {/* User info */}
                <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                            <BiUser size={22} className="text-gray-500" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">Admin</p>
                            <p className="text-xs text-gray-500 truncate">admin@dayamotor.com</p>
                        </div>
                    </div>
                </div>

                {/* Menu items */}
                <div className="p-1.5">
                    <button
                        onClick={() => { setIsOpen(false); handleLogout(); }}
                        className="flex items-center w-full gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                        <LuLogOut size={18} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
