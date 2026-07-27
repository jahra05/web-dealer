/**
 * Seed: kategori — data master kategori motor
 */
exports.seed = async function (knex) {
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
  await knex('kategori').del();
  await knex('kategori').insert([
    { id_kategori: 1, nama_kategori: 'Matic', created_at: '2026-07-08 12:19:29', update_at: '2026-07-08 12:19:29' },
    { id_kategori: 2, nama_kategori: 'Sport', created_at: '2026-07-08 12:19:29', update_at: '2026-07-08 12:19:29' },
    { id_kategori: 3, nama_kategori: 'Cub', created_at: '2026-07-16 02:04:57', update_at: '2026-07-16 02:04:57' },
    { id_kategori: 4, nama_kategori: 'EV', created_at: '2026-07-16 02:04:57', update_at: '2026-07-16 02:04:57' },
    { id_kategori: 5, nama_kategori: 'BigBike', created_at: '2026-07-16 02:05:13', update_at: '2026-07-16 02:05:13' },
  ]);
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1');
};
