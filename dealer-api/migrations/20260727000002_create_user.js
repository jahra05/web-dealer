/**
 * Migration: Create user table
 */
exports.up = async function (knex) {
  await knex.schema.createTable('user', (table) => {
    table.engine('InnoDB');
    table.charset('utf8mb4');
    table.collate('utf8mb4_general_ci');
    table.increments('id_user').primary();
    table.string('username', 125).notNullable();
    table.string('password', 255).notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('updated_at').notNullable().defaultTo(knex.fn.now());
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('user');
};
