const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  rawHeaders: { type: Array },
  httpVersion: { type: Object },
  method: { type: Object },
  remoteAddress: { type: Object },
  remoteFamily: { type: Object },
  remoteAddress: { type: Object },
  url: { type: String },
  processingTime: { type: Number },
  query: {type: Object},
  timestamps: {type: Date},
  error: {type: Object}
}, {
  timestamps: true
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Error', schema);