const mongoose = require('mongoose');
const Item = require('./item')
const Location = require('./location');

const PackageSchema = new mongoose.Schema({
    account_number: {type: String},
    shipper_name: {type: String, required: [true, 'Provide full shipper name'], minlength: [5, 'Provide a valid name']},
    shipper_phone: {type: Number, required: [true, 'Shipper phone no. cannot be blank'], minlength: [9, 'Provide a valid phone number']},
    shipper_email: {type: String},
    recipient_name: {type: String, required: [true, 'Provide full recipient name'], minlength: [5, 'Provide a valid name']},
    recipient_phone: {type: Number, required: [true, 'Recipient phone no. cannot be blank'], minlength: [9, 'Provide a valid phone number']},
    recipient_email: {type: String},
    destination: {type: mongoose.ObjectId, ref: Location, required: true},
    origin: {type: mongoose.ObjectId, ref: Location, required: true},
    bill_to: {type: String, required: true, enum: ['Shipper', 'Receiver'], default: "Shipper"},
    amount: {type: Number, required: true},
    amount_paid: {type: Number, required: true, default: 0},
    tracking: {type: String, required: true},
    items: {type: [mongoose.ObjectId], ref: Item} 
}, {timestamps: true});

mongoose.model('Package', PackageSchema);