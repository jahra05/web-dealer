const { title } = require("framer-motion/client");

exports.seed = async function (knex) {
  await knex("footer").del();

  await knex("footer").insert([
    {
      nama_dealer: "Daya Motor",
      logo: "logo.png",
      deskripsi: "Dealer resmi Honda",
      title: 'Title Singkat',
      email: "info@dayamotor.com",
      no_hp: "08123456789",
      whatsapp: "087769084385",
      alamat: "Cianjur",
      google_maps: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126906.96349544464!2d106.7724285741699!3d-6.284411135451996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f2197678ad3d%3A0x103632997864c015!2sSouth%20Jakarta%2C%20South%20Jakarta%20City%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1718615000000!5m2!1sen!2sid",
      instagram: "https://www.instagram.com/jhra.05/",
      facebook: "https://www.instagram.com/jhra.05/",
      tiktok: "https://www.instagram.com/jhra.05/",
      youtube: "https://www.instagram.com/jhra.05/",
      jam_senin_jumat: "08:00 - 17:00",
      jam_sabtu: "08:00 - 15:00",
    },
  ]);
};