const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Schema defines how user data is stored in MongoDB
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // prevents duplicate usernames
  },

  email: {
    type: String,
    required: true,
    // better to add unique: true for consistency, but handled in controller too
  },

  phone: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  isAdmin: {
    type: Boolean,
    default: false,
  },
});

/* -------------------------------------------------------------------------- */
/*                            Password Hashing Middleware                     */
/* -------------------------------------------------------------------------- */

// Pre-save middleware that automatically hashes passwords before storing in database
userSchema.pre("save", async function (next) {
  const user = this;

  // Skip password hashing if password hasn't been modified (for updates)
  if (!user.isModified("password")) {
    return next();
  }

  try {
    // Generate salt with cost factor of 10 for password hashing
    const saltRound = await bcrypt.genSalt(10);

    // Hash the plaintext password using bcrypt with generated salt
    const hash_password = await bcrypt.hash(user.password, saltRound);

    // Replace the plaintext password with the secure hash
    user.password = hash_password;
    next();
  } catch (err) {
    // Pass any hashing errors to the error handling middleware
    const error = {
      status: 500,
      message: "Error hashing password",
      extraDetails: err.message,
    };

    next(error);
  }
});

/* -------------------------------------------------------------------------- */
/*                            Password Comparison Method                      */
/* -------------------------------------------------------------------------- */

// Instance method to compare provided password with stored hashed password
userSchema.methods.comparePassword = async function (password) {
  // Use bcrypt to safely compare plaintext password with stored hash
  return bcrypt.compare(password, this.password);
};

/* -------------------------------------------------------------------------- */
/*                           JWT Token Generation Method                      */
/* -------------------------------------------------------------------------- */

// Instance method to generate JWT tokens for authenticated users
userSchema.methods.generateToken = async function () {
  try {
    // Create JWT payload with user information for token authentication
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      // Sign token using secret key from environment variables
      process.env.JWT_SECRET_KEY,
      {
        // Set token expiration to 30 days
        expiresIn: "30d",
      }
    );
  } catch (err) {
    // Log error and throw exception if token generation fails
    const error = {
      status: 500,
      message: "Token generation failed",
      extraDetails: err.message,
    };
    next(error);
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
