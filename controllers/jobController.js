const Job = require('../models/Job');
const User = require('../models/user'); 
const Profile = require('../models/Profile');

// Create a new job posting
const createJob = async (req, res) => {
    const { title, description, companyName } = req.body;
    const job = new Job({
        title,
        description,
        companyName,
        postedBy: req.user.userId,
        totalApplications: 0 
    });
    
    await job.save();
    res.status(201).send('Job created successfully');
};

// Get details of a specific job
const getJob = async (req, res) => {
    const { jobId } = req.params;
    const job = await Job.findById(jobId).populate('postedBy');

    if (!job) return res.status(404).send('Job not found');
    
    res.json(job);
};

// Get list of all applicants
const getApplicants = async (req, res) => {
    const applicants = await User.find({ userType: 'Applicant' }).populate('profile');
    res.json(applicants);
};

// Get details of a specific applicant
const getApplicant = async (req, res) => {
    const { applicant_id } = req.params;
    const applicant = await User.findById(applicant_id).populate('profile');

    if (!applicant) return res.status(404).send('Applicant not found');
    
    res.json(applicant);
};

// Apply to a specific job
const applyToJob = async (req, res) => {
    const { job_id } = req.query; 
    const job = await Job.findById(job_id);

    if (!job) return res.status(404).send('Job not found');

    
    job.totalApplications += 1; 
    await job.save();

    res.send('Applied successfully');
};

// Get all job openings
const getJobs = async (req, res) => {
    const jobs = await Job.find().populate('postedBy');
    res.json(jobs);
};

module.exports = {
    createJob,
    getJob,
    getApplicants,
    getApplicant,
    applyToJob,
    getJobs
};