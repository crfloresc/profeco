const express = require('express');

const config = require('./config/index');
const { info } = require('./helpers/logger');

// Settings
const app = express();
app.set('port', config.client.port);

// Middlewares
app.use(express.static('smartedu'))

// Run
app.listen(app.get('port'), () => {
  info('[client] app listening on '+ app.get('port'));
}).on('close', () => {
  info('[client] app stopped');
}).on('error', (err) => {
  error('[client] app error ' + err.message)
});
