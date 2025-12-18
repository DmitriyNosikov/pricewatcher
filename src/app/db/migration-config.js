// https://ajibaddemotiv.hashnode.dev/mastering-sequelize-migrations-and-seeders-in-node-js

/* eslint-disable no-undef */
require('dotenv').config({
  path: process.env.NODE_ENV
    ? `.env.${process.env.NODE_ENV}`
    : '.env.dev'
});

module.exports = {
  dev: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    host: process.env.POSTGRES_URL,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
  prod: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB_NAME,
    host: process.env.POSTGRES_URL,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true,
    },
  },
};