const path = require('path');

const connection = {
  host: 'localhost',
  user: 'root',
  password: '',
  port: 3306,
};

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      ...connection,
      database: 'dealer_motor',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.resolve(__dirname, 'migrations'),
    },
    seeds: {
      directory: path.resolve(__dirname, 'seeds'),
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
