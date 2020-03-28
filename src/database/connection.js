const knex = require('knex');
const configurations = require('../../knexfile');

const config = process.env.NODE_ENV === 'test' ? configurations.test : configurations.production;

const connection = knex(config);

module.exports = connection;