import { useEffect, useState } from "react"
import { MdCancel, MdCheckCircle, MdHourglassEmpty, MdOutlineKeyboardArrowLeft } from "react-icons/md"
import { useNavigate, useParams } from "react-router-dom"
import { AnimatePresence, easeOut, motion } from 'framer-motion'
import { getFunctionUrl, getSupabaseHeaders, SUPABASE_PUBLISHABLE_KEY } from "../../config/supabase";

export default function DetailPengajuan() {
    const [detailData, setDetailData] = useState([])
    const { id } = useParams()
    const [alert, setAlert] = useState("")
    const navigate = useNavigate()

    const setStatus = async (id, status) => {
        try {
            const respon = await fetch(getFunctionUrl(`pengajuan/${id}`),
                {
                    method: "PUT",
                    headers: {
                        ...getSupabaseHeaders(),
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    body: JSON.stringify({
                        status
                    })
                }
            );
            const data = await respon.json();
            if (data.success) {
                setAlert({ type: 'success', message: data.message || 'Status berhasi diubah' })
                getIdPengajuan()
            } else {
                setAlert({ type: 'error', message: data.message })
            }
        } catch (error) {
            console.log(error)
        }
    }
    const getIdPengajuan = async () => {
        try {
            const response = await fetch(getFunctionUrl(`pengajuan/${id}`), {
                headers: getSupabaseHeaders()
            })
            console.log('ini respon', response)

            const data = await response.json()
            console.log("get penajuan detail berhasil", data)

            if (data.success) {
                setDetailData(data.data)
            }
        } catch (error) {
            console.error("Error get detail pengajuan", error)
        };
    }
    useEffect(() => {
        getIdPengajuan()
    }, [id])
    return (
        <>
            <div className="min-h-screen w-full flex bg-gray-50 overflow-x-hidden" >
                <div className="flex-1 min-w-0 flex flex-col bg-gray-50 overflow-x-hidden">
                    <main className="flex-1 px-2 pb-4 overflow-x-hidden mt-0 ">
                        <div className='mt-20'>
                            <div className='grid grid-cols-2 md:grid-cols-1   w-full'>
                                <div className="overflow-hidden bg-white px-2 py-10  rounded-md">
                                    <motion.button initial={{ opacity: 0, x: -2 }}
                                        animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                        onClick={() => navigate('/admin/pengajuanKredit')}
                                        className="mb-8 flex items-center space-x-2 text-gray-400 hover:text-[#00345F] font-bold transition-colors group"
                                    >
                                        <MdOutlineKeyboardArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                                        <span>Kembali ke Daftar Pengajuan</span>
                                    </motion.button>
                                    <div className="border-b border-gray-100 py-2 px-4 grid grid-row-2 gap-4">
                                        <h2 className="font-medium">Detaul Pengajuan</h2>
                                        <div className="flex justify-between">
                                            <p className="text-gray-600 font-medium text-md">Nomor Pengajuan</p>
                                            <p className="font-medium text-sm">{detailData.id_pengajuan}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-gray-600 font-medium text-md">Status</p>
                                            <select value={detailData.status} onChange={(e) => setStatus(
                                                detailData.id_pengajuan,
                                                e.target.value
                                            )} className="border rounded-lg px-2 py-1 text-sm">
                                                <option value="Menunggu">Menunggu</option>
                                                <option value="Disetujui">Disetujui</option>
                                                <option value="Ditolak">Ditolak</option>
                                            </select>
                                        </div>
                                    </div>


                                    <div className="border-b border-gray-100 py-2 px-4 grid grid-row-2 gap-4">
                                        <h2 className="font-medium">Informasi Konsumen</h2>
                                        <div className="flex justify-between">
                                            <p className="text-gray-600 font-medium text-md">Nama</p>
                                            <p className="font-medium text-sm">{detailData.nama}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-gray-600 font-medium text-md">Tanggal pengajuan</p>
                                            <p className="font-medium text-sm">{new Date(detailData.tanggal_pengajuan).toLocaleDateString('id-ID')}</p>
                                        </div>
                                    </div>

                                    <div className="border-b border-gray-100 py-2 px-4 grid grid-row-2 gap-4">
                                        <h2 className="font-medium">Informasi Motor</h2>
                                        <div className="flex justify-between">
                                            <p className="text-gray-600 font-medium text-md">Motor</p>
                                            <p className="font-medium text-sm">{detailData.nama_motor}</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-gray-600 font-medium text-md">Harga</p>
                                            <p className="font-medium text-sm">Rp. {Number(detailData.harga).toLocaleString('id-ID')}</p>
                                        </div>
                                    </div>


                                    <div className="border-b border-gray-100 py-2 px-4 grid grid-row-2 gap-4">
                                        <h2 className="font-medium">Riwayat Status</h2>
                                        <div className="flex gap-2 items-center">
                                            <span>
                                                {detailData?.status === 'Menunggu' && <MdHourglassEmpty className="text-amber-500" />}
                                                {detailData?.status === 'Disetujui' && <MdCheckCircle className="text-emerald-500" />}
                                                {detailData?.status === 'Ditolak' && <MdCancel className="text-rose-500" />}
                                            </span>
                                            <p className="text-gray-600 font-medium text-md">{detailData.status}</p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}