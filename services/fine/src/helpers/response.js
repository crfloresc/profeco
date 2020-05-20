const onSuccessEmptiness = (res, req, next) => {
  const response = res.res;
  const status = response.statusCode;
  const result = response.result;
  const err = response.error;

  if (result === undefined && !err && status) {
    return response.sendStatus(status);
  }

  response.result = result;
  response.error = err;
  next();
};

const onSuccess = (res, req, next) => {
  const response = res.res;
  const result = response.result;
  const err = response.error;

  if (!err && result) {
    return response.json(result)
      .status(200);
  }

  response.error = err;
  next();
};

const onError = (res, req, next) => {
  const response = res.res;
  const err = response.error;

  if (err) {
    return response.json(err)
      .status(err.status || 500);
  }

  next();
};

const _ = (err, req, res, next) => {
  const result = res.res.result;

  if (!err) {
    if (result) {
      return res.res.json(result)
        .status(200);
    }
    return res.res.sendStatus(204);
  }
  res.res.json(err)
    .status(err.status || 500);
};

module.exports = {
  onSuccessEmptiness,
  onSuccess,
  onError
};
