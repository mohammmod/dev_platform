const service = require('./service')


const Pool = require('pg').Pool;
const pool = new Pool({
	user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'root',
    port: 5432,
});


function getAllBatches(callback) {
  pool.query('SELECT batch_tag.batch_tag, exposure.exposure_key FROM batch_tag INNER JOIN exposure ON batch_tag.batch_tag=exposure.batch_tag', (error, results) => {
    
      if (error) {
        throw error
      }
      console.log("query is called " );
      console.log(results.rows);
      callback(null, results.rows);
    });
  }

 
  function getBatch(batch_name , callback) {
    console.log('this is from query', batch_name);

    var q = service.insert("SELECT batch_tag.batch_tag, exposure.exposure_key FROM batch_tag INNER JOIN exposure ON batch_tag.batch_tag=exposure.batch_tag WHERE batch_tag.batch_tag = ''",156,batch_name) ;
    console.log('this is the query', q);
    pool.query( q , (error, results) => {
      
        if (error) {
          throw error
        }
        console.log("query is called " );
        console.log(results.rows);
        callback(null, results.rows);
      });
    }

  function insertKeys(keysNumber, flag,days){
    console.log('this is query function',keysNumber, flag,days)
    var datetime = new Date();

    var q = "INSERT INTO batch_tag (batch_tag, batch_tag_date,next_batch_tag) VALUES ?";
    var values = [];
    for ( i = 1 ;i<=days ; i++ ){
      values.push([service.insert(datetime,10,"-"+ i),datetime, service.insert(datetime,10,"-"+ (i +1))]);
    }
    console.log('this is the value',values)
    pool.query( q , [values], (error, results) => {
        if (error) {
          throw error
        }
        console.log("query is called " );
        console.log(results.rows);

      });
    }

  

module.exports = {
  getAllBatches,
  getBatch
}