const User = require('../models/user.model');
const { generateToken } = require('../middleware/tokens');
const { info, error } = require('../helpers/logger');

const findAllUsers = async (req, res, next) => {
  try {
    await User.find()
      .exec()
      .then((products) => {
        if (products) {
          return res.json(products)
            .status(200);
        }
        res.sendStatus(404);
      }).catch((err) => {
        throw err;
      });
  } catch (err) {
    onError(res, err);
  }
};

/**
 * API: POST Register new user
 * 
 * @todo: implement next catch
 * @todo: search better implementation on check if exist user
 */
const register = async (req, res, next) => {
  try {
    const { email, rol, password } = req.body;

    if (email && rol && password) {
      const userEmailExists = await User.findOne({
        email: email
      });

      if (userEmailExists) {
        return res.json({
          success: false,
          msg: 'Email already exists'
        }).status(400);
      }

      const user = new User({
        email: email,
        rol: rol,
        password: password
      });

      await user.save()
        .then((data) => {
          let foo = {
            success: true,
            msg: 'Successful created new user'
          };
          res.json(data)
            .status(200);
        }).catch((err) => {
          throw err;
        });
    } else {
      res.json({
        success: false,
        msg: 'Please pass all info of user'
      }).status(400);
    }
  } catch (err) {
    onError(res, err);
  }
};

/**
 * API: GET Log-in user
 * 
 * @todo: implement next catch
 */
const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    await User.findOne({
      email: email
    }).then((user) => {
      if (!user) {
        return res.json({
          success: false,
          msg: 'Authentication failed'
        }).status(401);
      }

      user.comparePassword(password, (err, isMatch) => {
        if (isMatch && !err) {
          const token = generateToken(res, email);

          res.json({
            success: true,
            token: 'JWT ' + req.cookies['token']
          }).status(200);
        } else {
          res.json({
            success: false,
            msg: 'Authentication failed. Something wrong'
          }).status(401);
        }
      });
    }).catch((err) => {
      throw err;
    });
  } catch (err) {
    onError(res, err);
  }
};

const onError = (res, err) => {
  error('[routes] onError -> ' + err);
  res.json({
    'errors': {
      name: err.name,
      message: err.message
    }
  }).status(err.status || 500);
};

module.exports = {
  findAllUsers,
  login,
  register
};
