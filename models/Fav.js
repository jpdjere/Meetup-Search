const mongoose = require('mongoose');
const { Schema } = mongoose;

const favSchema = new Schema({
  event_id: String,
  lastModified:{
    type: Date,
    default: new Date()
  },
})

//Create a model class and tell Mongoose it has to be aware of it
mongoose.model('fav',favSchema);
