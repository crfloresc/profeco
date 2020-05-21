const Inconsistency = require('../models/inconsistency.model');
const { publish } = require('../middleware/broker.amqp');
const { error } = require('../helpers/logger');

const findAllInconsistencies = async (req, res, next) => {
  const auth = true;

  try {
    if (auth) {
      await Inconsistency.find()
        .then((inconsistencies) => {
          if (!inconsistencies) {
            res.statusCode = 404;
            return next();
          }
          res.result = inconsistencies;
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

const createInconsistency = async (req, res, next) => {
  const {
    cause,
    idProduct,
    idUser
  } = req.body;
  const auth = req.body.user;
  console.log(req.body);

  try {
    if (auth) {
      const inconsistency = new Inconsistency({
        cause: cause,
        idProduct: idProduct,
        idUser: idUser
      });
  
      await inconsistency.save()
        .then((inconsistency) => {
          publish(idUser);
          res.result = inconsistency;
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
  findAllInconsistencies,
  createInconsistency
};
