const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
}, {
    timestamps: true
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);