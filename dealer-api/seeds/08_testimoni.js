/**
 * Seed: testimoni — data testimoni pelanggan
 */
exports.seed = async function (knex) {
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
  await knex('testimoni').del();
  await knex('testimoni').insert([
    { id_testimoni: 2, nama: 'Edo', pekerjaan: 'karyawan swasta', isi_testimoni: 'petugas atau karywanya ramah dan sabar dalam menjawab pertanyaan saya', rating: 4, foto: '1784622986177_user1.avif', created_at: '2026-07-11 13:57:55' },
    { id_testimoni: 3, nama: 'Syela', pekerjaan: 'Arsitektur', isi_testimoni: 'Produk yang ditawarka sangat menarik dan ada banyak model dan warna ', rating: 5, foto: '1784621378319_user3.avif', created_at: '2026-07-13 03:06:04' },
    { id_testimoni: 4, nama: 'Nurul', pekerjaan: 'Pedagang Roti', isi_testimoni: 'saya kurang nyama dengan salah satu pekerja , dia judes dalam melakukan pelayanana', rating: 2, foto: '1784623053701_user2.webp', created_at: '2026-07-21 08:37:33' },
    { id_testimoni: 5, nama: 'Sam', pekerjaan: 'Chef', isi_testimoni: 'sangat suka dengan produk - produk nya ', rating: 5, foto: '1784623096173_user4.jpg', created_at: '2026-07-21 08:38:16' },
  ]);
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1');
};
