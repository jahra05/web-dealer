// exports.up = function (knex) {
//     return knex.schema.alterTable("kategori", (table) => {
//         table
//             .enum("status", ["Aktif", "Nonaktif"])
//             .notNullable()
//             .defaultTo("Aktif");
//     });
// };

// exports.down = function (knex) {
//     return knex.schema.alterTable("kategori", (table) => {
//         table.dropColumn("status");
//     });
// };