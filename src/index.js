const cors = require('cors');
const express = require('express');
const morgan = require('morgan');
const passport = require('passport');

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

// Routes
// - Prevent GET /favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/api/v1', require('./routes/auth.routes'));
app.use('/api/v1', require('./routes/catalog.routes'));
app.use('/api/v1', require('./routes/review.routes'));
app.use(express.static('smartedu'))

// Run
app.listen(app.get('port'), () => {
  info('[server] app listening on '+ app.get('port'));
}).on('close', () => {
  info('[server] app stopped');
}).on('error', (err) => {
  error('[server] app error ' + err.message)
});
