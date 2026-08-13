exports.up = async function (knex) {
    await knex.schema.alterTable('simulasi_kredit', (table) => {
        table.dropForeign('id_motor', 'simulasi_kredit_ibfk_1');

        table.foreign('id_motor', 'simulasi_kredit_ibfk_1')
            .references('id_motor')
            .inTable('motor')
            .onDelete('NO ACTION')
            .onUpdate('CASCADE');
    });
};

exports.down = async function (knex) {
    await knex.schema.alterTable('simulasi_kredit', (table) => {
        table.dropForeign('id_motor', 'simulasi_kredit_ibfk_1');

        table.foreign('id_motor', 'simulasi_kredit_ibfk_1')
            .references('id_motor')
            .inTable('motor')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');
    });
};