const axios = require('axios');
const fs = require('fs');

exports.parseResume = async (resumePath) => {
    try {
        // Read the resume file
        const resumeData = fs.readFileSync(resumePath);
        
        // Send a POST request to the API
        const response = await axios.post('https://api.apilayer.com/resume_parser/upload', resumeData, {
            headers: {
                'Content-Type': 'application/octet-stream',
                'apikey': process.env.RESUME_API_KEY
            }
        });

        // Log the response data for debugging
        console.log('API Response:', response.data);

        // Extract relevant information from the response
        const extractedData = {
            name: response.data.name || null,
            email: response.data.email || null, 
            phone: response.data.phone || null,
            skills: response.data.skills || [],
            education: response.data.education || [],
            experience: response.data.experience || []
        };

        return extractedData;

    } catch (error) {
        // Log error for debugging
        console.error('Error parsing resume:', error.message);

        // Return fallback values in case of error
        return {
            name: null,
            email: null,
            phone: null,
            skills: [],
            education: [],
            experience: []
        };
    }
};
