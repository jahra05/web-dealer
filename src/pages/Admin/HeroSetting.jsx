import { useEffect, useState } from "react";

export default function HeroSetting() {
    const [hero, setHero] = useState([]);
    const [motor, setMotor] = useState([]);
    const [select, setSelect] = useState("");

    const token = localStorage.getItem("token");

    // =========================
    // GET HERO
    // =========================
    const getHero = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/hero`
            );

            const data = await response.json();

            console.log("DATA HERO:", data);

            if (data.success) {
                setHero(data.data);
            }
        } catch (error) {
            console.error("Gagal mengambil hero:", error);
        }
    };

    // =========================
    // GET MOTOR
    // =========================
    const getMotor = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/motor`
            );

            const data = await response.json();

            console.log("DATA MOTOR:", data);

            if (data.success) {
                setMotor(data.data);
            }
        } catch (error) {
            console.error("Gagal mengambil motor:", error);
        }
    };

    useEffect(() => {
        getHero();
        getMotor();
    }, []);

    // =========================
    // PILIH / GANTI HERO
    // =========================
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
                alert(data.message || "Motor berhasil dijadikan hero");

                setSelect("");

                // Ambil data hero terbaru
                getHero();
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan");
        }
    };

    return (
        <>
            {/* PILIH HERO */}
            <div className="bg-white rounded-xl shadow p-5">
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
            </div>

            {/* HERO SAAT INI */}
            {hero.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-lg font-bold mb-4">
                        Hero Saat Ini
                    </h2>

                    {hero.map((item) => (
                        <div
                            key={item.id_hero}
                            className="flex items-center gap-4 border rounded-xl p-4"
                        >
                            <img
                                src={item.gambar}
                                alt={item.nama_motor}
                                className="w-24 h-24 object-cover rounded-lg"
                            />

                            <div>
                                <p className="font-bold">
                                    {item.nama_motor}
                                </p>

                                <p className="text-sm text-gray-500">
                                    {item.nama_kategori}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}