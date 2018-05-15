const mongoose = require('mongoose');
const { Schema } = mongoose;

const answerSchema = new Schema({
  intent: String,
  user_id:String,
  lastModified:Date,
  answer: String
})

//Create a model class and tell Mongoose it has to be aware of it
mongoose.model('answer',answerSchema);
