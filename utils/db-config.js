//Pool of all the athrev-ed db accesses
console.log("inside dg - config 1");
const { Pool } = require("pg");


const config = process.env.database_link;
const pool = new Pool({ connectionString: config, ssl: { rejectUnauthorized: false } });
module.exports = pool;