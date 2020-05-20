const Wishlist = require('../models/wishlist.model');
const { info, error } = require('../helpers/logger');

const findAllWishlist = async (req, res, next) => {
  const auth = true;

  try {
    if (auth) {
      await Wishlist.find()
        .then((wishlists) => {
          if (!wishlists) {
            res.statusCode = 404;
            return next();
          }
          res.result = wishlists;
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

const findAllWishlistByUser = async (req, res, next) => {
  const { idUser } = req.params;
  const auth = idUser;

  try {
    if (auth) {
      await Wishlist.find({
        idUser: idUser
      }).then((wishlists) => {
        if (!wishlists) {
          res.statusCode = 404;
          return next();
        }
        res.result = wishlists;
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

const createWishlist = async (req, res, next) => {
  const {
    name,
    idUser
  } = req.body;
  const auth = true;

  try {
    if (auth) {
      const wishlist = new Wishlist({
        name: name,
        idUser: idUser
      });
  
      await wishlist.save()
        .then((wishlist) => {
          res.result = wishlist;
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

const updateWishlist = async (req, res, next) => {
  const {
    idWishlist,
    name
  } = req.body;
  const auth = true;

  try {
    if (auth) {
      await Wishlist.findOneAndUpdate({
        idWishlist: idWishlist
      }, {
        name: name,
        $push: {
          products: idProduct
        }
      }, {
        new: true
      }).then((wishlist) => {
        if (!wishlist) {
          res.statusCode = 404;
          return next();
        }
        res.result = wishlist;
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

const deleteWishlist = async (req, res, next) => {
  const { idWishlist } = req.params;
  const auth = true;

  try {
    if (auth) {
      await Wishlist.findOneAndRemove({
        idWishlist: idWishlist
      }).then((wishlist) => {
        if (!wishlist) {
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
  findAllWishlist,
  findAllWishlistByUser,
  createWishlist,
  updateWishlist,
  deleteWishlist
};
