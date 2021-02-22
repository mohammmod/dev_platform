const express = require('express');
const path = require('path');
const db = require('./queries')

const bodyParsar = require('body-parser');
const { response } = require('express');

const app = express()


const hostname = '127.0.0.1';
const port = 3000;

/*const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});*/

app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.use(bodyParsar.urlencoded({extended: true}));

app.get('/form-with-get',function (req,res){
  return response.rander('upload.pug');
});

app.get('/downloadbatch',function (req,res){
  console.log('this is the downloaded batch ',req.query);
  const valueSelected = req.query.dropDown;
  if (valueSelected ==='0'){
    db.getAllBatches(function(err, result){
    
      if (err){
        throw err;
      }
      res.render('table_download.pug', { batchtags: result });  
    });
  }else{
    db.getBatch(req.query.dropDown,function(err, result){
      if (err){
        throw err;
      }
      res.render('table_download.pug', { batchtags: result });  
    });
  }
  
  
});

app.get('/', function (req, res) {
  res.render('index.pug');
});

app.get('/download', function (req, res) {

  db.getAllBatches(function(err, result){
    
    if (err){
      throw err;
    }
    res.render('download.pug', { batchtags: result });  
  });
  


});

app.get('/upload',function (req, res) {
  keyyy  = []
  for ( i = 1 ;i<=100 ; i++ ){
    keyyy.push(i);
  }
  dayys  = []
  for ( i = 1 ;i<=14 ; i++ ){
    dayys.push(i);
  }
  res.render('upload.pug',{keys : keyyy, days:dayys});  
});

app.get('/uploaded',function (req, res) {

  console.log('this is the downloaded batch ',req.query);

  

});



app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});