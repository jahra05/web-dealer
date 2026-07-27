/**
 * Seed: contact — data pesan kontak
 */
exports.seed = async function (knex) {
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
  await knex('contact').del();
  await knex('contact').insert([
    { id_message: 2, nama: 'lilis', email: 'lilis@gmail', no_hp: '08242546', subjek: 'pengajuan', pesan: 'dadada', status: 'Belum Dibaca', created_at: '2026-07-13 13:11:55' },
    { id_message: 4, nama: 'jiso', email: 'jiso@gmail', no_hp: '09530535353', subjek: 'harus dp berapa ', pesan: 'bisa sat aluhat produk nya', status: 'Sudah Dibaca', created_at: '2026-07-16 08:04:42' },
    { id_message: 6, nama: 'jamal', email: 'jamal@gmail.com', no_hp: '08978091008', subjek: 'alamat', pesan: 'lokasi atau alamt dealer ada dimana saja ', status: 'Belum Dibaca', created_at: '2026-07-24 08:01:01' },
  ]);
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1');
};
