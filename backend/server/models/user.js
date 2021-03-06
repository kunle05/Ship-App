const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Location = require('./location');

const UserSchema = new mongoose.Schema({
    firstname: {type: String, required: [true, 'First name required'], minlength: 2},
    lastname: {type: String, required: [true, 'Last name required'], minlength: 2},
    username: {type: String, required: [true, 'Username required'], unique: true, minlength: 2},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    location: {type: mongoose.ObjectId, ref: Location, required: true },
    status: {type: Number, default: 1, enum: [0, 1], required: true },
    permissions: {type: [String], enum: ['USER', 'ITEMDELETE', 'ADMIN'], default: ['USER']},
}, {timestamps: true})

UserSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    })
})

UserSchema.post('save', function(doc, next) {
    doc.populate('location', () => next());
});

const User = mongoose.model('User', UserSchema);

module.exports = User;