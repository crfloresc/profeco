const Product = require('../models/Product');

const findAllProducts = async (req, res, next) => {
  try {
    await Product.find()
      .then((result) => {
        if (result) {
          return res.json(result)
            .status(200);
        }
        res.sendStatus(401);
      })
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    // onError(res, err);
  }
};

const findProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Post.findOne({ _id: id });
  } catch (err) {
    // onError(res, err);
  }
};

const createProduct = async (req, res, next) => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      img: req.body.img,
      stock: req.body.stock,
      company: req.body.company,
      available: req.body.available
    });

    await product.save();
  } catch (err) {
    // onError(res, err);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    //
  } catch (err) {
    // onError(res, err);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    await Post.deleteOne({ _id: req.params.id });
    res.sendStatus(204);
  } catch (err) {
    // onError(res, err);
  }
};

const verifyItIsJson = (req, res, next) => {
  if (!req.is('json')) {
    return res.sendStatus(415);
  }
};

const onError = (res, err) => {
  error('[routes] onError -> ' + err);
  res.json({
    'errors': {
      message: err.message,
      error: err
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
