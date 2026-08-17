import { useEffect, useState } from "react";
import CustomAlert from "../../components/CustomAlert"
import AdminNavbar from "../../components/AdminNavbar";
import { Link, useNavigate } from "react-router-dom";
import { FaMotorcycle } from "react-icons/fa6";
import { m } from "framer-motion";

export default function PageForgatPassword() {
    const [email, setEmail] = useState("")
    const [otp, setOtp] = useState("");
    const [passwordBaru, setPasswordBaru] = useState("")
    const [konfirmasiPassword, setKonfirmasiPassword] = useState("")

    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const [infoDealer, setInfoDealer] = useState([])
    const [alert, setAlert] = useState(null)


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

    const handleSendOtp = async (e) => {
        e.preventDefault();

        if (!email) {
            setAlert({
                type: 'warning',
                message: "Silahkan masukan email terlebih dahulu"
            })
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/sendOtp`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email
                })
            })
            const data = await response.json();
            if (data.success) {
                setAlert({
                    type: 'success',
                    message: data.message
                })
                setStep(2)
            } else {
                setAlert({
                    type: 'error',
                    message: data.message
                })
            }

        } catch (error) {
            console.error(error);
            setAlert({
                type: "error",
                message: "Tidak dapat terhubung ke server"
            })
        } finally {
            setLoading(false)
        }
    }

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!otp || !passwordBaru || !konfirmasiPassword) {
            setAlert({
                type: "warning",
                message: "isi semua field"
            });
            return;
        }

        if (passwordBaru !== konfirmasiPassword) {
            setAlert({
                type: "error", message: "Konfirmasi password tidak sesuai"
            })
            return;
        }

        try {
            setLoading(true)

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    otp, email, passwordBaru, konfirmasiPassword
                })
            })
            const data = await response.json()

            if (data.success) {
                setAlert({ type: 'success', message: data.message })

                setTimeout(() => {
                    navigate("/admin/login")
                }, 1500);
            } else {
                setAlert({ type: 'error', message: data.message })
            }
        } catch (error) {
            console.error(error)
            setAlert({ type: 'error', message: 'tidak dapat terhubung ke server' })
        }
    }

    // const handleSumbit = async (e) => {
    //     e.preventDefault()

    //     try {
    //         const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 username, email, passwordBaru, konfirmasiPassword
    //             })
    //         })
    //         const data = await response.json()

    //         if (data.success) {
    //             setAlert({ type: 'success', message: data.message })
    //             navigate("/admin/login")
    //         } else {
    //             setAlert({ type: 'error', message: data.message })
    //         }
    //     } catch (error) {
    //         console.error(error)
    //         setAlert({ type: 'error', message: 'tidak dapat terhubung ke server' })
    //     }
    // }

    return (
        <>
            <div className="p-4">
                <div className="flex items-center gap-3 no-underline">
                    <div className="w-18 h-16 flex items-center justify-center text-white rounded-lg shadow-sm flex-shrink-0">
                        <img src={infoDealer.logo} alt={infoDealer.nama_Dealer} className="w-18 h-16 bg-white rounded-full" />
                    </div>
                    <div className="leading-tight min-w-0">
                        <h2 className="text-lg font-bold text-gray-900 truncate">{infoDealer.nama_dealer}</h2>
                        <p className="text-[10px] text-gray-500">{infoDealer.title}</p>
                    </div>
                </div>

            </div>

            <div className="flex justify-center ">
                {alert && <CustomAlert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
                <div className="w-full max-w-xl  p-2 mt-20 rounded-2xl ">
                    <div className="px-6 py-8 border-b border-gray-100 text-center">
                        <h2 className="text-5xl font-bold text-gray-600">Reset your password</h2>
                        <p className="mt-4 text-sm text-gray-500">And now you can type new password and confirm it below</p>
                    </div>

                    <div className="px-6 py-8 grid gap-4 md:grid-cols-1">
                        {step === 1 ? (
                            <>
                                <div>
                                    <label className="text-sm font-medium text-gray-400">Email</label>
                                    <input placeholder="Email" title="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 truncate-placeholder" />
                                </div>
                                <div className="flex gap-4">

                                    <button
                                        type="button"
                                        onClick={() => navigate("/admin/login")}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-5 py-2 font-medium text-gray-700 hover:text-[#00182F] transition hover:border-blue-400 mt-2"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleSendOtp}
                                        disabled={loading}
                                        className="w-full rounded-lg bg-[#002446] px-5 py-2 font-medium text-white mt-2 disabled:opacity-50"
                                    >
                                        {loading ? "Mengirim..." : "Kirim OTP"}
                                    </button>

                                </div>
                            </>
                        ) : (
                            <>
                                <div>
                                    <label className="text-sm font-medium text-gray-400">Kode OTP</label>
                                    <input type="text" inputMode="numeric" maxLength={6} placeholder="Masukan kode OTP" title="Kode OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="mt-1 w-full rounded-e-lg border border-gray-200 px-4 py-5 " />
                                </div>


                                <div>
                                    <label className="text-sm font-medium text-gray-400">Password Baru</label>
                                    <input placeholder="Password Baru" title="Password Baru" type="password" value={passwordBaru} onChange={(e) => setPasswordBaru(e.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 mt-1 truncate-placeholder" />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-400">Komfirmasi password</label>
                                    <input placeholder="Konfirmasi Password" title="Konfirmasi Password" type="password" value={konfirmasiPassword} onChange={(e) => setKonfirmasiPassword(e.target.value)} className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 mt-1 truncate-placeholder" />
                                </div>

                                <div className="flex gap-4">

                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="w-full rounded-lg border border-gray-200 bg-white px-5 py-2 font-medium text-gray-700 hover:text-[#00182F] transition hover:border-blue-400 mt-2"
                                    >
                                        Kembali
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleResetPassword}
                                        disabled={loading}
                                        className="w-full rounded-lg bg-[#002446] px-5 py-2 font-medium text-white mt-2 disabled:opacity-50"
                                    >
                                        {loading ? "Memproses..." : "Ubah Password"}
                                    </button>

                                </div>
                            </>

                        )}


                    </div>
                </div>

            </div>
            {/* </div> */}
        </>
    )
}