const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    passwordHash: String,
    userType: { type: String, enum: ['Admin', 'Applicant'], default: 'Applicant' },
    profileHeadline: String,
    address: String,
    profile: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' }
});

module.exports = mongoose.model('User', UserSchema);
