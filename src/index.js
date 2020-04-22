const express = require('express');
const { info, error } = require('./helpers/Logger');
const morgan = require('morgan');
const app = express();

// Settings
app.set('port', process.env.SERVER_PORT || 8080);

// Middlewares
app.use(morgan('dev'));
app.use(express.json(/*{ limit: '300kb' }*/));
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('api/v1', require('./routes/catalog.routes'));

// Run
app.listen(app.get('port'), () => {
  info('[server] app listening on '+ app.get('port'));
}).on('close', () => {
  info('[server] app stopped');
}).on('error', (err) => {
  error('[server] app error ' + err.message)
});
