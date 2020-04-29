const chalk = require('chalk');

class Logger {
  info(msg) {
    console.info(chalk.green(msg));
  }
  error(msg) {
    console.error(chalk.red(msg));
  }
};

const info = (...msg) => {
  console.info(
    chalk.green(msg)
  );
};

const error = (...msg) => {
  console.error(
    chalk.red(msg)
  );
};

module.exports = {
  info,
  error
};
