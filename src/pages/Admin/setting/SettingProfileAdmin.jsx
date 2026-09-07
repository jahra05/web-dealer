import { useEffect, useState } from "react"
import { BiEdit } from "react-icons/bi"
import Setting from "./Setting"
import { RxHamburgerMenu } from "react-icons/rx"
import CustomAlert from "../../../components/CustomAlert"
import AdminNavbar from "../../../components/AdminNavbar"

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



    const getAllUser = async () => {

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user`);

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
                `${import.meta.env.VITE_API_URL}/api/user/${user.id_user}/foto`,
                {
                    method: "PUT",
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
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/${user.id_user}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
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

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user/${user.id_user}/password`, {

                method: 'PUT',
                headers: {
                    "Content-Type": 'application/json'
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
                <h2 className="px-2 text-xl font-medium">Setting</h2>
                <div className="flex w-full mt-4 bg-white p-4  rounded-xl">
                    <Setting isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                    <div className=" w-full min-w-0 flex flex-col  overflow-x-hidden z-10">
                        {alert && <CustomAlert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
                        <div className="bg-white p-4  w-full lg:mx-0 mb-4 mt-0 lg:mt-0">
                            <div className="mb-4 border-b">
                                <p className="text-lg font-medium">Profil Admin</p>
                                <p className="text-xs text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa, accusantium?</p>
                            </div>
                            <main className="flex-1 px-4 pb-6 overflow-x-hidden">
                                <div className="flex flex-col border border-gray-100  p-4 rounded-xl">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                        <div className="flex flex-col sm:flex-row items-center gap-4">
                                            <div className="w-32">
                                                <div className="w-32 h-32">
                                                    <img src={foto ? URL.createObjectURL(foto) : `${user.foto}`} className="w-32 h-32 rounded-full object-cover" />
                                                </div>
                                                <div className="-mt-10">
                                                    <label htmlFor="logo" className="ml-32 -mt-2 w-8 h-8 flex items-center justify-center rounded-full bg-[#002446] text-[#F2F8FC] cursor-pointer hover:bg-[#00182F] hover:text-white shadow-md z-10"> <BiEdit size={20} />
                                                    </label></div>
                                            </div>
                                            <input id="logo"
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFotoChange} className="hidden"
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <button onClick={updateLogo} className="bg-[#002446] text-[#F2F8FC] rounded-md p-2  text-sm font-medium">update</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row gap-10 mt-10">
                                    <div className="flex flex-col gap-4  border border-gray-100 w-full p-4 rounded-lg">
                                        <div className="flex flex-col gap-4 py-4">
                                            <p className="text-gray-800 w-32 font-medium">Full Name</p>
                                            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                                <div>
                                                    <p className="text-gray-600 w-32 text-sm font-medium mb-2">Nama Lengkap</p>
                                                    <input name="nama_lengkap" value={user.nama_lengkap || ""} onChange={handleChange}
                                                        type="text" placeholder="Nama Lengkap" title="Nama Lengkap" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 rounded-xl w-full text-sm truncate-placeholder" />
                                                </div>
                                                <div>
                                                    <p className="text-gray-600 w-32 text-sm font-medium mb-2">Username</p>
                                                    <input name="username" value={user.username || ""} onChange={handleChange} type="text" placeholder="Username" title="Username" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 rounded-xl w-full text-sm truncate-placeholder" />
                                                </div>
                                                <div>
                                                    <p className="text-gray-600 w-32 text-sm font-medium mb-2">Email</p>
                                                    <input name="email" value={user.email || ""} onChange={handleChange} type="email" placeholder="Email" title="Email" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 rounded-xl w-full text-sm truncate-placeholder" />
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <button onClick={update} className="bg-[#002446] text-[#F2F8FC] px-8 p-2 rounded-xl font-medium transition-all text-center text-sm duration-300 hover:bg-[#00182F] hover:scale-[1.02] hover:shadow-xl active:scale-95 flex items-center">Update</button>
                                        </div>
                                    </div>

                                    <div className="shadow w-full p-4 rounded-xl">
                                        <p className="text-gray-800 w-32 font-medium mb-2">Password</p>
                                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                            <div>
                                                <p className="text-gray-600 w-32 text-sm font-medium mb-2">Current Password</p>
                                                <input type="password" name="passwordLama" value={password.passwordLama} onChange={handleChangePassword} placeholder="Password Lama" title="Password Lama" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 rounded-xl w-full text-sm truncate-placeholder" />
                                            </div>
                                            <div>
                                                <p className="text-gray-600 w-32 text-sm font-medium mb-2">New Password</p>
                                                <input type="password" name="passwordBaru" value={password.passwordBaru} onChange={handleChangePassword} placeholder="Password Baru" title="Password Baru" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 rounded-xl w-full text-sm truncate-placeholder" />
                                            </div>
                                        </div>
                                        <button onClick={SavePassword} className="bg-[#002446] text-[#F2F8FC] px-8 p-2 rounded-xl font-medium transition-all text-center text-sm duration-300 hover:bg-[#00182F] hover:scale-[1.02] hover:shadow-xl active:scale-95 flex items-center mt-10">Update</button>
                                    </div>
                                </div>
                            </main>



                        </div>
                    </div >

                </div>
            </div >

        </>
    )
}