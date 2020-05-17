const Review = require('../models/review.model');
const { info, error } = require('../helpers/logger');

// https://codeburst.io/using-rabbitmq-for-microservices-communication-on-docker-a43840401819
// https://thatcoder.space/getting-started-with-rabbitmq-and-node-js/
// https://www.cloudfoundry.org/blog/scaling-real-time-apps-on-cloud-foundry-using-node-js-and-rabbitmq/

// ONLY FOR DEBUG
const findAllReviews = async (req, res, next) => {
  const auth = true;

  try {
    if (auth) {
      await Review.find()
        .then((reviews) => {
          if (!reviews) {
            return res.sendStatus(404);
          }
          res.json(reviews)
              .status(200);
        }).catch((err) => {
          throw err;
        });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    
  }
};

// GET
const findReviewsByUser = async (req, res, next) => {
  const auth = true;

  try {
    if (auth) {
      await Review.findOne({
        idUser: user._id
      }).then((review) => {
        if (!review) {
          return res.sendStatus(400);
        }
        res.json(review)
            .status(200);
      }).catch((err) => {
        if (err.kind === 'ObjectId') {
          return res.json({
            message: 'No idUser provide'
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
const findReviewsByProduct = async (req, res, next) => {
  const auth = true;
  const { idProduct } = req.body;

  try {
    if (auth) {
      await Review.findOne({
        idProduct: idProduct
      }).then((review) => {
        if (!review) {
          return res.sendStatus(400);
        }
        res.json(review)
            .status(200);
      }).catch((err) => {
        if (err.kind === 'ObjectId') {
          return res.json({
            message: 'No idProduct provide'
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

// POST
const createReview = async (req, res, next) => {
  const auth = true;
  const { comment, rating, idProduct } = req.body;

  try {
    if (auth) {
      const existReview = Review.findOne({
        idProduct: idProduct,
        idUser: req.user._id
      }).then((review) => {
        if (review) {
          return true;
        }
        return false;
      }).catch((err) => {
        return false;
      });

      if (!existReview) {
        const review = new Review({
          comment: comment,
          rating: rating,
          idProduct: idProduct,
          idUser: req.user._id
        });
  
        review.save()
          .then((result) => {
            if (!result) {
              return res.sendStatus(400);
            }
            res.json(result)
              .status(200);
          }).catch((err) => {
            throw err;
          });
      } else {
        res.sendStatus(400);
      }
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    onError(res, err);
  }
};

// PUT
const updateReview = async (req, res, next) => {
  const auth = true;
  const { comment, rating, idProduct } = req.body;

  try {
    if (auth) {
      await Review.findOneAndUpdate({
        idProduct: idProduct,
        idUser: req.user._id
      }, {
        comment: comment,
        rating: rating,
        idProduct: idProduct,
        idUser: idUser
      }, {
        new: true
      }).then((review) => {
        if (!review) {
          return res.sendStatus(400);
        }
        res.json(review)
            .status(200);
      }).catch((err) => {
        if (err.kind === 'ObjectId') {
          return res.json({
            message: 'No idProduct or idUser provide'
          }).status(404);                
        } else {
          throw err;
        }
      });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    onError(res, err);
  }
};

// DELETE
const deleteReview = async (req, res, next) => {
  const auth = true;
  const { idProduct } = req.body;

  try {
    if (auth) {
      await Review.findOneAndRemove({
        idProduct: idProduct,
        idUser: req.user._id
      }).then((review) => {
        if (!review) {
          return res.sendStatus(400);
        }
        res.sendStatus(204);
      }).catch((err) => {
        if (err.kind === 'ObjectId' || err.name === 'NotFound') {
          return res.json({
              message: 'No idProduct or idUser provide'
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
  error('[routes] review onError -> ' + err);
  res.json({
    'errors': {
      name: err.name,
      message: err.message
    }
  }).status(err.status || 500);
};

module.exports = {
  findAllReviews,
  findReviewsByUser,
  findReviewsByProduct,
  createReview,
  updateReview,
  deleteReview
};
