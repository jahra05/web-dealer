exports.up = async function (knex) {
    await knex.schema.alterTable("spesifikasi_motor", (table) => {
        table.dropForeign(["id_motor"], "fk_motor_spesifikasi");
    });

    await knex.schema.alterTable("spesifikasi_motor", (table) => {
        table.foreign("id_motor", "fk_motor_spesifikasi")
            .references("id_motor")
            .inTable("motor")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
    });
};

exports.down = async function (knex) {
    await knex.schema.alterTable("spesifikasi_motor", (table) => {
        table.dropForeign(["id_motor"], "fk_motor_spesifikasi");
    });

    await knex.schema.alterTable("spesifikasi_motor", (table) => {
        table.foreign("id_motor", "fk_motor_spesifikasi")
            .references("id_motor")
            .inTable("motor");
    });
};