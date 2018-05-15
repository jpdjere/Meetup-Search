var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/favourites', function(req, res, next) {
  res.send({ title: 'Express' });
});

router.get('/favourites/:id', function(req, res, next) {
  let { id } = req.params;
  res.send({ title: id });
});

router.post('/favourites/:id', function(req, res, next) {
  let { id } = req.params;
  res.send({ title: id });
});

router.delete('/favourites/:id', function(req, res, next) {
  let { id } = req.params;
  res.send({ title: id });
});

module.exports = router;
