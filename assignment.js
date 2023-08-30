const mongoose = require('mongoose');

const InsightSchema = new mongoose.Schema({
  impact: String,
  intensity: Number,
  sector: String,
  topic: String,
  insight: String,
  url: String,
  region: String,
  start_year: Number,
  end_year: Number,   
  added: Date,
  published: Date,
  country: String,
  relevance: Number,
  pestle: String,
  source: String,
  title: String,
  likelihood: Number,
});

module.exports = mongoose.model('Insight', InsightSchema);
