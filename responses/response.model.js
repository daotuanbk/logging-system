const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosastic = require('mongoosastic');

const schema = new Schema({
  rawHeaders: [{ type: String, es_type: "text" }],
  httpVersion: { type: String, es_type: "text" },
  method: { type: String, es_type: "text" },
  remoteAddress: { type: String, es_type: "text" },
  remoteFamily: { type: String, es_type: "text" },
  url: { type: String, es_type: "text" },
  processingTime: { type: Number, es_type: "integer" },
  query: {type: Object, es_type: "nested"},
  body: {type: Object, es_type: "nested"},
  createdAt: {type: Date, es_type: "date"},
  updatedAt: {type: Date, es_type: "date"},
  response: {type: Object, es_type: "nested"}
}, {
  timestamps: true
});

schema.plugin(mongoosastic, {
  "hosts": ["localhost:9200"],
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Response', schema);