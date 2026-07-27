/**
 * Seed: pengajuan — data pengajuan kredit (FK → motor)
 */
exports.seed = async function (knex) {
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
  await knex('pengajuan').del();
  await knex('pengajuan').insert([
    { id_pengajuan: 9, nama: 'Rose', no_hp: '0857836908', alamat: 'jalan kenangan berjudul solo', pekerjaan: 'penyanyi', id_motor: 29, tanggal_pengajuan: '2026-07-24 07:59:41', status: 'Menunggu' },
    { id_pengajuan: 10, nama: 'jeamin', no_hp: '089734392', alamat: 'jeju korea selatan', pekerjaan: 'karyawan SM', id_motor: 20, tanggal_pengajuan: '2026-07-24 08:01:54', status: 'Menunggu' },
  ]);
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1');
};
