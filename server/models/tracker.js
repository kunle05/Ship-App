const mongoose = require('mongoose');
const User = require('./user');

const TrackerSchema = new mongoose.Schema({
    action: {type: String, enum: ['Shipped', 'Transit', 'Received', 'Delivered'], default: 'Shipped', required: [true, 'Choose an option']},
    user: {type: mongoose.ObjectId, ref: User, required: true}
}, {timestamps: true})

const Tracker = mongoose.model('Tracker', TrackerSchema);

module.exports = Tracker;