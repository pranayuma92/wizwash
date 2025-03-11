// Update with your config settings.
const dotenv = require('dotenv');

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
dotenv.config();
module.exports = {

  development: {
    // client: "mysql",
    // connection: {
    //   host: process.env.DB_HOST,
    //   port: Number(process.env.DB_PORT),
    //   user: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    // }
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
    // searchPath: ['knex', 'public'],
  },

  staging: {
    // client: "mysql",
    // connection: {
    //   host: process.env.DB_HOST,
    //   port: Number(process.env.DB_PORT),
    //   user: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    // },
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    // migrations: {
    //   tableName: 'knex_migrations'
    // }
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
  },

  production: {
    // client: "mysql",
    // connection: {
    //   host: process.env.DB_HOST,
    //   port: Number(process.env.DB_PORT),
    //   user: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    // },
    // pool: {
    //   min: 2,
    //   max: 10
    // },
    // migrations: {
    //   tableName: 'knex_migrations'
    // }
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,
  }

};
