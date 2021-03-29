const mongoose = require('mongoose');
const TrackerSchema = require('./tracker').schema;

const ItemSchema = new mongoose.Schema({
    packaging: {type: String, required: true, enum: ['Box', 'Crate', 'Pallet', 'Other']},
    length: {type: String},
    width: {type: String},
    height: {type: String},
    reference: {type: String}, 
    weight: {type: Number, required: [true, 'Provide package weight'], min: 1},
    content: {type: String, required: true, enum: ['Automobile', 'Clothing', 'Computer', 'Electronic', 'Food Product', 'Furniture', 'General good', 'Mobile Device', 'Other']},
    status: {type: [TrackerSchema], required: true },
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;