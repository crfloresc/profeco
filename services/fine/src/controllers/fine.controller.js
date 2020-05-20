const Fine = require('../models/fine.model');
const { error } = require('../helpers/logger');

const findAllFines = async (req, res, next) => {
  const auth = true;

  try {
    if (auth) {
      await Fine.find()
        .then((fines) => {
          if (!fines) {
            res.statusCode = 404;
            return next();
          }
          res.result = fines;
          next();
        }).catch((err) => {
          throw err;
        });
    } else {
      res.statusCode = 401;
      next();
    }
  } catch (err) {
    res.error = err;
    next();
  }
};

const createFine = async (req, res, next) => {
  const {
    cause,
    idUser
  } = req.body;
  const auth = true;

  try {
    if (auth) {
      const fine = new Inconsistency({
        cause: cause,
        idUser: idUser
      });
  
      await fine.save()
        .then((fine) => {
          res.result = fine;
          next();
        }).catch((err) => {
          throw err;
        });
    } else {
      res.statusCode = 401;
      next();
    }
  } catch (err) {
    res.error = err;
    next();
  }
};

module.exports = {
  findAllFines,
  createFine
};
