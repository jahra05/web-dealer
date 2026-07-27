/**
 * Migration: Create simulasi_kredit table (FK → motor)
 */
exports.up = async function (knex) {
  await knex.schema.createTable('simulasi_kredit', (table) => {
    table.engine('InnoDB');
    table.charset('utf8mb4');
    table.collate('utf8mb4_general_ci');
    table.increments('id_simulasi').primary();
    table.integer('id_motor').unsigned().notNullable();
    table.integer('dp').notNullable();
    table.integer('tenor').notNullable();
    table.decimal('bunga', 5, 2).notNullable();
    table.integer('cicilan').notNullable();

    // Foreign key
    table.foreign('id_motor', 'simulasi_kredit_ibfk_1')
      .references('id_motor')
      .inTable('motor');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('simulasi_kredit');
};
