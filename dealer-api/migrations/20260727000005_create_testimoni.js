/**
 * Migration: Create testimoni table
 */
exports.up = async function (knex) {
  await knex.schema.createTable('testimoni', (table) => {
    table.engine('InnoDB');
    table.charset('utf8mb4');
    table.collate('utf8mb4_general_ci');
    table.increments('id_testimoni').primary();
    table.string('nama', 100).notNullable();
    table.string('pekerjaan', 100).nullable();
    table.text('isi_testimoni').notNullable();
    table.integer('rating').notNullable();
    table.string('foto', 255).nullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('testimoni');
};
