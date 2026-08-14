import { useEffect, useState } from "react";
import Setting from "./Setting";

export default function HeroSetting() {
    const [hero, setHero] = useState([]);
    const [motor, setMotor] = useState([]);
    const [select, setSelect] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    const token = localStorage.getItem("token");

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
            alert("Silakan pilih motor terlebih dahulu");
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
                alert(data.message || "Gagal memilih hero");
                return;
            }

            if (data.success) {
                alert("Motor berhasil dijadikan Hero");

                setSelect("");

                // Ambil data hero terbaru
                getHero();
            }
        } catch (error) {
            console.error("Error create hero:", error);
            alert("Terjadi kesalahan");
        }
    };

    return (
        <>            <div className="min-h-screen w-full flex gap-2 bg-gray-50 overflow-x-hidden">

            <Setting isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
            <div className="bg-white rounded-xl shadow p-5 w-full">

                <h2 className="text-lg font-bold mb-4">
                    Pilih Produk Hero
                </h2>

                {/* SELECT MOTOR */}
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
                                className="border rounded-2xl p-4 flex flex-col md:flex-row gap-5"
                            >

                                {/* GAMBAR */}
                                <img
                                    src={item.gambar}
                                    alt={item.nama_motor}
                                    className="w-full md:w-40 h-40 object-cover rounded-xl"
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
                                        Harga: Rp{" "}
                                        {Number(item.harga).toLocaleString("id-ID")}
                                    </p>

                                    <p className="text-sm text-gray-600 mt-2">
                                        {item.deskripsi}
                                    </p>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </div>
        </div>

        </>
    );
}