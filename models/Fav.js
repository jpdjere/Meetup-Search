const mongoose = require('mongoose');
const { Schema } = mongoose;

const favSchema = new Schema({
  group: String,
  name: String,
  rsvpCount:Number,
  rsvpers:[{}],
  time:Number,
  url:String
})

//Create a model class and tell Mongoose it has to be aware of it
mongoose.model('fav',favSchema);
