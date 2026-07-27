/**
 * Seed: spesifikasi_motor — data spesifikasi setiap motor (FK → motor)
 */
exports.seed = async function (knex) {
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
  await knex('spesifikasi_motor').del();
  await knex('spesifikasi_motor').insert([
    { id_spesifikasi: 8, id_motor: 9, kapasitas_mesin: '156,9 cc', tenaga: '11,8 kW / 8.500 rpm', torsi: '14,7 Nm / 6.500 rpm', transmisi: 'CVT Otomatis', berat: '133 kg', tinggi_jok: '780 mm', kapasitas_tengki: '8,1 L', mesin: 'eSP+, 4 Katup' },
    { id_spesifikasi: 9, id_motor: 10, kapasitas_mesin: '156,9 cc', tenaga: '11,8 kW / 8.500 rpm', torsi: '11,8 kW / 8.500 rpm', transmisi: 'CVT Otomatis', berat: '132 kg', tinggi_jok: '764 mm', kapasitas_tengki: '8,1 L', mesin: 'eSP+, 4 Katup' },
    { id_spesifikasi: 10, id_motor: 11, kapasitas_mesin: '156,9 cc', tenaga: '11,8 kW / 8.500 rpm', torsi: '14,7 Nm / 6.500 rpm', transmisi: 'CVT Otomatis', berat: '132 kg', tinggi_jok: '764 mm', kapasitas_tengki: '8,1 L', mesin: 'eSP+, 4 Katup' },
    { id_spesifikasi: 11, id_motor: 12, kapasitas_mesin: '156,9 cc', tenaga: '11,8 kW / 8.500 rpm', torsi: '14,7 Nm / 6.500 rpm', transmisi: 'CVT Otomatis', berat: '131 kg', tinggi_jok: '764 mm', kapasitas_tengki: '8,1 L', mesin: 'eSP+, 4 Katup' },
    { id_spesifikasi: 12, id_motor: 13, kapasitas_mesin: '109,5 cc', tenaga: '6,6 kW / 7.500 rpm', torsi: '9,3 Nm / 5.500 rpm', transmisi: 'CVT Otomatis', berat: '93 kg', tinggi_jok: '740 mm', kapasitas_tengki: '4,2 L', mesin: 'eSP, PGM-FI' },
    { id_spesifikasi: 13, id_motor: 14, kapasitas_mesin: '109,5 cc', tenaga: '6,6 kW / 7.500 rpm', torsi: '9,3 Nm / 5.500 rpm', transmisi: 'CVT Otomatis', berat: '92 kg', tinggi_jok: '740 mm', kapasitas_tengki: '4,2 L', mesin: 'eSP, PGM-FI' },
    { id_spesifikasi: 14, id_motor: 15, kapasitas_mesin: '109,5 cc', tenaga: '6,6 kW / 7.500 rpm', torsi: '9,3 Nm / 5.500 rpm', transmisi: 'CVT Otomatis', berat: '94 kg', tinggi_jok: '746 mm', kapasitas_tengki: '4,2 L', mesin: 'eSP, PGM-FI' },
    { id_spesifikasi: 15, id_motor: 17, kapasitas_mesin: '109,5 cc', tenaga: '6,6 kW / 7.500 rpm', torsi: '9,3 Nm / 5.500 rpm', transmisi: 'CVT Otomatis', berat: '94 kg', tinggi_jok: '746 mm', kapasitas_tengki: '4,2 L', mesin: 'eSP, PGM-FI' },
    { id_spesifikasi: 16, id_motor: 16, kapasitas_mesin: '109,5 cc', tenaga: '6,6 kW / 7.500 rpm', torsi: '9,3 Nm / 5.500 rpm', transmisi: 'CVT Otomatis', berat: '94 kg', tinggi_jok: '746 mm', kapasitas_tengki: '4,2 L', mesin: 'eSP, PGM-FI' },
    { id_spesifikasi: 17, id_motor: 18, kapasitas_mesin: '109,5 cc', tenaga: '6,6 kW / 7.500 rpm', torsi: '9,2 Nm / 6.000 rpm', transmisi: 'CVT Otomatis', berat: '90 kg', tinggi_jok: '740 mm', kapasitas_tengki: '4,2 L', mesin: 'eSP, PGM-FI' },
    { id_spesifikasi: 18, id_motor: 20, kapasitas_mesin: '109,5 cc', tenaga: '6,6 kW / 7.500 rpm', torsi: '9,2 Nm / 6.000 rpm', transmisi: 'CVT Otomatis', berat: '89 kg', tinggi_jok: ' 742 mm', kapasitas_tengki: '4,2 L', mesin: 'eSP, PGM-FI' },
    { id_spesifikasi: 19, id_motor: 19, kapasitas_mesin: '156,9 cc', tenaga: '11,3 kW / 8.500 rpm', torsi: '13,8 Nm / 7.000 rpm', transmisi: 'CVT Otomatis', berat: '118 kg', tinggi_jok: '768 mm', kapasitas_tengki: '5 L', mesin: 'eSP+, 4 Katup' },
    { id_spesifikasi: 20, id_motor: 21, kapasitas_mesin: '156,9 cc', tenaga: '11,3 kW / 8.500 rpm', torsi: '13,8 Nm / 7.000 rpm', transmisi: 'CVT Otomatis', berat: '118 kg', tinggi_jok: '768 mm', kapasitas_tengki: '5 L', mesin: 'eSP+, 4 Katup' },
    { id_spesifikasi: 21, id_motor: 22, kapasitas_mesin: '124,8 cc', tenaga: '8,2 kW / 8.500 rpm', torsi: '10,8 Nm / 5.000 rpm', transmisi: 'CVT Otomatis', berat: '113 kg', tinggi_jok: '769 mm', kapasitas_tengki: '5,5 L', mesin: 'eSP, PGM-FI' },
    { id_spesifikasi: 22, id_motor: 23, kapasitas_mesin: '124,8 cc', tenaga: '8,2 kW / 8.500 rpm', torsi: '10,8 Nm / 5.000 rpm', transmisi: 'CVT Otomatis', berat: '113 kg', tinggi_jok: '769 mm', kapasitas_tengki: '5,5 L', mesin: 'eSP, PGM-FI' },
    { id_spesifikasi: 23, id_motor: 24, kapasitas_mesin: '124,8 cc', tenaga: '8,2 kW / 8.500 rpm', torsi: '10,8 Nm / 5.000 rpm', transmisi: 'CVT Otomatis', berat: '112 kg', tinggi_jok: '769 mm', kapasitas_tengki: '5,5 L', mesin: 'eSP, PGM-FI' },
    { id_spesifikasi: 24, id_motor: 25, kapasitas_mesin: '156,9 cc', tenaga: '11,3 kW / 8.500 rpm', torsi: '13,8 Nm / 7.000 rpm', transmisi: 'CVT Otomatis', berat: '117 kg', tinggi_jok: '778 mm', kapasitas_tengki: '5,5 L', mesin: 'eSP+, 4 Katup, PGM-FI' },
    { id_spesifikasi: 26, id_motor: 26, kapasitas_mesin: '156,9 cc', tenaga: '11,3 kW / 8.500 rpm', torsi: '13,8 Nm / 7.000 rpm', transmisi: 'CVT Otomatis', berat: '117 kg', tinggi_jok: '778 mm', kapasitas_tengki: '5,5 L', mesin: 'eSP+, 4 Katup, PGM-FI' },
    { id_spesifikasi: 27, id_motor: 28, kapasitas_mesin: '149,16 cc', tenaga: '12,6 kW / 9.000 rpm', torsi: '14,4 Nm / 7.000 rpm', transmisi: 'Manual 6 Percepatan', berat: '139 kg', tinggi_jok: '782 mm', kapasitas_tengki: '12 L', mesin: 'DOHC, 4 Katup, PGM-FI' },
    { id_spesifikasi: 28, id_motor: 29, kapasitas_mesin: '149,16 cc', tenaga: '12,6 kW / 9.000 rpm', torsi: '14,4 Nm / 7.000 rpm', transmisi: 'Manual 6 Percepatan', berat: '137 kg', tinggi_jok: '782 mm', kapasitas_tengki: '12 L', mesin: 'DOHC, 4 Katup, PGM-FI' },
  ]);
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1');
};
