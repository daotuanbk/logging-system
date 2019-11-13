const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  header: { type: Object },
  query: { type: Object },
  params: { type: Object },
  serviceName: { type: Object },
  ipAddress: { type: Object },

}, {
  timestamps: true
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Request', schema);