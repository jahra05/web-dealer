import { useEffect, useState } from "react"
import { BiEdit } from "react-icons/bi"

export default function SettingProfileDealer() {

    const [footer, setFooter] = useState([])

    const [logo, setLogo] = useState(null)

    const getFooter = async () => {

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/footer`)

            const data = await response.json();
            console.log(data)

            setFooter(data.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    const updateFooter = async () => {


        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/footer/${footer.id_footer}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(footer),
            });

            const data = await response.json();
            alert(data.message)

            console.log(data)

        } catch (error) {
            console.log(error)
        }

    }

    const updateLogo = async () => {
        const formData = new FormData();

        formData.append("logo", logo);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/footer/${footer.id_footer}/logo`,
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

    const handleFooter = (e) => {
        const { name, value } = e.target;
        setFooter((prev) => ({
            ...prev, [name]: value
        }))
    }

    const handlelogoFooter = (e) => {
        setLogo(e.target.files[0])
    }


    useEffect(() => {
        getFooter()
    }, [])

    return (
        <div className="bg-white p-4 rounded-xl w-[100%]">
            <div className="mb-4 border-b py-4">
                <p className="text-lg font-medium">Profil Delaer</p>
                <p className="text-xs text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa, accusantium?</p>
            </div>
            <div className="flex  flex-col gap-4">
                <div className="flex  flex-col">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="relative w-20 h-20">
                                <img className="w-20 h-20 rounded-full object-cover"
                                    src={
                                        logo
                                            ? URL.createObjectURL(logo)
                                            : `${import.meta.env.VITE_API_URL}/uploads/${footer.logo}`
                                    }
                                />
                                <label htmlFor="logo" className=" absolute bottom-0 right-0 w-8 h-8 flex items-center justify-center rounded-full bg-white text-red-600 cursor-pointer hover:bg-red-600 hover:text-white"> <BiEdit size={20} /></label>
                                <input id="logo" type="file" accept="image/*" onChange={handlelogoFooter} className="hidden" />
                            </div>

                        </div>
                        <div className="flex gap-2">
                            <button onClick={updateLogo} className="bg-red-500 rounded-md p-2 text-white text-sm font-medium">update</button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 border-b py-4">
                    <p className="text-gray-800 w-32 font-medium">Informasi</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-600 w-32 text-sm font-medium mb-2">Nama Delaer</p>
                            <input type="text" name="nama_dealer" value={footer.nama_dealer} onChange={handleFooter} placeholder="Enter Your Name" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-red-500 focus:ring-red-500/40 rounded-xl w-full text-sm" />
                        </div>
                        <div>
                            <p className="text-gray-600 w-32 text-sm font-medium mb-2">Alamat</p>
                            <textarea type="text" name="alamat" value={footer.alamat} onChange={handleFooter} placeholder="Enter Your Name" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-red-500 focus:ring-red-500/40 rounded-xl w-full text-sm" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-600 w-32 text-sm font-medium mb-2">deskripsi</p>
                            <input type="text" name="deskripsi" value={footer.deskripsi} onChange={handleFooter} placeholder="Enter Your Name" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-red-500 focus:ring-red-500/40 rounded-xl w-full text-sm" />
                        </div>
                        <div>
                            <p className="text-gray-600 w-32 text-sm font-medium mb-2">google_maps</p>
                            <input type="text" name="google_maps" value={footer.google_maps} onChange={handleFooter} placeholder="Enter Your Name" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-red-500 focus:ring-red-500/40 rounded-xl w-full text-sm" />
                        </div>
                    </div>
                    <div className="border-b py-4">
                        <p className="text-gray-800 w-32 font-medium mb-4">Jam Operasional</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-gray-600 w-32 text-sm font-medium mb-2">jam_sabtu</p>
                                <input type="text" name="jam_sabtu" value={footer.jam_sabtu} onChange={handleFooter} placeholder="Enter Your Name" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-red-500 focus:ring-red-500/40 rounded-xl w-full text-sm" />
                            </div>
                            <div>
                                <p className="text-gray-600 w-32 text-sm font-medium mb-2">jam_senin_jumat</p>
                                <input type="text" name="jam_senin_jumat" value={footer.jam_senin_jumat} onChange={handleFooter} placeholder="Enter Your Name" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-red-500 focus:ring-red-500/40 rounded-xl w-full text-sm" />
                            </div>
                        </div>
                    </div>
                    <div className="border-b py-4">
                        <p className="text-gray-800 w-32 font-medium mb-4">Contact</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            <div>
                                <p className="text-gray-600 w-32 text-sm font-medium mb-2">Nomor Telepon</p>
                                <input type="number" name="no_hp" value={footer.no_hp} onChange={handleFooter} placeholder="Enter Your Name" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-red-500 focus:ring-red-500/40 rounded-xl w-full text-sm" />
                            </div>
                            <div>
                                <p className="text-gray-600 w-32 text-sm font-medium mb-2">Email</p>
                                <input type="email" name="email" value={footer.email} onChange={handleFooter} placeholder="Enter Your Name" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-red-500 focus:ring-red-500/40 rounded-xl w-full text-sm" />
                            </div>
                            <div>
                                <p className="text-gray-600 w-32 text-sm font-medium mb-2">whatsapp</p>
                                <input type="text" name="whatsapp" value={footer.whatsapp} onChange={handleFooter} placeholder="Enter Your Name" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-red-500 focus:ring-red-500/40 rounded-xl w-full text-sm" />
                            </div>
                        </div>
                    </div>


                </div>
                <div className="border-b py-4">
                    <p className="text-gray-800 w-32 font-medium mb-4">Info Medsos</p>
                    <div className="flex flex-col gap-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-gray-600 w-32 text-sm font-medium mb-2">youtube</p>
                                <input type="text" name="youtube" value={footer.youtube} onChange={handleFooter} placeholder="Enter Your Name" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-red-500 focus:ring-red-500/40 rounded-xl w-full text-sm" />
                            </div>

                            <div>
                                <p className="text-gray-600 w-32 text-sm font-medium mb-2">instagram</p>
                                <input type="text" name="instagram" value={footer.instagram} onChange={handleFooter} placeholder="Enter Your Name" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-red-500 focus:ring-red-500/40 rounded-xl w-full text-sm" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-gray-600 w-32 text-sm font-medium mb-2">facebook</p>
                                <input type="text" name="facebook" value={footer.facebook} onChange={handleFooter} placeholder="Enter Your Name" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-red-500 focus:ring-red-500/40 rounded-xl w-full text-sm" />
                            </div>
                            <div>
                                <p className="text-gray-600 w-32 text-sm font-medium mb-2">tiktok</p>
                                <input type="text" name="tiktok" value={footer.tiktok} onChange={handleFooter} placeholder="Enter Your Name" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-red-500 focus:ring-red-500/40 rounded-xl w-full text-sm" />
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <button onClick={updateFooter} className="bg-red-600 text-white px-8 p-2 rounded-xl font-medium transition-all text-center text-sm duration-300 hover:bg-red-700 hover:scale-[1.02] hover:shadow-xl active:scale-95 flex items-center mt-10">Update</button>
        </div>
    )
}