import React, { useEffect, useState } from 'react';
import { animate, motion, scale } from 'framer-motion';
import LeadModal from '../../components/LeadModal';
const heroTextVariants = {
  hidden: {
    opacity: 0,
    x: -40
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1]
    }
  }
};

const heroItemVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  })
};

const heroImageVariants = {
  hidden: {
    opacity: 0,
    x: 100,
    scale: 0.82,
    rotate: 3,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 1.2,
      delay: 0.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hero, setHero] = useState(null)

  useEffect(() => {
    const getHero = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/hero`);
        const data = await response.json();

        if (data.success && data.data.length > 0) {
          console.log('data hero berhasil', data)

          setHero(data.data[0])
        }
      } catch (error) {
        console.error("Gagal mengambil hero:", error)
      }
    }
    getHero()
  }, [])

  if (!hero) {
    return <p>Loading...</p>;
  }
  const scrollToSimulation = () => {
    const element = document.getElementById('simulasi-kredit');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/6287769084385?text=Halo%20Admin,%20saya%20tertarik%20dengan%20unit%20Honda.%20Saya%20ingin%20mendapatkan%20informasi%20lebih%20lanjut.', '_blank');
  };

  return (
    <section id="hero" className="relative bg-white pt-10 pb-20 overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">

          <motion.div
            // initial={{ opacity: 0, x: -50 }}
            initial="hidden"
            // animate={{ opacity: 1, x: 0 }}
            animate="visible"
            // transition={{ duration: 0.8 }}
            className="relative z-10"

          >
            <motion.span variants={heroImageVariants} className="inline-block px-3 py-1 rounded bg-blue-50 text-[#004A7C] text-xs font-bold mb-4">
              DEALER RESMI HONDA
            </motion.span>
            {/* <span className="inline-block px-3 py-1 rounded bg-blue-50 text-[#004A7C] text-xs font-bold mb-4">
              DEALER RESMI HONDA
            </span> */}
            <h1 className="text-4xl md:text-7xl font-black text-gray-900 mb-2 overflow-hidden">
              {/* <span className="block text-[#006A9E]">{hero.nama_kategori}</span> */}
              <motion.span variants={heroItemVariants} custom={0.1} className="block text-[#006A9E]">
                {hero.nama_kategori}
              </motion.span>

              {/* {hero.nama_motor} */}

              <motion.span variants={heroItemVariants} custom={0.18} className="block">
                {hero.nama_motor}
              </motion.span>
            </h1>

            {/* <p className="text-lg text-gray-600 mb-8 max-w-lg">
              {hero.deskripsi}
            </p> */}
            <motion.span variants={heroItemVariants} custom={0.3} className="text-lg text-gray-600 mb-8 max-w-lg"> {hero.deskripsi}</motion.span>

            {/* <motion.div variants={heroItemVariants} custom={0.4} className="flex flex-wrap gap-4 mb-10">
              <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                <span className="w-5 h-5 flex items-center justify-center bg-gray-200 rounded-full text-[10px]">🔥</span>
                <span className="text-sm font-bold text-gray-700">Tenaga {hero.tenaga}</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                <span className="w-5 h-5 flex items-center justify-center bg-gray-200 rounded-full text-[10px]">⚙️</span>
                <span className="text-sm font-bold text-gray-700">MESIN {hero.mesin}</span>
              </div>
              <div className="flex items-center space-x-2 bg-gray-50 px-4 py-2 rounded-full border border-gray-200">
                <span className="w-5 h-5 flex items-center justify-center bg-gray-200 rounded-full text-[10px]">✨</span>
                <span className="text-sm font-bold text-gray-700">Berat {hero.berat}</span>
              </div>
            </motion.div> */}

            <motion.div variants={heroItemVariants} custom={0.5} className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToSimulation}
                className="bg-[#002446] hover:bg-[#00345F] text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-[#E6F1F7] transition-all active:scale-95"
              >
                Simulasi Kredit
              </button>
              <button
                onClick={openWhatsApp}
                className="bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 px-8 py-4 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all active:scale-95"
              >
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-5 h-5" alt="WA" />
                <span>WhatsApp</span>
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            // initial={{ opacity: 0, scale: 0.8 }}
            // animate={{ opacity: 1, scale: 1 }}
            // transition={{ duration: 0.8 }}
            variants={heroImageVariants}
            initial="hidden"
            animate="visible"
            className="mt-12 lg:mt-0 relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{
                duration: 1.4,
                delay: 0.1,
                ease: "easeOut",
              }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50 rounded-full blur-3xl opacity-50 -z-10"></motion.div>
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                delay: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {/* <img
                src="src/assets/hondaImg.png"
                alt={hero.nama_motor}
                className="w-full h-auto drop-shadow-2xl scale-110"
              /> */}
            </motion.div>
            
            <img
              src={`${import.meta.env.VITE_API_URL}${hero.gambar}`}
              src='src/assets/hondaImg.png'
              src={hero.gambar}
              alt={hero.nama_motor}
              className="w-full h-auto drop-shadow-2xl scale-110"
            />

            {/* Promo Badge */}
            <motion.div
              initial={{
                opacity: 0,
                x: 30,
                y: 20,
                scale: 0.9
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0,
                scale: 1
              }}
              transition={{
                duration: 0.8,
                delay: 0.9,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="absolute top-0 right-0 bg-white rounded-2xl shadow-xl overflow-hidden w-48 border border-gray-100">
              <div className="bg-[#002446] text-white text-[10px] font-black py-2 px-4 text-center tracking-widest uppercase">
                PROMO BULAN INI
              </div>
              <div className="p-4 text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase">DP MULAI</p>
                <h3 className="text-3xl font-black text-[#004A7C]">500RB</h3>
                <hr className="my-3 border-gray-100" />
                <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">CICILAN MULAI</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-xl font-black text-gray-900">29RB</span>
                  <span className="text-[10px] font-bold text-gray-500 ml-1">/ BULAN</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div >
      <LeadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section >
  );
};

export default Hero;


