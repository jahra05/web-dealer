import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaMotorcycle, FaFileShield, FaClipboardList } from 'react-icons/fa6';
import { MdQuiz } from 'react-icons/md';
import { BiArrowBack, BiBarChart, BiBox, BiCalculator, BiChevronsLeft, BiKey, BiMessageAdd, BiMessageSquare, BiReceipt, BiUser } from 'react-icons/bi';
import { SiPrek } from 'react-icons/si';
import { CgChevronLeftR, CgComment, CgCreditCard } from 'react-icons/cg';
import { IoBagCheckOutline } from 'react-icons/io5';
import { LuCircleHelp, LuLayoutDashboard, LuMessageCircleHeart, LuPanelLeftClose } from 'react-icons/lu';
import { FiFileText } from 'react-icons/fi';
import { BarChart } from 'recharts';
import { CiSettings } from 'react-icons/ci';
import { motion } from 'framer-motion'
import { getFunctionUrl, getSupabaseHeaders } from "../config/supabase";


const NAV_ITEMS = [
  {
    title: 'MAIN',
    items: [
      { path: '/admin/dashboard', label: 'Dashboard', icon: LuLayoutDashboard, activeKeywords: ["/admin/dashboard"] },

    ]
  },
  {
    title: 'INVENTORY',
    items: [
      { path: '/admin/kelolaProduk', label: 'Produk Motor', icon: BiKey, activeKeywords: ["kelolaproduk", "detailproduk", "spesifikasi"] },

    ]
  },
  {
    title: 'TRANSAKSI',
    items: [
      { path: '/admin/pengajuanKredit', label: 'Pengajuan Kredit', icon: FiFileText, activeKeywords: ["pengajuankredit", "detailpengajuan"] },
    ]
  },
  {
    title: 'KOMUNIKASI',
    items: [
      { path: '/admin/pagemessage', label: 'Pesan Masuk', icon: BiMessageSquare, activeKeywords: ['pagemessage'] },
      { path: '/admin/testimoni', label: 'Testimoni', icon: LuMessageCircleHeart, activeKeywords: ['testimoni'] },
      { path: '/admin/faq', label: 'FAQ', icon: LuCircleHelp, activeKeywords: ['faq'] },

    ]
  },
  {
    title: 'ANALITIK',
    items: [
      {
        path: '/admin/exam', label: 'Laporan', icon: BiBarChart, icon: BiBarChart,
        activeKeywords: ['exam']
      },
    ]
  },
  {
    title: 'SYSTEM',
    items: [
      { path: '/admin/setting/profile-admin', label: 'Pengaturan', icon: CiSettings, activeKeywords: ['setting'] },
    ]
  },
];


