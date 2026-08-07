import { useEffect, useState } from "react";
import AdminNavbar from "../../components/AdminNavbar";
import { Link, useNavigate } from "react-router-dom";
import { FaMotorcycle } from "react-icons/fa6";

export default function PageForgatPassword() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [passwordBaru, setPasswordBaru] = useState("")
    const [konfirmasiPassword, setKonfirmasiPassword] = useState("")
    const navigate = useNavigate()

    const handleSumbit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch("http://localhost:3000/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username, email, passwordBaru, konfirmasiPassword
                })
            })
            const data = await response.json()

            if (data.success) {
                alert(data.message)
                navigate("/admin/login")
            } else {
                alert(data.message)
            }
        } catch (error) {
            console.error(error)
            alert("tidak dapat terhubung keserver")
        }
    }

    return (
        <>
            <div className="p-4">
                {/* <Link to="/admin/dashboard" className="flex items-center gap-3 no-underline"> */}
                <div className="flex items-center gap-3 no-underline">
                    <div className="w-11 h-11 flex items-center justify-center bg-red-600 text-white rounded-lg shadow-sm flex-shrink-0">
                        <FaMotorcycle size={28} />
                    </div>
                    <div className="leading-tight min-w-0">
                        <h2 className="text-lg font-bold text-gray-900 truncate">Daya Motor</h2>
                        <p className="text-[10px] text-gray-500">DEALER RESMI HONDA</p>
                    </div>
                </div>

                {/* </Link> */}
            </div>

            <div className="flex justify-center ">
                <div className="w-full max-w-xl  p-2 mt-20 rounded-2xl ">
                    <div className="px-6 py-8 border-b border-gray-100 text-center">
                        <h2 className="text-5xl font-bold text-gray-600">Reset your password</h2>
                        <p className="mt-4 text-sm text-gray-500">And now you can type new password and confirm it below</p>
                    </div>
                    <div className="px-6 py-8 grid gap-4 md:grid-cols-1">
                        <div>
                            <label className="text-sm font-medium text-gray-400">Email</label>
                            <input placeholder="Enter your emaul address" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100 " />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-400">Username</label>
                            <input placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100 mt-1" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-400">Password Baru</label>
                            <input placeholder="Enter your new password" type="password" value={passwordBaru} onChange={(e) => setPasswordBaru(e.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100 mt-1" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-400">Komfirmasi password</label>
                            <input placeholder="Confirm your password" type="password" value={konfirmasiPassword} onChange={(e) => setKonfirmasiPassword(e.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100 mt-1" />
                        </div>
                        <div className="flex gap-4">
                            <button onClick={() => navigate("/admin/login")} className=" w-full rounded-lg border border-gray-200 bg-white px-5 py-2 font-medium text-gray-700  hover:text-red-700 transition  hover:border-red-400 hover:ring-2 hover:ring-red-100  mt-2">Cancel</button>
                            <button type="button" onClick={handleSumbit} className=" w-full rounded-lg border border-gray-200 bg-red-700 px-5 py-2 font-medium text-white   mt-2 ">Continue</button>
                        </div>
                    </div>
                </div>

            </div>
            {/* </div> */}
        </>
    )
}