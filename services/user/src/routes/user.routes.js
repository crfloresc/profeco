const { Router } = require('express');
const UserController = require('../controllers/user.controller');
const router = Router();

router.route('/profeco/users')
  .get(UserController.findAllUsers); /* GET */

router.route('/profeco/register')
  .post(UserController.register); /* POST */

router.route('/profeco/login')
  .post(UserController.login); /* POST */

module.exports = router;
