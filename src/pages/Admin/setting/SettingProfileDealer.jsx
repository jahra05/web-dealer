import { useEffect, useState } from "react"
import { BiChevronLeft, BiEdit } from "react-icons/bi"
import Setting from "./Setting"
import { RxHamburgerMenu } from "react-icons/rx"
import CustomAlert from "../../../components/CustomAlert"
import { useNavigate } from "react-router-dom"
import { getFunctionUrl, getSupabaseHeaders, SUPABASE_PUBLISHABLE_KEY, } from "../../../config/supabase";

export default function SettingProfileDealer() {

    const [footer, setFooter] = useState([])
    const [logo, setLogo] = useState(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [alert, setAlert] = useState(null)
    const navigate = useNavigate()

    const getFooter = async () => {

        try {
            const response = await fetch(getFunctionUrl('footer'), {
                headers: {
                    ...getSupabaseHeaders(),
                }
            })

            const data = await response.json();
            console.log(data)

            setFooter(data.data[0])
        } catch (error) {
            console.log(error)
        }
    }

    const updateFooter = async () => {


        try {
            const response = await fetch(getFunctionUrl(`footer/${footer.id_footer}`), {
                method: "PUT",
                headers: {
                    ...getSupabaseHeaders(),
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

    const updateLogo = async () => {
        const formData = new FormData();

        formData.append("logo", logo);

        try {
            const response = await fetch(
                getFunctionUrl(`footer/${footer.id_footer}/logo`),
                {
                    method: "PUT",
                    headers: {
                        ...getSupabaseHeaders(),
                    },
                    body: formData,
                }
            );

            const data = await response.json();
            setAlert({ type: 'success', message: data.message })

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
                                        <h3 className="text-base font-semibold text-[#001323]">Profile Dealer</h3>
                                        <p className="text-xs text-gray-400 mt-1">Kelola informasi Dealer</p>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mt-4  pb-5 border-b border-gray-100">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden 
                                                                border border-gray-200 bg-gray-50">
                                                    <img src={logo ? URL.createObjectURL(logo) : `${footer.logo}`}
                                                        className="w-full h-full object-cover" alt="Profile" />
                                                </div>
                                                <label htmlFor="logo" className="absolute ring-0 bottom-0 w-8 h-8 flex items-center justify-center rounded-full bg-[#00182F] text-white cursor-pointer hover:bg-[#00182F] shadow-md transition-all duration-200">
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
                                            className="w-full sm:w-auto bg-[#002446] text-white rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:bg-[#00182F] active:scale-95">Simpan Foto</button>
                                    </div>
                                    <input id="logo" type="file" accept="image/*" onChange={handlelogoFooter} className="hidden" />
                                    <div className="grid grid-cols-1 gap-5 mt-6">
                                        <div>
                                            <label className="block text-gray-500 text-sm font-medium mb-2">Nama Dealer</label>
                                            <input name="nama_dealer" value={footer.nama_dealer} onChange={handleFooter}
                                                type="text" placeholder="Nama Dealer" title="Nama Dealer" className="bg-white border border-gray-200 p-3 rounded-xl w-full text-sm text-[#001323] placeholder-gray-300
                                             focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-500 text-sm font-medium mb-2">Sub Title</label>
                                            <input type="text" name="title" value={footer.title} onChange={handleFooter} placeholder="Sub Title" title="Sub Title" className="bg-white border border-gray-200 p-3 rounded-xl w-full text-sm text-[#001323] placeholder-gray-300
                                               focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-gray-500 text-sm font-medium mb-2">jam_sabtu</label>
                                            <input type="text" name="jam_sabtu" value={footer.jam_sabtu} onChange={handleFooter} placeholder="Jam Operasional (Sabtu)" title="Jam Operasional (Sabtu)"
                                                className="bg-white border border-gray-200 p-3 rounded-xl w-full text-sm text-[#001323] placeholder-gray-300 focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 transition-all" />
                                        </div>

                                        <div>
                                            <label className="block text-gray-500 text-sm font-medium mb-2">jam_senin_jumat</label>
                                            <input type="text" name="jam_senin_jumat" value={footer.jam_senin_jumat} onChange={handleFooter} placeholder="Jam Operasional (Senin-Jumat)" title="Jam Operasional (Senin-Jumat)"
                                                className="bg-white border border-gray-200 p-3 rounded-xl w-full text-sm text-[#001323] placeholder-gray-300 focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-500 text-sm font-medium mb-2">Alamat</label>
                                            <textarea type="text" name="alamat" value={footer.alamat} onChange={handleFooter} placeholder="Alamat" title="Alamat"
                                                className="bg-white border border-gray-200 p-3 rounded-xl w-full text-sm text-[#001323] placeholder-gray-300 focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 transition-all"
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-1">
                                        <button onClick={updateFooter}
                                            className="w-full sm:w-auto bg-[#002446] text-white rounded-xl px-5 mt-4 py-2.5 text-sm font-medium transition-all duration-300 hover:bg-[#00182F] active:scale-95">Simpan Perubahan</button>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>

            </div >
        </div >

    )
}