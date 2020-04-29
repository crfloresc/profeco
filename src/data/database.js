const mongoose = require('mongoose');
const { info, error } = require('../helpers/Logger');

const optionsdb = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
};

const uri = process.env.MONGOLAB_URI || 'mongodb://admin:pass1234@ds161890.mlab.com:61890/profeco';

mongoose.connect(uri, optionsdb);

mongoose.connection.on('connected', () => {
  info('[database] connected');
}).on('error', (err) => {
  error(`[database] error ${err.message}`);
  process.exit();
});

module.exports = mongoose;
