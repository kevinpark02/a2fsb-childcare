const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let PhotoSchema = new Schema({
  photoUrl: String,
},{
  timestamps: true
})

module.exports = Photo = mongoose.model('Photo', PhotoSchema);