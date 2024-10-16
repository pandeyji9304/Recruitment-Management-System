const express = require('express');
const { createJob,
    getJob,
    applyToJob,
    getApplicants,
    getApplicant, 
    getJobs} = require('../controllers/jobController');
const { authenticateToken, isAdmin, isApplicant } = require('../middleware.js/auth');
const router = express.Router();

router.post('/admin/job', authenticateToken, isAdmin, createJob); 
router.get('/admin/job/:jobId', authenticateToken, isAdmin, getJob); 
router.get('/admin/applicants', authenticateToken, isAdmin, getApplicants); 
router.get('/admin/applicant/:applicant_id', authenticateToken, isAdmin, getApplicant); 
router.get('/jobs', authenticateToken, getJobs); 
router.get('/jobs/apply', authenticateToken, isApplicant, applyToJob); 

module.exports = router;


