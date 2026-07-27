/**
 * Seed: varian — data master varian motor (FK → tipe)
 */
exports.seed = async function (knex) {
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
  await knex('varian').del();
  await knex('varian').insert([
    { id_varian: 1, nama_varian: 'CBS', id_tipe: 1, created_at: '2026-07-09 10:00:54', update_at: '2026-07-09 10:00:54' },
    { id_varian: 2, nama_varian: 'STD ABS', id_tipe: 1, created_at: '2026-07-16 02:21:48', update_at: '2026-07-16 02:21:48' },
    { id_varian: 3, nama_varian: 'ABS', id_tipe: 2, created_at: '2026-07-16 02:21:48', update_at: '2026-07-16 02:21:48' },
    { id_varian: 4, nama_varian: 'ABS SP', id_tipe: 2, created_at: '2026-07-16 03:24:53', update_at: '2026-07-16 03:24:53' },
    { id_varian: 5, nama_varian: 'CBS ISS', id_tipe: 3, created_at: '2026-07-16 03:24:53', update_at: '2026-07-16 03:24:53' },
    { id_varian: 6, nama_varian: 'Standart', id_tipe: 4, created_at: '2026-07-16 03:24:53', update_at: '2026-07-16 03:24:53' },
    { id_varian: 7, nama_varian: 'Deluxe', id_tipe: 7, created_at: '2026-07-16 03:24:53', update_at: '2026-07-16 03:24:53' },
    { id_varian: 8, nama_varian: 'Deluxe Smart Key', id_tipe: 7, created_at: '2026-07-16 03:24:53', update_at: '2026-07-16 03:24:53' },
    { id_varian: 9, nama_varian: 'Prestige', id_tipe: 8, created_at: '2026-07-16 03:24:53', update_at: '2026-07-16 03:24:53' },
    { id_varian: 10, nama_varian: 'Fashion', id_tipe: 8, created_at: '2026-07-16 03:24:53', update_at: '2026-07-16 03:24:53' },
    { id_varian: 11, nama_varian: 'Stylish', id_tipe: 8, created_at: '2026-07-16 03:24:53', update_at: '2026-07-16 03:24:53' },
    { id_varian: 12, nama_varian: 'RoadSync', id_tipe: 12, created_at: '2026-07-16 03:24:53', update_at: '2026-07-16 03:24:53' },
    { id_varian: 13, nama_varian: 'ABS', id_tipe: 11, created_at: '2026-07-16 03:24:53', update_at: '2026-07-16 03:24:53' },
    { id_varian: 14, nama_varian: 'CBS', id_tipe: 11, created_at: '2026-07-16 03:24:53', update_at: '2026-07-16 03:24:53' },
  ]);
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1');
};
