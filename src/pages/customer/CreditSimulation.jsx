import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCalculator, FaCheckCircle } from 'react-icons/fa';
import { FaBasketShopping } from 'react-icons/fa6';
import LeadModal from '../../components/LeadModal';

const BUNGA_BY_TENOR = {
  11: 2.5,
  17: 3.5,
  23: 4.5,
  29: 5.5,
  35: 6.5,
};

const CreditSimulation = ({ initialBikeId = "beat" }) => {
  const [motorDisplay, setMotorDisplay] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dp, setDp] = useState(0);
  const [tenor, setTenor] = useState(12);
  const [bunga, setBunga] = useState(0);
  const [cicilan, setCicilan] = useState(0);

  // Ambil semua data motor dari database
  const getAllMotor = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/motor`);
      const data = await response.json();

      if (data.success && data.data.length > 0) {
        setMotorDisplay(data.data);

        // Cari motor berdasarkan initialBikeId jika ada, kalau tidak ambil motor pertama
        const targetBike = initialBikeId
          ? data.data.find(m => m.nama_motor?.toLowerCase().includes(initialBikeId.toLowerCase())) || data.data[0]
          : data.data[0];

        setSelected(targetBike);

        // DP awal 10% dari harga motor
        const harga = Number(targetBike.harga);
        setDp(Math.round(harga * 0.1));

        // Tenor default 12 bulan, cari bunga yang sesuai
        setTenor(12);
        setBunga(BUNGA_BY_TENOR[12] || 3.5);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllMotor();
  }, []);

  // Hitung cicilan setiap kali selected, dp, tenor, atau bunga berubah
  useEffect(() => {
    if (!selected) return;

    const harga = Number(selected.harga);
    const pinjaman = Math.max(0, harga - dp);

    if (pinjaman <= 0 || tenor <= 0) {
      setCicilan(0);
      return;
    }

    const bungaBulanan = bunga / 100 / 12;

    let hasil;
    if (bungaBulanan === 0) {
      hasil = pinjaman / tenor;
    } else {
      hasil =
        (pinjaman * bungaBulanan) /
        (1 - Math.pow(1 + bungaBulanan, -tenor));
    }

    setCicilan(Math.round(hasil));
  }, [selected, dp, tenor, bunga]);

  // Handler saat user memilih motor dari dropdown
  const handleBikeChange = (e) => {
    const bikeId = Number(e.target.value);
    const bike = motorDisplay.find(item => item.id_motor === bikeId);

    if (!bike) return;

    setSelected(bike);

    // Reset DP ke 10% dari harga motor baru
    const harga = Number(bike.harga);
    setDp(Math.round(harga * 0.1));

    // Bunga tetap mengikuti tenor yang sedang dipilih
    setBunga(BUNGA_BY_TENOR[tenor] || 3.5);
  };

  // Handler saat tenor berubah
  const handleTenorChange = (t) => {
    setTenor(t);
    // Update bunga sesuai tenor yang dipilih
    setBunga(BUNGA_BY_TENOR[t] || 3.5);
  };

  if (!selected) {
    return (
      <div className="py-20 text-center">
        Loading...
      </div>
    );
  }

  return (
    <section id="simulasi-kredit" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">Simulasi Kredit</h2>
          <p className="text-gray-500 max-w-2xl mx-auto">Hitung estimasi cicilan bulanan Anda dengan mudah dan transparan.</p>
        </div>

        <div className="bg-gray-50 rounded-[40px] p-8 md:p-12 shadow-sm border border-gray-100 lg:grid lg:grid-cols-2 lg:gap-16 items-start">
          <div className="space-y-8">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-black text-gray-400 uppercase mb-3 tracking-widest">Pilih Motor</label>
                <select
                  value={selected?.id_motor || ""}
                  onChange={handleBikeChange}
                  className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-lg font-bold text-gray-900 outline-none focus:ring-4 focus:ring-primary/10 transition-all cursor-pointer mb-6"
                >
                  {motorDisplay.map(bike => (
                    <option key={bike.id_motor} value={bike.id_motor}>{bike?.nama_motor} - Rp {Number(bike.harga).toLocaleString('id-ID')}</option>
                  ))}
                </select>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={selected.id_motor}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <div className="relative group">
                        <div className="absolute inset-0 bg-primary/5 rounded-2xl scale-95 group-hover:scale-100 transition-transform duration-500"></div>
                        <img
                          src={`${import.meta.env.VITE_API_URL}/uploads/${selected?.gambar}`}
                          alt={selected?.nama_motor}
                          className="relative z-10 w-full h-48 object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-2xl font-black text-gray-900 leading-tight">{selected.nama_motor}</h3>
                        <p className="text-xl font-black text-primary">Rp {Number(selected.harga).toLocaleString("id-ID")}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div>
                <div className="flex justify-between mb-3">
                  <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">Jumlah DP (Uang Muka)</label>
                  <span className="text-primary font-black">
                    Rp {dp.toLocaleString("id-ID")}
                  </span>
                </div>
                <input
                  type="range"
                  min={500000}
                  max={Number(selected?.harga) * 0.8}
                  step={100000}
                  value={dp}
                  onChange={(e) => setDp(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between mt-2 text-[10px] font-bold text-gray-400">
                  <span>Rp 500rb</span>
                  <span>80% Harga Motor</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black text-gray-400 uppercase mb-3 tracking-widest">Tenor (Jangka Waktu)</label>
                <div className="grid grid-cols-5 gap-2 md:gap-3">
                  {[11, 17, 23, 29, 35].map((t) => (
                    <button
                      key={t}
                      onClick={() => handleTenorChange(t)}
                      className={`py-4 rounded-2xl font-black transition-all text-sm ${tenor === t
                        ? "bg-primary text-white shadow-lg shadow-red-200"
                        : "bg-white text-gray-400 border border-gray-200 hover:border-primary/50"
                        }`}
                    >
                      {t}
                      <span className="block text-[10px] uppercase opacity-60">Bulan</span>
                    </button>
                  ))}
                </div>
                {/* Info bunga */}
                <p className="mt-2 text-xs text-gray-400">
                  Bunga: <span className="font-bold text-gray-600">{bunga}%</span> per tahun
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 lg:mt-0 lg:sticky lg:top-24">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-[32px] p-8 md:p-10 shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 blur-3xl opacity-50"></div>

              <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-8">
                  <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center text-primary">
                    <FaCalculator size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Hasil Simulasi</p>
                    <h4 className="text-xl font-black text-gray-900">Estimasi Cicilan</h4>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-3 border-b border-gray-50">
                    <span className="text-gray-500 font-medium">Harga Motor</span>
                    <span className="text-gray-900 font-bold">Rp {Number(selected.harga).toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-50">
                    <span className="text-gray-500 font-medium">Uang Muka (DP)</span>
                    <span className="font-bold text-green-600">-  Rp {dp.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-50">
                    <span className="text-gray-500 font-medium">Total Pinjaman</span>
                    <span className="text-gray-900 font-bold">Rp {(Number(selected.harga) - dp).toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-gray-50">
                    <span className="text-gray-500 font-medium">Tenor</span>
                    <span className="text-gray-900 font-bold">{tenor} Bulan</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-gray-500 font-medium">Bunga</span>
                    <span className="text-gray-900 font-bold">{bunga}% / tahun</span>
                  </div>
                </div>

                <div className="bg-primary rounded-3xl p-6 text-white text-center shadow-lg shadow-red-200">
                  <p className="text-xs font-bold text-white/70 uppercase mb-1">Cicilan Per Bulan</p>
                  <h3 className="text-4xl font-black mb-1">Rp {cicilan.toLocaleString("id-ID")}</h3>
                  <p className="text-[10px] italic text-white/50">*Harga belum termasuk asuransi & biaya admin</p>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full bg-primary hover:bg-red-700 text-white px-6 py-2.5 rounded-lg font-bold flex justify-center items-center space-x-2 transition-colors active:scale-95 shadow-lg shadow-red-200"
                  >
                    <FaBasketShopping size={18} />
                    <span className="hidden sm:inline">Ajukan Kredit</span>
                  </button>
                </div>

                <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} bike={selected} />

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 text-green-600">
                    <FaCheckCircle size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Proses 1 Hari Cair</span>
                  </div>
                  <div className="flex items-center space-x-2 text-green-600">
                    <FaCheckCircle size={16} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Bunga Sangat Ringan</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreditSimulation;
