const express = require('express');

const config = require('./config/index');
const { info } = require('./helpers/logger');

// Settings
const app = express();
app.set('port', config.client.port);

// Middlewares
app.use(express.static(__dirname + '/smartedu'));

// Routes
app.get('/',function(req,res) {
  res.sendFile(__dirname + '/smartedu/index.html');
});
app.get('/login',function(req,res) {
  res.sendFile(__dirname + '/smartedu/login.html');
});
app.get('/about',function(req,res) {
  res.sendFile(__dirname + '/smartedu/about.html');
});
app.get('/contact',function(req,res) {
  res.sendFile(__dirname + '/smartedu/contact.html');
});

// Run
app.listen(app.get('port'), () => {
  info('[client] app listening on '+ app.get('port'));
}).on('close', () => {
  info('[client] app stopped');
}).on('error', (err) => {
  error('[client] app error ' + err.message)
});
