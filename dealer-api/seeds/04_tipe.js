/**
 * Seed: tipe — data master tipe motor (FK → kategori)
 */
exports.seed = async function (knex) {
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
  await knex('tipe').del();
  await knex('tipe').insert([
    { id_tipe: 1, nama_tipe: 'CBR 150R', id_kategori: 2, created_at: '2026-07-09 07:30:48', update_at: '2026-07-09 07:30:48' },
    { id_tipe: 2, nama_tipe: 'Vario 160', id_kategori: 1, created_at: '2026-07-09 07:30:48', update_at: '2026-07-09 07:30:48' },
    { id_tipe: 3, nama_tipe: 'Vario 125', id_kategori: 1, created_at: '2026-07-16 02:11:25', update_at: '2026-07-16 02:11:25' },
    { id_tipe: 4, nama_tipe: 'Vario Street ', id_kategori: 1, created_at: '2026-07-16 02:11:25', update_at: '2026-07-16 02:11:25' },
    { id_tipe: 5, nama_tipe: 'Stylo 160', id_kategori: 1, created_at: '2026-07-16 02:11:25', update_at: '2026-07-16 02:11:25' },
    { id_tipe: 6, nama_tipe: 'BeAt Street', id_kategori: 1, created_at: '2026-07-16 02:11:25', update_at: '2026-07-16 02:11:25' },
    { id_tipe: 7, nama_tipe: 'BeAt', id_kategori: 1, created_at: '2026-07-16 02:12:37', update_at: '2026-07-16 02:12:37' },
    { id_tipe: 8, nama_tipe: 'Scoopy', id_kategori: 1, created_at: '2026-07-16 02:12:37', update_at: '2026-07-16 02:12:37' },
    { id_tipe: 9, nama_tipe: 'Scoopy', id_kategori: 1, created_at: '2026-07-16 02:13:27', update_at: '2026-07-16 02:13:27' },
    { id_tipe: 10, nama_tipe: 'Genio', id_kategori: 1, created_at: '2026-07-16 02:13:27', update_at: '2026-07-16 02:13:27' },
    { id_tipe: 11, nama_tipe: 'PCX 160', id_kategori: 1, created_at: '2026-07-16 02:14:12', update_at: '2026-07-16 02:14:12' },
    { id_tipe: 12, nama_tipe: 'ADV 160', id_kategori: 1, created_at: '2026-07-16 02:14:12', update_at: '2026-07-16 02:14:12' },
  ]);
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1');
};
