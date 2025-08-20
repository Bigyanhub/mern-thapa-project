const User = require("../models/user-model");
const bcrypt = require("bcrypt");

/* -------------------------------------------------------------------------- */
/*                                 Home Logic                                 */
/* -------------------------------------------------------------------------- */
// Controller for home route
const home = (req, res) => {
  try {
    // Send a welcome message as response
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    // Log any errors
    console.log(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                               Register Logic                               */
/* -------------------------------------------------------------------------- */

// Controller for register route
const register = async (req, res) => {
  try {
    // Destructure user data from request body
    const { username, email, phone, password } = req.body;

    //check if email is valid format
    if (!email.includes("@")) {
      return res.status(400).json({ msg: "Invalid email format" });
    }
    // Check if user already exists
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ msg: "email already exists" });
    }

    //check if username already exist
    // const usernameExist = await User.findOne({ username: username });
    // if (usernameExist) {
    //   return res.status(400).json({ msg: "Username already taken" });
    // }

    //Check how many account have the same phonenumber
    // const phoneCount = await User.countDocuments({ phone: phone });
    // if (phoneCount >= 2) {
    //   return res
    //     .status(400)
    //     .json({ msg: "Too many accounts registered with this phone number" });
    // }

    // Create a new user
    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    // res.status(201).json({ message: "User registered successfully" });
    res.status(201).json({
      msg: "registration sucessfull",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    // Handle duplicate key error (race condition)
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({ msg: "Email already exists" });
    }
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* -------------------------------------------------------------------------- */
/*                                Login Logic                                 */
/* -------------------------------------------------------------------------- */

const login = async (req, res) => {
  try {
    // 1. Get email and password from request body
    const { email, password } = req.body;

    // 2. Find user by email in the database
    const userExist = await User.findOne({ email });

    // 3. If user not found, send error response
    if (!userExist) {
      return res.status(400).json({ msg: "Invalid Credentials" });
    }

    // 4. Compare provided password with hashed password in database
    // (Note: This should use the model's comparePassword method, not bcrypt directly)
    const isMatch = await userExist.comparePassword(password);

    // 5. If password matches, send success response with JWT token
    if (isMatch) {
      res.status(200).json({
        msg: "Login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      // 6. If password does not match, send error response
      return res.status(401).json({ msg: "Invalid Credentials" });
    }
  } catch (error) {
    // 7. Handle any server errors
    res.status(500).json({ message: "Internal server error" });
  }
};

// Export controller functions
module.exports = { home, register, login };
