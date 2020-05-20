const { Router } = require('express');
const CatalogController = require('../controllers/catalog.controller');
const router = Router();

router.route('/catalogo/producto/:idUser')
  .get(CatalogController.findProductsByUser); /* GET */

router.route('/catalogo/producto') 
  .get(CatalogController.findAllProducts) /* GET ALL */
  .post(CatalogController.createProduct); /* POST */

router.route('/catalogo/producto/:barcode')
  .get(CatalogController.findProductById) /* GET */
  .put(CatalogController.updateProduct) /* PUT */
  .delete(CatalogController.deleteProduct); /* DELETE */

module.exports = router;
