#! /usr/bin/env node

var express = require('express');
var http = require('http');
var app = module.exports = express();
var server = http.createServer(app);
var bodyParser = require('body-parser');
var logger = require('morgan');
var config = require('config');

app.set('env', config.env);
app.set('port', config.port);
app.use(express.static(config.staticBase));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger(config.loggerOptions));

require('./routes')(app);

if (!module.parent) {
  var port = app.get('port');
  server.listen(port, function() {
    console.log('Server listening on port', port);
  });
}
