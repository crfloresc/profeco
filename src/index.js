const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');

require('./middleware/broker.amqp');
const config = require('./config/index');
const { profiler } = require('./middleware/profiler');
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
app.use(profiler);

/**
 * Routes
 * - Use to prevent GET /favicon.ico
 * - Use auth route API
 * - Use catalog route API
 * - Use review route API
 */
app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/api/v1', require('./routes/auth.routes'));
app.use('/api/v1', require('./routes/catalog.routes'));
app.use('/api/v1', require('./routes/review.routes'));

// Run
app.listen(app.get('port'), () => {
  info('[server] app listening on '+ app.get('port'));
}).on('close', () => {
  info('[server] app stopped');
}).on('error', (err) => {
  error('[server] app error ' + err.message)
});
