const { Router } = require('express');
const WishlistController = require('../controllers/wishlist.controller');
const router = Router();

router.route('/usuario/wishlist') 
  .get(WishlistController.findAllWishlist) /* GET ALL */
  .post(WishlistController.createWishlist); /* POST */

router.route('/usuario/wishlist/:idUser') 
  .get(WishlistController.findAllWishlistByUser) /* GET */

router.route('/usuario/wishlist/:idWishlist')
  .put(WishlistController.updateWishlist) /* PUT */
  .delete(WishlistController.deleteWishlist); /* DELETE */

module.exports = router;
