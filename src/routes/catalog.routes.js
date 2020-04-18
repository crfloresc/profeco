const { Router } = require('express');
const router = Router();

/* GET ALL async? */
router.get('/catalog', (req, res) => {
  res.json('GET ALL: catalog')
    .status(200);
});

/* GET async? */
router.get('/catalog/product/:id', (req, res) => {
  const { id } = req.params;
  res.json('GET: catalog')
    .status(200);
});

/* POST async? */
router.post('/catalog/product', (req, res) => {
  if (!req.is('json')) {
    return res.sendStatus(415);
  }
  res.json('POST: catalog')
    .status(200);
});

/* PUT async? */
router.put('/catalog/product/:id', (req, res) => {
  res.json('PUT: catalog')
    .status(200);
});

/* DELETE async? */
router.delete('/catalog/product/:id', (req, res) => {
  res.json('DELETE: catalog')
    .status(200);
});

module.exports = router;
