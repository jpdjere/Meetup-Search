var express = require('express');
var router = express.Router();
require('../models/Fav')
var mongoose = require('mongoose');
const Fav = mongoose.model('fav');

/* GET home page. */
router.get('/favourites', async (req, res, next) => {
  let favs = await Fav.find({});
  res.send({ favs });
});

router.get('/favourites/:id', async (req, res, next) => {
  let { id } = req.params;
  res.send({ title: id });
});

router.post('/favourites', async (req, res, next) => {
  console.log(req.body);
  let newFav = await new Fav({
    ...req.body
  }).save()
  res.send({ status:200, recordCreated: newFav  });
});

router.delete('/favourites/:id', async (req, res, next) =>  {
  let { id } = req.params;
  res.send({ title: id });
});

module.exports = router;
