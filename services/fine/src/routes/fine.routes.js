const { Router } = require('express');
const FineController = require('../controllers/fine.controller');
const router = Router();

router.route('/profeco/multas')
  .get(FineController.findAllFines) /* GET ALL */
  .post(FineController.createFine); /* GET */

module.exports = router;
