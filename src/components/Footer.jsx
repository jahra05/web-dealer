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
    { label: "Twitter", icon: FaTwitter, href: footer.twitter },
    { label: "Youtube", icon: FaYoutube, href: footer.youtube },
  ]

  const getFooter = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/footer");

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
    <footer id="kontak" className="bg-gray-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center space-x-2 mb-6">
              {/* <div className="bg-primary p-1 rounded">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div> */}
              <img className='w-14 h-14 rounded-full object-cover'
                src={logo ? URL.createObjectURL(logo) : `http://localhost:3000/uploads/${footer.logo}`} />
              <h2 className="text-xl font-black tracking-tight uppercase">{footer.nama_dealer}</h2>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              {footer.deskripsi}
              {/* Dealer resmi Honda terpercaya. Melayani penjualan unit baru, suku cadang asli, dan servis resmi dengan standar kualitas terbaik. */}
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
                      ? "text-gray-400 hover:text-red-500"
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-bold mb-6">Menu</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><button onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-primary transition-colors font-bold">Home</button></li>
              <li><button onClick={() => document.getElementById('produk')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-primary transition-colors font-bold">Produk</button></li>
              <li><button onClick={() => document.getElementById('simulasi-kredit')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-primary transition-colors font-bold">Simulasi Kredit</button></li>
              <li><Link to="#" className="hover:text-primary transition-colors font-bold">Promo Terbaru</Link></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-bold mb-6">Hubungi Kami</h3>
            <ul className="space-y-4 text-sm text-gray-400 font-bold">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt size={18} className="text-primary shrink-0" />
                <span>{footer.alamat}</span>
                {/* <span>Jl. Raya Honda No. 123, Jakarta Selatan</span> */}
              </li>
              <li className="flex items-center space-x-3">
                <MdPhone size={18} className="text-primary shrink-0" />
                {/* <span>0812-3456-7890</span> */}
                <span>{footer.no_hp}</span>
              </li>
              <li className="flex items-center space-x-3">
                <IoIosMail size={18} className="text-primary shrink-0" />
                {/* <span>info@hondajahra.com</span> */}
                <span>{footer.email}</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-bold mb-6">Jam Operasional</h3>
            <ul className="space-y-4 text-sm text-gray-400 font-bold mb-6">
              <li className="flex items-start space-x-3">
                <FaRegClock size={18} className="text-primary shrink-0" />
                <div>
                  <p className="text-white font-bold">Senin - Jumat</p>
                  <p>{footer.jam_senin_jumat}</p>
                  {/* <p>08:00 - 17:00 WIB</p> */}
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <FaRegClock size={18} className="text-primary shrink-0" />
                <div>
                  <p className="text-white font-bold">Sabtu - Minggu</p>
                  <p>{footer.jam_sabtu}</p>
                  {/* <p>09:00 - 15:00 WIB</p> */}
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
        <div className="rounded-2xl overflow-hidden border border-gray-800 shadow-lg">
          <iframe
            // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126906.96349544464!2d106.7724285741699!3d-6.284411135451996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f2197678ad3d%3A0x103632997864c015!2sSouth%20Jakarta%2C%20South%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1718615000000!5m2!1sen!2sid"
            src={footer.google_maps}
            width="100%"
            height="150"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Dealer"
          ></iframe>
        </div>
        <div className="pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-[10px] text-gray-500 gap-4 font-bold uppercase tracking-widest">
          <p>© 2026 Honda Jahra Dealer. All rights reserved.</p>
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
