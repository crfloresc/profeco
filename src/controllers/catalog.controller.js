const Product = require('../models/Product');
const { info, error } = require('../helpers/Logger');

// TODO: implement validation, auth req
const findAllProducts = async (req, res, next) => {
  try {
    await Product.find()
      .then((products) => {
        if (products) {
          return res.json(products)
            .status(200);
        }
        res.sendStatus(401);
      }).catch((err) => {
        throw err;
      });
  } catch (err) {
    onError(res, err);
  }
};

// TODO: implement validation, auth req
const findProductById = async (req, res, next) => {
  try {
    const { barcode } = req.params;

    await Post.findOne({
      barcode: barcode
    }).then((product) => {
      if (product) {
        return res.json(product)
          .status(200);
      }
      res.sendStatus(401);
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.json({
          message: 'Product not found with barcode: ' + barcode
        }).status(404);                
      }
      throw err;
    });
  } catch (err) {
    onError(res, err);
  }
};

// TODO: implement validation, auth req
const createProduct = async (req, res, next) => {
  try {
    const product = new Product({
      barcode: req.body.barcode,
      name: req.body.name,
      description: req.body.description,
      img: req.body.img,
      stock: req.body.stock,
      supplier: req.body.supplier,
      available: req.body.available
    });

    await product.save()
      .then((data) => {
        res.json(data)
          .status(200);
      }).catch((err) => {
        throw err;
      });
  } catch (err) {
    onError(res, err);
  }
};

// TODO: implement validation, auth req
const updateProduct = async (req, res, next) => {
  try {
    const { barcode } = req.params;

    await Product.findOneAndUpdate({
      barcode: barcode
    }, {
      barcode: req.body.barcode,
      name: req.body.name,
      description: req.body.description,
      img: req.body.img,
      stock: req.body.stock,
      supplier: req.body.supplier,
      available: req.body.available
    }, {
      new: true
    }).then((product) => {
      if (product) {
        return res.json(product)
          .status(200);
      }
      res.sendStatus(401);
    }).catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.json({
          message: 'Product not found with barcode: ' + barcode
        }).status(404);                
      }
      throw err;
    });
  } catch (err) {
    onError(res, err);
  }
};

// TODO: implement validation, auth req
const deleteProduct = async (req, res, next) => {
  try {
    const { barcode } = req.params;

    await Product.findOneAndRemove({
      barcode: barcode
    }).then((product) => {
      if (product) {
        return res.sendStatus(204);
      }
      res.sendStatus(401);
    }).catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.json({
            message: 'Product not found with barcode: ' + barcode
        }).status(404);
      }
      throw err;
    });
  } catch (err) {
    onError(res, err);
  }
};

const verifyItIsJson = (req, res, next) => {
  if (!req.is('json')) {
    return res.sendStatus(415);
  }
};

// const onToken = (res) => {};

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
  findAllProducts,
  findProductById,
  createProduct,
  updateProduct,
  deleteProduct
};