const AdminNavbar = ({ sidebar, setSidebar, isOpen = false, onClose = () => { } }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [navLogo, setNavLogo] = useState([])


  const getAllFooter = async () => {
    try {
      const response = await fetch(getFunctionUrl('footer'));
      const data = await response.json();
      setNavLogo(data.data[0])
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getAllFooter()
  }, [])

  const checkIsActive = (item) => {
    const currrentPath = location.pathname.toLowerCase()

    if (currrentPath === item.path.toLowerCase()) return true
    if (item.activeKeywords && item.activeKeywords.length > 0) {
      return item.activeKeywords.some((key) => currrentPath.includes(key.toLowerCase()))
    }
    return false
  }
  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      <aside className={`${sidebar ? 'w-20 flex justify-center items-center  text-center' : 'w-64'} hidden lg:flex lg:flex-col lg:flex-shrink-0 bg-white border-r border-gray-100
      transition-[width] duration-300 ease-in-out
      `}>

        <div className='flex  items-center justify-between'>
          {/* <div className={sidebar ? 'hidden' : 'block p-4'}> */}
          <div className={`p-4 overflow-hidden transition-all duration-300 ease-in-out ${sidebar ? 'w-0 opacity-0 px-0' : 'w-auto opacity-100'}`}>
            <Link to="/admin/dashboard" className="flex items-center gap-3 no-underline">
              <div className="w-8 h-8 flex items-center justify-center bg-white text-white rounded-lg shadow-sm flex-shrink-0">
                <img src={navLogo.logo} alt={navLogo.nama_dealer} className='w-8 h-8' />

              </div>
              <div className="leading-tight min-w-0">
                <h2 className="text-lg font-bold text-gray-900 truncate">{navLogo.nama_dealer}</h2>
                <p className="text-[9px] text-gray-500">{navLogo.title}</p>
              </div>
            </Link>
          </div>
          <button onClick={() => setSidebar(!sidebar)} className=" px-4 py-3 mt-3 text-gray-400 hover:text-gray-700 transition-colors">
            <motion.div animate={{ rotate: sidebar ? 180 : 0 }}
              transition={{
                duration: 0.3,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <BiChevronsLeft className={`${sidebar ? 'text-[32px]' : 'text-[24px] -mt-2'}`} />
            </motion.div>
          </button>
        </div>

        <nav className="flex-1 px-3 py-2 overflow-y-auto">
          {NAV_ITEMS.map((group, index) => (
            <div key={group.title} className="mb-5 sidebar-menu-Enter " style={{ animationDelay: `${index * 45}ms` }}>

              {/* Judul kelompok */}
              <p className={sidebar ? 'hidden' : " block px-3 mb-2 text-[11px] font-semibold tracking-wider text-gray-400"}>
                {group.title}
              </p>

              <ul className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = checkIsActive(item)
                  return (
                    <li key={item.path} className="list-none">
                      <Link
                        to={item.path}
                        onClick={onClose}
                        className={`
                  flex items-center gap-3
                  px-4 py-3
                  w-full
                  rounded-xl
                  font-semibold text-sm
                  transition-all duration-200
                  ${isActive
                            ? "bg-[#004A7C] text-[#E6F1F7] "
                            : "text-gray-700 hover:bg-[#F2F8FC] hover:text-[#002446]"
                          }
                `}
                      >
                        <Icon
                          size={20}
                          strokeWidth={1.8}
                          className="flex-shrink-0"
                        />

                        <span className={sidebar ? 'hidden' : 'block'}>{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>

            </div>
          ))}
        </nav>
      </aside >

      <div className={`lg:hidden ${isOpen ? 'visible' : 'invisible'}`}>
        <div
          className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          onClick={onClose}
        />

        <aside
          className={`fixed top-0 left-0 z-50 h-full w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <Link to="/admin/dashboard" className="flex items-center gap-3 no-underline">
              <div className="w-8 h-8 flex items-center justify-center bg-white text-white rounded-lg shadow-sm flex-shrink-0">
                <img src={navLogo.logo} alt={navLogo.nama_dealer} className='w-8 h-8 bg-white rounded-full' />
              </div>
              <div className="leading-tight min-w-0">
                <h2 className="text-lg font-bold text-gray-900 truncate">{navLogo.nama_dealer}</h2>
                <p className="text-[9px] text-gray-500">{navLogo.title}</p>
              </div>
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close sidebar"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 5l10 10M15 5L5 15" />
              </svg>
            </button>
          </div>

          <nav className="flex-1 px-3 py-2 overflow-y-auto">
            {NAV_ITEMS.map((group) => (
              <div key={group.title} className="mb-5">

                {/* Judul kelompok */}
                <p className="px-3 mb-2 text-[11px] font-semibold tracking-wider text-gray-400">
                  {group.title}
                </p>

                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;


                    const isActive =
                      location.pathname === item.path || (item.activeKeywords && item.activeKeywords.some((key) => location.pathname.toLowerCase().includes(key.toLowerCase())))

                    return (
                      <li key={item.path} className="list-none">
                        <Link
                          to={item.path}
                          onClick={onClose}
                          className={`
                  flex items-center gap-3
                  px-4 py-3
                  w-full
                  rounded-xl
                  font-semibold text-sm
                  transition-all duration-200
                   ${isActive
                              ? "bg-[#004A7C] text-[#E6F1F7]"
                              : "text-gray-700 hover:bg-[#F2F8FC] hover:text-[#002446]"
                            }
                `}
                        >
                          <Icon
                            size={20}
                            strokeWidth={1.8}
                            className="flex-shrink-0"
                          />

                          <span>{item.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>

              </div>
            ))}
          </nav>
        </aside>
      </div>
    </>
  );
};

export default AdminNavbar;
