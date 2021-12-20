//Pool of all the athrev-ed db accesses
console.log("inside dg - config 1");
const { Pool } = require("pg");

//  const config = {
//      host: 'localhost',
//      port: '5432',
//      database: 'gymsystem',
//      user: 'postgres',
//      password: 'vini@111'
//  };
//  const pool = new Pool(config);
const config = 'postgres://ajnklpaosxgpyt:e40f4d26dc37af10200377eafc0fc9b31ecde798234e8668bd8b3714ce3bc4e6@ec2-34-240-75-196.eu-west-1.compute.amazonaws.com:5432/d9ptcdf2fbon2t';
const pool = new Pool({ connectionString: config, ssl: { rejectUnauthorized: false } });
module.exports = pool;