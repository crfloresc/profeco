const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');

require('./middleware/broker.amqp');
const config = require('./config/index');
const { info, error } = require('./helpers/logger');

// Settings
const app = express();
app.set('port', config.server.port);

// Middlewares
app.use(express.json(/*{ limit: '300kb' }*/));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());
app.use(passport.initialize());

/**
 * Routes
 * - Use to prevent GET /favicon.ico
 * - Use user route API
 */
app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/api/v1', require('./routes/user.routes'));

// Run
app.listen(app.get('port'), () => {
  info('[server] app service user listening on '+ app.get('port'));
}).on('close', () => {
  info('[server] app service user stopped');
}).on('error', (err) => {
  error('[server] app service user error ' + err.message)
});
