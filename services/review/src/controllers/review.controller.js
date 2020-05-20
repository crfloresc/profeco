const Review = require('../models/review.model');
const { info, error } = require('../helpers/logger');

const findAllReviews = async (req, res, next) => {
  const auth = true;

  try {
    if (auth) {
      await Review.find()
        .then((reviews) => {
          if (!reviews) {
            res.statusCode = 404;
            return next();
          }
          res.result = reviews;
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

const findReviewsByUser = async (req, res, next) => {
  const { idUser } = req.params;
  const auth = true;

  try {
    if (auth) {
      await Review.findOne({
        idUser: idUser
      }).then((review) => {
        if (!review) {
          res.statusCode = 404;
          return next();
        }
        res.result = review;
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

const findReviewsByProduct = async (req, res, next) => {
  const { idProduct } = req.body;
  const auth = true;

  try {
    if (auth) {
      await Review.findOne({
        idProduct: idProduct
      }).then((review) => {
        if (!review) {
          res.statusCode = 404;
          return next();
        }
        res.result = review;
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

const createReview = async (req, res, next) => {
  const { comment, rating, idProduct, idUser } = req.body;
  const auth = true;

  try {
    if (auth) {
      const review = new Review({
        comment: comment,
        rating: rating,
        idProduct: idProduct,
        idUser: idUser
      });

      review.save()
        .then((review) => {
          res.result = review;
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

const updateReview = async (req, res, next) => {
  const { comment, rating, idProduct, idUser } = req.body;
  const auth = true;

  try {
    if (auth) {
      await Review.findOneAndUpdate({
        idProduct: idProduct,
        idUser: idUser
      }, {
        comment: comment,
        rating: rating,
        idProduct: idProduct
      }, {
        new: true
      }).then((review) => {
        if (!review) {
          res.statusCode = 404;
          return next();
        }
        res.result = review;
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

const deleteReview = async (req, res, next) => {
  const { idProduct } = req.params;
  const { idUser } = req.body;
  const auth = true;

  try {
    if (auth) {
      await Review.findOneAndRemove({
        idProduct: idProduct,
        idUser: idUser
      }).then((review) => {
        if (!review) {
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
  findAllReviews,
  findReviewsByUser,
  findReviewsByProduct,
  createReview,
  updateReview,
  deleteReview
};
