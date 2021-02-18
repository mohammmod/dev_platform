const { table } = require('console');
const express = require('express');
const { connect } = require('http2');
const path = require('path');
const db = require('./queries')

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

app.get('/', function (req, res) {
  res.render('index.pug', { title: 'Hey', message: 'Hello there!' });
});

app.get('/download', function (req, res) {
  console.log("we got somethin");
  console.log ("we are clicked")
  console.log(req.params.id);
  db.getUsers(function(err, result){
    
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
//app.get('/getUsers', db.getUsers);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});