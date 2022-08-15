
var express = require('express');
var mysql = require("mysql");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tesst"
});

con.connect();

var app = express();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/',function(req,res){
  return res.sendFile(__dirname+"/"+"index.html");
});

app.get('/list', function (req, res){
  con.query('select * from user', function(error,results,fields){
    if (error) throw error;
    return res.send(results);
  });
});

app.post('/create', function (req, res) {
  console.log(req.body);
  console.log(req.body.name);
  // var name = req.body.name;
  //  con.query("Insert into user (name,address,phone) values ('a','b','c')",function(error,results){
  //   if (error) throw error;
  //   console.log(name);
  //   return res.sendFile(__dirname+"/"+"index.html");
  // });
});

app.listen(8081)