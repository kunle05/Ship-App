const mongoose = require('mongoose');
const Tracker = require('./tracker');

const ItemSchema = new mongoose.Schema({
    weight: {type: Number, required: [true, 'Provide package weight'], min: 100},
    content: {type: String, required: true, enum: ['Automobile', 'Clothing', 'Computer', 'Electronic', 'Food Product', 'Furniture', 'General good', 'Mobile Device', 'Other']},
    packaging: {type: String, equired: true, enum: ['Box', 'Crate', 'Pallet', 'Other']},
    status: {type: [mongoose.ObjectId], ref: Tracker, required: true },
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;