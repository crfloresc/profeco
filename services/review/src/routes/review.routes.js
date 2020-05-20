const { Router } = require('express');
const ReviewController = require('../controllers/review.controller');
const router = Router();

router.route('/review/producto') 
  .get(ReviewController.findAllReviews) /* GET */
  .post(ReviewController.createReview); /* POST */

router.route('/review/producto/:idUser') 
  .get(ReviewController.findReviewsByUser) /* GET */

router.route('/review/producto/:idProduct')
  .get(ReviewController.findReviewsByProduct) /* GET */
  .put(ReviewController.updateReview) /* PUT */
  .delete(ReviewController.deleteReview); /* DELETE */

module.exports = router;
