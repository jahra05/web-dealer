import { use, useEffect, useState } from "react"
import { BiArrowBack, BiChevronLeft, BiEdit } from "react-icons/bi"
import Setting from "./Setting"
import { RxHamburgerMenu } from "react-icons/rx"
import CustomAlert from "../../../components/CustomAlert"
import AdminNavbar from "../../../components/AdminNavbar"
import { CgChevronDoubleLeft } from "react-icons/cg"
import { useNavigate } from "react-router-dom"
import { CiSettings } from "react-icons/ci"
import { getFunctionUrl, getSupabaseHeaders, SUPABASE_PUBLISHABLE_KEY, } from "../../../config/supabase";

export default function SettingProfileAdmin() {
    const [user, setUser] = useState([])
    const [password, setPassword] = useState({
        passwordLama: "",
        passwordBaru: ""
    })
    const [foto, setFoto] = useState(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [alert, setAlert] = useState(null)
    const [sidebar, setSidebar] = useState(false)
    const navigate = useNavigate()


    const getAllUser = async () => {

        try {
            const response = await fetch(getFunctionUrl('user'), {
                headers: {
                    ...getSupabaseHeaders(),
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                }
            });

            const data = await response.json();
            console.log(data)
            setUser(data.data[0])

            console.log(data.data)
        } catch (error) {
            console.log(error)
        }
    }

    const updateLogo = async () => {
        if (!foto) {
            setAlert({ type: 'warning', message: 'Pilih foto terlebih dahulu' })
            return;
        }

        const formData = new FormData();

        formData.append("foto", foto);

        console.log("FILE YANG DIKIRIM:", foto);

        try {
            const response = await fetch(
                getFunctionUrl(`user/${user.id_user}/foto`),
                {
                    method: "PUT",
                    headers: {
                        apikey: SUPABASE_PUBLISHABLE_KEY,
                        ...getSupabaseHeaders()
                    },
                    body: formData,
                }
            );

            const data = await response.json();


            console.log("RESPONSE UPDATE FOTO:", data);

            if (data.success) {
                setAlert({ type: 'success', message: data.message })

                // langsung update tampilan
                setUser((prev) => ({
                    ...prev,
                    foto: data.foto
                }));

                setFoto(null);
            } else {
                setAlert({ type: 'error', message: data.message })
            }

        } catch (error) {
            console.log(error);
        }
    };

    const update = async () => {

        try {
            const response = await fetch(getFunctionUrl(`user/${user.id_user}`), {
                method: "PUT",
                headers: {
                    ...getSupabaseHeaders(),
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();
            console.log(data)
            setAlert({ type: 'success', message: 'Berhasil diubah' })

        } catch (error) {
            console.log(error)

        }
    }

    const SavePassword = async () => {
        try {
            console.log("Password baru:", passwordBaru);

            const response = await fetch(getFunctionUrl(`${user.id_user}/password`), {

                method: 'PUT',
                headers: {
                    ...getSupabaseHeaders(),
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify(password)
            })
            const data = await response.json();
            console.log(data)
            setAlert({ type: 'info', message: data.message })

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getAllUser()
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev, [name]: value
        }))
    }
    const handleChangePassword = (e) => {
        const { name, value } = e.target;

        setPassword((prev) => ({
            ...prev, [name]: value,
        }))
    }

    const handleFotoChange = (e) => {
        setFoto(e.target.files[0])
    }
    return (
        <>
            <div className=" mt-4 p-4 flex flex-col overflow-x-hidden">
                <h3 className="text-xl font-medium hidden min-[1010px]:block">Pengaturan</h3>
                <button onClick={() => navigate('/admin/dashboard')} className="w-32 ml-4 p-1 text-lg min-[1010px]:hidden flex items-center "> <BiChevronLeft size={28} />Setting</button>
                <div className="flex flex-col w-full mt-4 md:bg-white p-4  rounded-xl">
                    <Setting isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

                    <div className=" w-full min-w-0 flex flex-col  overflow-x-hidden z-10  ">
                        {alert && <CustomAlert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
                        <div className="bg-white p-4  w-full lg:mx-0 mb-4 mt-0 lg:mt-0 rounded-xl">
                            <main className=" px-4 pb-6 overflow-x-hidden">
                                <div className="flex flex-col md:flex-row gap-6 lg:gap-10 mt-6 md:mt-10">
                                    <div className="flex-1 flex-col border-b md:border-b-0 md:border-r  md:pr-10 md:pb-0 pb-4 border-gray-200 gap-5 w-full md:flex-1 bg-white md:bg-transparent md:rounded-none p-1 md:p-0">
                                        <div className="md:hidden">
                                            <h3 className="text-base font-semibold text-[#001323]">Profile Admin</h3>
                                            <p className="text-xs text-gray-400 mt-1">Kelola informasi akun admin</p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mt-4
                                            pb-5 border-b border-gray-100">
                                            <div className="flex items-center gap-4">
                                                <div className="relative">
                                                    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden 
                                                        border border-gray-200 bg-gray-50">
                                                        <img src={foto ? URL.createObjectURL(foto) : `${user.foto}`}
                                                            className="w-full h-full object-cover" alt="Profile" />
                                                    </div>
                                                    <label htmlFor="logo" className="absolute ring-0 bottom-0 w-8 h-8 flex items-center
                                                        justify-center rounded-full bg-[#00182F] text-white cursor-pointer hover:bg-[#00182F]
                                                        shadow-md transition-all duration-200">
                                                        <BiEdit size={17} />
                                                    </label>
                                                </div>
                                                <div className="hidden sm:block">
                                                    <p className="text-sm font-semibold text-[#001323]">Foto Profile</p>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        Gunakan foto terbaik Anda
                                                    </p>
                                                </div>
                                            </div>
                                            <button onClick={updateLogo}
                                                className="w-full sm:w-auto bg-[#002446] text-white rounded-xl px-5
                                                    py-2.5 text-sm font-medium transition-all duration-300 hover:bg-[#00182F] active:scale-95">Simpan Foto</button>
                                        </div>
                                        <input id="logo" type="file" accept="image/*" onChange={handleFotoChange} className="hidden" />

                                        <div className="grid grid-cols-1 gap-5 mt-6">
                                            <div>
                                                <label className="block text-gray-500 text-sm font-medium mb-2">Nama Lengkap</label>
                                                <input name="nama_lengkap" value={user.nama_lengkap || ""} onChange={handleChange}
                                                    type="text" placeholder="Nama lengkap" title="Nama Lengkap" className="bg-white border
                                                        border-gray-200 p-3 rounded-xl w-full text-sm text-[#001323] placeholder-gray-300
                                                        focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 transition-all" />
                                            </div>
                                            <div>
                                                <label className="block text-gray-500 text-sm font-medium mb-2">Username</label>
                                                <input name="username" value={user.username || ""} onChange={handleChange}
                                                    type="text" placeholder="Username" title="Username" className="bg-white border
                                                        border-gray-200 p-3 rounded-xl w-full text-sm text-[#001323] placeholder-gray-300
                                                        focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 transition-all" />
                                            </div>
                                            <div>
                                                <label className="block text-gray-500 text-sm font-medium mb-2">Email</label>
                                                <input name="email" value={user.email || ""} onChange={handleChange}
                                                    type="text" placeholder="Email" title="Email" className="bg-white border
                                                        border-gray-200 p-3 rounded-xl w-full text-sm text-[#001323] placeholder-gray-300
                                                        focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 transition-all" />
                                            </div>
                                        </div>
                                        <div className="mt-1">
                                            <button onClick={update}
                                                className="w-full sm:w-auto bg-[#002446] text-white rounded-xl px-5 mt-4
                                                    py-2.5 text-sm font-medium transition-all duration-300 hover:bg-[#00182F] active:scale-95">Simpan Perubahan</button>
                                        </div>
                                    </div>
                                    <div className=" border-gray-100 flex-1">
                                        <div className="w-full md:flex-1 bg-white rounded-2xl p-1 md:p-0 md:mt-0">
                                            <div className="mb-5">
                                                <h3 className="text-base font-semibold text-[#001313]">Keamanan</h3>
                                                <p className="text-xs text-gray-400 mt-1">Ubah Password akun admin anda</p>
                                            </div>
                                            <div className="flex flex-col gap-5">
                                                <div>
                                                    <label className="block text-gray-500 text-sm font-medium mb-2">Password Saat ini</label>
                                                    <input type="password" name="passwordLama" value={password.passwordLama} onChange={handleChangePassword}
                                                        placeholder="Masukan password lama" title="Password Lama" className="bg-white border border-gray-200
                                                            p-3 rounded-xl w-full text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 *
                                                            focus:border-[#006A9E] transition-all" />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-500 text-sm font-medium mb-2">Password baru</label>
                                                    <input type="password" name="passwordBaru" value={password.passwordBaru} onChange={handleChangePassword}
                                                        placeholder="Masukan password baru" title="Password Baru" className="bg-white border border-gray-200
                                                            p-3 rounded-xl w-full text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-100 *
                                                            focus:border-[#006A9E] transition-all" />
                                                </div>
                                            </div>
                                            <button onClick={update}
                                                className="w-full sm:w-auto bg-[#002446] text-white rounded-xl px-5
                                                    py-2.5 text-sm font-medium transition-all duration-300 hover:bg-[#00182F] active:scale-95 mt-6">Ubah Password</button>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>


                </div >
            </div >

        </>
    )
}