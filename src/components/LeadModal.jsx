import React, { useEffect, useState } from 'react';
// replaced react-hot-toast with CustomAlert
import CustomAlert from './CustomAlert'
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosClose } from 'react-icons/io';
import { getFunctionUrl, getSupabaseHeaders } from "../config/supabase";


const LeadModal = ({ isOpen, onClose, bike, tenor, }) => {
  console.log("bike dari props =", bike);
  const [formData, setFormData] = useState({
    nama: "",
    no_hp: "",
    alamat: "",
    pekerjaan: "",
    id_motor: bike?.id_motor ?? null,
    nama_motor: "",
    harga: "",
    gambar: null

  });
  useEffect(() => {
    if (bike) {
      setFormData((prev) => ({
        ...prev,
        id_motor: bike.id_motor,
        nama_motor: bike.nama_motor,
        harga: bike.harga,
        gambar: bike.gambar
      }));
    }
  }, [bike]);

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null)
  const validate = () => {
    const newErrors = {};

    if (!formData.nama) {
      newErrors.nama = "Nama lengkap wajib diisi";
    }

    if (!formData.no_hp) {
      newErrors.no_hp = "Nomor HP wajib diisi";
    }

    if (!formData.alamat) {
      newErrors.alamat = "Alamat wajib diisi";
    }

    if (!formData.pekerjaan) {
      newErrors.pekerjaan = "Pekerjaan wajib diisi";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (!validate()) return;
    console.log("FormData sebelum dikirim =", formData);
    console.log("Bike =", bike);
    try {
      console.log("bike =", bike);
      console.log("formData =", formData);
      const response = await fetch(
        getFunctionUrl('pengajuan'),
        {
          method: "POST",
          headers: {
            ...getSupabaseHeaders(),
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();
      console.log(data);

      if (data.success) {

        setAlert({ type: 'success', message: data.message || 'Pengajuan berhasil dikirim.' })

        setFormData({
          nama: "",
          no_hp: "",
          alamat: "",
          pekerjaan: "",
          id_motor: bike?.id_motor ?? null,
          nama_motor: bike?.nama_motor ?? "",
          harga: bike?.harga ?? "",
          gambar: bike?.gambar ?? null

        });

        setTimeout(() => {
          onClose();
        }, 1500)

      } else {

        setAlert({ type: 'error', message: data.message })

      }

    } catch (error) {

      console.log(error);
      setAlert({ type: 'error', message: 'Terjadi kesalahan.' })

    }

  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden"
          >
            {alert && <CustomAlert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
            <div className="bg-[#002446] p-6 text-white relative">
              <h3 className="text-2xl font-black">Ajukan Kredit</h3>
              <p className="text-white/80 text-sm">Isi formulir di bawah ini dan kami akan segera menghubungi Anda.</p>
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-white/80 hover:text-white transition-colors"
              >
                <IoIosClose size={24} />
              </button>

            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              <div className='flex  gap-2 '>
                <img src={formData.gambar} className='w-20 h-20 object-cover border border-gray-50 rounded-md' alt={formData.nama_motor} />
                <div>
                  <p className='uppercase font-semibold text-lg'>{formData.nama_motor}</p>
                  <p className='text-gray/80 text-base'>Rp {Number(formData.harga).toLocaleString("id-ID")}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className={`w-full bg-gray-50 border ${errors.name ? 'border-blue-500' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-50 outline-none transition-all truncate-placeholder`}
                    placeholder="Contoh: Budi Santoso"
                    title="Contoh: Budi Santoso"
                  />
                  {errors.nama && <p className="text-blue-500 text-[10px] mt-1 font-bold">{errors.nama}</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">pekerjaan</label>
                  <input
                    type="text"
                    name="pekerjaan"
                    value={formData.pekerjaan}
                    onChange={handleChange}
                    className={`w-full bg-gray-50 border ${errors.pekerjaan ? 'border-blue-500' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-50 outline-none transition-all truncate-placeholder`}
                    placeholder="Contoh: Budi Santoso"
                    title="Contoh: Budi Santoso"
                  />
                  {errors.pekerjaan && <p className="text-blue-500 text-[10px] mt-1 font-bold">{errors.pekerjaan}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Nomor Telepon (WA)</label>
                  <input
                    type="tel"
                    name="no_hp"
                    value={formData.no_hp}
                    onChange={handleChange}
                    className={`w-full bg-gray-50 border ${errors.no_hp ? 'border-blue-500' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-50 outline-none transition-all truncate-placeholder`}
                    placeholder="0812xxxxxxxx"
                    title="0812xxxxxxxx"
                  />
                  {errors.no_hp && <p className="text-blue-500 text-[10px] mt-1 font-bold">{errors.no_hp}</p>}
                </div>
              </div>



              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Alamat Lengkap</label>
                <textarea
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  rows="2"
                  className={`w-full bg-gray-50 border ${errors.alamat ? 'border-blue-500' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-50 outline-none transition-all resize-none truncate-placeholder`}
                  placeholder="Jl. Merdeka No. 123, Jakarta"
                  title="Jl. Merdeka No. 123, Jakarta"
                ></textarea>
                {errors.alamat && <p className="text-blue-500 text-[10px] mt-1 font-bold">{errors.alamat}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-[#002446] hover:bg-[#00345F] text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-[#E6F1F7] active:scale-95"
              >
                Kirim Permohonan
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LeadModal;
