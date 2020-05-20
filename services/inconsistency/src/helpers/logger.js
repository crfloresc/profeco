const chalk = require('chalk');


const info = (...msg) => {
  console.info(
    chalk.green(msg)
  );
};

const attach = (...msg) => {
  console.info(
    chalk.blue(msg)
  );
};

const error = (...msg) => {
  console.error(
    chalk.red(msg)
  );
};

module.exports = {
  info,
  attach,
  error
};
