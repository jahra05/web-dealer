/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.alterTable('motor', (table) => {
        table
            .enum("status", ['Aktif', 'Nonaktif'])
            .notNullable()
            .defaultTo('Aktif')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.alterTable('motor', (table) => {
        table.dropColumn('status')
    })
};
