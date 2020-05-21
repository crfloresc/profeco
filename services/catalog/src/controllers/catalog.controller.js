const Product = require('../models/product.model');
const { error } = require('../helpers/logger');

/**
 * API: GET Products
 * 
 * @todo: implement validation on catch error
 */
const findAllProducts = async (req, res, next) => {
  const auth = req.body.user;

  try {
    if (auth) {
      await Product.find()
        .then((products) => {
          if (!products) {
            res.statusCode = 404;
            return next();
          }
          res.result = products;
          next();
        }).catch((err) => {
          throw err;
        });
    } else {
      res.statusCode = 401;
      next();
    }
  } catch (err) {
    res.error = err;
    next();
  }
};

const findProductsByUser = async (req, res, next) => {
  const { idUser } = req.params;
  const auth = req.body.user;

  try {
    if (auth) {
      await Product.find({
        idUser: idUser
      }).then((products) => {
        if (!products) {
          res.statusCode = 404;
          return next();
        }
        res.result = products;
        next();
      }).catch((err) => {
        throw err;
      });
    } else {
      res.statusCode = 401;
      next();
    }
  } catch (err) {
    res.error = err;
    next();
  }
};

const findProductById = async (req, res, next) => {
  try {
    const { idProduct } = req.params;
    const auth = req.body.user;

    if (auth) {
      await Product.findOne({
        _id: idProduct
      }).then((product) => {
        if (!product) {
          res.statusCode = 404;
          return next();
        }
        res.result = product;
        next();
      }).catch((err) => {
        throw err;
      });
    } else {
      res.statusCode = 401;
      next();
    }
  } catch (err) {
    res.error = err;
    next();
  }
};

const findProductByBarcode = async (req, res, next) => {
  try {
    const { barcode } = req.params;
    const auth = req.body.user;

    if (auth) {
      await Product.findOne({
        barcode: barcode
      }).then((product) => {
        if (!product) {
          res.statusCode = 404;
          return next();
        }
        res.result = product;
        next();
      }).catch((err) => {
        throw err;
      });
    } else {
      res.statusCode = 401;
      next();
    }
  } catch (err) {
    res.error = err;
    next();
  }
};

const createProduct = async (req, res, next) => {
  const {
    barcode, name,
    description, img,
    stock, price,
    supplier, available
  } = req.body;
  const auth = req.body.user.user;
  const id = auth._id;

  try {
    if (auth) {
      const product = new Product({
        barcode: barcode,
        name: name,
        description: description,
        img: img,
        stock: stock,
        price: price,
        supplier: supplier,
        available: available,
        idUser: id
      });
      console.log(product);
  
      await product.save()
        .then((product) => {
          res.result = product;
          next();
        }).catch((err) => {
          throw err;
        });
    } else {
      res.statusCode = 401;
      next();
    }
  } catch (err) {
    res.error = err;
    next();
  }
};

const updateProduct = async (req, res, next) => {
  const {
    barcode, name,
    description, img,
    stock, price,
    supplier, available
  } = req.body;
  const auth = req.body.user.user;
  const id = auth._id;

  try {
    if (auth) {
      const actual = req.params.barcode;
      await Product.findOneAndUpdate({
        barcode: actual
      }, {
        barcode: barcode,
        name: name,
        description: description,
        img: img,
        stock: stock,
        price: price,
        supplier: supplier,
        available: available,
        idUser: id
      }, {
        new: true
      }).then((product) => {
        if (!product) {
          res.statusCode = 404;
          return next();
        }
        res.result = product;
        next();
      }).catch((err) => {
        throw err;
      });
    } else {
      res.statusCode = 401;
      next();
    }
  } catch (err) {
    res.error = err;
    next();
  }
};

const deleteProduct = async (req, res, next) => {
  const { barcode } = req.params;
  const auth = req.body.user.user;

  try {
    if (auth) {
      const actual = req.params.barcode;
      await Product.findOneAndRemove({
        barcode: actual
      }).then((product) => {
        if (!product) {
          res.statusCode = 404;
          return next();
        }
        res.statusCode = 204;
        next();
      }).catch((err) => {
        throw err;
      });
    } else {
      res.statusCode = 404;
      next();
    }
  } catch (err) {
    res.error = err;
    next();
  }
};

module.exports = {
  findAllProducts,
  findProductsByUser,
  findProductById,
  findProductByBarcode,
  createProduct,
  updateProduct,
  deleteProduct
};
