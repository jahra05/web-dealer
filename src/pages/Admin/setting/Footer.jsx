import { RxHamburgerMenu } from "react-icons/rx";
import Setting from "./Setting";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";

export default function Footer() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [footer, setFooter] = useState([])
    const [alert, setAlert] = useState(null)
    const navigate = useNavigate()

    const getFooter = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/footer`)
            const data = await response.json()

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
            setAlert({ type: 'success', message: data.message })
            console.log(data)

        } catch (error) {
            console.log(error)
        }

    }
    const handleFooter = (e) => {
        const { name, value } = e.target;
        setFooter((prev) => ({
            ...prev, [name]: value
        }))
    }
    useEffect(() => {
        getFooter()
    }, [])

    return (
        <>
            <div className=" mt-4 p-4 flex flex-col overflow-x-hidden">
                <h3 className="text-xl font-medium hidden min-[1010px]:block">Pengaturan</h3>
                <button onClick={() => navigate('/admin/dashboard')} className="w-32 ml-4 p-1 text-lg min-[1010px]:hidden flex items-center "> <BiChevronLeft size={28} />Setting</button>
                <div className="flex flex-col w-full mt-4 bg-white p-4  rounded-xl">
                    <Setting isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                    <div className=" w-full min-w-0 flex flex-col  overflow-x-hidden z-10">
                        <div className="bg-white p-4 rounded-xl w-full mb-4">
                            <div className="flex flex-col gap-4 p-4 ">
                                <div className="flex flex-col md:flex-row gap-10">

                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 w-full">
                                        <div>
                                            <p className="text-gray-400 w-32 text-sm font-medium mb-2">Email</p>
                                            <input type="email" name="email" value={footer.email} onChange={handleFooter} placeholder="Email" title="Email" className="bg-white/10 border border-gray-200 p-2 placeholder-gray-300 focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 rounded-xl w-full text-sm truncate-placeholder" />
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                            <div>
                                                <p className="text-gray-400 w-32 text-sm font-medium mb-2">Nomor Telepon</p>
                                                <input type="number" name="no_hp" value={footer.no_hp} onChange={handleFooter} placeholder="Nomor Telepon" title="Nomor Telepon" className="bg-white/10 border border-gray-200 p-2 placeholder-gray-300 focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 rounded-xl w-full text-sm truncate-placeholder" />
                                            </div>
                                            <div>
                                                <p className="text-gray-400 w-32 text-sm font-medium mb-2">Whatsapp</p>
                                                <input type="text" name="whatsapp" value={footer.whatsapp} onChange={handleFooter} placeholder="WhatsApp" title="WhatsApp" className="bg-white/10 border border-gray-200 p-2 placeholder-gray-300 focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 rounded-xl w-full text-sm truncate-placeholder" />
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-gray-400 w-32 text-sm font-medium mb-2">Google_maps</p>
                                            <textarea type="text" name="google_maps" value={footer.google_maps} onChange={handleFooter} placeholder="Google Maps (URL atau embed)" title="Google Maps (URL atau embed)" className="bg-white/10 border border-gray-200 p-2 placeholder-gray-300 focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 rounded-xl w-full h-full text-sm " />
                                        </div>
                                    </div>
                                    <div className="border-r border-gray-100"></div>
                                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6 w-full">
                                        <div>
                                            <p className="text-gray-400 w-32 text-sm font-medium mb-2">Instagram</p>
                                            <input type="text" name="instagram" value={footer.instagram} onChange={handleFooter} placeholder="Instagram" title="Instagram" className="bg-white/10 border border-gray-200 p-2 placeholder-gray-300 focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 rounded-xl w-full text-sm truncate-placeholder" />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 w-32 text-sm font-medium mb-2">Facebook</p>
                                            <input type="text" name="facebook" value={footer.facebook} onChange={handleFooter} placeholder="Facebook" title="Facebook" className="bg-white/10 border border-gray-200 p-2 placeholder-gray-300 focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 rounded-xl w-full text-sm truncate-placeholder" />
                                        </div>
                                        <div>
                                            <p className="text-gray-400 w-32 text-sm font-medium mb-2">Deskripsi</p>
                                            <textarea type="text" name="deskripsi" value={footer.deskripsi} onChange={handleFooter} placeholder="Deskripsi" title="Deskripsi" className="bg-white/10 border  border-gray-200 p-2 placeholder-gray-300 focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 rounded-xl w-full text-sm " />
                                        </div>
                                    </div>
                                </div>
                                <button onClick={updateFooter} className="w-28 bg-[#002446] text-[#F2F8FC]  px-8 p-2 rounded-xl font-medium transition-all text-center text-sm duration-300 hover:bg-[#00182F] hover:scale-[1.02] hover:shadow-xl active:scale-95 flex items-center mt-10">Update</button>

                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}