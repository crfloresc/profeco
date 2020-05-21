const { Router } = require('express');
const InconsistencyController = require('../controllers/inconsistency.controller');
const router = Router();

router.route('/profeco/reportar/inconsistencia')
  .get(InconsistencyController.findAllInconsistencies) /* GET ALL */
  .post(InconsistencyController.createInconsistency); /* GET */

module.exports = router;
