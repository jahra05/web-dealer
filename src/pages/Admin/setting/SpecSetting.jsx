import { RxHamburgerMenu } from "react-icons/rx";
import Setting from "./Setting";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";
import { getFunctionUrl, getSupabaseHeaders, SUPABASE_PUBLISHABLE_KEY, } from "../../../config/supabase"

export default function SpecSetting() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [alert, setAlert] = useState(null)
    const navigate = useNavigate()

    const getKategoriSpesifikasi = async () => {
        try {
            const response = await fetch(
                getFunctionUrl('kategori-spesifikasi'), {
                headers: {
                    ...getSupabaseHeaders()
                }
            }
            );

            const data = await response.json();

            if (data.success) {
                setKategoriSpesifikasi(data.data);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const updateSpecKategori = async () => {


        try {
            const response = await fetch(getFunctionUrl(`kategoriSpesifikasi/${kategoriSpesifikasi.id_kategoriSpesifikasi}`), {
                method: "PUT",
                headers: {
                    apikey: SUPABASE_PUBLISHABLE_KEY,
                    Authorization: `Bearer ${token}`
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
    const handleSpecKategori = (e) => {
        const { name, value } = e.target;
        setKategoriSpesifikasi((prev) => ({
            ...prev, [name]: value
        }))
    }
    useEffect(() => {
        getKategoriSpesifikasi()
    }, [])

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
                            <main className=" px-4  pb-6 overflow-x-hidden">
                                <div className="flex flex-col md:flex-row gap-6 lg:gap-10 mt-6 md:mt-10">
                                    <div className="flex-1 flex-col pb-4 border-gray-200 gap-5 w-full md:flex-1 bg-white md:bg-transparent md:rounded-none p-1 md:p-0">
                                        <div className="md:hidden">
                                            <h3 className="text-base font-semibold text-[#001323]">Footer</h3>
                                            <p className="text-xs text-gray-400 mt-1">Kelola informasi Footer</p>
                                        </div>

                                        <div className="grid grid-cols-1 gap-5 mt-6">
                                            <div>
                                                <label className="block text-gray-500 text-sm font-medium mb-2">Email</label>
                                                <input type="email" name="email" value={footer.email} onChange={handleFooter} placeholder="Email" title="Email" className="bg-white border  border-gray-200 p-3 rounded-xl w-full text-sm text-[#001323] placeholder-gray-300
                                                    focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 transition-all" />
                                            </div>
                                            <div>
                                                <label className="block text-gray-500 text-sm font-medium mb-2">Nomor Telepon</label>
                                                <input type="number" name="no_hp" value={footer.no_hp} onChange={handleFooter} placeholder="Nomor Telepon" title="Nomor Telepon" className="bg-white border  border-gray-200 p-3 rounded-xl w-full text-sm text-[#001323] placeholder-gray-300
                                                      focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 transition-all" />
                                            </div>

                                            <div>
                                                <label className="block text-gray-500 text-sm font-medium mb-2">Whatsapp</label>
                                                <input type="text" name="whatsapp" value={footer.whatsapp} onChange={handleFooter} placeholder="WhatsApp" title="WhatsApp" className="bg-white border  border-gray-200 p-3 rounded-xl w-full text-sm text-[#001323] placeholder-gray-300
                                                   focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 transition-all" />
                                            </div>
                                            <div>
                                                <label className="block text-gray-500 text-sm font-medium mb-2">Google_maps</label>
                                                <textarea type="text" name="google_maps" value={footer.google_maps} onChange={handleFooter} placeholder="Google Maps (URL atau embed)" title="Google Maps (URL atau embed)" className="bg-white border  border-gray-200 p-3 rounded-xl w-full text-sm text-[#001323] placeholder-gray-300
                                                   focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 transition-all" />
                                            </div>
                                            <div>
                                                <label className="block text-gray-500 text-sm font-medium mb-2">Instagram</label>
                                                <input type="text" name="instagram" value={footer.instagram} onChange={handleFooter} placeholder="Instagram" title="Instagram" className="bg-white border  border-gray-200 p-3 rounded-xl w-full text-sm text-[#001323] placeholder-gray-300
                                                   focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 transition-all" />
                                            </div>
                                            <div>
                                                <label className="block text-gray-500 text-sm font-medium mb-2">Facebook</label>
                                                <input type="text" name="facebook" value={footer.facebook} onChange={handleFooter} placeholder="Facebook" title="Facebook" className="bg-white border  border-gray-200 p-3 rounded-xl w-full text-sm text-[#001323] placeholder-gray-300
                                                   focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 transition-all" />
                                            </div>
                                            <div>
                                                <label className="block text-gray-500 text-sm font-medium mb-2">Deskripsi</label>
                                                <textarea type="text" name="deskripsi" value={footer.deskripsi} onChange={handleFooter} placeholder="Deskripsi" title="Deskripsi" className="bg-white border  border-gray-200 p-3 rounded-xl w-full text-sm text-[#001323] placeholder-gray-300
                                                   focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100 transition-all" />
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

        </>
    )
}