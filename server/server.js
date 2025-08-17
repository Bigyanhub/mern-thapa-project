require("dotenv").config();                     // Load environment variables from .env file

const express = require("express");             // Import express framework
const app = express();                          // Create an express application
const router = require("./router/auth-router")  // Import authentication router
const connectDb = require("./utils/db")         // Import database connection function

//Middleware that parse JSON from request(incoming to backend)
app.use(express.json());

/* --------------------------- Sends to the router -------------------------- */
// Use the auth router for /api/auth routes
app.use("/api/auth", router);

// Connect to the database, then start the server
connectDb().then(()=>{
  const PORT = 5000; // Server will run on port 5000
  app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
  });
})

