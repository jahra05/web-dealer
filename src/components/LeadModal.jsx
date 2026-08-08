import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { IoIosClose } from 'react-icons/io';

const LeadModal = ({ isOpen, onClose, bike, tenor, }) => {
  console.log("bike dari props =", bike);
  const [formData, setFormData] = useState({
    nama: "",
    no_hp: "",
    alamat: "",
    pekerjaan: "",
    id_motor: bike?.id_motor ?? null,

  });
  useEffect(() => {
    if (bike) {
      setFormData((prev) => ({
        ...prev,
        id_motor: bike.id_motor,
      }));
    }
  }, [bike]);

  const [errors, setErrors] = useState({});
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
        `${import.meta.env.VITE_API_URL}/api/pengajuan`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await response.json();
      console.log(data);

      if (data.success) {

        toast.success("Pengajuan berhasil dikirim.");

        setFormData({
          nama: "",
          no_hp: "",
          alamat: "",
          pekerjaan: "",
          id_motor: bike?.id_motor ?? null
        });

        onClose();

      } else {

        toast.error(data.message);

      }

    } catch (error) {

      console.log(error);
      toast.error("Terjadi kesalahan.");

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
            <div className="bg-primary p-6 text-white relative">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Nama Lengkap</label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className={`w-full bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                    placeholder="Contoh: Budi Santoso"
                  />
                  {errors.nama && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.nama}</p>}
                </div>
                <div>
                  <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">pekerjaan</label>
                  <input
                    type="text"
                    name="pekerjaan"
                    value={formData.pekerjaan}
                    onChange={handleChange}
                    className={`w-full bg-gray-50 border ${errors.pekerjaan ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                    placeholder="Contoh: Budi Santoso"
                  />
                  {errors.pekerjaan && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.pekerjaan}</p>}
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
                    className={`w-full bg-gray-50 border ${errors.no_hp ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all`}
                    placeholder="0812xxxxxxxx"
                  />
                  {errors.no_hp && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.no_hp}</p>}
                </div>
              </div>



              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-1">Alamat Lengkap</label>
                <textarea
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  rows="2"
                  className={`w-full bg-gray-50 border ${errors.alamat ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none`}
                  placeholder="Jl. Merdeka No. 123, Jakarta"
                ></textarea>
                {errors.alamat && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.alamat}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-red-700 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-red-200 active:scale-95"
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
