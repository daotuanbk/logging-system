const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosastic = require('mongoosastic');
var elasticsearch = require('elasticsearch');
const schema = new Schema({
  rawHeaders: [{ type: String, es_type: "text"  }],
  httpVersion: { type: String, es_type: "text" },
  method: { type: String, es_type: "text" },
  remoteAddress: { type: String, es_type: "text" },
  remoteFamily: { type: String, es_type: "text" },
  url: { type: String, es_type: "text" },
  processingTime: { type: Number, es_type: "integer" },
  query: {type: Object, es_type: "nested"},
  createdAt: {type: Date, es_type: "date"},
  updatedAt: {type: Date, es_type: "date"},
}, {
  timestamps: true
});
let elasticClient;

schema.plugin(mongoosastic, {
  esClient: function () {
    if (elasticClient) {
      return elasticClient
    } 
    elasticClient = new elasticsearch.Client({
      host: 'localhost:9200'
    });
    return elasticClient
  }()
});



schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Request', schema);