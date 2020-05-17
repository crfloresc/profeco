const mongoose = require('mongoose');

const config = require('../config/index');
const { info, error } = require('../helpers/logger');

const uri = config.db.uri;
const optionsdb = config.db.options;

mongoose.connect(uri, optionsdb);

mongoose.connection.on('connected', () => {
  info('[database] connected');
}).on('error', (err) => {
  error(`[database] error ${err.message}`);
  process.exit();
});

module.exports = mongoose;
