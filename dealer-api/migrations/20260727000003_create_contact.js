/**
 * Migration: Create contact table
 */
exports.up = async function (knex) {
  await knex.schema.createTable('contact', (table) => {
    table.engine('InnoDB');
    table.charset('utf8mb4');
    table.collate('utf8mb4_general_ci');
    table.increments('id_message').primary();
    table.string('nama', 100).notNullable();
    table.string('email', 100).notNullable();
    table.string('no_hp', 20).notNullable();
    table.string('subjek', 150).notNullable();
    table.text('pesan').notNullable();
    table.enu('status', ['Belum Dibaca', 'Sudah Dibaca']).defaultTo('Belum Dibaca');
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('contact');
};
