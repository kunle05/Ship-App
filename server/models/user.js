const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Location = require('./location');

const UserSchema = new mongoose.Schema({
    firstname: {type: String, required: [true, 'First name required'], minlength: 2},
    lastname: {type: String, required: [true, 'Last name required'], minlength: 2},
    photo: {type: String},
    username: {type: String, required: [true, 'Username required'], unique: true, minlength: 2},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    location: {type: mongoose.ObjectId, ref: Location, required: true },
    active: {type: Boolean, default: true, required: true },
    permissions: {type: [String], enum: ['USER', 'MANAGER', 'ADMIN'], default: ['USER']},
    lastLogin: {type: Date},
    resetToken: {type: String},
    resetTokenExpiry: {type: Number}
}, {timestamps: true})

UserSchema.post('save', function(doc, next) {
    doc.populate('location', () => next());
});

const User = mongoose.model('User', UserSchema);

module.exports = User;