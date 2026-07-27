/**
 * Migration: Create tipe table (FK → kategori)
 */
exports.up = async function (knex) {
  await knex.schema.createTable('tipe', (table) => {
    table.engine('InnoDB');
    table.charset('utf8mb4');
    table.collate('utf8mb4_general_ci');
    table.increments('id_tipe').primary();
    table.string('nama_tipe', 100).notNullable();
    table.integer('id_kategori').unsigned().notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('update_at').notNullable().defaultTo(knex.fn.now());

    // Foreign key
    table.foreign('id_kategori', 'fk_tipe_kategori')
      .references('id_kategori')
      .inTable('kategori');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('tipe');
};
