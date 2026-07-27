/**
 * Migration: Create kategori table
 */
exports.up = async function (knex) {
  await knex.schema.createTable('kategori', (table) => {
    table.engine('InnoDB');
    table.charset('utf8mb4');
    table.collate('utf8mb4_general_ci');
    table.increments('id_kategori').primary();
    table.string('nama_kategori', 355).notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('update_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('kategori');
};
