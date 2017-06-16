const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

var db = require('./models/db.js');

var user = require('./routes/user.js');

const jwtSecret = 'kjwdjs65$khikjl65nkajn';

const app = express();

//Port Number
app.port = 3000;

//Middlewares - bodyparser & cors
app.use(bodyParser.json());
app.use(cors());

//app.use('/login', expressJwt({ secret: jwtSecret }));

//Home Page Route
app.get("/", function(req, res){
	res.sendfile(__dirname + '/client/views/index.html');
});

app.post('/signup',user.signup);
app.post('/login',user.login, function(req,res){
    var token = jwt.sign({username: req.body.username}, jwtSecret);
    res.status(200).send({token: token, username: req.body.username, highscore: req.body.highscore});
});
app.put("/setHighScore", user.updateHighScore);

app.use("/views", express.static(__dirname + "/client/views"));
app.use("/assets", express.static(__dirname + "/client/assets"));
app.use("/css", express.static(__dirname + "/client/css"));
app.use("/js", express.static(__dirname + "/client/js"));

//Start Server
app.listen(app.port, function(){
	console.log("Server Started on Port Number: " + app.port);
});