const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit: 10, 
  host: "bm5ti3vvn8a2gwmr5jk6-mysql.services.clever-cloud.com",
  user: "u5bkkjsqymseel7w",
  password: "72RPAbYvT70wlnwkJQS5",
  database: "bm5ti3vvn8a2gwmr5jk6"
});
module.exports = pool;
