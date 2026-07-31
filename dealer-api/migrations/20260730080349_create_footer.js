const { table } = require("framer-motion/client");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable('footer', (table) => {
        table.increments("id_footer").primary();

        // info dealer
        table.string("nama_dealer", 100).notNullable();
        table.string('logo', 255);
        table.text('deskripsi');

        // kontak
        table.string('email', 100);
        table.string('no_hp', 20);
        table.string('whatsapp', 20);
        table.text('alamat');
        table.text('google_maps');

        //media sosial
        table.string('instagram', 255);
        table.string('facebook', 255);
        table.string('tiktok', 255);
        table.string('youtube', 255);

        // jam operasional
        table.string('jam_senin_jumat', 100);
        table.string("jam_sabtu", 100)

        table.timestamps(true, true)
    })

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('footer')
};
