const knex = require('knex')({
  client: 'pg',
  connection: 'postgresql://localhost:5432/my_manga_library_database',
});

module.exports = knex;
