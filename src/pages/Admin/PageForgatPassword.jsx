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
    const [infoDealer, setInfoDealer] = useState([])


    const getInfoDealer = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/footer`);

            const data = await response.json();
            console.log('data footer', data)

            setInfoDealer(data.data[0])
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getInfoDealer()
    }, [])

    const handleSumbit = async (e) => {
        e.preventDefault()

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
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
                    <div className="w-18 h-16 flex items-center justify-center text-white rounded-lg shadow-sm flex-shrink-0">
                        {/* <FaMotorcycle size={28} /> */}
                        <img src={infoDealer.logo} alt={infoDealer.nama_Dealer} className="w-18 h-16 bg-white rounded-full" />
                    </div>
                    <div className="leading-tight min-w-0">
                        <h2 className="text-lg font-bold text-gray-900 truncate">{infoDealer.nama_dealer}</h2>
                        <p className="text-[10px] text-gray-500">{infoDealer.deskripsi}</p>
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
                            <input placeholder="Enter your emaul address" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 " />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-400">Username</label>
                            <input placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 mt-1" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-400">Password Baru</label>
                            <input placeholder="Enter your new password" type="password" value={passwordBaru} onChange={(e) => setPasswordBaru(e.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 mt-1" />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-400">Komfirmasi password</label>
                            <input placeholder="Confirm your password" type="password" value={konfirmasiPassword} onChange={(e) => setKonfirmasiPassword(e.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 mt-1" />
                        </div>
                        <div className="flex gap-4">
                            <button onClick={() => navigate("/admin/login")} className=" w-full rounded-lg border border-gray-200 bg-white px-5 py-2 font-medium text-gray-700  hover:text-[#00182F] transition  hover:border-blue-400 hover:ring-2 hover:ring-[3E6F1F7]  mt-2">Cancel</button>
                            <button type="button" onClick={handleSumbit} className=" w-full rounded-lg border border-gray-200 bg-[#002446] px-5 py-2 font-medium text-white   mt-2 ">Continue</button>
                        </div>
                    </div>
                </div>

            </div>
            {/* </div> */}
        </>
    )
}