/**
 * Seed: simulasi_kredit — data simulasi kredit (FK → motor)
 */
exports.seed = async function (knex) {
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
  await knex('simulasi_kredit').del();
  await knex('simulasi_kredit').insert([
    { id_simulasi: 6, id_motor: 23, dp: 10000, tenor: 12, bunga: 12.00, cicilan: 354507 },
  ]);
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1');
};
