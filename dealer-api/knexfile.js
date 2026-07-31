const path = require("path");
require("dotenv").config();

const connection = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      ...connection,
      database: process.env.DB_NAME,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: path.resolve(__dirname, "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "seeds"),
    },
  },


  test: {
    client: 'mysql2',
    connection: {
      ...connection,
      database: 'dealer_motor_test',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.resolve(__dirname, 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'seeds'),
    },
  },
};
