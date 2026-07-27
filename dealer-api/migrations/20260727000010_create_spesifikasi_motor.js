/**
 * Migration: Create spesifikasi_motor table (FK → motor)
 */
exports.up = async function (knex) {
  await knex.schema.createTable('spesifikasi_motor', (table) => {
    table.engine('InnoDB');
    table.charset('utf8mb4');
    table.collate('utf8mb4_general_ci');
    table.increments('id_spesifikasi').primary();
    table.integer('id_motor').unsigned().notNullable();
    table.string('kapasitas_mesin', 100).notNullable();
    table.string('tenaga', 100).notNullable();
    table.string('torsi', 100).notNullable();
    table.string('transmisi', 100).notNullable();
    table.string('berat', 11).notNullable();
    table.string('tinggi_jok', 11).notNullable();
    table.string('kapasitas_tengki', 100).notNullable();
    table.string('mesin', 100).notNullable();

    // Foreign key
    table.foreign('id_motor', 'fk_motor_spesifikasi')
      .references('id_motor')
      .inTable('motor');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('spesifikasi_motor');
};
