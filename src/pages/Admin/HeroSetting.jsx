import { useEffect, useState } from "react";
import Setting from "./Setting";
import CustomAlert from "../../components/CustomAlert";
import ConfirmAlert from "../../components/ConfirmAlert";
import { RxHamburgerMenu } from "react-icons/rx";

export default function HeroSetting() {
    const [hero, setHero] = useState([]);
    const [motor, setMotor] = useState([]);
    const [select, setSelect] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [alert, setAlert] = useState(null)
    const [confirm, setConfirm] = useState(null)


    const token = localStorage.getItem("token");

    const deleteHero = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/hero/${id}`, {
                method: 'DELETE',
                headers: {
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
                `${import.meta.env.VITE_API_URL}/api/hero`
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
                `${import.meta.env.VITE_API_URL}/api/motor`
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
                `${import.meta.env.VITE_API_URL}/api/hero`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
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
            <div className="min-h-screen w-full flex gap-2 bg-gray-50 overflow-x-hidden">
                <Setting isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <div className="flex-1 min-w-0 flex flex-col bg-gray-50 overflow-x-hidden mr-4">
                    <div className="flex items-center justify-between p-4">
                        <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            onClick={() => setIsSidebarOpen(prev => !prev)}>
                            <RxHamburgerMenu size={24} />
                        </button>
                    </div>

                    <div className="bg-white p-4 rounded-xl w-[100%]">
                        <h2 className="text-lg font-bold mb-4">
                            Pilih Produk Hero
                        </h2>
                        <div className="flex flex-col md:flex-row gap-3">
                            <select
                                value={select}
                                onChange={(e) => setSelect(e.target.value)}
                                className="border border-blue-100 rounded-xl px-4 py-3"
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
                                className="bg-[#002446] text-white px-5 py-3 rounded-xl font-semibold"
                            >
                                Jadikan Hero
                            </button>

                        </div>


                        {/* HERO YANG SUDAH DIPILIH */}
                        {hero.length > 0 && (
                            <div className="mt-6">

                                <h2 className="text-lg font-bold mb-4">
                                    Hero Saat Ini
                                </h2>

                                {hero.map((item) => (
                                    <div
                                        key={item.id_hero}
                                        className="border rounded-2xl p-4 flex flex-row md:flex-row gap-8"
                                    >

                                        {/* GAMBAR */}
                                        <img
                                            src={item.gambar}
                                            alt={item.nama_motor}
                                            className="w-40 h-32 md:w-48 md:h-40 object-cover rounded-xl"
                                        />

                                        {/* DATA MOTOR */}
                                        <div className="flex flex-col justify-center">

                                            <span className="w-fit text-xs bg-green-100 text-green-600 px-3 py-1 rounded-full font-semibold mb-2">
                                                Hero Aktif
                                            </span>

                                            <h3 className="text-xl font-bold text-[#002446]">
                                                {item.nama_motor}
                                            </h3>

                                            <p className="text-sm text-gray-500">
                                                {item.nama_kategori} • {item.nama_tipe}
                                            </p>

                                            <p className="text-sm text-gray-600 mt-2">
                                                Tenaga Motor:  {item.tenaga}
                                            </p>
                                            <p className="text-sm text-gray-600 mt-2">
                                                Mesin Motor:  {item.mesin}
                                            </p>
                                            <p className="text-sm text-gray-600 mt-2">
                                                Berat Motor: {item.berat}
                                            </p>
                                            <button onClick={() => deleteHero(item.id_hero)} className="mt-4 w-fit bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold">hapus</button>
                                        </div>

                                    </div>
                                ))}

                            </div>
                        )}

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