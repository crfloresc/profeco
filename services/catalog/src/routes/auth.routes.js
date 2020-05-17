const { Router } = require('express');
const AuthController = require('../controllers/auth.controller');
const verifyToken = require('../middleware/tokens');
const router = Router();

router.route('/users')
  .get(AuthController.findAllUsers);

router.route('/register')
  .post(AuthController.register); /* POST */

router.route('/login')
  .post(AuthController.login); /* POST */

module.exports = router;
