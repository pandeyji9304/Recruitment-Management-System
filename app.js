const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routers/auth');


const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);


const jobRoutes = require('./routers/job');
const resumeRoutes = require('./routers/resume');

app.use(authRoutes);
app.use(jobRoutes);
app.use(resumeRoutes);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
