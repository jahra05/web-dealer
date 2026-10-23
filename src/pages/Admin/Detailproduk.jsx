import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { BiArrowBack, BiEdit, BiSquare, BiTrash } from 'react-icons/bi';
import { MdDelete, MdOutlineKeyboardArrowLeft } from 'react-icons/md';
import { PiPlus } from 'react-icons/pi';
import { data, useParams } from 'react-router-dom'
import Modal from '../../components/Modal';
import FormField from '../../components/FormField';
import { FiDelete } from 'react-icons/fi';


export default function Detailproduk() {
    const { id_motor } = useParams();


    const [editFoto, setEditFoto] = useState(null)
    const [editProduk, setEditProduk] = useState(null)
    const [previewGambar, setPreviewGambar] = useState(null)

    const [motor, setMotor] = useState([]);
    const [fotoMotor, setFototMotor] = useState([])
    const [spesifikasi, setSpesifikasi] = useState([])
    const [kategoriSpesifikasi, setKategoriSpesifikasi] = useState([])


    const [isOpenPartMotor, setIsOpenPartMotor] = useState(false)
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isSpecOpen, setIsSpecOpen] = useState(false)
    const [isEditSpecOpen, setIsEditSpecOpen] = useState(false)
    const [isOpenEditProduk, setIsOpenEditProduk] = useState(false)

    const [filterFoto, setFilterFoto] = useState("")
    const [selectFoto, setSelectFoto] = useState(null)
    const handleHistiryFoto = () => {
        setSelectFoto(null)
    }

    const token = localStorage.getItem("token")

    const [formPartMotor, setFormPartMotor] = useState({
        gambar: null,
        keterangan: ""
    })

    const [formSpesifikasi, setFormSpesifikasi] = useState({
        id_kategori_spesifikasi: "",
        nama_spesifikasi: "",
        nilai: ""
    })

    const [formProduk, setFormProduk] = useState({
        nama_motor: "",
        nama_kategori: "",
        nama_tipe: "",
        harga: "",
        stok: "",
        tahun: "",
        deskripsi: "",
        gambar: null
    })

    console.log("Form produk:", formProduk)



    // const listKet = [
    //     ...new Set(fotoMotor.map((foto) => foto.keterangan?.trim()).filter(Boolean))
    // ]

    // const fotoMotorFiltered = fotoMotor.filter((foto) => {
    //     if (filterFoto === 'semua') return true

    //     return foto.keterangan?.trim() === filterFoto;
    // })


    const handleEditMotor = (item) => {
        setFormProduk({
            nama_motor: item.nama_motor,
            nama_kategori: item.nama_kategori,
            nama_tipe: item.nama_tipe,
            id_motor: item.id_motor,
            harga: item.harga,
            stok: item.stok,
            tahun: item.tahun,
            deskripsi: item.deskripsi,
            gambar: null,
        })

        setPreviewGambar(item.gambar)
        setIsOpenEditProduk(true)
    }


    const closeModalProduk = () => {
        setIsOpenEditProduk(false)
        setEditProduk(false)
    }


    const handleSubmit = async () => {
        const dataForm = new FormData();


        dataForm.append("harga", formData.harga);
        dataForm.append("stok", formData.stok);
        dataForm.append("tahun", formData.tahun);
        dataForm.append("deskripsi", formData.deskripsi);
        dataForm.append("gambar", formData.gambar);

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/motor`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    body: dataForm
                }
            );

            const data = await response.json();
            console.log(data);

            if (data.success) {
                const idMotor = data.id;
                // console.log("id motor baru", idMotor);
                setAlert({
                    type: "success",
                    message: "Produk berhasil ditambahkan"
                })

                await getMotor();
            } else {
                setAlert({
                    type: "warning",
                    message: data.message
                })
            }
        } catch (error) {
            console.log(error);
            setAlert({
                type: 'error',
                message: data.message
            })
        }
    };


    const updateMotor = async () => {
        const dataForm = new FormData()

        dataForm.append("harga", formProduk.harga)
        dataForm.append("stok", formProduk.stok)
        dataForm.append("tahun", formProduk.tahun)
        dataForm.append("deskripsi", formProduk.deskripsi)

        // Kirim foto hanya jika pengguna memilih foto baru
        if (formProduk.gambar) {
            dataForm.append("gambar", formProduk.gambar)
        }

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/motor/${formProduk.id_motor}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: dataForm,
                }
            )

            const data = await response.json()
            console.log("HASIL UPDATE MOTOR", data)

            if (response.ok && data.success) {
                // setAlert({
                //     type: "success",
                //     message: "Produk berhasil diperbarui",
                // })

                setIsOpenEditProduk(false)
                setPreviewGambar("")

                await getMotor()
            } else {
                // setAlert({
                //     type: "warning",
                //     message: data.message || "Gagal memperbarui produk",
                // })
            }
        } catch (error) {
            console.log("Error update motor", error)

            // setAlert({
            //     type: "error",
            //     message: "Terjadi kesalahan saat memperbarui produk",
            // })
        }
    }


    // Add foto part motor

    const handelAddFoto = () => {
        setFormPartMotor({
            gambar: null,
            keterangan: ""
        })
        setPreviewGambar(null)
        setIsAddOpen(true)
    }

    const handleEditFoto = (id_foto) => {
        console.log("ID FOTO DIPILIH:", id_foto);

        const foto = fotoMotor.find(
            (item) => String(item.id_foto) === String(id_foto)
        );

        if (!foto) {
            console.error("Foto tidak ditemukan:", id_foto);
            return;
        }

        setEditFoto(id_foto);

        setFormPartMotor({
            gambar: null,
            keterangan: foto.keterangan || ""
        });

        setPreviewGambar(foto.gambar || null);
        setIsOpenPartMotor(true);
    };
    const handleGambarChange = (file) => {
        setGambar(file)

        if (file) {
            setPreviewGambar(URL.createObjectURL(file))
        } else {
            setPreviewGambar('')
        }
    };


    const addFotoProduk = async () => {
        try {
            if (!formPartMotor.gambar) {
                console.log("silahkan pilih foto bagia motor");
                return;
            }
            const formData = new FormData()

            formData.append("id_motor", id_motor);
            formData.append("gambar", formPartMotor.gambar);
            formData.append("keterangan", formPartMotor.keterangan);

            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/fotoMotor`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: formData
            }
            );
            const data = await response.json();
            console.log("HASIL ADD FOTO", data)

            if (!response.ok) {
                console.log("gagal berhasil ditambahkan")
                return;
            }
            setIsAddOpen(false)
            setFormPartMotor({
                gambar: null,
                keterangan: ""
            })
            setPreviewGambar(null)
            await getFotoProduk()
        } catch (error) {
            console.error("Error add foto", error)
        }
    }


    const DeleteFoto = async (id_foto) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/fotoMotor/${id_foto}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            const data = await response.json();
            console.log("Hasil delete foto", data)
            if (!response.ok) {
                console.log("gagal menghapus foto", data.message)
                return;
            }
            console.log("foto berhasil dihapus")
            await getFotoProduk()
        } catch (error) {
            console.log("ERROR DELETE FOTO", error)
        }
    }


    const updateFotoProduk = async () => {

        try {
            const formData = new FormData();

            if (formPartMotor.gambar) {
                formData.append("gambar", formPartMotor.gambar);
            }

            formData.append("keterangan", formPartMotor.keterangan);

            console.log("KETERANGAN:", keterangan);
            console.log("GAMBAR BARU:", gambar);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/fotoMotor/${editFoto}`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    },
                    body: formData
                }
            );

            const data = await response.json();

            console.log("HASIL UPDATE FOTO:", data);

            if (!response.ok) {
                console.log("Gagal mengupdate foto:", data.message);
                return;
            }

            console.log("Foto berhasil diupdate");

            setEditFoto(null);
            setFormPartMotor({
                gambar: null,
                keterangan: ""
            })
            setPreviewGambar(null);
            setIsOpenPartMotor(false);

            await getFotoProduk();

        } catch (error) {
            console.error("ERROR UPDATE FOTO:", error);
        }
    };

    // Spesifikasi

    const openAddSpec = () => {
        getKategoriSpesifikasi()
        setIsSpecOpen(true)
    }

    const closeAddSpec = () => {
        setIsSpecOpen(false)
    }

    const handleEdiSpec = (item) => {
        setFormSpesifikasi({
            id_spesifikasi: item.id_spesifikasi,
            id_motor: item.id_motor,
            id_kategori_spesifikasi: item.id_kategori_spesifikasi,
            nama_spesifikasi: item.nama_spesifikasi,
            nilai: item.nilai
        })
        setIsEditSpecOpen(true)
    }

    const updateSpesifikasi = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/spesifikasi/${formSpesifikasi.id_spesifikasi}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    id_motor: id_motor,
                    id_kategori_spesifikasi: formSpesifikasi.id_kategori_spesifikasi,
                    nama_spesifikasi: formSpesifikasi.nama_spesifikasi,
                    nilai: formSpesifikasi.nilai
                })
            })
            const data = await response.json()
            console.log("HASIL UPDATE SPESIDIKASI", data)

            if (!response.ok) {
                console.log("gagal update", data.message)
                return
            }

            setIsEditSpecOpen(false)
            setFormSpesifikasi({
                id_kategori_spesifikasi: "",
                id_motor: "",
                nama_spesifikasi: "",
                nilai: ""
            })
            await getSpesifikasi()
        } catch (error) {
            console.log("error update spesifiasi", error)
        }
    }

    const addSpecProduk = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/spesifikasi`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({
                    id_motor: id_motor,
                    id_kategori_spesifikasi: formSpesifikasi.id_kategori_spesifikasi,
                    nama_spesifikasi: formSpesifikasi.nama_spesifikasi,
                    nilai: formSpesifikasi.nilai
                })
            })
            const data = await response.json()
            console.log("HASIL ADD SPESIFIKASI", data)

            if (!response.ok) {
                console.log("gagal", data.message)
                return
            }
            setIsSpecOpen(false)
            setFormSpesifikasi({
                id_kategori_spesifikasi: "",
                nama_spesifikasi: "",
                nilai: ""
            })
            await getSpesifikasi()
        } catch (error) {
            console.log('error add sepsifikasi', error)
        }
    }







    // Get Data

    const getKategoriSpesifikasi = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/kategoriSpesifikasi`);
            const data = await response.json()
            console.log('daftar spesifikasi', data)
            if (data.success) {
                setKategoriSpesifikasi(data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getSpesifikasi = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/spesifikasi`);
            const data = await response.json()
            console.log(data)
            if (data.success) {
                setSpesifikasi(data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const groupSpesifikasi = Object.values(spesifikasi.reduce((acc, item) => {
        if (!acc[item.id_kategori_spesifikasi]) {
            acc[item.id_kategori_spesifikasi] = {
                id_kategori_spesifikasi: item.id_kategori_spesifikasi,
                nama_kategori: item.nama_kategori,
                spesifikasi: []
            }
        }
        acc[item.id_kategori_spesifikasi].spesifikasi.push(item)
        return acc
    }, {}))

    const getMotor = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/motor/${id_motor}`
            );

            const data = await response.json();

            if (data.success) {
                setMotor(data.data);
            }
        } catch (error) {
            console.error("ERROR GET MOTOR:", error);
        }
    };
    const getFotoProduk = async () => {

        try {
            console.log("ID MOTOR:", id_motor);

            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/api/fotoMotor/${id_motor}`
            );

            console.log("STATUS:", response.status);

            const data = await response.json();

            console.log("RESPONSE FOTO:", data);

            if (data.success) {
                console.log("DATA FOTO:", data.data);
                setFototMotor(data.data)
            }
        } catch (error) {
            console.log("ERROR:", error);
        }
    };
    useEffect(() => {
        getFotoProduk()
        getMotor()
        getSpesifikasi()
        getKategoriSpesifikasi()
    }, [id_motor])
    console.log("Data spesifikasi:", spesifikasi);
    console.log("Group spesifikasi:", groupSpesifikasi);
    return (
        <>
            <div className="min-h-screen w-full flex bg-gray-50 overflow-x-hidden" >
                <div className="flex-1 min-w-0 flex flex-col bg-gray-50 overflow-x-hidden">
                    <main className="flex-1 px-2 pb-4 overflow-x-hidden mt-0 ">
                        <div className='mt-24'>
                            <motion.button initial={{ opacity: 0, x: -2 }}
                                animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                onClick={() => navigate('/')}
                                className="mb-8 flex items-center space-x-2 text-gray-400 hover:text-[#00345F] font-bold transition-colors group"
                            >
                                <MdOutlineKeyboardArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                                <span>Kembali ke Daftar Motor</span>
                            </motion.button>

                            <div className='grid grid-cols-2 md:grid-cols-1 gap-4  w-full'>

                                <div className="overflow-hidden bg-white px-2 py-4">



                                    {motor?.gambar && (
                                        <div className="flex items-start justify-between gap-4">
                                            <div className=' flex flex-col gap-4 border-r px-2 border-gray-100'>
                                                <div className="flex flex-col gap-3">
                                                    <img
                                                        src={selectFoto?.gambar || motor.gambar}
                                                        alt={selectFoto?.keterangan || motor.nama_motor}
                                                        className="h-80 w-full rounded-md object-contain"
                                                    />

                                                    {/* Tombol edit dan hapus untuk foto terpilih */}
                                                    {selectFoto && (
                                                        <div className="flex items-center justify-center gap-3">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleEditFoto(selectFoto.id_foto)}
                                                                className="flex items-center gap-2 rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                                                            >
                                                                <BiEdit size={18} />
                                                                Edit Foto
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() => DeleteFoto(selectFoto.id_foto)}
                                                                className="flex items-center gap-2 rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                                                            >
                                                                <MdDelete size={18} />
                                                                Hapus Foto
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-2 overflow-x-auto px-2">

                                                    {/* Tombol tambah foto */}
                                                    <button
                                                        type="button"
                                                        onClick={handelAddFoto}
                                                        className="shrink-0 rounded-full bg-blue-300 p-2"
                                                    >
                                                        <PiPlus color="white" />
                                                    </button>

                                                    {/* Thumbnail foto utama motor */}
                                                    <button
                                                        type="button"
                                                        onClick={handleHistiryFoto}
                                                        className={`mt-2 h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 p-1 ${selectFoto === null
                                                            ? "border-blue-500"
                                                            : "border-gray-200"
                                                            }`}
                                                    >
                                                        <img
                                                            src={motor.gambar}
                                                            alt={motor.nama_motor}
                                                            className="h-full w-full rounded-md object-cover"
                                                        />
                                                    </button>

                                                    {/* Thumbnail foto tambahan */}
                                                    {fotoMotor.map((foto) => (
                                                        <button
                                                            key={foto.id_foto}
                                                            type="button"
                                                            onClick={() => setSelectFoto(foto)}
                                                            className={`mt-2 h-20 w-20 shrink-0 overflow-hidden rounded-md border-2 p-1 ${String(selectFoto?.id_foto) === String(foto.id_foto)
                                                                ? "border-blue-500"
                                                                : "border-gray-200"
                                                                }`}
                                                        >
                                                            <img
                                                                src={foto.gambar}
                                                                alt={foto.keterangan || "Foto bagian motor"}
                                                                className="h-full w-full rounded-md object-cover"
                                                            />
                                                        </button>
                                                    ))}
                                                </div>




                                            </div>
                                            <div className='flex items-start justify-between'>
                                                <div className='flex  flex-col gap-6'>
                                                    <div className='flex  items-center justify-between'>
                                                        <p className='font-medium text-xl uppercase'>{motor.nama_motor}</p>
                                                    </div>

                                                    <div className='flex gap-4  text-sm text-gray-500 items-center'>
                                                        <div className='text-center border-r border-gray-100 px-2'>
                                                            <p className='text-gray-700 text-xs'>Kategori</p>
                                                            <p className='text-xs font-medium'>{motor.nama_kategori}</p>
                                                        </div>

                                                        <div className='text-center border-r border-gray-100 px-2'>
                                                            <p className='text-gray-700 text-xs'>Tipe</p>
                                                            <p className='text-xs font-medium'>{motor.nama_tipe}</p>
                                                        </div>


                                                        <div className='text-center border-r border-gray-100 px-2'>
                                                            <p className='text-gray-700 text-sm'>Tahun</p>
                                                            <p className='text-xs font-medium'>{motor.tahun}</p>
                                                        </div>

                                                        <div className='text-center border-r border-gray-100 px-2'>
                                                            <p className='text-gray-700 text-sm'>Stok</p>
                                                            <p className='text-xs font-medium'>{motor.stok}</p>
                                                        </div>
                                                    </div>

                                                    <p className='text-gray-700 font-medium text-xl'>Rp.{motor.harga}</p>


                                                    <div>
                                                        <p className='text-l'>Color</p>
                                                        <div className='flex gap-4'>
                                                            <div className='bg-emerald-50 w-8 h-8 rounded-full'>.</div>
                                                            <div className='bg-red-50 w-8 h-8 rounded-full'>.</div>
                                                            <div className='bg-pink-50 w-8 h-8 rounded-full'>.</div>
                                                        </div>
                                                    </div>


                                                    <div className='w-full md:w-[620px] text-sm  border-gray-100 mt-2 py-2'>
                                                        <h2 className='text-sm font-medium mb-1'>Deskripsi</h2>
                                                        <p className='text-xs text-gray-600'>
                                                            {motor.deskripsi}
                                                        </p>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='flex gap-3'>
                                                <button className='bg-blue-400 text-sm p-2 text-white rounded-full' onClick={() => handleEditMotor(motor)}><BiEdit size={18} /></button>
                                                <button className='bg-blue-400 text-sm p-2  text-white rounded-full' ><BiTrash size={18} /></button>
                                            </div>


                                        </div>

                                    )}
                                </div>

                                <div className="overflow-hidden bg-white px-2 py-4">
                                    <div className='flex justify-between'>
                                        <h3 className='text-lg font-medium'>Spesifikasi</h3>
                                        <button className='bg-blue-300 flex gap-1 items-center p-2 text-xs text-white font-medium rounded-md' onClick={openAddSpec}><span><PiPlus size={14} /></span>Tambah</button>
                                    </div>
                                    <div>
                                        {groupSpesifikasi.length === 0 ? (
                                            <div className='py-10 text-center'>
                                                <p className='text-sm text-gray-500'>Spesifikasi motor ini belum ditambahkan</p>
                                                <p className='mt-1 text-xs text-gray-400'>Klik tombol Tambah untuk mengisi spesifikasi</p>
                                            </div>
                                        ) : (
                                            groupSpesifikasi.map((group) => (
                                                <div
                                                    key={group.id_kategori_spesifikasi}
                                                    className="w-full"
                                                >
                                                    <div className='px-4 pt-5 pb-2'>
                                                        <h3 className="text-sm font-semibold text-gray-800 capitalize">
                                                            {group.nama_kategori}
                                                        </h3>
                                                    </div>
                                                    <div>
                                                        {group.spesifikasi.map((item) => (
                                                            <div
                                                                key={item.id_spesifikasi}
                                                                className="grid grid-cols-[200px_1fr_1fr] items-center border-b border-gray-100 px-4 py-3 hover:bg-gray-50"
                                                            >
                                                                <p className="text-left text-gray-600 text-smƒ">
                                                                    {item.nama_spesifikasi}
                                                                </p>

                                                                <p className="text-right text-gray-600 text-sm">
                                                                    {item.nilai}
                                                                </p>
                                                                <div>
                                                                    <button onClick={() => handleEdiSpec(item)}
                                                                        className="justify-self-end flex items-center gap-1 rounded-md border border-blue-300 bg-blue-50 px-2 py-1 text-xs text-blue-600">
                                                                        <span><BiEdit size={13} /></span>  Edits
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>


                                                </div>
                                            ))
                                        )}


                                    </div>
                                </div>


                            </div>
                        </div>
                    </main>
                </div >
            </div >
            <div>

            </div>

            {/* Modal Edit Detaul Produk */}

            <Modal isOpen={isOpenEditProduk} onClose={() => setIsOpenEditProduk(false)} title='Edit Detail Produk'
                footer={
                    <div className='py-6 px-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-3xl'>
                        <button type='button' onClick={() => setIsOpenEditProduk(false)} className='rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50'>Batal</button>
                        <button type='submit' onClick={updateMotor} className=' rounded-full bg-[#002446] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#00182F]'>Simpan</button>
                    </div>
                }>
                <div>
                    <p>{formProduk.nama_motor}</p>
                    <div className='flex gap-2'>
                        <p className='text-xs text-gray-400'>{formProduk.nama_kategori}</p>
                        <p className='text-xs text-gray-400'>{formProduk.nama_tipe}</p>
                    </div>
                </div>


                <FormField label='Harga' name='harga' value={formProduk.harga}
                    onChange={(val) => setFormProduk((prev) => ({ ...prev, harga: val }))} />

                <FormField type='textarea' label="Deskripsi" name='deskripsi' value={formProduk.deskripsi}
                    onChange={(val) => setFormProduk((prev) => ({ ...prev, deskripsi: val }))} />


                <FormField label="Tahun" name='tahun' value={formProduk.tahun}
                    onChange={(val) => setFormProduk((prev) => ({ ...prev, tahun: val }))} />

                <FormField label="Stok" name='stok' value={formProduk.stok}
                    onChange={(val) => setFormProduk((prev) => ({ ...prev, stok: val }))} />

                <FormField
                    type="file" label="Foto Produk" name="gambar" accept="image/*" value={formProduk.gambar} preview={previewGambar}
                    onChange={(file) => {
                        setFormProduk({
                            ...formProduk,
                            gambar: file,
                        })
                    }}
                />


            </Modal>


            {/* Modal Add Spec */}
            <Modal isOpen={isSpecOpen} onClick={() => setIsSpecOpen(false)} title="Add spesifikasi"
                footer={
                    <div className='py-6 px-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-3xl'>
                        <button type='button' onClick={() => setIsSpecOpen(false)} className='rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50'>Batal</button>
                        <button type='submit' onClick={addSpecProduk} className=' rounded-full bg-[#002446] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#00182F]'>Simpan</button>
                    </div>
                }>
                <FormField type='select' label='Kategori Spesifikasi' name='id_kategori_spesifikasi' value={formSpesifikasi.id_kategori_spesifikasi}
                    onChange={(value) =>
                        setFormSpesifikasi({
                            ...formSpesifikasi,
                            id_kategori_spesifikasi: value,
                        })
                    } options={[
                        { value: "", label: "Pilih kategori" },
                        ...kategoriSpesifikasi.map((kategori) => ({
                            value: kategori.id_kategori_spesifikasi,
                            label: kategori.nama_kategori
                        }))
                    ]} />
                <FormField label="Name Spesifikasi" name='nama_spesifikasi' value={formSpesifikasi.nama_spesifikasi} onChange={(e) => setFormSpesifikasi({ ...formSpesifikasi, nama_spesifikasi: e.target.value })} />
                <FormField label="Nilai Spesifikasi" name='nilai' value={formSpesifikasi.nilai} onChange={(e) => setFormSpesifikasi({ ...formSpesifikasi, nilai: e.target.value })} />

            </Modal>

            {/* Modal Edit Part foto motor */}


            <Modal
                isOpen={isOpenPartMotor}
                onClose={() => setIsOpenPartMotor(false)}
                title="Edit Foto Bagian Motor"
                footer={
                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-3xl">
                        <button
                            type="button"
                            onClick={updateFotoProduk}
                        >
                            Simpan Perubahan
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsOpenPartMotor(false)}
                        >
                            Batal
                        </button>
                    </div>
                }
            >
                <FormField
                    label="Keterangan"
                    name="keterangan"
                    value={formPartMotor.keterangan}
                    onChange={(val) =>
                        setFormPartMotor((prev) => ({
                            ...prev,
                            keterangan: val
                        }))
                    }
                />

                <FormField
                    type="file"
                    label="Ganti Foto Bagian Motor"
                    name="gambar"
                    accept="image/*"
                    preview={previewGambar}
                    onChange={(file) => {
                        setFormPartMotor((prev) => ({
                            ...prev,
                            gambar: file
                        }));

                    }}
                />
            </Modal>


            {/* Modal Add Display foto */}
            <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add Display foto"
                footer={
                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 rounded-b-3xl">
                        <button type='button' onClick={addFotoProduk}>Tambah foto</button>
                        <button onClick={() => setIsAddOpen(false)}>batal foto</button>
                    </div>

                }>

                <FormField label="Keterangan" name='keterangan' value={formPartMotor.keterangan}
                    onChange={(val) => setFormPartMotor((prev) => ({ ...prev, keterangan: val }))} />

                <FormField
                    type="file" label="Foto Produk" name="gambar" accept="image/*" value={formPartMotor.gambar} preview={previewGambar}
                    onChange={(file) => {
                        setFormPartMotor({
                            ...formPartMotor,
                            gambar: file,
                        })
                    }}
                />

            </Modal>

            {/* Modal Edit Spec */}
            <Modal isOpen={isEditSpecOpen} onClose={() => setIsEditSpecOpen(false)} title="Edit Specsifikasi"
                footer={
                    <div className="flex justify-end gap-3 rounded-b-2xl border-t bg-gray-50 px-6 py-4">
                        <button type="button" onClick={() => setIsEditSpecOpen(false)} className="rounded-lg border bg-white px-4 py-2 text-sm">
                            Batal
                        </button>

                        <button type="button" onClick={updateSpesifikasi} className="rounded-lg bg-blue-950 px-4 py-2 text-sm text-white">
                            Simpan Perubahan
                        </button>
                    </div>
                }>
                <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                        Kategori spesifikasi
                    </label>
                    <input
                        type="text"
                        value={
                            kategoriSpesifikasi.find(
                                (kategori) =>
                                    String(kategori.id_kategori_spesifikasi) ===
                                    String(formSpesifikasi.id_kategori_spesifikasi)
                            )?.nama_kategori || ''
                        }
                        readOnly
                        className="w-full  border-b px-4 py-2.5 text-sm"
                    />
                </div>
                <FormField label='Spesifikasi' name='nama_spesifikasi' value={formSpesifikasi.nama_spesifikasi} onChange={(e) => setFormSpesifikasi({ ...formSpesifikasi, nama_spesifikasi: e.target.value })} />
                <FormField label='Value' name='nilai' value={formSpesifikasi.nilai} onChange={(e) => setFormSpesifikasi({ ...formSpesifikasi, nilai: e.target.value })} />
            </Modal>



        </>
    )

}