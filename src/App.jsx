import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import ScrollToTop from './components/ScrollToTop';
import Login from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/AdminDashboard';
import KelolaProduk from './pages/Admin/KelolaProduk';
import PengajuanKredit from './pages/Admin/PengajuanKredit';
import Exam from './pages/Admin/Exam';
import ProtectedRoute from './components/ProtectedRoute';
import Testimoni from './pages/Admin/Testimoni';
import FaqAdmin from './pages/Admin/FaqAdmin';
import PageMessage from './pages/Admin/PageMessage';
import SimulasiKredit from './pages/Admin/SimulasiKredit';
import Spesifikasi from './pages/Admin/Spesifikasi';
import Setting from './pages/Admin/Setting';
import ManajemenUser from './pages/Admin/ManajemenUser';
import PageForgatPassword from './pages/Admin/PageForgatPassword';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Toaster position="top-center" />
      <Routes>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute> <AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/kelolaProduk" element={<ProtectedRoute><KelolaProduk /></ProtectedRoute>} />
        <Route path="/admin/spesifikasi" element={<ProtectedRoute><Spesifikasi /></ProtectedRoute>} />
        <Route path="/admin/pengajuanKredit" element={<ProtectedRoute> <PengajuanKredit /> </ProtectedRoute>} />
        <Route path="/admin/simulasiKredit" element={<ProtectedRoute> <SimulasiKredit /> </ProtectedRoute>} />
        <Route path="/admin/pagemessage" element={<ProtectedRoute><PageMessage /></ProtectedRoute>} />
        <Route path="/admin/testimoni" element={<ProtectedRoute><Testimoni /></ProtectedRoute>} />
        <Route path="/admin/faq" element={<ProtectedRoute><FaqAdmin /></ProtectedRoute>} />
        <Route path="/admin/exam" element={<ProtectedRoute><Exam /></ProtectedRoute>} />
        <Route path="/admin/manageUser" element={<ProtectedRoute><ManajemenUser /></ProtectedRoute>} />
        <Route path="/admin/setting" element={<ProtectedRoute><Setting /></ProtectedRoute>} />
        <Route path="/admin/forgatPassword" element={<PageForgatPassword />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Routes>
    </Router>
  );
}


export default App;
