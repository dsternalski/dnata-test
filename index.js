// This code calls for the relevant instalations.
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var fetch = require('node-fetch');
var request = require('request');

// Set up express app
var app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// Error handling middleweare.
app.use(function(err, req, res, next){
    res.status(422).send({error:err.message});
});

// Listen for requests
app.listen(process.env.port || 5000, function(){
    console.log("Now listening for requests");
});
