const { Router } = require('express');
const ReviewController = require('../controllers/review.controller');
const router = Router();

router.route('/review/producto/debug')
  .get(ReviewController.findAllReviews) /* GET ALL */

router.route('/review/producto') 
  .get(ReviewController.findReviewsByUser) /* GET */
  .post(ReviewController.createReview); /* POST */

router.route('/review/producto/:idProduct')
  .get(ReviewController.findReviewsByProduct) /* GET */
  .put(ReviewController.updateReview) /* PUT */
  .delete(ReviewController.deleteReview); /* DELETE */

module.exports = router;
