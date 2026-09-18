import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { href, Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaMapMarkerAlt, FaRegClock, FaTwitter, FaYoutube } from 'react-icons/fa';
import { IoIosMail } from 'react-icons/io';
import { MdPhone } from 'react-icons/md';

const Footer = () => {
  const [footer, setFooter] = useState([])
  const [logo, setLogo] = useState(null)

  const infoSosmed = [
    { label: "Facebook", icon: FaFacebook, href: footer.facebook },
    { label: "Instagram", icon: FaInstagram, href: footer.instagram },
  ]

  const getFooter = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/footer`);

      const data = await response.json();
      console.log('data footer', data)

      setFooter(data.data[0])
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getFooter()
  }, [])

  return (
    <footer id="kontak" className="bg-[#00182F] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center space-x-2 mb-6  ">
              <img className='w-18 h-16 bg-white rounded-full'
                src={logo ? URL.createObjectURL(logo) : `${footer.logo}`} />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {footer.deskripsi}
            </p>
            <div className="flex space-x-4">
              {infoSosmed.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.a
                    key={item.label}
                    href={item.href || "#"}
                    target={item.href ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                    className={`bg-gray-800 p-2.5 rounded-xl transition-colors ${item.href
                      ? "text-gray-400 hover:text-[#006A9E]"
                      : "text-gray-600 pointer-events-none"
                      }`}
                  >
                    <Icon size={18} />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-lg font-bold mb-6">Menu</h3>
            <ul className="space-y-4 text-sm text-gray-400">

              <li><button onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#006A9E] transition-colors font-bold">Home</button></li>
              <li><button onClick={() => document.getElementById('produk')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#006A9E]  transition-colors font-bold">Produk</button></li>
              <li><button onClick={() => document.getElementById('simulasi-kredit')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#006A9E]  transition-colors font-bold">Simulasi Kredit</button></li>
              <li><button onClick={() => document.getElementById('testimoni')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-[#006A9E]  transition-colors font-bold">Testimoni</button></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-lg font-bold mb-6">Hubungi Kami</h3>
            <ul className="space-y-4 text-sm text-gray-400 font-bold">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt size={18} className="text-[#006A9E] shrink-0" />
                <span>{footer.alamat}</span>
              </li>
              <li className="flex items-center space-x-3">
                <MdPhone size={18} className="text-[#006A9E] shrink-0" />
                <span>{footer.no_hp}</span>
              </li>
              <li className="flex items-center space-x-3">
                <IoIosMail size={18} className="text-[#006A9E] shrink-0" />
                <span>{footer.email}</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3 className="text-lg font-bold mb-6">Jam Operasional</h3>
            <ul className="space-y-4 text-sm text-gray-400 font-bold mb-6">
              <li className="flex items-start space-x-3">
                <FaRegClock size={18} className="text-[#006A9E] shrink-0" />
                <div>
                  <p className="text-white font-bold">Senin - Jumat</p>
                  <p>{footer.jam_senin_jumat}</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <FaRegClock size={18} className="text-[#006A9E] shrink-0" />
                <div>
                  <p className="text-white font-bold">Sabtu</p>
                  <p>{footer.jam_sabtu}</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-2xl overflow-hidden border border-gray-800 shadow-lg">
          <iframe
            src={footer.google_maps}
            width="100%"
            height="150"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Dealer"
          ></iframe>
        </motion.div>
        <div className="pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 gap-4 font-bold uppercase tracking-widest">
          <p>© 2026 Honda Daya Motor Cibeber. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
            <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
          </div>
        </div>
      </div >
    </footer >
  );
};

export default Footer;
