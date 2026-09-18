import React from 'react';
import { FaClock, FaTruck, FaWallet } from 'react-icons/fa6';
import { IoShieldCheckmark } from 'react-icons/io5';
import { motion } from 'framer-motion';
import SectionReveal from '../../components/SectionReveal';


const Features = () => {
  const features = [
    {
      icon: <FaTruck className="text-[#004A7C]" size={24} />,
      title: "Pengiriman Aman",
      desc: "Seluruh Indonesia"
    },
    {
      icon: <FaWallet className="text-[#004A7C]" size={24} />,
      title: "DP Ringan",
      desc: "Mulai 500 Ribu"
    },
    {
      icon: <FaClock className="text-[#004A7C]" size={24} />,
      title: "Proses Mudah",
      desc: "1-3 Hari Kerja"
    },
    {
      icon: <IoShieldCheckmark className="text-[#004A7C]" size={24} />,
      title: "Garansi Resmi",
      desc: "Motor Terjamin"
    }
  ];

  return (
    <SectionReveal>
      <section className="bg-white  py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 50, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              duration: 0.9,
              ease: [0.16, 1, 0.3, 1]
            }} className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
            {features.map((f, i) => (
              <motion.div initial={{
                opacity: 0,
                y: 25
              }} whileInView={{
                opacity: 1,
                y: 0
              }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                key={i} className="flex items-center space-x-4">
                <motion.div initial={{ opacity: 0, scale: 0.7 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.12 + 0.15, ease: "easeOut" }} className="bg-[#F2F8FC] p-3 rounded-xl">
                  {f.icon}
                </motion.div>
                <div>
                  <h4 className="font-bold text-gray-900 text-sm">{f.title}</h4>
                  <p className="text-xs text-gray-500">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </ motion.div>
        </div>
      </section >
    </SectionReveal>
  );
};

export default Features;
