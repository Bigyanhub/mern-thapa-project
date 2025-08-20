// Import mongoose for MongoDB schema and model
const mongoose = require("mongoose"); // ODM for MongoDB
const bcrypt = require("bcrypt"); // For password hashing
const jwt = require("jsonwebtoken"); // For JWT token generation

// Define the user schema: structure of user documents in MongoDB
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures usernames are unique
  },

  email: {
    type: String,
    required: true,
    // unique: true can be added for email uniqueness
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

// Pre-save hook: hashes password before saving user to DB
// This runs automatically when a new user is created or password is changed
userSchema.pre("save", async function (next) {
  // 'this' refers to the user document being saved
  const user = this;

  // Only hash password if it has been modified (or is new)
  if (!user.isModified("password")) {
    return next();
  }

  try {
    // Generate salt and hash the password
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
    // After hashing, continue saving
    next();
  } catch (error) {
    // Pass error to next middleware
    next(error);
  }
});

// Instance method: compares a plain password with the hashed password
// Used in auth-controller during login to verify credentials
userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// Instance method: generates a JWT token for the user
// Used in auth-controller to send token after registration/login
userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

// Placeholder for additional password checks (not used currently)
userSchema.methods.checkPassword = async function () {
  try {
    return;
  } catch (error) {
    console.error(error);
  }
};

// Create the User model from the schema
// This lets you interact with the 'users' collection in MongoDB
const User = mongoose.model("User", userSchema);

// Export the User model so it can be used in controllers (like auth-controller)
module.exports = User;
