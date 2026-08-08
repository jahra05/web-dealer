import { useEffect, useState } from "react"
import { BiEdit } from "react-icons/bi"

export default function SettingProfileAdmin() {
    const [user, setUser] = useState([])
    const [password, setPassword] = useState({
        passwordLama: "",
        passwordBaru: ""
    })
    const [foto, setFoto] = useState(null)

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
        const formData = new FormData();

        formData.append("foto", foto);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/user/${user.id_user}/foto`,
                {
                    method: "PUT",
                    body: formData,
                }
            );

            const data = await response.json();
            alert(data.message);

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
                body: JSON.stringify(footer),
            });
            const data = await response.json();
            console.log(data)
            alert('berhasil di ubah')

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
            alert(data.message)

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
            <div className="bg-white p-4 rounded-xl w-[100%]">
                <div className="mb-4 border-b py-4">
                    <p className="text-lg font-medium">Profil Admin</p>
                    <p className="text-xs text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa, accusantium?</p>
                </div>
                <div className="flex  flex-col gap-4">

                    <div className="flex  flex-col">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <div className="relative w-20 h-20">
                                    <img src={foto ? URL.createObjectURL(foto) : `${import.meta.env.VITE_API_URL}/uploads/${user.foto}`} className="w-20 h-20 rounded-full object-cover" />
                                    <label htmlFor="logo" className=" absolute bottom-0 right-0 w-8 h-8 flex items-center justify-center rounded-full bg-white text-red-600 cursor-pointer hover:bg-red-600 hover:text-white"> <BiEdit size={20} /></label>
                                    <input id="logo"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFotoChange} className="hidden"
                                    />
                                </div>

                            </div>
                            <div className="flex gap-2">
                                <button onClick={updateLogo} className="bg-red-500 rounded-md p-2 text-white text-sm font-medium">update</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 border-b py-4">
                        <p className="text-gray-800 w-32 font-medium">Full Name</p>
                        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                            <div>
                                <p className="text-gray-600 w-32 text-sm font-medium mb-2">Nama Lengkap</p>
                                <input name="nama_lengkap" value={user.nama_lengkap || ""} onChange={handleChange}
                                    type="text" placeholder="Enter Your Name" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-red-500 focus:ring-red-500/40 rounded-xl w-full text-sm" />
                            </div>
                        </div>
                    </div>
                    <div className="border-b py-4">
                        <p className="text-gray-800 w-32 font-medium mb-4">Data</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-gray-600 w-32 text-sm font-medium mb-2">Username</p>
                                <input name="username" value={user.username || ""} ronChange={handleChange} type="text" placeholder="Enter Your Name" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-red-500 focus:ring-red-500/40 rounded-xl w-full text-sm" />
                            </div>
                            <div>
                                <p className="text-gray-600 w-32 text-sm font-medium mb-2">Email</p>
                                <input name="email" value={user.email || ""} onChange={handleChange} type="email" placeholder="Enter Your Name" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-red-500 focus:ring-red-500/40 rounded-xl w-full text-sm" />
                            </div>
                        </div>
                    </div>
                    <div>
                        <button onClick={update} className="bg-red-600 text-white px-8 p-2 rounded-xl font-medium transition-all text-center text-sm duration-300 hover:bg-red-700 hover:scale-[1.02] hover:shadow-xl active:scale-95 flex items-center">Update</button>
                    </div>

                </div>

                <div className="mt-10">
                    <p className="text-gray-800 w-32 font-medium mb-2">Password</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-600 w-32 text-sm font-medium mb-2">Current Password</p>
                            <input type="password" name="passwordLama" value={password.passwordLama} onChange={handleChangePassword} placeholder="Enter Your Name" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-red-500 focus:ring-red-500/40 rounded-xl w-full text-sm" />
                        </div>
                        <div>
                            <p className="text-gray-600 w-32 text-sm font-medium mb-2">New Password</p>
                            <input type="password" name="passwordBaru" value={password.passworBaru} onChange={handleChangePassword} placeholder="Enter Your Name" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-red-500 focus:ring-red-500/40 rounded-xl w-full text-sm" />
                        </div>
                    </div>
                    <button onClick={SavePassword} className="bg-red-600 text-white px-8 p-2 rounded-xl font-medium transition-all text-center text-sm duration-300 hover:bg-red-700 hover:scale-[1.02] hover:shadow-xl active:scale-95 flex items-center mt-10">Update</button>

                </div>
            </div>
        </>
    )
}