const Wishlist = require('../models/wishlist.model');
const { info, error } = require('../helpers/Logger');

/**
 * API: GET Products on Wishlist
 * 
 * @todo: implement validation, auth req
 */
const findAllProductsOnWishlist = async (req, res, next) => {
  try {
    const auth = true;

    if (auth) {
      await Wishlist.find()
        .then((products) => {
          if (products) {
            return res.json(products)
              .status(200);
          }
          res.sendStatus(404);
        }).catch((err) => {
          throw err;
        });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    onError(res, err);
  }
};

/**
 * API: GET Product by barcode on Wishlist
 * 
 * @todo: implement validation, auth req
 */
const findProductByBarcodeOnWishlist = async (req, res, next) => {
  try {
    const { barcode } = req.params;
    const auth = true;

    if (auth) {
      await Wishlist.findOne({
        barcode: barcode
      }).then((product) => {
        if (product) {
          return res.json(product)
            .status(200);
        }
        res.sendStatus(404);
      }).catch((err) => {
        if (err.kind === 'ObjectId') {
          return res.json({
            message: 'Product not found with barcode: ' + barcode
          }).status(404);
        }
        throw err;
      });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    onError(res, err);
  }
};

/**
 * API: POST Product by barcode on Wishlist
 * 
 * @todo: implement validation, auth req
 */
const addProductOnWishlist = async (req, res, next) => {
  try {
    const auth = true;

    if (auth) {
      const product = new Product({
        barcode: req.body.barcode,
        name: req.body.name,
        description: req.body.description,
        img: req.body.img,
        stock: req.body.stock,
        price: req.body.price,
        supplier: req.body.supplier,
        available: req.body.available
      });
  
      let hasProduct = false;
  
      await Wishlist.findOne({
        barcode: req.body.barcode
      }).then((product) => {
        if (product) {
          hasProduct = true;
        }
      }).catch((err) => {
        if (err.kind !== 'ObjectId') {
          hasProduct = true;
          throw err;
        }
      });
  
      if (hasProduct) {
        res.sendStatus(404);
      } else {
        await product.save()
          .then((data) => {
            res.json(data)
              .status(200);
          }).catch((err) => {
            throw err;
          });
      }
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    onError(res, err);
  }
};

/**
 * API: POST Product by barcode on Wishlist
 * 
 * @todo: implement validation, auth req
 */
const updateProductOnWishlist = async (req, res, next) => {
  try {
    const { barcode } = req.params;
    const auth = true;

    if (auth) {
      await Wishlist.findOneAndUpdate({
        barcode: barcode
      }, {
        barcode: req.body.barcode,
        name: req.body.name,
        description: req.body.description,
        img: req.body.img,
        stock: req.body.stock,
        price: req.body.price,
        supplier: req.body.supplier,
        available: req.body.available
      }, {
        new: true
      }).then((product) => {
        if (product) {
          return res.json(product)
            .status(200);
        }
        res.sendStatus(404);
      }).catch((err) => {
        if (err.kind === 'ObjectId') {
          return res.json({
            message: 'Product not found with barcode: ' + barcode
          }).status(404);                
        }
        throw err;
      });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    onError(res, err);
  }
};

/**
 * API: DELETE Product by barcode on Wishlist
 * 
 * @todo: implement validation, auth req
 */
const deleteProductOnWishlist = async (req, res, next) => {
  try {
    const { barcode } = req.params;
    const auth = true;

    if (auth) {
      await Wishlist.findOneAndRemove({
        barcode: barcode
      }).then((product) => {
        if (product) {
          return res.sendStatus(204);
        }
        res.sendStatus(404);
      }).catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.json({
              message: 'Product not found with barcode: ' + barcode
          }).status(404);
        }
        throw err;
      });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    onError(res, err);
  }
};

const onError = (res, err) => {
  error('[routes] onError -> ' + err);
  res.json({
    'errors': {
      name: err.name,
      message: err.message
    }
  }).status(err.status || 500);
};

module.exports = {
  findAllProductsOnWishlist,
  findProductByBarcodeOnWishlist,
  addProductOnWishlist,
  updateProductOnWishlist,
  deleteProductOnWishlist
};
