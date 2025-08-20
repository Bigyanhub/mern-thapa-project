const User = require("../models/user-model");
const bcrypt = require("bcrypt");

/* -------------------------------------------------------------------------- */
/*                                 Home Logic                                 */
/* -------------------------------------------------------------------------- */
// Controller for home route
const home = (req, res) => {
  try {
    res.status(200).json({ msg: "Welcome to our home page" });
  } catch (error) {
    console.log(error);
  }
};
/* -------------------------------------------------------------------------- */
/*                               Register Logic                               */
/* -------------------------------------------------------------------------- */

const register = async (req, res) => {
  try {
    // 1a. Extract registration data from request body
    const { username, email, phone, password } = req.body;

    // 1b. Basic email check (weak – should be replaced with regex or validator.js)
    if (!email.includes("@")) {
      return res.status(400).json({ msg: "Invalid email format" });
    }

    // 1c. Look up existing user to enforce unique email
    const userExist = await User.findOne({ email: email });

    // 1d. If user already exists, block duplicate registration
    if (userExist) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // 1e. Create new user → triggers pre-save middleware to hash password
    const userCreated = await User.create({
      username,
      email,
      phone,
      password,
    });

    // 1f. Return success with freshly signed JWT (via user model method)
    res.status(201).json({
      msg: "Registration successful",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    // 1g. Handle MongoDB duplicate key error (safety net if unique check fails)
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // 1h. Unexpected errors → log & return generic server error
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/* -------------------------------------------------------------------------- */
/*                                Login Logic                                 */
/* -------------------------------------------------------------------------- */

const login = async (req, res) => {
  try {
    // 2a. Extract login credentials from request body
    const { email, password } = req.body;

    // 2b. Attempt to find user by email
    const userExist = await User.findOne({ email });

    // 2c. If no account found → block login
    if (!userExist) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // 2d. Compare supplied password with stored hash (bcrypt.compare)
    const isMatch = await userExist.comparePassword(password);

    // 2e. If match → issue JWT via model method
    if (isMatch) {
      res.status(200).json({
        msg: "Login successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      // 2f. Password mismatch → reject login
      return res.status(401).json({ msg: "Invalid credentials" });
    }
  } catch (error) {
    // 2g. Fallback for unexpected errors
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { home, register, login };
