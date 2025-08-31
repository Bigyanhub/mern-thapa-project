const User = require("../models/user-model");
const bcrypt = require("bcrypt");

/* -------------------------------------------------------------------------- */
/*                                 Home Logic                                 */
/* -------------------------------------------------------------------------- */
// Controller for home route
const home = (req, res, next) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    const err = {
      status: 500,
      message: "Home route error",
      extraDetails: error.message,
    };
    next(err);
  }
};
/* -------------------------------------------------------------------------- */
/*                               Register Logic                               */
/* -------------------------------------------------------------------------- */

const register = async (req, res, next) => {
  try {
    // Extract user registration data from the request body
    const { username, email, phone, password } = req.body;

    // Check if a user with this email already exists in the database
    const userExist = await User.findOne({ email: email });

    // Prevent duplicate registration by returning an error if email is already taken
    if (userExist) {
      const error = {
        status: 400,
        message: "Email already exists",
        extraDetails: "User with this email already registered",
      };
      return next(error);
    }

    // Create new user in database - this triggers password hashing middleware
    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    // Send success response with JWT token for immediate authentication
    res.status(201).json({
      msg: "Registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    // Handle MongoDB duplicate key constraint errors as a safety net
    if (error.code === 11000 && error.keyPattern?.email) {
      const err = {
        status: 400,
        message: "Email already exists",
        extraDetails: "Duplicate email detected in database",
      };
      return next(err);
    }

    // Handle any other unexpected errors during registration
    const err = {
      status: 500,
      message: "Registration failed",
      extraDetails: error.message,
    };
    next(err);
  }
};

/* -------------------------------------------------------------------------- */
/*                                Login Logic                                 */
/* -------------------------------------------------------------------------- */

const login = async (req, res, next) => {
  try {
    // Extract login credentials from the request body
    const { email, password } = req.body;

    // Search for user account by email address
    const userExist = await User.findOne({ email });

    // Return error if no user account exists with the provided email
    if (!userExist) {
      const error = {
        status: 400,
        message: "Invalid credentials",
        extraDetails: "User not found with this email",
      };
      return next(error);
    }

    // Verify the provided password against the stored hashed password
    const isMatch = await userExist.comparePassword(password);

    // If password matches, generate JWT token and send success response
    if (isMatch) {
      res.status(200).json({
        msg: "Login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      // Reject login attempt if password doesn't match
      const error = {
        status: 401,
        message: "Invalid credentials",
        extraDetails: "Password does not match",
      };
      return next(error);
    }
  } catch (error) {
    // Handle any unexpected errors during the login process
    const err = {
      status: 500,
      message: "Login failed",
      extraDetails: error.message,
    };
    next(err);
  }
};


module.exports = { home, register, login };
