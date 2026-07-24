import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaMotorcycle, FaFileShield } from 'react-icons/fa6';
import { MdQuiz } from 'react-icons/md';
import { BiBox, BiMessageAdd, BiUser } from 'react-icons/bi';
import { SiPrek } from 'react-icons/si';
import { CgComment, CgCreditCard } from 'react-icons/cg';
import { IoBagCheckOutline } from 'react-icons/io5';

const NAV_ITEMS = [
  { path: '/admin/dashboard', label: 'Dashboard', icon: BiBox },
  { path: '/admin/kelolaProduk', label: 'Kelola Produk', icon: FaMotorcycle },
  { path: '/admin/spesifikasi', label: 'Spesifikasi', icon: SiPrek },
  { path: '/admin/pengajuanKredit', label: 'Pengajuan Kredit', icon: CgCreditCard },
  { path: '/admin/simulasiKredit', label: 'Simulasi Kredit', icon: IoBagCheckOutline },
  { path: '/admin/pagemessage', label: 'Message', icon: BiMessageAdd },
  { path: '/admin/testimoni', label: 'Testimoni', icon: CgComment },
  { path: '/admin/faq', label: 'FAQ', icon: MdQuiz },
  { path: '/admin/exam', label: 'Laporan', icon: FaFileShield },
  { path: '/admin/manageUser', label: 'Managemen User', icon: BiUser },
];

const NavItem = ({ item, isActive, onClick }) => (
  <li
    onClick={onClick}
    className={`list-none cursor-pointer px-4 py-3 w-full flex rounded-xl hover:bg-red-600 hover:text-white items-center font-semibold text-sm transition-all duration-300 ease-in-out ${isActive ? 'bg-red-100 text-red-500' : 'text-gray-700 hover:text-white'
      }`}
  >
    <item.icon size={22} className="mr-3 flex-shrink-0" />
    {item.label}
  </li>
);

const AdminNavbar = ({ isOpen = false, onClose = () => { } }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:flex-shrink-0 bg-white border-r border-gray-100">
        <div className="p-4">
          <Link to="/admin/dashboard" className="flex items-center gap-3 no-underline">
            <div className="w-11 h-11 flex items-center justify-center bg-red-600 text-white rounded-lg shadow-sm flex-shrink-0">
              <FaMotorcycle size={28} />
            </div>
            <div className="leading-tight min-w-0">
              <h2 className="text-lg font-bold text-gray-900 truncate">Daya Motor</h2>
              <p className="text-[10px] text-gray-500">DEALER RESMI HONDA</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-3 py-2 overflow-y-auto">
          <ul className="flex flex-col gap-0.5">
            {NAV_ITEMS.map((item) => (
              <NavItem
                key={item.path}
                item={item}
                isActive={location.pathname === item.path}
                onClick={() => handleNavigate(item.path)}
              />
            ))}
          </ul>
        </nav>
      </aside>

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
            <Link to="/admin/dashboard" className="flex items-center gap-3 no-underline" onClick={onClose}>
              <div className="w-10 h-10 flex items-center justify-center bg-red-600 text-white rounded-lg shadow-sm flex-shrink-0">
                <FaMotorcycle size={24} />
              </div>
              <div className="leading-tight min-w-0">
                <h2 className="text-base font-bold text-gray-900 truncate">Daya Motor</h2>
                <p className="text-[10px] text-gray-500">DEALER RESMI HONDA</p>
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

          <nav className="flex-1 px-3 py-3 overflow-y-auto">
            <ul className="flex flex-col gap-0.5">
              {NAV_ITEMS.map((item) => (
                <NavItem
                  key={item.path}
                  item={item}
                  isActive={location.pathname === item.path}
                  onClick={() => handleNavigate(item.path)}
                />
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
};

export default AdminNavbar;
