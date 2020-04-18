const mongoose = require('mongoose');
const chalk = require('chalk');

const optionsdb = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const uri = process.env.MONGOLAB_URI || 'mongodb://admin:pass1234@ds161890.mlab.com:61890/profeco';

mongoose.connect(uri, optionsdb);
// mongoose.set('debug', true);

mongoose.connection.on('connected', () => {
  console.info(chalk.green('[database] connected'));
}).on('error', (err) => {
  console.error(chalk.red(`[database] error ${err.message}`));
  process.exit();
});

const connect = () => {
  mongoose.connect(uri, optionsdb);
};

const disconnect = () => {
  mongoose.disconnect();
};

const drop = () => {
  mongoose.connection.dropDatabase();
};

module.exports = mongoose;
