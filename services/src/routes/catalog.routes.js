const { Router } = require('express');
const { verifyToken } = require('../middleware/tokens');
const ProductController = require('../controllers/catalog.controller');
const router = Router();

router.route('/catalogo/producto', verifyToken) 
  .get(ProductController.findAllProducts) /* GET ALL */
  .post(ProductController.createProduct); /* POST */

router.route('/catalogo/producto/:barcode')
  .get(ProductController.findProductById) /* GET */
  .put(ProductController.updateProduct) /* PUT */
  .delete(ProductController.deleteProduct); /* DELETE */

module.exports = router;