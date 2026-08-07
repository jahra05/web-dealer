// import { useEffect, useState } from "react"
// import AdminNavbar from "../../components/AdminNavbar"
// import { PiPlus } from "react-icons/pi"
// import { MdDelete } from "react-icons/md"
// import { FaEdit } from "react-icons/fa"
// import { RxHamburgerMenu } from "react-icons/rx"

// const ColorMotor = () => {
//     const [page, setPage] = useState(1);
//     const [search, setSearch] = useState("");
//     const [color, setColor] = useState([]);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [isEdit, setIsEdit] = useState(false)
//     const [selected, setSelected] = useState(null)
//     const [motor, setMotor] = useState([]);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//     const [formData, setFormData] = useState({
//         id_motor: "",
//         nama_warna: "",
//         kode_warna: ""
//     });

//     const rowsPerPage = 5;

//     const openModal = () => {
//         setIsEdit(false);
//         setSelected(null);

//         setFormData({
//             id_motor: "",
//             nama_warna: "",
//             kode_warna: ""
//         });

//         setIsModalOpen(true);
//     };

//     const handleEdit = (item) => {
//         setIsEdit(true)
//         setSelected(item.id_warna)

//         setFormData({
//             id_motor: item.id_motor,
//             nama_warna: item.nama_warna,
//             kode_warna: item.kode_warna
//         });
//         setIsModalOpen(true)
//     }

//     const handleChange = (e) => {
//         const { name, value } = e.target;

//         setFormData((prev) => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleCreateTestimoni = async (e) => {
//         e.preventDefault();

//         const url = isEdit
//             ? `http://localhost:3000/api/warna/${selected}`
//             : "http://localhost:3000/api/warna";

//         const method = isEdit ? "PUT" : "POST";

//         try {
//             const response = await fetch(url, {
//                 method,
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(formData),
//             });

//             const result = await response.json();

//             if (result.success) {
//                 alert("color berhasil ditambahkan");
//                 getColor();
//                 setIsModalOpen(false);
//                 setFormData({ id_motor: "", nama_warna: "", kode_warna: "" });
//             } else {
//                 alert(result.message);
//             }
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (!window.confirm("Yakin ingin menghapus color?")) return;

//         try {
//             const response = await fetch(`http://localhost:3000/api/warna/${id}`, { method: "DELETE" });
//             const data = await response.json();
//             if (data.success) getColor();
//         } catch (error) {
//             console.log(error);
//         }
//     }

//     const getMotor = async () => {
//         try {
//             const response = await fetch("http://localhost:3000/api/motor");
//             const data = await response.json();
//             if (data.success) setMotor(data.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const getColor = async () => {
//         try {
//             const response = await fetch("http://localhost:3000/api/warna");
//             const data = await response.json();
//             if (data.success) setColor(data.data);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         getColor();
//         getMotor()
//     }, []);

//     const filteredData = color.filter((item) =>
//         item.nama_warna.toLowerCase().includes(search.toLowerCase())
//     );

//     const totalPages = Math.max(1, Math.ceil(filteredData.length / rowsPerPage));
//     const pageItems = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

//     useEffect(() => {
//         if (page > totalPages) setPage(totalPages)
//     }, [page, totalPages])

//     return (
//         <div className="min-h-screen w-full flex bg-gray-50 overflow-x-hidden">
//             <AdminNavbar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
//             <div className="flex-1 min-w-0 flex flex-col bg-gray-50 overflow-x-hidden">
//                 <div className='flex items-center justify-between p-4'>
//                     <button className='lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors' onClick={() => setIsSidebarOpen(prev => !prev)} aria-label="Toggle sidebar">
//                         <RxHamburgerMenu size={24} />
//                     </button>
//                 </div>
//                 <main className="flex-1 px-4 pb-6 overflow-x-hidden">
//                     <div className='mb-4'>
//                         <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Color Motor</h1>
//                         <p className="text-sm text-gray-500 mt-1">Kelola data warna motor.</p>
//                     </div>

//                     <div className="flex gap-4 items-center mb-4 justify-start">
//                         <button type="button" onClick={openModal}
//                             className='inline-flex items-center justify-center h-10 w-10 rounded-full bg-white border border-slate-200 text-slate-700 shadow-sm transition hover:shadow-md hover:border-slate-300 hover:bg-slate-50'>
//                             <PiPlus size={20} />
//                         </button>
//                     </div>

