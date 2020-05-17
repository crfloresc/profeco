const status = require('http-status');

const config = require('../config/index');
const { info, error } = require('../helpers/logger');

const onSuccessful = (res) => {
  const response = res.res;
  const error = response.err || '';
  const result = response.result || '';

  if (error) {
    info(error);
  }
  if (result) {
    return res.json({
      'name': status['200_NAME'],
      'message': status['200_MESSAGE'],
      'class': status['200_CLASS'],
      'result': result
    }).status(status.OK);
  } else {
    return res.json({
      'name': status['204_NAME'],
      'message': status['204_MESSAGE'],
      'class': status['204_CLASS'],
      'result': {}
    }).status(status.NO_CONTENT);
  }
};

/**
 * 4xx ERRORS
 */

const on400Error = (res) => {
  return res.json({
    'name': status['400_NAME'],
    'message': status['400_MESSAGE'],
    'class': status['400_CLASS'],
    'result': {
      'name': '',
      'message': ''
    }
  }).status(status.BAD_REQUEST);
};

const on401Error = (res) => {
  return res.json({
    'name': status['401_NAME'],
    'message': status['401_MESSAGE'],
    'class': status['401_CLASS'],
    'result': {
      'name': 'UnauthorizedError',
      'message': ''
    }
  }).status(status.UNAUTHORIZED);
};

const on403Error = (res) => {
  return res.json({
    'name': status['403_NAME'],
    'message': status['403_MESSAGE'],
    'class': status['403_CLASS'],
    'result': {
      'name': 'ForbiddenError',
      'message': ''
    }
  }).status(status.FORBIDDEN);
};

const on404Error = (res) => {
  return res.json({
    'name': status['404_NAME'],
    'message': status['404_MESSAGE'],
    'class': status['404_CLASS'],
    'result': {
      'name': 'NotFoundError',
      'message': ''
    }
  }).status(status.NOT_FOUND);
};

// Catch 4xx and forward to error handler
const onClientError = (err, res, req, next) => {
  const response = res.res;
  if (!err) {
    switch (response.statusCode) {
      case 400:
        on400Error(response);
        break;
      case 401:
        on401Error(response);
        break;
      case 403:
        on403Error(response);
        break;
      case 404:
        on404Error(response);
        break;
      default:
        let err = new Error('UnknownError');
        err.message = 'Something wrong'
        next();
        break;
    }
  } else {
    next(err);
  }
};

// Error handler for production
const onServerError = (err, res, req, next) => {
  const response = res.res;
  if (config.server.env === 'dev') {
    error(
      '[routes] onServerError : ' + ' -> ',
      response.err.message
    );
  }
  return response.json({
    'name': status['500_NAME'],
    'message': status['500_MESSAGE'],
    'class': status['500_CLASS'],
    'result': {
      'name': err.name,
      'message': err.message
    }
  }).status(status.INTERNAL_SERVER_ERROR);
};

module.exports = {
  onSuccessful,
  onClientError,
  onServerError
};
