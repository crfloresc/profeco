const express = require('express');
const chalk = require('chalk');
const morgan = require('morgan');
const app = express();

// Settings
app.set('port', process.env.SERVER_PORT || 8080);

// Middlewares
app.use(morgan('dev'));
app.use(express.json({ limit: '300kb' }));
app.use(express.urlencoded({ extended: false }));

// Routes
// app.use('api/v1', require('routes/'));

// Run
app.listen(app.get('port'), () => {
  console.info(chalk.green('[server] app listening on', app.get('port')));
}).on('close', () => {
  console.info(chalk.green('[server] app stopped'));
}).on('error', (err) => {
  console.error(chalk.red('[server] app error'), err.message)
});
