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
    // const data = req.body;
    console.log(req.body);
    // Destructure user data from request body
    const { username, email, phone, password } = req.body;

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
    res
      .status(201)
      .json({
        msg: "registration sucessfull",
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error " + error });
  }
};
// Export controller functions
module.exports = { home, register };
