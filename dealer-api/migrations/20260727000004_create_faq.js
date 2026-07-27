/**
 * Migration: Create faq table
 */
exports.up = async function (knex) {
  await knex.schema.createTable('faq', (table) => {
    table.engine('InnoDB');
    table.charset('utf8mb4');
    table.collate('utf8mb4_general_ci');
    table.increments('id_faq').primary();
    table.string('pertanyaan', 255).notNullable();
    table.text('jawaban').notNullable();
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('faq');
};
