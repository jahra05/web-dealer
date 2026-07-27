/**
 * Migration: Create pengajuan table (FK → motor)
 */
exports.up = async function (knex) {
  await knex.schema.createTable('pengajuan', (table) => {
    table.engine('InnoDB');
    table.charset('utf8mb4');
    table.collate('utf8mb4_general_ci');
    table.increments('id_pengajuan').primary();
    table.string('nama', 100).notNullable();
    table.string('no_hp', 20).notNullable();
    table.text('alamat').notNullable();
    table.string('pekerjaan', 100).notNullable();
    table.integer('id_motor').unsigned().notNullable();
    table.timestamp('tanggal_pengajuan').notNullable().defaultTo(knex.fn.now());
    table.enu('status', ['Menunggu', 'Diproses', 'Disetujui', 'Ditolak']).defaultTo('Menunggu');

    // Foreign key
    table.foreign('id_motor', 'pengajuan_ibfk_1')
      .references('id_motor')
      .inTable('motor');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('pengajuan');
};
