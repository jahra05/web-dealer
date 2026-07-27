/**
 * Migration: Create motor table (FK → kategori, tipe)
 */
exports.up = async function (knex) {
  await knex.schema.createTable('motor', (table) => {
    table.engine('InnoDB');
    table.charset('utf8mb4');
    table.collate('utf8mb4_general_ci');
    table.increments('id_motor').primary();
    table.string('nama_motor', 150).notNullable();
    table.integer('id_kategori').unsigned().notNullable();
    table.integer('id_tipe').unsigned().notNullable();
    table.decimal('harga', 10, 0).notNullable();
    table.integer('stok').notNullable();
    table.integer('tahun').notNullable();
    table.text('deskripsi').notNullable();
    table.string('gambar', 255).notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());

    // Foreign keys
    table.foreign('id_kategori', 'fk_motor_kategori')
      .references('id_kategori')
      .inTable('kategori');
    table.foreign('id_tipe', 'fk_motor_tipe')
      .references('id_tipe')
      .inTable('tipe');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('motor');
};
