const { Router } = require('express');
const WishlistController = require('../controllers/wishlist.controller');
const router = Router();

router.route('/profeco/usuario/wishlist') 
  .get(WishlistController.findAllWishlist) /* GET ALL */
  .post(WishlistController.createWishlist); /* POST */

router.route('/profeco/usuario/wishlist/:idUser') 
  .get(WishlistController.findAllWishlistByUser) /* GET */

router.route('/profeco/usuario/wishlist/:idWishlist')
  .put(WishlistController.updateWishlist) /* PUT */
  .delete(WishlistController.deleteWishlist); /* DELETE */

module.exports = router;
