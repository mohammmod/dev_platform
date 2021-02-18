const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
});

function getUsers(callback) {
  pool.query('SELECT batch_tag.batch_tag, exposure.exposure_key FROM batch_tag INNER JOIN exposure ON batch_tag.batch_tag=exposure.batch_tag', (error, results) => {
    
      if (error) {
        throw error
      }
      console.log("query is called " );
      console.log(results.rows);
      callback(null, results.rows);
    });
  }

module.exports = {
  getUsers
}