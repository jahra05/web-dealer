/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.createTable('hero', (table) => {
        table.engine('InnoDB');
        table.charset('utf8mb4');
        table.increments('id_hero').primary();
        table.integer('id_motor').unsigned().notNullable();
        table.foreign('id_motor', 'hero_ibf_1')
            .references('id_motor')
            .inTable('motor')
            .onDelete('NO ACTION')
            .onUpdate('CASCADE');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('hero')
};
