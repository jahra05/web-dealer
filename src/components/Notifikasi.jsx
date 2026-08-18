import { useEffect, useState } from "react"
import { FiFileText, FiMessageSquare } from "react-icons/fi"
import { IoNotifications, IoNotificationsOutline } from "react-icons/io5"
import { MdInventory2 } from "react-icons/md"

export default function Notifikasi() {
    const [stokMenipis, setStokMenipis] = useState([])
    const [messageMasuk, setMessageMasuk] = useState([])
    const [pengajuanMasuk, setPengajuanMasuk] = useState([])
    const [isOpen, setIsOpen] = useState(false)


    const handleClickMessage = async (item) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/contact/${item.id_message}/status`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            const data = await response.json();

            if (data.success) {
                setMessageMasuk((prev) => prev.filter((message) => message.id_message !== item.id_message))
            }
        } catch (error) {
            console.error("Gagal mengubha status message", error)
        }
    }

    const getNotifikasi = async () => {
        try {

            const [stokRes, pengajuanRes, pesanRes] = await Promise.all([
                fetch(`${import.meta.env.VITE_API_URL}/api/motor/stok-menipis`),
                fetch(`${import.meta.env.VITE_API_URL}/api/pengajuan`),
                fetch(`${import.meta.env.VITE_API_URL}/api/contact`)
            ]);

            const stokData = await stokRes.json();
            const pengajuanData = await pengajuanRes.json();
            const pesanData = await pesanRes.json();


            console.log("STATUS MESSAGE:", pesanData.data.map(item => ({
                id: item.id_message,
                nama: item.nama,
                status: item.status
            })));
            console.log("STOK:", stokData.data)

            console.log("STATUS PENGAJUAN:", pengajuanData.data.map(item => ({
                id: item.id_pengajuan,
                nama: item.nama,
                status: item.status
            })));

            if (stokData.success) {
                setStokMenipis(stokData.data)
            }

            if (pesanData.success) {
                const belumDibaca = pesanData.data.filter(
                    (item) => item.status === "Belum Dibaca"
                )
                console.log("MESSAGE BELUM DIBACA:", belumDibaca);
                setMessageMasuk(belumDibaca)
            }

            if (pengajuanData.success) {
                const pengajuanBaru = pengajuanData.data.filter(
                    (item) => item.status === "Menunggu"
                )

                console.log("PENGAJUAN MENUNGGU:", pengajuanBaru);

                setPengajuanMasuk(pengajuanBaru)
            }

        } catch (error) {
            console.error("Gagal mengambil notifikasi", error)
        }
    }

    useEffect(() => {
        getNotifikasi();

        const interval = setInterval(() => {
            getNotifikasi()
        }, 30000)

        return () => {
            clearInterval(interval)
        }
    }, [])

    const totalNotifikasi = stokMenipis.length + messageMasuk.length + pengajuanMasuk.length;
    return (
        <>
            <div className="relative">
                <button type="button" onClick={() => setIsOpen((prev) => !prev)} className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition">
                    <IoNotifications size={24} className="text-[#002446]" />
                    {totalNotifikasi > 0 && (
                        <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 
                        bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                            {totalNotifikasi > 99 ? "99+" : totalNotifikasi}
                        </span>
                    )}
                </button>
            </div>

            {isOpen && (
                <div className="absolute right-2 top-12 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-[9999] overflow-hidden" onClick={()=>setIsOpen(false)}>
                    <div className="flex items-center justify-between px-5 py-4 border-b" >
                        <div>
                            <h3 className="font-bold text-[#002446]">Notifikasi</h3>
                            <p className="text-xs text-gray-500 mt-1">{totalNotifikasi} notifikasi perlu diperhatikan</p>
                        </div>
                        <button type="button" onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full hover:bg-gray-100 text-gray-500">x</button>
                    </div>

                    <div className="max-h-[450px] overflow-y-auto">
                        {stokMenipis.length > 0 && (
                            <div className="p-4 border-b">
                                <div className="flex items-center gap-2 mb-3">
                                    <MdInventory2 className="text-orange-500" size={20} />
                                    <h4 className="font-semibold text-sm">Stok Menipis</h4>
                                    <span className="ml-auto text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                                        {stokMenipis.length}
                                    </span>
                                </div>
                                <div className="space-y-2">
                                    {stokMenipis.map((item) => (
                                        <div key={item.id_motor} className="flex items-center justify-between p-3 rounded-xl bg-orange-50">
                                            <div>
                                                <p className="text-sm font-semibold text-gray-800">{item.nama_motor}</p>
                                                <p className="text-xs text-gray-500">{item.stok === 0 ? 'Stok habis' : `Stok tersisa ${item.stok}`}</p>
                                            </div>
                                            <span className="text-lg">{item.stok === 0 ? "🔴" : "🟠"}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {messageMasuk.length > 0 && (
                            <div className="p-4 border-b">

                                <div className="flex items-center gap-2 mb-3">
                                    <FiMessageSquare
                                        className="text-blue-500"
                                        size={19}
                                    />

                                    <h4 className="font-semibold text-sm">
                                        Pesan Baru
                                    </h4>

                                    <span className="ml-auto text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                                        {messageMasuk.length}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    {messageMasuk.map((item) => (
                                        <div
                                            key={item.id_message}
                                            onClick={() => handleClickMessage(item)}
                                            className="p-3 rounded-xl bg-blue-50 cursor-pointer hover:bg-blue-100 transition"
                                        >
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {item.nama}
                                                </p>

                                                <span className="w-2 h-2 rounded-full bg-blue-500" />
                                            </div>

                                            <p className="text-xs text-gray-500 mt-1 truncate">
                                                {item.subjek}
                                            </p>

                                            <p className="text-xs text-gray-400 mt-1">
                                                Klik untuk menandai sudah dibaca
                                            </p>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        )}
                        {pengajuanMasuk.length > 0 && (
                            <div className="p-4 border-b">

                                <div className="flex items-center gap-2 mb-3">
                                    <FiFileText
                                        className="text-green-600"
                                        size={19}
                                    />

                                    <h4 className="font-semibold text-sm">
                                        Pengajuan Baru
                                    </h4>

                                    <span className="ml-auto text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                                        {pengajuanMasuk.length}
                                    </span>
                                </div>

                                <div className="space-y-2">
                                    {pengajuanMasuk.map((item) => (
                                        <div
                                            key={item.id_pengajuan}
                                            className="p-3 rounded-xl bg-green-50"
                                        >
                                            <p className="text-sm font-semibold">
                                                {item.nama}
                                            </p>

                                            <p className="text-xs text-gray-500 mt-1">
                                                Mengajukan {item.nama_motor}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {totalNotifikasi === 0 && (
                            <div className="py-12 text-center">

                                <IoNotificationsOutline
                                    size={40}
                                    className="mx-auto text-gray-300"
                                />

                                <p className="text-sm font-medium text-gray-500 mt-3">
                                    Tidak ada notifikasi
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                    Semua sudah aman
                                </p>
                            </div>
                        )}


                    </div >
                </div >
            )
            }


        </>
    )
}