//                     <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow-sm border border-gray-100">
//                         <div className="px-4 lg:px-6 py-4 bg-red-600">
//                             <p className="text-sm font-semibold text-white">Daftar Warna</p>
//                         </div>
//                         <div className="overflow-x-auto">
//                             <table className="min-w-[500px] w-full">
//                                 <thead className="bg-white">
//                                     <tr>
//                                         <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Nama motor</th>
//                                         <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Nama warna</th>
//                                         <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">kode warna</th>
//                                         <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Aksi</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody className="bg-white">
//                                     {pageItems.map((item) => (
//                                         <tr key={item.id_warna} className="transition hover:bg-slate-50">
//                                             <td className="px-4 py-4 text-sm text-slate-700">{item.nama_motor}</td>
//                                             <td className="px-4 py-4 text-sm text-slate-700">{item.nama_warna}</td>
//                                             <td className="px-4 py-4 text-sm text-slate-700">
//                                                 <div className="w-8 h-8 rounded-full border" style={{ backgroundColor: item.kode_warna }}></div>
//                                             </td>
//                                             <td className="px-4 py-4 text-sm">
//                                                 <div className="flex items-center gap-2">
//                                                     <button onClick={() => handleDelete(item.id_warna)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
//                                                         <MdDelete />
//                                                     </button>
//                                                     <button onClick={() => handleEdit(item)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-slate-300 hover:bg-slate-50">
//                                                         <FaEdit />
//                                                     </button>
//                                                 </div>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                         <div className="px-6 py-3 flex items-center justify-end gap-3">
//                             <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
//                                 className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition ${page === 1 ? 'text-slate-400 bg-slate-100' : 'text-slate-700 bg-white border border-slate-200'}`}>
//                                 Prev</button>
//                             <span className="text-sm text-slate-600">Halaman {page} / {totalPages}</span>
//                             <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
//                                 className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition ${page === totalPages ? 'text-slate-400 bg-slate-100' : 'text-slate-700 bg-white border border-slate-200'}`}>
//                                 Next
//                             </button>
//                         </div>
//                     </div>

//                     {isModalOpen && (
//                         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6" onClick={() => setIsModalOpen(false)}>
//                             <form onSubmit={handleCreateTestimoni} className="w-full max-w-md rounded-3xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
//                                 {/* Header */}
//                                 <div className="px-6 py-5 border-b border-gray-100">
//                                     <div className="flex items-start justify-between gap-4">
//                                         <div>
//                                             <h2 className="text-lg font-bold text-gray-900">{isEdit ? 'Edit Warna' : 'Tambah Warna'}</h2>
//                                             <p className="mt-0.5 text-sm text-gray-500">Kelola data warna motor.</p>
//                                         </div>
//                                         <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">✕</button>
//                                     </div>
//                                 </div>
//                                 {/* Body */}
//                                 <div className="px-6 py-5 space-y-4">
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">Pilih Motor</label>
//                                         <select name="id_motor" value={formData.id_motor} onChange={handleChange}
//                                             className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100">
//                                             <option value="">Pilih Motor</option>
//                                             {motor.map((item) => (
//                                                 <option key={item.id_motor} value={item.id_motor}>{item.nama_motor}</option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">Nama Warna</label>
//                                         <input name="nama_warna" value={formData.nama_warna} onChange={handleChange} placeholder="Nama warna"
//                                             className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100" />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm font-medium text-gray-700 mb-1">Kode Warna</label>
//                                         <input name="kode_warna" value={formData.kode_warna} onChange={handleChange} placeholder="Kode warna (hex)"
//                                             className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none transition focus:border-red-400 focus:ring-2 focus:ring-red-100" />
//                                     </div>
//                                 </div>
//                                 {/* Footer */}
//                                 <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-3xl">
//                                     <button type="button" onClick={() => setIsModalOpen(false)} className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">Batal</button>
//                                     <button type="submit" className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700">{isEdit ? 'Update' : 'Simpan'}</button>
//                                 </div>
//                             </form>
//                         </div>
//                     )}
//                 </main>
//             </div>
//         </div>
//     )
// }

// export default ColorMotor
