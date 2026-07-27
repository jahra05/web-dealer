/**
 * Seed: faq — data pertanyaan & jawaban FAQ
 */
exports.seed = async function (knex) {
  await knex.raw('SET FOREIGN_KEY_CHECKS = 0');
  await knex('faq').del();
  await knex('faq').insert([
    {
      id_faq: 2,
      pertanyaan: 'Apa saja pilihan jangka waktu (tenor) cicilan yang tersedia?',
      jawaban: 'Kami menyediakan pilihan tenor yang bervariasi, mulai dari 11 bulan, 17 bulan, 23 bulan, hingga 35 bulan sesuai dengan kebijakan leasing yang bekerja sama dengan kami.',
    },
    {
      id_faq: 3,
      pertanyaan: 'Bagaimana cara melakukan simulasi kredit motor di website ini?',
      jawaban: 'Kamu cukup memilih unit motor yang diinginkan, kemudian masuk ke fitur "Simulasi Kredit". Pilih jumlah Uang Muka (DP) yang diinginkan dan pilih jangka waktu cicilan (tenor). Sistem akan otomatis menghitung perkiraan angsuran per bulan secara real-time.',
    },
    {
      id_faq: 4,
      pertanyaan: 'Bagaimana jika saya ingin mengajukan kredit setelah melakukan simulasi?',
      jawaban: 'Kamu bisa langsung menekan tombol "Ajukan Kredit" atau "Hubungi Sales" yang tertera di halaman detail motor untuk terhubung langsung dengan tim admin kami.',
    },
    {
      id_faq: 5,
      pertanyaan: 'Apakah hasil simulasi kredit di website ini sudah pasti akurat',
      jawaban: 'Nilai simulasi yang tertera merupakan estimasi atau perkiraan awal menggunakan perhitungan standar. Nilai resmi, suku bunga terbaru, dan biaya admin final akan dikonfirmasi kembali oleh pihak dealer dan leasing saat pengajuan resmi diproses.',
    },
    {
      id_faq: 6,
      pertanyaan: 'Berapa minimal Uang Muka (DP) yang bisa saya pilih?',
      jawaban: 'Batas minimal dan maksimal DP dihitung berdasarkan persentase harga motor yang dipilih (umumnya mulai dari 10% dari harga OTR motor).',
    },
  ]);
  await knex.raw('SET FOREIGN_KEY_CHECKS = 1');
};
