const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PhotoSchema = new Schema({
  photoUrl: {type: String},
},{
  timestamps: true
})

module.exports = Photo = mongoose.model('Photo', PhotoSchema);