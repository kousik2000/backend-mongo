const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
    unique: true,
  },
  imageUrl: {
    type: String,
    required: true,
    unique: true,
  },
  github: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model('Portfolio', PortfolioSchema);