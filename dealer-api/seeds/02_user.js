/**
 * Seed: user — data akun admin
 */
const bcrypt = require("bcrypt")

exports.seed = async function (knex) {
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
  await knex('user').del();

  const hashPassword = await bcrypt.hash("12345", 10)

  await knex('user').insert([
    { id_user: 1, nama_lengkap: 'jahra', username: 'admin', email: 'jahra@gmail', password: hashPassword, created_at: '2026-07-08 09:00:03', updated_at: '2026-07-08 09:00:03' },
  ]);
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1');
};
