/**
 * Migration: Create varian table (FK → tipe)
 */
exports.up = async function (knex) {
  await knex.schema.createTable('varian', (table) => {
    table.engine('InnoDB');
    table.charset('utf8mb4');
    table.collate('utf8mb4_general_ci');
    table.increments('id_varian').primary();
    table.string('nama_varian', 125).notNullable();
    table.integer('id_tipe').unsigned().notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('update_at').notNullable().defaultTo(knex.fn.now());

    // Foreign key
    table.foreign('id_tipe', 'fk_varian_tipe')
      .references('id_tipe')
      .inTable('tipe');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('varian');
};
