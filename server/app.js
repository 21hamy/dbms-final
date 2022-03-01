const express = require('express');
const path = require('path');
const body = require('body-parser');
//const app = express();
const mysql = require('mysql');

var fs = require('fs');
var http = require('http');
var https = require('https');
//var privateKey  = fs.readFileSync(path.resolve('server/key.pem', 'utf8'));
var privateKey  = fs.readFileSync(__dirname+'/key.pem', 'utf8');
var certificate = fs.readFileSync(__dirname+'/cert.pem', 'utf8');
var credentials = {key: privateKey, cert: certificate};
const app = express();

app.use(body());
app.use(express.static(path.resolve(__dirname, '..', 'build')));


var httpsServer = https.createServer(credentials, app);

//app.use(body());
//app.use(express.static(path.resolve(__dirname, '..', 'build')));

const db = mysql.createConnection({
    host: '10.0.0.71',
    user: 'hamu',
    password: '1234',
    database: 'dbms-final'
});
// show data
app.get('/data', function(req,res){
    console.log("Hello in /data ");
    let sql = 'SELECT u.*, TPG.Type FROM users u, typegames TPG WHERE u.FavGameType = TPG.ID_Game;';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
    console.log("after query");
});

app.get('/favgametype', function(req,res){
    console.log("Hello in /favgametype ");
    let sql = 'SELECT * FROM typegames;';
    db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.json(result);
    });
    console.log("after query");
});

//delete
app.put('/delete', function(req, res) {
    var sql = 'DELETE FROM users WHERE ID = ?';
    db.query(sql,[req.body.idkey],function (error, results) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

//edit
app.put('/data', function(req, res) {
    var sql = 'UPDATE users SET FName= ? , LName = ? , FavGameType = ? WHERE ID = ?';
    db.query(sql,[req.body.firstname,req.body.lastname,req.body.games,req.body.idkey],function (error, results) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    });
});

//insert
app.post('/data', function(req, res){
    console.log(req.body);
    let data = {
        ID:req.body.idkey,
        FName:req.body.firstname,
        LName:req.body.lastname,
        Email:req.body.email,
        FavGameType:req.body.games
    };
    let sql = 'INSERT INTO users SET ?';
    db.query(sql, data, (err, result)=>{
        if(err){
            console.log(err);
            console.log("ID is Primarykey!!!!!");
            console.log("Enter the id again..");
        }else{
            console.log(result);
        }
    });
});


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});




//module.exports = app;
module.exports = httpsServer;
