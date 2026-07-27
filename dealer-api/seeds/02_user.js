/**
 * Seed: user — data akun admin
 */
exports.seed = async function (knex) {
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
  await knex('user').del();
  await knex('user').insert([
    { id_user: 1, username: 'admin', password: '12345', created_at: '2026-07-08 09:00:03', updated_at: '2026-07-08 09:00:03' },
  ]);
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1');
};
