const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = async (req, res) => {
    const { name, email, address, userType, password, profileHeadline } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    
    const user = new User({ name, email, address, userType, passwordHash, profileHeadline });
    await user.save();

    res.status(201).send('User created successfully');
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
        return res.status(400).send('Invalid email or password');
    }

    const token = jwt.sign({ userId: user._id, userType: user.userType }, process.env.JWT_SECRET);
    res.json({ token });
};
