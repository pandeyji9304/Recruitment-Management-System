# Assignment Project

This is a Node.js application that includes authentication, job postings, and resume handling functionalities. The app connects to a MongoDB database using Mongoose and handles user authentication with JWT.

## Project Structure

├── routers
│   ├── auth.js      # Routes for user authentication (login, signup)
│   ├── job.js       # Routes for job-related operations
│   └── resume.js    # Routes for uploading and handling resumes
├── .env             # Environment variables
├── app.js           # Main application entry point
├── package.json     # Project dependencies and scripts

Installation

Clone the repository:
git clone <repository-url>
cd assignment

Install dependencies:
npm install
Set up environment variables:

Create a .env file in the root of your project and add the following:

MONGO_URI=<your-mongo-uri>
JWT_SECRET=<your-jwt-secret>
Replace <your-mongo-uri> with your MongoDB connection string and <your-jwt-secret> with a secret key for JWT.

Run the application:


node app.js
The server will be running on http://localhost:3000.


Dependencies

express: Web framework for Node.js
mongoose: MongoDB object modeling tool
jsonwebtoken: For handling JWT-based authentication
bcrypt: For hashing passwords
multer: For handling file uploads
dotenv: For environment variable management
axios: HTTP client for making API requests
