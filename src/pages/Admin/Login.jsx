import React, { useEffect, useState } from 'react';
import { FaClock, FaLock, FaMotorcycle, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CustomAlert from '../../components/CustomAlert';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const data = await response.json();
            console.log(data)

            if (data.success) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("/admin/dashboard")
            } else {
                setAlert({
                    type: "error",
                    message: data.message
                })
            }
        } catch (error) {
            console.error(error);
            setAlert({
                type: 'error',
                message: "Tidak dapat terhubung ke server"
            })
        }
    };
    return (
        <>
            <div className="flex w-full min-h-screen bg-[url(https://i.pinimg.com/1200x/a9/d4/83/a9d483e20c3790119bde426b54226eaf.jpg)] bg-no-repeat bg-cover bg-center justify-end">
                <div className="relative flex-1 h-screen " >
                    <div className="absolute inset-0 bg-black/45 backdrop-blur-sm "
                        style={{
                            clipPath: "polygon(0 0, 40% 0, 55% 100%, 0 100%)",
                            background: "linear-gradient(90deg, rgba(0,0,0,.85) 0%, rgba(0,0,0,.65) 55%, rgba(0,0,0,.15) 100%)",
                        }}></div>


                    <div className="relative z-10 flex  flex-col px-6 md:px-12  py-8 justify-start  h-full" >

                        <div className="flex items-center space-x-2 flex-shrink-0 mt-4">
                            <div className="w-18 h-16  flex items-center justify-center  text-white rounded-lg shadow-sm flex-shrink-0">
                                <img src={infoDealer.logo} alt={infoDealer.nama_Dealer} className='w-18 h-16 bg-white rounded-full' />
                            </div>
                            <div className="leading-tight min-w-0">
                                <h2 className="text-lg font-bold text-white truncate">{infoDealer.nama_dealer}</h2>
                                <p className="text-[10px] text-gray-500">{infoDealer.deskripsi}</p>
                            </div>
                        </div>



                        <div className="w-full sm:max-w-[400px] flex flex-col gap-8 mt-24 ">
                            <div>
                                <h2 className="text-4xl font-bold  text-white items-center">Admin Login</h2>
                                <p className='text-gray-300'>Welcome back! Please login first</p>
                                <div className='h-1 bg-[#004A7C] rounded-full mt-4'></div>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">username</label>
                                <div className='border-b-white relative '>
                                    <FaUser className="absolute left-4 top-6 text-gray-300" />
                                    <input type="email" placeholder='Enter Your Username' value={email} onChange={(e) => setEmail(e.target.value)}
                                        className="mt-2 w-full rounded-xl bg-white/10 border border-white/20 px-10 py-3 text-white placeholder-gray-300 
                                        focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40" />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">Password</label>
                                <div className='border-b-white relative '>
                                    <FaLock className="absolute left-4 top-6 text-gray-300" />
                                    <input type="password" placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)}
                                        className="mt-2 w-full rounded-xl bg-white/10 border border-white/20 px-10 py-3 text-white placeholder-gray-300 
                                        focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40" />
                                </div>
                            </div>
                            <div>
                                <button className='text-white text-sm hover:underline' onClick={() => navigate("/admin/forgatPassword")}>Forgot Password ? </button>
                                <button onClick={
                                    handleSubmit
                                } type="submit" className="w-full mt-2 py-3 rounded-xl bg-[#002446] font-semibold text-white transition-all duration-300 
                            hover:bg-[#00182F] hover:scale-[1.02] hover:shadow-xl active:scale-95" >Login</button>
                            </div>


                            <div>
                            </div>
                        </div>
                        {alert && (
                            <CustomAlert type={alert.type} message={alert.message} onClose={() => { setAlert(null); setEmail(""); setPassword("") }} />
                        )}

                        <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-20 max-w-lg text-white">
                            <div className='w-20 h-1 bg-[#004A7C] rounded-full mb-6' ></div>
                            <span className="text-blue-950 uppercase tracking-[6px] font-semibold">
                                Honda Dealer
                            </span>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mt-4 leading-tight">
                                Ride With <br /> Confidence
                            </h1>

                            <p className="mt-6 text-lg text-gray-200 leading-8">
                                Discover Honda motorcycles with
                                modern technology, outstanding performance,
                                and trusted dealership services.
                            </p>

                            <div className='flex gap-12 mt-10'>
                                <div className='text-center'>
                                    <div className='w-12 h-12 rounded-full border border-blue-500 flex items-center justify-center mx-auto'>
                                        <FaMotorcycle className='text-blue-500' />
                                    </div>
                                    <p className='mt-3 text-sm'>Premium</p>
                                </div>
                                <div className='text-center'>
                                    <div className='w-12 h-12 rounded-full border border-blue-500 flex items-center justify-center mx-auto'>
                                        <FaMotorcycle className='text-blue-500' />
                                    </div>
                                    <p className='mt-3 text-sm'>Premium</p>
                                </div>
                                <div className='text-center'>
                                    <div className='w-12 h-12 rounded-full border border-blue-500 flex items-center justify-center mx-auto'>
                                        <FaMotorcycle className='text-blue-500' />
                                    </div>
                                    <p className='mt-3 text-sm'>Premium</p>
                                </div>
                            </div>
                        </div>

                        <div className='w-full ma-w-[400px] text-white/70 mb-8'>
                            <div className='mt-1'>
                                <h3 className='text-lg font-semibold'>Honda Dealer Management System</h3>
                                <p className="text-sm mt-2 leading-6 text-gray-300">
                                    Secure access for authorized administrators only.
                                    Manage products, customers, credit applications,
                                    reports, and dealer information efficiently.
                                </p>

                                <p className="text-xs text-gray-400 mt-6">
                                    © 2026 Daya Motor Honda
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    );
};

export default Login;