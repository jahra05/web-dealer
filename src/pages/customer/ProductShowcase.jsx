import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilter } from 'react-icons/fa6';
import { FiRotateCcw } from 'react-icons/fi';

const ProductShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [selectedVariant, setSelectedVariant] = useState('Semua');
  // const [selectedType, setSelectedType] = useState('Semua');

  const [bikes, setBikes] = useState([])
  const [kategori, setKategori] = useState([]);
  // const [tipe, setTipe] = useState([]);

  const getTipe = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tipe`);
      const data = await response.json();

      if (data.success) {
        setTipe(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getKategori = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/kategori`);
      const data = await response.json();

      if (data.success) {
        setKategori(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMotor = async () => {
    try {
      const respose = await fetch(`${import.meta.env.VITE_API_URL}/api/motor/aktif`);
      const data = await respose.json();

      console.log(data);
      if (data.success) {
        setBikes(data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getMotor();
    getKategori();
    getTipe();
    // getVarian();
  }, []);

  const filteredBikes = useMemo(() => {
    return bikes.filter((bike) => {

      const matchCategory =
        selectedCategory === "Semua" ||
        bike.nama_kategori.toLowerCase() === selectedCategory.toLowerCase();

      const matchVariant =
        selectedVariant === "Semua" ||
        bike.nama_varian.toLowerCase() === selectedVariant.toLowerCase();

      // const matchType =
      //   selectedType === "Semua" ||
      //   bike.nama_tipe.toLowerCase() === selectedType.toLowerCase();

      return matchCategory && matchVariant;
    });
  }, [bikes, selectedCategory, selectedVariant]);

  const resetFilters = () => {
    setSelectedCategory('Semua');
    setSelectedVariant('Semua');
    // setSelectedType('Semua');
  };

  return (
    <section id="produk" className="bg-gray-50 py-20 rounded-[40px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-shrink-0"
          >
            <h2 className="text-3xl font-black text-gray-900">Pilih Motor Honda Favoritmu</h2>
            <p className="text-gray-500 mt-2 font-medium">Temukan unit yang sesuai dengan kebutuhan Anda</p>
          </motion.div>

          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto ">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 flex-grow">
              {/* Category Filter */}
              <div className="relative">
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">
                  Kategori
                </label>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2"
                >
                  <option value="Semua">Semua</option>

                  {kategori.map((item) => (
                    <option
                      key={item.id_kategori}
                      value={item.nama_kategori}
                    >
                      {item.nama_kategori}
                    </option>
                  ))}
                </select>
              </div>
              <button
                onClick={resetFilters}
                className="mt-auto sm:mb-0 bg-white border border-gray-200 text-gray-400 hover:text-blue-900 hover:border-blue-50 p-2 rounded-xl transition-all flex items-center justify-center"
                title="Reset Filter"
              >
                <FiRotateCcw size={20} />
              </button>

              {/* Type Filter */}
              {/* <div className="relative">
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2 ml-1 tracking-widest">Tipe Motor</label>
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2"
                >
                  <option value="Semua">Semua</option>

                  {tipe.map((item) => (
                    <option
                      key={item.id_tipe}
                      value={item.nama_tipe}
                    >
                      {item.nama_tipe}
                    </option>
                  ))}
                </select>
              </div> */}
            </div>


          </div>
        </div>

        <div className="relative min-h-[400px]">
          <>
            {filteredBikes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredBikes.map((bike, index) => (
                  <motion.div
                    key={bike.id_motor}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15 }}
                    className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl transition-shadow group flex flex-col"
                  >
                    <div className="mb-4">
                      <h3 className="font-black text-gray-900 text-lg">{bike.nama_motor}</h3>
                      <p className="text-xs font-bold text-gray-400">Tipe : {bike.nama_tipe}</p>
                    </div>

                    <div className="mb-6 relative h-40 flex items-center justify-center">
                      <img src={
                        bike.gambar
                          ? `${bike.gambar}`
                          : "/no-image.png"
                      } alt={bike.nama_motor} className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform" />
                    </div>

                    <div className="mb-6 mt-auto">
                      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">harga</p>
                      <p className="text-gray-900 font-black">
                        Rp {Number(bike.harga).toLocaleString("id-ID")}
                      </p>
                    </div>

                    <Link
                      to={`/product/${bike.id_motor}`}
                      className="w-full bg-gray-50 hover:bg-gray-100 text-gray-900 font-bold py-3 rounded-xl border border-gray-200 transition-colors text-center block"
                    >
                      Lihat Detail
                    </Link>
                  </motion.div>
                ))}
              </div>


            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-200"
              >
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
                  <FaFilter size={32} />
                </div>
                <h3 className="text-xl font-black text-gray-900">Tidak ada motor yang cocok</h3>
                <p className="text-gray-500 mt-2">Coba ubah filter atau reset pencarian Anda.</p>
                <button
                  onClick={resetFilters}
                  className="mt-6 text-primary font-bold hover:underline"
                >
                  Reset Semua Filter
                </button>
              </motion.div>
            )}
          </>
        </div>
      </div>
    </section >
  );
};

export default ProductShowcase;




