const mongoose = require('mongoose');
const { Schema } = mongoose;

const favSchema = new Schema({
  created: Number,
  description: String,
  distance:Number,
  duration:Number,
  event_url:String,
  group:{},
  headcount:Number,
  how_to_find_us:String,
  id:String,
  maybe_rsvp_count:Number,
  name:String,
  rsvp_limit:Number,
  rsvp_sample:[],
  status:String,
  time:Number,
  updated:Number,
  utc_offset:Number,
  venue:{},
  visibility:String,
  waitlist_count:Number,
  yes_rsvp_count:Number
})

//Create a model class and tell Mongoose it has to be aware of it
mongoose.model('fav',favSchema);
