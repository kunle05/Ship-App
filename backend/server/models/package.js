const mongoose = require('mongoose');
const Item = require('./item')
const Location = require('./location');

const PackageSchema = new mongoose.Schema({
    shipper_name: {type: String, required: [true, 'Provide full shipper name'], minlength: [5, 'Provide a valid name']},
    shipper_phone: {type: Number, required: [true, 'Shipper phone no. cannot be blank'], minlength: [9, 'Provide a valid phone number']},
    receiver_name: {type: String, required: [true, 'Provide full receiver name'], minlength: [5, 'Provide a valid name']},
    receiver_phone: {type: Number, required: [true, 'Receiver phone no. cannot be blank'], minlength: [9, 'Provide a valid phone number']},
    receiver_email: {type: String},
    amount: {type: Number, required: true},
    amount_paid: {type: Number, required: true, default: 0},
    tracking: {type: String, required: true},
    destination: {type: mongoose.ObjectId, ref: Location, required: true},
    items: {type: [mongoose.ObjectId], ref: Item} 
}, {timestamps: true});

mongoose.model('Package', PackageSchema);