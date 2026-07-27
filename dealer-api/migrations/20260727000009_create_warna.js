/**
 * Migration: Create warna table (FK → motor)
 */
exports.up = async function (knex) {
  await knex.schema.createTable('warna', (table) => {
    table.engine('InnoDB');
    table.charset('utf8mb4');
    table.collate('utf8mb4_general_ci');
    table.increments('id_warna').primary();
    table.string('nama_warna', 100).notNullable();
    table.string('kode_warna', 100).notNullable();
    table.integer('id_motor').unsigned().notNullable();

    // Foreign key
    table.foreign('id_motor', 'fk_warna_motor')
      .references('id_motor')
      .inTable('motor');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('warna');
};
