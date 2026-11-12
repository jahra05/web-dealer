import React, { useEffect, useState } from 'react';
import { FaClock, FaHeadset, FaLock, FaMotorcycle, FaShieldAlt, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CustomAlert from '../../components/CustomAlert';
import { FaShield } from 'react-icons/fa6';
import { BiArrowBack } from 'react-icons/bi';
import FormField from '../../components/FormField';
import ConfirmAlert from '../../components/ConfirmAlert';
import { getFunctionUrl, getSupabaseHeaders } from '../../config/supabase';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [infoDealer, setInfoDealer] = useState([])
    const [alert, setAlert] = useState(null)

    const getInfoDealer = async () => {
        try {
            const response = await fetch(getFunctionUrl('footer'), {
                headers: {
                    ...getSupabaseHeaders()
                }
            });

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
            const response = await fetch(getFunctionUrl("auth/login"), {
                method: 'POST',
                headers: getSupabaseHeaders(),
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
                    type: "warning",
                    message: "Terjadi Kesalahan"
                })
            }
        } catch (error) {
            console.error(error);
            // setAlert({
            //     type: 'error',
            //     message: "Tidak dapat terhubung ke server"
            // })
        }
    };
    return (
        <>

            <div className="relative z-20 w-full min-h-screen">
                <div className="min-h-screen flex flex-col px-6 sm:px-10 lg:px-16">
                    <div className="flex items-center justify-between pt-7 lg:pt-9">
                        <div className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-full overflow-hidden bg-white border border-slate-200 flex items-center justify-center">
                                <img
                                    src={infoDealer.logo}
                                    alt={infoDealer.nama_dealer}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="leading-tight">
                                <h2 className="text-base sm:text-lg font-bold tracking-tight text-[#12385A]">
                                    {infoDealer.nama_dealer}
                                </h2>

                                <p className="text-[10px] sm:text-xs text-slate-500 tracking-wide">
                                    {infoDealer.title || "Dealer Resmi Honda"}
                                </p>
                            </div>

                        </div>


                        {/* Website */}
                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className=" flex items-center
                    gap-2
                    text-xs
                    sm:text-sm
                    text-slate-500
                    hover:text-[#005EB8]
                    transition-colors
                    duration-300
                "
                        >
                            <span>←</span>

                            <span className="hidden sm:inline">
                                Buka Website
                            </span>
                        </button>

                    </div>



                    <div className="flex-1 flex items-center justify-center">

                        <form
                            className="
                    w-full
                    max-w-[500px]
                    -mt-8
                    sm:-mt-12
                    lg:-mt-16
                "
                            onSubmit={handleSubmit}
                        >

                            <div className="mb-8">

                                <p className="
                        text-[11px]
                        sm:text-xs
                        font-semibold
                        tracking-[5px]
                        text-[#005EB8]
                        uppercase
                        mb-4
                    ">
                                    Admin Portal
                                </p>

                                <h1 className="
                        text-4xl
                        sm:text-5xl
                        font-bold
                        tracking-tight
                        text-[#102D46]
                    ">
                                    Admin{" "}
                                    <span className="text-[#005EB8]">
                                        Login
                                    </span>
                                </h1>

                                <p className="
                        mt-4
                        text-sm
                        sm:text-base
                        leading-7
                        text-slate-500
                    ">
                                    Selamat datang kembali, silakan masuk
                                    untuk mengelola sistem dealer.
                                </p>

                                <div className="
                        w-12
                        h-1
                        bg-[#005EB8]
                        rounded-full
                        mt-6
                    " />

                            </div>


                            {/* ================= EMAIL ================= */}
                            <div className="mb-6">

                                <label className="
                        block
                        mb-2
                        text-sm
                        font-semibold
                        text-[#17344F]
                    ">
                                    Email
                                </label>

                                <div className="relative">

                                    <FaUser className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-[#6F9BC3]
                            text-sm
                        " />



                                    <input
                                        type="email"
                                        placeholder="Masukkan email anda"
                                        autoComplete="email"
                                        title="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="
                                w-full
                                h-[40px]
                                rounded-xl
                                border
                                border-slate-200
                                bg-white
                                pl-11
                                pr-4
                                text-sm
                                text-[#17344F]
                                placeholder:text-slate-400
                                shadow-[0_2px_10px_rgba(15,41,66,0.05)]
                                transition-all
                                duration-300
                                focus:outline-none
                                focus:border-[#4D8DC5]
                                focus:ring-4
                                focus:ring-[#005EB8]/10
                            "
                                    />

                                </div>

                            </div>


                            {/* ================= PASSWORD ================= */}
                            <div className="mb-3">

                                <label className="
                        block
                        mb-2
                        text-sm
                        font-semibold
                        text-[#17344F]
                    ">
                                    Password
                                </label>

                                <div className="relative">

                                    <FaLock className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-[#6F9BC3]
                            text-sm
                        " />

                                    <input
                                        type="password"
                                        placeholder="Masukkan password"
                                        autoComplete="current-password"
                                        title="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="
                                w-full
                                h-[40px]
                                rounded-xl
                                border
                                border-slate-200
                                bg-white
                                pl-11
                                pr-4
                                text-sm
                                text-[#17344F]
                                placeholder:text-slate-400
                                shadow-[0_2px_10px_rgba(15,41,66,0.05)]
                                transition-all
                                duration-300
                                focus:outline-none
                                focus:border-[#4D8DC5]
                                focus:ring-4
                                focus:ring-[#005EB8]/10
                            "
                                    />

                                </div>

                            </div>


                            {/* ================= FORGOT PASSWORD ================= */}
                            <div className="flex justify-end mb-7">

                                <button
                                    type="button"
                                    onClick={() => navigate("/admin/forgatPassword")}
                                    className="
                            text-xs
                            sm:text-sm
                            text-[#005EB8]
                            hover:text-[#003F73]
                            hover:underline
                            underline-offset-4
                            transition-colors
                            duration-300
                        "
                                >
                                    Lupa password?
                                </button>

                            </div>


                            {/* ================= LOGIN ================= */}
                            <button
                                type="submit"
                                className="
                        group
                        w-full
                        h-[40px]
                        rounded-xl
                        bg-[#002446]
                        text-white
                        font-semibold
                        text-sm
                        shadow-[0_8px_25px_rgba(0,94,184,0.18)]
                        transition-all
                        duration-300
                        hover:bg-[#004B91]
                        hover:shadow-[0_10px_30px_rgba(0,94,184,0.25)]
                        active:scale-[0.99]
                        flex
                        items-center
                        justify-center
                        gap-3
                    "
                            >
                                <span>Masuk</span>

                                <span className="
                        text-lg
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                    ">
                                    →
                                </span>
                            </button>

                        </form>

                    </div>


                    <div className="
            pb-7
            lg:pb-9
            flex
            justify-center
        ">

                        <div className="
                text-center
                text-[10px]
                sm:text-xs
                text-slate-400
            ">
                            © 2026 {infoDealer.nama_dealer}. All rights reserved.
                        </div>

                    </div>

                </div>
            </div>

            {alert && (
                <CustomAlert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
            )}
            {/* <div>
                <div>
                    <div className='relative z-20 w-full min-h-screen'>
                        <div className='min-h-screen flex flex-col px-6 sm:px-10 lg:px-16 '>
                            <div className='flex items-center justify-between pt-7 lg:pt-9'>
                                <div className='flex items-center gap-3'>
                                    <div className='w-11 h-11 rounded-full overflow-hidden bg-white border border-slate-200 flex items-center justify-center'>
                                        <img src={infoDealer.logo}
                                            alt={infoDealer.nama_dealer} className='w-full h-full object-cover' />
                                    </div>

                                    <div className='leading-tight'>
                                        <h2 className='text-base sm:text-lg font-bold tracking-tight text-[#12385A]'>
                                            {infoDealer.nama_dealer}
                                        </h2>
                                        <p className='text-[10px] sm:text-xs text-slate-500 tracking-wide'>{infoDealer.title || "Dealer Resmi Honda"}</p>
                                    </div>
                                </div>
                                <button type='button' onClick={() => navigate("/")}
                                    className='flex items-center gap-2 text-xs text-slate-500 hover:text-[#005EB8] transition-colors duration-300'>
                                    <span><BiArrowBack /></span>
                                    <span className='hidden sm:inline'>Buka Website</span>
                                </button>
                            </div>
                            <div className='flex-1 flex items-center py-16 lg:py-10'>
                                <form className='w-full max-w-[520px]' onSubmit={handleSubmit}>
                                    <div className='mb-7'>
                                        <p className='text-[11px] sm:text-xs font-semibold tracking-[5px] text-[#005EB8] uppercase mb-4'>Admin Portal</p>
                                        <h1 className='text-4xl sm:text-5xl font-bold tracking-tight text-[#102D46]'>Admin{""}
                                            <span className='text-[#005EB8]'>
                                                Login
                                            </span>
                                        </h1>
                                        <p className='mt-4 text-sm sm:text-base leading-7 text-slate-500 max-w-md'>
                                            Selamat datang kembali, silahkan masuk untuk mengelola sistem dealer.
                                        </p>
                                        <div className='w-12 h-1 bg-[#005EB8] rounded-full mt-6'></div>
                                    </div>
                                    <div className='mb-6'>
                                        <label className='block mb-2 text-sm font-semibold text-[#17344F]'>
                                            Email
                                        </label>
                                        <div className='relative'>
                                            <FaUser className='absolute left-4 top-1/2 -translate-y-1/2 text-[#6F9BC3] text-sm' />
                                            <input type='email' placeholder='Masukan email anda' autoComplete='email' title='Email'
                                                value={email} onClick={(e) => setEmail(e.target.value)}
                                                className='w-full h-13 rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-[#17344F] placeholder:text-slate-400
                                                shadow-[0_2px_10px_rgba(15,41,66,0.3)] transition-all duration-300 focus:outline-none focus:border-[#4DBDC5] focus:ring-4 focus:ring-[#0053B8]/10' />
                                        </div>
                                    </div>
                                    <div className='mb-6'>
                                        <label className='block mb-2 text-sm font-semibold text-[#17344F]'>Password</label>
                                        <div className='relative'>
                                            <FaLock className='absolute left-4 top-1/2 -translate-y-1/2 text-[#6F9BC3] text-sm' />
                                            <input type='password' placeholder='Masukan password' autoComplete='current-password' title='password'
                                                value={password} onClick={(e) => setPassword(e.target.value)}
                                                className='w-full h-13 rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm text-[#17344F] placeholder:text-slate-400
                                                shadow-[0_2px_10px_rgba(15,41,66,0.3)] transition-all duration-300 focus:outline-none focus:border-[#4DBDC5] focus:ring-4 focus:ring-[#0053B8]/10' />
                                        </div>
                                    </div>
                                    <div className='flex justify-end mb-7'>
                                        <button type='button' onClick={() => navigate("/admin/forgatPassword")}
                                            className='text-xs sm:text-sm text-[#005EB9] hover:text[#003F73] hover:underline transition-colors duration-300'
                                        >
                                            Lupa password?
                                        </button>
                                    </div>
                                    <button type='subtmit' className='group w-full h-13 rounded-xl bg-[#005EB8] text-white font-semibold
                                    text-sm shadow-[0_8px_25px_rgba(0,94,184,0.18)] transition-all duration-300 hover:bg-[#004B91] hover:shadow-[0_10px_30px_rgba(0,94,184,0.25)]
                                    active:Scale-[0.99] flex items-center justify-center gap-3'>
                                        <span>Masuk</span>
                                        <span className='text-lg transition-transform duration-300 group-hover:translate-x-1:'><BiArrowBack /></span>
                                    </button>
                                    <div className='mt-16 pt-6 border-t border-slate-200'>
                                        <div className='flex items-center gap-3'>
                                            <div className='w-9 h-9 rounded-lg border border-[#BFD5E8] flex items-center justify-center text-[#005EB8]'>
                                                <FaShieldAlt size={16} />
                                            </div>
                                            <div className='leading-tight'>
                                                <p className='text-xs font-semibold text-[#17344F]'>
                                                    {infoDealer.nama_dealer}
                                                </p>
                                                <p className='text-[11px] text-slate-500 mt-1'>Honda Dealer Management System</p>
                                            </div>
                                        </div>
                                        <p className="text-[10px] sm:text-xs text-slate-400 mt-7"> © 2026 {infoDealer.nama_dealer}. All rights reserved.</p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='hidden lg:block absolute right-0 top-0 w-[54%] h-screen'>
                        <div className='absolute inset-0 bg-cover bg-center'
                            style={{
                                backgroundImage: "url((https://images.unsplash.com/photo-1591378603223-e15b45a81640?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                                clipPath: "polygon(27% 0, 100% 0, 100% 100%, 12% 100%, 0 82%, 22% 48%)"
                            }} />

                        <div className='absolute inset-0 bg-white/55 pointer-events-none'
                            style={{ clipPath: "polygon(27% 0, 100% 100%, 12% 100%, 0 83%, 22% 48%)" }} />
                        <div className='absolute inset-0 pointer-events-none'
                            style={{
                                clipPath: "polygon(27% 0, 100% 100%, 12% 100%, 0 83%, 22% 48%)",
                                background:
                                    "linear-gradient(135deg, rgba(230,242,252,.65), rgba(255,255,255,.15), rgba(0,94,184,.08))",
                            }} />
                        <div className='absolute top-0 bottom-0 left-[28%] w-px bg-[#4D8DC5] rotate-[23deg] origin-top' />
                        <div className='absolute right-10 xl:right-16 bottom-10 text-right text-[#37698F]'>
                            <p className='text-[10px] tracking-[5px] uppercase font-medium'>Drive A Better</p>
                            <p className='text-[10px] tracking-[5px] uppercase font-medium mt-2'>Tomorrow</p>
                            <div className='w-8 h-px bg-[#37698F] ml-auto mt-3' />
                        </div>
                    </div>
                    {alert && (
                        <CustomAlert
                            type={alert.type}
                            message={alert.message}
                            onClose={() => {
                                setAlert(null);
                                setEmail("");
                                setPassword("");
                            }}
                        />
                    )}
                </div>
            </div> */}

            {/* <div className="flex w-full min-h-screen bg-[url(https://media.istockphoto.com/id/1412459778/id/foto/seorang-pengendara-sepeda-motor-sedang-duduk-di-jalan-dengan-sepeda-motor.jpg?s=2048x2048&w=is&k=20&c=GIq_dRxIjcdOCqokWPmBLNeGrU1jrUzrkrE24H61aVM=)] bg-no-repeat bg-cover bg-center justify-end">
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
                                <p className="text-[10px] text-gray-500">{infoDealer.title}</p>
                            </div>
                        </div>



                        <form className="w-full sm:max-w-[400px] flex flex-col gap-8 mt-24 " onSubmit={
                            handleSubmit
                        }>
                            <div>
                                <h2 className="text-4xl font-bold  text-white items-center">Admin Login</h2>
                                <p className='text-gray-300'>Welcome back! Please login first</p>
                                <div className='h-1 bg-[#004A7C] rounded-full mt-4'></div>
                            </div>
                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">Email</label>
                                <div className='border-b-white relative '>
                                    <FaUser className="absolute left-4 top-6 text-gray-300" />
                                    <input type="email" placeholder='Email' autoComplete="email" title="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                                        className="mt-2 w-full rounded-xl bg-white/10 border border-white/20 px-10 py-3 text-white placeholder-gray-300 
                                        focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 truncate-placeholder" />
                                </div>
                            </div>

                            <div>
                                <label className="block mb-2 text-sm font-medium text-white">Password</label>
                                <div className='border-b-white relative '>
                                    <FaLock className="absolute left-4 top-6 text-gray-300" />
                                    <input type="password" placeholder='Password' autoComplete='current-password' title="Password" value={password} onChange={(e) => setPassword(e.target.value)}
                                        className="mt-2 w-full rounded-xl bg-white/10 border border-white/20 px-10 py-3 text-white placeholder-gray-300 
                                        focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/40 truncate-placeholder" />
                                </div>
                            </div>
                            <div>
                                <button type='button' className='text-white text-sm hover:underline' onClick={() => navigate("/admin/forgatPassword")}>Forgot Password ? </button>
                                <button type="submit" className="w-full mt-2 py-3 rounded-xl bg-[#002446] font-semibold text-white transition-all duration-300 
                            hover:bg-[#00182F] hover:scale-[1.02] hover:shadow-xl active:scale-95" >Login</button>
                            </div>


                        </form>
                        {alert && (
                            <CustomAlert type={alert.type} message={alert.message} onClose={() => { setAlert(null); setEmail(""); setPassword("") }} />
                        )}

                        <div className="hidden lg:block absolute top-1/2 -translate-y-1/2 right-20 max-w-lg text-white">
                            <div className='w-20 h-1 bg-[#004A7C] rounded-full mb-6' ></div>
                            <span className="text-blue-950 uppercase tracking-[6px] font-semibold">
                                Honda Dealer <span className='text-white'>Cibeber</span>
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
                                    <div className='w-12 h-12 rounded-full border border-[#002446] flex items-center justify-center mx-auto'>
                                        <FaMotorcycle size={32} className='text-[#004A7C]' />
                                    </div>
                                    <p className='mt-3 text-sm w-32 text-center'>Premium Motorcycles</p>
                                </div>
                                <div className='text-center'>
                                    <div className='w-12 h-12 rounded-full border border-[#002446] flex items-center justify-center mx-auto'>
                                        <FaShieldAlt size={32} className='text-[#004A7C]' />
                                    </div>
                                    <p className='mt-3 text-sm w-20 text-center'>Trusted Dealer</p>
                                </div>
                                <div className='text-center'>
                                    <div className='w-12 h-12 rounded-full border border-[#002446] flex items-center justify-center mx-auto'>
                                        <FaHeadset size={32} className='text-[#004A7C]' />
                                    </div>
                                    <p className='mt-3 text-sm w-32 text-center'>Best Service Support</p>
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
            </div > */}

        </>
    );
};

export default Login;