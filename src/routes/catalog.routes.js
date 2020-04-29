const { Router } = require('express');
const ProductController = require('../controllers/catalog.controller');
const router = Router();

router.route('/catalogo/producto') 
  .get(ProductController.findAllProducts) /* GET ALL */
  .post(ProductController.createProduct); /* POST */

router.route('/catalogo/producto/:id')
  .get(ProductController.findProductById) /* GET */
  .put(ProductController.updateProduct) /* PUT */
  .delete(ProductController.deleteProduct); /* DELETE */

module.exports = router;
