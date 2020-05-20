const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');

require('./middleware/broker.amqp');
const config = require('./config/index');
// const { configJwtStrategy } = require('./middleware/cfpassport');
const { info, error } = require('./helpers/logger');
const { onSuccessEmptiness, onSuccess, onError } = require('./helpers/response');

// Settings
const app = express();
app.set('port', config.server.port);

// Middlewares
// passport.use(configJwtStrategy);
app.use(express.json(/*{ limit: '300kb' }*/));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());

/**
 * Routes
 * - Use to prevent GET /favicon.ico
 * - Use catalog route API
 * - Use to catch res
 */
app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/api/v1', require('./routes/catalog.routes'));
app.use(onSuccessEmptiness);
app.use(onSuccess);
app.use(onError);

// Run
app.listen(app.get('port'), () => {
  info('[server] app service catalog listening on '+ app.get('port'));
}).on('close', () => {
  info('[server] app service catalog stopped');
}).on('error', (err) => {
  error('[server] app service catalog error ' + err.message)
});
