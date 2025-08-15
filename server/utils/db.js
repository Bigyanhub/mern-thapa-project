// Import mongoose for MongoDB connection
const mongoose = require("mongoose");

// const URI = "mongodb://127.0.0.1:27017/mern_admin";
// mongoose.connect(URI);

// Get MongoDB URI from environment variables
const URI = process.env.MONGODB_URI;

// Function to connect to MongoDB
const connectDb = async() =>{
try {
    // Try to connect to MongoDB
    await mongoose.connect(URI);
    console.log("Connected to DB sucessufully");
    
} catch (error) {
    // If connection fails, log error and exit process
    console.error("Database Connection Failed")
    process.exit(0);
}
}

// Export the connectDb function
module.exports = connectDb;