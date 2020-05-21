const { Router } = require('express');
const CatalogController = require('../controllers/catalog.controller');
const router = Router();

// by market
router.route('/profeco/catalogo/producto/:idUser')
  .get(CatalogController.findProductsByUser); /* GET */

router.route('/profeco/catalogo/producto/:idProduct')
  .get(CatalogController.findProductById); /* GET */

router.route('/profeco/catalogo/producto') 
  .get(CatalogController.findAllProducts) /* GET ALL */
  .post(CatalogController.createProduct); /* POST */

router.route('/profeco/catalogo/producto/:barcode')
  .get(CatalogController.findProductByBarcode) /* GET */
  .put(CatalogController.updateProduct) /* PUT */
  .delete(CatalogController.deleteProduct); /* DELETE */

module.exports = router;
