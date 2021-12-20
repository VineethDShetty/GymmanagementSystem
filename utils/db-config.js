//Pool of all the athrev-ed db accesses
console.log("inside dg - config 1");
const { Pool } = require("pg");

 const config = {
     host: 'localhost',
     port: '5432',
     database: 'gymsystem',
     user: 'postgres',
     password: 'vini@111'
 };
 const pool = new Pool(config);
// const config = 'postgres://ybshmlwkgrmsci:2f1f67893e7bd281195705ab704cd94d16f1d30105253e0c632bb4204d53e979@ec2-34-225-103-117.compute-1.amazonaws.com:5432/d1l16o2ki9mj47';
// const pool = new Pool({ connectionString: config, ssl: { rejectUnauthorized: false } });
module.exports = pool;