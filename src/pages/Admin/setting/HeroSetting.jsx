import { useEffect, useState } from "react";
import Setting from "./Setting";
import CustomAlert from "../../../components/CustomAlert";
import ConfirmAlert from "../../../components/ConfirmAlert";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { BiChevronLeft } from "react-icons/bi";
import { getFunctionUrl, getSupabaseHeaders, SUPABASE_PUBLISHABLE_KEY, } from "../../../config/supabase"


export default function HeroSetting() {
    const [hero, setHero] = useState([]);
    const [motor, setMotor] = useState([]);
    const [select, setSelect] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [alert, setAlert] = useState(null)
    const [confirm, setConfirm] = useState(null)
    const navigate = useNavigate()

    const token = localStorage.getItem("token");

    const deleteHero = async (id) => {
        try {
            const response = await fetch(getFunctionUrl(`hero/${id}`), {
                method: 'DELETE',
                headers: {
                    ...getSupabaseHeaders(),
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json();
            if (!response.ok) {
                setAlert({
                    type: 'warning',
                    message: "Gagal mengapus Hero"
                })
                return
            }
            if (data.success) {
                setAlert({
                    type: 'success',
                    message: "Motor berhasil dihapus dari Hero"
                })
                getHero()
            }
        } catch (error) {
            console.error("Error menghapus hero", error)
            setAlert({
                type: "warning",
                message: "Terjadi kesalahan"
            })

        }
    }

    const getHero = async () => {
        try {
            const response = await fetch(
                getFunctionUrl('hero'), {
                headers: {
                    ...getSupabaseHeaders()
                }
            }
            );

            const data = await response.json();

            console.log("DATA HERO:", data);

            if (data.success) {
                setHero(data.data || []);
            }
        } catch (error) {
            console.error("Gagal mengambil hero:", error);
        }
    };

    const getMotor = async () => {
        try {
            const response = await fetch(
                getFunctionUrl('motot'), {
                headers: {
                    ...getSupabaseHeaders()
                }
            }
            );

            const data = await response.json();

            console.log("DATA MOTOR:", data);

            if (data.success) {
                setMotor(data.data || []);
            }
        } catch (error) {
            console.error("Gagal mengambil motor:", error);
        }
    };

    useEffect(() => {
        getHero();
        getMotor();
    }, []);

    const createHero = async () => {
        if (!select) {
            setAlert({
                type: 'warning',
                message: "Silahkan Pilih Motor Terlebih Dahulu"
            })
            return;
        }

        try {
            const response = await fetch(
                getFunctionUrl('hero'),
                {
                    method: "POST",
                    headers: {
                        apikey: SUPABASE_PUBLISHABLE_KEY,
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        id_motor: select,
                    }),
                }
            );

            const data = await response.json();

            console.log("STATUS:", response.status);
            console.log("RESPONSE:", data);

            if (!response.ok) {
                setAlert({
                    type: 'error',
                    message: data.message || 'Gagal memilih heroƒ'
                })
                return;
            }

            if (data.success) {
                setAlert({
                    type: 'success',
                    message: "Motor berhasil dijadikan Hero"
                })

                setSelect("");

                // Ambil data hero terbaru
                getHero();
            }
        } catch (error) {
            console.error("Error create hero:", error);
            setAlert({
                type: "warning",
                message: "Terjadi kesalahan"
            })
        }
    };

    return (
        <>
            <div className=" mt-4 p-4 flex flex-col overflow-x-hidden">
                <h3 className="text-xl font-medium hidden min-[1010px]:block">Pengaturan</h3>
                <button onClick={() => navigate('/admin/dashboard')} className="w-32 ml-4 p-1 text-lg min-[1010px]:hidden flex items-center "> <BiChevronLeft size={28} />Setting</button>
                <div className="flex flex-col w-full mt-4 md:bg-white p-4  rounded-xl">
                    <Setting isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                    <div className=" w-full min-w-0 flex flex-col   overflow-x-hidden z-10">
                        <div className="bg-white p-6 rounded-xl w-full mb-4">

                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-5">
                                <div>
                                    <h2 className="text-lg font-bold text-[#001323]">
                                        Hero Saat Ini
                                    </h2>
                                    <p className="text-xs text-gray-400 mt-1 md:hidden">Pilih motor yang ingin ditampilkan sebagai hero</p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                    <select
                                        value={select}
                                        onChange={(e) => setSelect(e.target.value)}
                                        className="border border-blue-100 rounded-xl px-4 py-3 w-full md:w-56 text-sm bg-white focus:outline-none focus:border-[#006A9E] focus:ring-2 focus:ring-blue-100"
                                    >
                                        <option value="">
                                            -- Pilih Motor --
                                        </option>

                                        {motor
                                            .filter((item) => item.status === "Aktif")
                                            .map((item) => (
                                                <option
                                                    key={item.id_motor}
                                                    value={item.id_motor}
                                                >
                                                    {item.nama_motor}
                                                </option>
                                            ))}
                                    </select>

                                    <button
                                        onClick={createHero}
                                        className="bg-[#002446] text-white px-5 py-3 rounded-xl font-semibold text-sm w-full md:w-auto whitespace-nowrap transition-all duration-300 hover:bg-[#00182F] active:scale-95"
                                    >
                                        Jadikan Hero
                                    </button>

                                </div>
                            </div>


                            {/* HERO YANG SUDAH DIPILIH */}
                            {hero.length > 0 && (
                                <div className="mt-6">



                                    {hero.map((item) => (
                                        <div
                                            key={item.id_hero}
                                            className="mt-5 p-3 md:p-4 flex flex-col md:flex-row gap-5 border-b border-gray-100 last:border-b-0"
                                        >

                                            {/* GAMBAR */}
                                            <img
                                                src={item.gambar}
                                                alt={item.nama_motor}
                                                className="w-full h-48 sm:h-56 md:w-48 md:h-48 object-cover rounded-xl"
                                            />

                                            {/* DATA MOTOR */}
                                            <div className="flex flex-col justify-center">

                                                <span className="w-fit text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-semibold mb-2">
                                                    Hero Aktif
                                                </span>

                                                <h3 className="text-xl font-bold text-[#002446]">
                                                    {item.nama_motor}
                                                </h3>

                                                <p className="text-sm text-gray-500 mt-1">
                                                    {item.nama_kategori} • {item.nama_tipe}
                                                </p>
                                                <div className="mt-3 space-y-1">
                                                    <p className="text-sm text-gray-600">
                                                        Tenaga Motor:  {item.tenaga}
                                                    </p>

                                                    <p className="text-sm text-gray-600">
                                                        Mesin Motor:  {item.mesin}
                                                    </p>
                                                    <p className="text-sm text-gray-600">
                                                        Berat Motor: {item.berat}
                                                    </p>
                                                </div>
                                                <button onClick={() => deleteHero(item.id_hero)} className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 active:scale95">Hapus hero</button>
                                            </div>

                                        </div>
                                    ))}

                                </div>
                            )}

                        </div>
                    </div>
                </div>


                {alert && (
                    <CustomAlert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
                )}
                {confirm && (
                    <ConfirmAlert title='Hapus' message='Yakin ingin mengahapus ini' onConfirm={deleteHero} />
                )}
            </div>
        </>
    );
}