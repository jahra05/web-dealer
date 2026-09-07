import { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import { Outlet, useLocation } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import Notifikasi from "../components/Notifikasi";
import UserMenuDropdwn from "../components/UserMenuDropdown";

export default function AdminLayout() {
    const [sidebar, setSidebar] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const isSettingPage = location.pathname.startsWith('/admin/setting')


    return (
        <div className="min-h-screen flex">
            <AdminNavbar sidebar={sidebar} setSidebar={setSidebar} isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)} />

            {/* <div className="flex-1 min-w-0 flex flex-col bg-gray-50 overflow-x-hidden"> */}
            {/* Header */}

            <div className={`fixed top-0 right-0 left-0 ${sidebar ? 'lg:left-40' : 'lg:left-64'} z-20 bg-gray-50`}>
                <div className="flex items-center justify-between gap-3 p-4">

                    <div className="flex items-center gap-4 w-full sm:w-auto">

                        <button
                            className="lg:hidden flex-shrink-0 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setIsSidebarOpen(prev => !prev)}
                        >
                            <RxHamburgerMenu size={24} />
                        </button>
                    </div>
                    {!isSettingPage && (

                        <div className="flex items-center gap-2">
                            <Notifikasi />
                            <UserMenuDropdwn />
                        </div>
                    )}

                </div>
            </div>


            {/* </div> */}

            <main className="flex-1">
                <Outlet />
            </main>
        </div>
    )
}