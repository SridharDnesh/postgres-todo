// const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "postgres",
//   password: "crayond@123",
//   host: "localhost",
//   port: 5432,
//   database: "perntodo",
// });

// module.exports = pool;

const knex = require("knex")({
  client: "pg",
  connection: {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "crayond@123",
    database: "perntodo",
  },
});

module.exports = knex;
