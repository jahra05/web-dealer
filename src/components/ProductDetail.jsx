import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import { bikes } from '../data/siteData';
import { motion, AnimatePresence } from 'framer-motion';
import LeadModal from './LeadModal';
import { FaMessage, FaStar } from "react-icons/fa6";
import { FaArrowCircleLeft, FaCheckCircle } from 'react-icons/fa';
import { IoSend } from 'react-icons/io5';
import { MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { tr } from 'framer-motion/client';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bike, setBike] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [infoContact, setInfoContact] = useState([])

  // Simulation State
  const [dp, setDp] = useState(2000000);
  const [tenor, setTenor] = useState(36);
  const [monthlyInstallment, setMonthlyInstallment] = useState(0);
  const [spek, setSpek] = useState([])
  const [warna, setWarna] = useState([])

  const getWhatapps = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/footer");

      const data = await response.json();

      setInfoContact(data.data[0])

    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {

    const getMotorDetail = async () => {

      setLoading(true);

      try {

        const response = await fetch(
          `http://localhost:3000/api/motor/${id}`
        );

        const data = await response.json();

        console.log(data);

        if (data.success) {
          setBike(data.data);

          setDp(Math.floor(data.data.harga * 0.15));
        }

      } catch (error) {
        console.log(error);

      } finally {
        setLoading(false);
      }

    };

    getMotorDetail();

  }, [id]);


  const getSpesifikasi = async () => {

    try {

      const response = await fetch(
        `http://localhost:3000/api/spesifikasi/${id}`
      );

      const data = await response.json();
      console.log(data);


      if (data.success) {
        setSpek(data.data)
      }
    } catch (error) {
      console.log(error)
    }
  };

  const getWarna = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/warna/${id}`)
      const data = await response.json()

      if (data.success) {
        setWarna(data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getSpesifikasi()
    getWarna()
    getWhatapps()
  }, [])

  useEffect(() => {
    if (bike) {
      const loanAmount = bike.harga - dp;
      const installment = loanAmount / tenor;
      setMonthlyInstallment(installment);
    }
  }, [bike, dp, tenor]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
        <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-xs">Memuat Produk...</p>
      </div>
    );
  }

  if (!bike) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-6">
        <h2 className="text-2xl font-black text-gray-900">Produk Tidak Ditemukan</h2>
        <button
          onClick={() => navigate('/')}
          className="bg-primary text-white px-8 py-3 rounded-xl font-bold flex items-center space-x-2"
        >
          <FaArrowCircleLeft size={20} />
          <span>Kembali ke Beranda</span>
        </button>
      </div>
    );
  }

  // const activeColor = bike.warna[selectedColorIndex];

  // const openWhatsApp = () => {
  //   const message = `halo admin honda, saya tertarik dengan unit ${bike.nama_motor}`
  //   window.open(`https://wa.me/${infoContact.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  // };
  const openWhatsApp = () => {
    window.open('https://wa.me/6287769084385?text=Halo%20Admin%20Honda,%20saya%20tertarik%20dengan%20unit%20Honda%20Beat', '_blank');
  };

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate('/')}
          className="mb-8 flex items-center space-x-2 text-gray-400 hover:text-primary font-bold transition-colors group"
        >
          <MdOutlineKeyboardArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Daftar Motor</span>
        </button>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Image and Specs */}
          <div>
            <div className="bg-gray-50 rounded-[40px] p-8 md:p-12 mb-8 flex items-center justify-center relative overflow-hidden border border-gray-100 min-h-[300px] md:min-h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-red-50/50 to-transparent"></div>
              <AnimatePresence mode="wait">
                <motion.img
                  src={`http://localhost:3000/uploads/${bike.gambar}`}
                  alt={bike.nama_motor}
                  className="w-full h-auto drop-shadow-2xl relative z-10 object-contain max-h-[400px]"
                />
              </AnimatePresence>
            </div>

            <h4 className="font-black text-gray-900 mb-6 uppercase tracking-wider text-sm">Spesifikasi Utama</h4>
            {spek.map((item) => (
              <div key={item.id_speksifikasi} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-white border border-gray-100 h-14 flex flex-col justify-center rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Kapasitas mesin</p>
                  <p className="text-xs font-bold text-gray-900">{item.kapasitas_mesin}</p>
                </div>

                {/* <div className="bg-white border border-gray-100 p-4 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-lg">⚡</div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Kapasitas mesin</p>
                  <p className="text-xs font-bold text-gray-900">{item.kapasitas_mesin}</p>
                </div> */}

                <div className="bg-white border border-gray-100 h-14 flex flex-col justify-center rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">tenaga</p>
                  <p className="text-xs font-bold text-gray-900">{item.tenaga}</p>
                </div>

                {/* <div className="bg-white border border-gray-100 p-4 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-lg">⛽</div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">tenaga</p>
                  <p className="text-xs font-bold text-gray-900">{item.tenaga}</p>
                </div> */}

                {/* <div className="bg-white border border-gray-100 p-4 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-lg">🥤</div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Torsi</p>
                  <p className="text-xs font-bold text-gray-900">{item.torsi}</p>
                </div> */}

                <div className="bg-white border border-gray-100 h-14 flex flex-col justify-center rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Torsi</p>
                  <p className="text-xs font-bold text-gray-900">{item.torsi}</p>
                </div>


                <div className="bg-white border border-gray-100 h-14 flex flex-col justify-center rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Transmisi</p>
                  <p className="text-xs font-bold text-gray-900">{item.transmisi}</p>
                </div>


                {/* <div className="bg-white border border-gray-100 p-4 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-lg">⚖️</div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Transmisi</p>
                  <p className="text-xs font-bold text-gray-900">{item.transmisi}</p>
                </div> */}


                <div className="bg-white border border-gray-100 h-14 flex flex-col justify-center rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">berat</p>
                  <p className="text-xs font-bold text-gray-900">{item.berat}</p>
                </div>


                {/* <div className="bg-white border border-gray-100 p-4 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-lg">⚖️</div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">berat</p>
                  <p className="text-xs font-bold text-gray-900">{item.berat}</p>
                </div> */}

                <div className="bg-white border border-gray-100 h-14 flex flex-col justify-center rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Tinggi jok</p>
                  <p className="text-xs font-bold text-gray-900">{item.tinggi_jok}</p>
                </div>


                {/* <div className="bg-white border border-gray-100 p-4 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-lg">⚖️</div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Tinggi jok</p>
                  <p className="text-xs font-bold text-gray-900">{item.tinggi_jok}</p>
                </div> */}


                {/* <div className="bg-white border border-gray-100 p-4 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-lg">⚖️</div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">kkapasitas tangki</p>
                  <p className="text-xs font-bold text-gray-900">{item.kapasitas_tengki}</p>
                </div> */}

                <div className="bg-white border border-gray-100 h-14 flex flex-col justify-center rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">kkapasitas tangki</p>
                  <p className="text-xs font-bold text-gray-900">{item.kapasitas_tengki}</p>
                </div>

                <div className="bg-white border border-gray-100 h-14 flex flex-col justify-center rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Mesin</p>
                  <p className="text-xs font-bold text-gray-900">{item.mesin}</p>
                </div>


                {/* <div className="bg-white border border-gray-100 p-4 rounded-2xl text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-lg">⚖️</div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Mesin</p>
                  <p className="text-xs font-bold text-gray-900">{item.mesin}</p>
                </div> */}

              </div>
            ))}
          </div>

          {/* Right Column: Info and Simulation Summary */}
          <div className="mt-12 lg:mt-0">
            <div className="mb-10">
              <span className="inline-block px-3 py-1 rounded bg-red-50 text-primary text-[10px] font-black mb-4 uppercase tracking-widest">UNIT TERSEDIA</span>
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">{bike.nama_motor} <span className="text-primary">{bike.type}</span></h2>
              <h3 className="text-4xl font-black text-gray-900 mb-6">Rp {Number(bike.harga).toLocaleString("id-ID")}</h3>
              <p className="text-gray-600 leading-relaxed max-w-lg mb-8 text-lg">
                {bike.deskripsi}
              </p>

              <div className="mb-10">
                <div className="flex flex-wrap gap-4">
                  {warna.map((item) => (
                    <div
                      key={item.id_warna}
                      className="flex items-center gap-3"
                    >
                      <div
                        className="w-8 h-8 rounded-full border"
                        style={{
                          backgroundColor: item.kode_warna
                        }}
                      />

                      {/* <span>{item.nama_warna}</span> */}
                    </div>
                  ))}

                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex-1 min-w-[200px] bg-primary hover:bg-red-700 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-red-200 flex items-center justify-center space-x-2 active:scale-95"
                >
                  <IoSend size={20} />
                  <span>Ajukan Kredit</span>
                </button>
                <button
                  onClick={openWhatsApp}
                  className="flex-1 min-w-[200px] bg-green-500 hover:bg-green-600 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-green-100 flex items-center justify-center space-x-2 active:scale-95"
                >
                  <FaMessage size={20} />
                  <span>WhatsApp Sales</span>
                </button>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-[40px] p-8 md:p-10 shadow-sm relative overflow-hidden">
              <div id="simulasi" className="relative z-10">
                <div className="flex justify-between items-end mb-8">
                  <div>
                    <h4 className="text-2xl font-black text-gray-900">Simulasi Kredit</h4>
                    <p className="text-sm text-gray-500 font-medium">Hitung cicilan bulanan secara instan</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase mb-1">TENOR</p>
                    <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-900 border border-gray-200">{tenor} Bulan</span>
                  </div>
                </div>

                <div className="space-y-8 mb-10">
                  <div>
                    <div className="flex justify-between mb-3">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Uang Muka (DP)</label>
                      <span className="text-primary font-black text-sm">Rp {dp.toLocaleString('id-ID')}</span>
                    </div>
                    <input
                      type="range"
                      min={500000}
                      max={bike.harga * 0.7}
                      step={100000}
                      value={dp}
                      onChange={(e) => setDp(parseInt(e.target.value))}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase mb-4 tracking-widest">Pilih Tenor (Bulan)</label>
                    <div className="grid grid-cols-4 gap-3">
                      {[12, 24, 36, 48].map((t) => (
                        <button
                          key={t}
                          onClick={() => setTenor(t)}
                          className={`py-3 rounded-xl font-black transition-all text-xs ${tenor === t ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-400 border border-gray-200'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50">
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-2 tracking-widest">ESTIMASI CICILAN</p>
                  <h4 className="text-4xl font-black text-primary mb-6">Rp {Math.round(monthlyInstallment).toLocaleString('id-ID')}<span className="text-base text-gray-400 ml-2 font-bold">/ bln</span></h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2 text-green-600">
                      <FaCheckCircle size={14} />
                      <span className="text-[10px] font-black uppercase tracking-wider">Tanpa Biaya Admin</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600">
                      <FaCheckCircle size={14} />
                      <span className="text-[10px] font-black uppercase tracking-wider">Asuransi Jiwa</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600">
                      <FaCheckCircle size={14} />
                      <span className="text-[10px] font-black uppercase tracking-wider">Approval 24 Jam</span>
                    </div>
                    <div className="flex items-center space-x-2 text-green-600">
                      <FaCheckCircle size={14} />
                      <span className="text-[10px] font-black uppercase tracking-wider">Bunga 0% Promo</span>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] text-gray-400 mt-6 italic">*Harga di atas adalah estimasi simulasi dan dapat berubah sewaktu-waktu sesuai kebijakan dealer.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bike={bike}
        tenor={tenor}
      />
    </section>
  );
};

export default ProductDetail;
