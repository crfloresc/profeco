const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const { info, error } = require('./helpers/Logger');

// Settings
const app = express();
app.set('port', process.env.SERVER_PORT || 3002);

// Middlewares
app.use(express.json(/*{ limit: '300kb' }*/));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

// Routes
// - Prevent GET /favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/api/v1', require('./routes/catalog.routes'));

// Run
app.listen(app.get('port'), () => {
  info('[server] app listening on '+ app.get('port'));
}).on('close', () => {
  info('[server] app stopped');
}).on('error', (err) => {
  error('[server] app error ' + err.message)
});
