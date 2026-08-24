import { useEffect, useState } from "react"
import { BiEdit } from "react-icons/bi"
import Setting from "./Setting"
import { RxHamburgerMenu } from "react-icons/rx"
import CustomAlert from "../../../components/CustomAlert"

export default function SettingProfileDealer() {

    const [footer, setFooter] = useState([])
    const [logo, setLogo] = useState(null)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [alert, setAlert] = useState(null)


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
                `${import.meta.env.VITE_API_URL}/api/footer/${footer.id_footer}/logo`,
                {
                    method: "PUT",
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
        <div className="min-h-screen w-full flex bg-gray-50 overflow-x-hidden gap-2">
            <Setting isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="flex-1 min-w-0 flex flex-col bg-gray-50 overflow-x-hidden">
                {alert && <CustomAlert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
                <div className="sticky top-0 z-20 flex items-center justify-start px-0 py-4 bg-gray-50 border-b border-gray-100 lg:border-b-0">
                    <button
                        className="lg:hidden flex-shrink-0 p-2 rounded-lg hover:bg-gray-100 transition-colors bg-white shadow-sm"
                        onClick={() => setIsSidebarOpen(prev => !prev)}
                        aria-label="Toggle sidebar"
                    >
                        <RxHamburgerMenu size={24} />
                    </button>
                </div>

                <div className="bg-white p-4 rounded-xl w-full lg:mx-0 mb-4 mt-0 lg:mt-0">
                    <div className="mb-4 border-b py-4">
                        <p className="text-lg font-medium">Profil Delaer</p>
                        <p className="text-xs text-gray-600">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa, accusantium?</p>
                    </div>
                    <div className="flex  flex-col gap-4">
                        <div className="flex flex-col shadow p-4 rounded-xl">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                <div className="flex flex-col sm:flex-row items-center gap-4">
                                    <div className="w-32">
                                        <div className="w-32 h-32">
                                            <img src={
                                                logo
                                                    ? URL.createObjectURL(logo)
                                                    : `${footer.logo}`
                                            } className="w-32 h-32 rounded-full object-cover" />
                                        </div>
                                        <div className="-mt-10">
                                            <label htmlFor="logo" className="ml-32 -mt-2 w-8 h-8 flex items-center justify-center rounded-full bg-[#002446] text-[#F2F8FC] cursor-pointer hover:bg-[#00182F] hover:text-white shadow-md z-10"> <BiEdit size={20} />
                                            </label></div>
                                    </div>
                                    <input id="logo" type="file" accept="image/*" onChange={handlelogoFooter} className="hidden" />
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={updateLogo} className="bg-[#002446] text-[#F2F8FC] rounded-md p-2  text-sm font-medium hover:scale-[1.02] hover:shadow-xl active:scale-95 transition-all">update</button>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 py-4 shadow p-4 rounded-xl">
                            <div className="flex flex-col md:flex-row gap-10">
                                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 w-full">
                                    <div>
                                        <p className="text-gray-600 w-32 text-sm font-medium mb-2">Nama Delaer</p>
                                        <input type="text" name="nama_dealer" value={footer.nama_dealer} onChange={handleFooter} placeholder="Nama Dealer" title="Nama Dealer" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 rounded-xl w-full text-sm truncate-placeholder" />
                                    </div>
                                    <div>
                                        <p className="text-gray-600 w-32 text-sm font-medium mb-2">Sub Title</p>
                                        <input type="text" name="title" value={footer.title} onChange={handleFooter} placeholder="Sub Title" title="Sub Title" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 rounded-xl w-full text-sm truncate-placeholder" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-1 gap-6 w-full">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                        <div>
                                            <p className="text-gray-600 w-32 text-sm font-medium mb-2">jam_sabtu</p>
                                            <input type="text" name="jam_sabtu" value={footer.jam_sabtu} onChange={handleFooter} placeholder="Jam Operasional (Sabtu)" title="Jam Operasional (Sabtu)" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 rounded-xl w-full text-sm truncate-placeholder" />
                                        </div>
                                        <div>
                                            <p className="text-gray-600 w-32 text-sm font-medium mb-2">jam_senin_jumat</p>
                                            <input type="text" name="jam_senin_jumat" value={footer.jam_senin_jumat} onChange={handleFooter} placeholder="Jam Operasional (Senin-Jumat)" title="Jam Operasional (Senin-Jumat)" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 rounded-xl w-full text-sm truncate-placeholder" />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-gray-600 w-32 text-sm font-medium mb-2">Alamat</p>
                                        <textarea type="text" name="alamat" value={footer.alamat} onChange={handleFooter} placeholder="Alamat" title="Alamat" className="bg-white/10 border border-black/15 p-2 placeholder-gray-300 focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 rounded-xl w-full text-sm truncate-placeholder" />
                                    </div>
                                </div>
                            </div>
                            <button onClick={updateFooter} className="w-28 bg-[#002446] text-[#F2F8FC]  px-8 p-2 rounded-xl font-medium transition-all text-center text-sm duration-300 hover:bg-[#00182F] hover:scale-[1.02] hover:shadow-xl active:scale-95 flex items-center mt-10">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>



    )
}