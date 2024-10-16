const multer = require('multer');
const path = require('path');
const Profile = require('../models/Profile');
const { parseResume } = require('../utils/resumeParser');

const upload = multer({ dest: 'uploads/' });

// Upload resume function
exports.uploadResume = async (req, res) => {
    upload.single('resume')(req, res, async (err) => {
        if (err) {
            return res.status(500).send('Error uploading the file');
        }

        try {
            const resumePath = req.file.path;
            const extractedData = await parseResume(resumePath);

            // Log extracted data for debugging
            console.log('Extracted Data:', extractedData);

            // Validate extracted data
            if (!extractedData || !extractedData.skills || !Array.isArray(extractedData.skills)) {
                return res.status(400).send('Invalid resume data extracted');
            }

            // Validate job details
            const jobDetails = req.body.jobDetails;
            if (!jobDetails || !Array.isArray(jobDetails.skills)) {
                console.error('Invalid job details provided');
                return res.status(400).send('Invalid job details provided');
            }

            const profile = new Profile({
                applicant: req.user.userId,
                resumeFileAddress: resumePath,
                skills: extractedData.skills.join(', '),
                education: extractedData.education.map(e => e.name).join(', '),
                experience: extractedData.experience.map(e => e.title).join(', '),
                name: extractedData.name,
                email: extractedData.email,
                phone: extractedData.phone
            });

            await profile.save();
            
            // Calculate score based on job details
            const score = calculateScore(extractedData, jobDetails);

            res.json({ extractedData, score });
        } catch (error) {
            console.error('Error processing the resume:', error);
            res.status(500).send('Error processing the resume');
        }
    });
};


const calculateScore = (resumeData, jobDetails) => {
    let score = 0;

    // Check if jobDetails and its properties are valid
    if (!jobDetails || !Array.isArray(jobDetails.skills)) {
        console.error('Invalid job details provided');
        return score; // Return 0 if job details are invalid
    }

    // Example scoring criteria
    const skillsMatch = resumeData.skills.filter(skill => jobDetails.skills.includes(skill)).length;
    score += skillsMatch * 2;

    const experienceYears = resumeData.experience.length; // Assuming experience contains relevant entries
    if (experienceYears >= jobDetails.experienceRequired) {
        score += 5;
    }

    const educationMatch = resumeData.education.some(ed => jobDetails.educationRequired.includes(ed.name));
    if (educationMatch) {
        score += 3;
    }

    return score;
};
