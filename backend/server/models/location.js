const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    photo: {type: String},
    city: {type: String, required: true},
    address: {type: String, required: true},
    description: {type: String},
    phone: {type: String},
    email: {type: String},
    active: {type: Boolean, default: true}
}, {timestamps: true})

const Location = mongoose.model('Location', LocationSchema);

module.exports = Location;