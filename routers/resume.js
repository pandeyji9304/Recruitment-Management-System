const express = require('express');
const { uploadResume } = require('../controllers/resumeController');
const { authenticateToken } = require('../middleware.js/auth');
const router = express.Router();

router.post('/uploadResume', authenticateToken, uploadResume);

module.exports = router;
