const Product = require('../models/Product');
const { info, error } = require('../helpers/Logger');

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
      throw err;
    });
  } catch (err) {
    onError(res, err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = new Product({
      barcode: req.body.barcode,
      name: req.body.name,
      description: req.body.description,
      img: req.body.img,
      stock: req.body.stock,
      company: req.body.company,
      available: req.body.available
    });

    await product.save()
      .then(() => {
        //
      }).catch((err) => {
        throw err;
      });
  } catch (err) {
    onError(res, err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { barcode } = req.params;
  } catch (err) {
    onError(res, err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { barcode } = req.params;
    await Product.deleteOne({
      barcode: barcode
    }).then(() => {
      res.sendStatus(204);
    }).catch((err) => {
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
