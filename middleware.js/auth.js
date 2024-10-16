const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401); 
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); 
        req.user = user;
        next();
    });
};

const isAdmin = (req, res, next) => {
    if (req.user.userType !== 'Admin') return res.status(403).send('Admins only');
    next();
};

const isApplicant = (req, res, next) => {
    if (req.user.userType !== 'Applicant') return res.status(403).send('Applicants only');
    next();
};

module.exports = { authenticateToken, isAdmin, isApplicant };
