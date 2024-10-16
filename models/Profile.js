const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    resumeFileAddress: String,
    skills: String,
    education: String,
    experience: String,
    name: String,
    email: String,
    phone: String,
});

module.exports = mongoose.model('Profile', ProfileSchema);
