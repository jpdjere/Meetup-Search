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

//Temporarly Unused
router.get('/favourites/:id', async (req, res, next) => {
  let { id } = req.params;
  res.send({ title: id });
});

router.post('/favourites', async (req, res, next) => {
  let { event_url } = req.body;
  let existingEvents = await Fav.find({event_url})
  if(existingEvents.length > 0){
    return res.send({ status:200, recordCreated: "Already exisiting - not saved"  });
  }
  let newFav = await new Fav({
    ...req.body
  }).save()
  res.send({ status:200, recordCreated: newFav  });
});

router.delete('/favourites', async (req, res, next) =>  {
  let { event_url } = req.body;
  Fav.findOneAndDelete({event_url}, (err,doc) => {
    if(err) return res.send({status:500,err:err})
    return res.send({status:200,message:"Deleted successfully",doc})
  })
});

module.exports = router;
