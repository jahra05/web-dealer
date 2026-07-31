/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
    await knex.schema.alterTable("user", (table) => {
        table.string("nama_lengkap", 150).after("id_user");
        table.string("email", 150).unique().after("username");
        table.string("foto", 255).nullable().after("password");
    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
    await knex.schema.alterTable("user", (table) => {
        table.dropColumn("nama_lengkap");
        table.dropColumn("email")
        table.dropColumn("foto")
    })
};
