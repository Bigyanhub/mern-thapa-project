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
/*                        Registration Flow (continuation)                    */
/* -------------------------------------------------------------------------- */

// 1e.i. Triggered when register() calls User.create() in controller
userSchema.pre("save", async function (next) {
  const user = this;

  // 1e.ii. Only hash password if it's new/modified (prevents rehashing on updates)
  if (!user.isModified("password")) {
    return next();
  }

  try {
    // 1e.iii. Generate salt (cost factor = 10 → controls hashing difficulty)
    const saltRound = await bcrypt.genSalt(10);

    // 1e.iv. Hash the plaintext password before saving
    const hash_password = await bcrypt.hash(user.password, saltRound);

    // 1e.v. Replace plain password with its secure hash
    user.password = hash_password;
    next();
  } catch (error) {
    // 1e.vi. Pass hashing errors back up → caught in controller’s try/catch
    next(error);
  }
});

/* -------------------------------------------------------------------------- */
/*                          Login Flow (continuation)                         */
/* -------------------------------------------------------------------------- */

// 2d.i. Triggered when login() calls userExist.comparePassword(password)
userSchema.methods.comparePassword = async function (password) {
  // 2d.ii. bcrypt.compare → checks plain password against hashed DB password
  return bcrypt.compare(password, this.password);
};

/* -------------------------------------------------------------------------- */
/*                Shared between Registration (1f) and Login (2e)             */
/* -------------------------------------------------------------------------- */

// Called from register() [1f] and login() [2e] after user is validated
userSchema.methods.generateToken = async function () {
  try {
    // 1f.ii / 2e.ii. Build JWT payload → includes ID, email, admin flag
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      // 1f.iii / 2e.iii. Use secret key from env vars to sign securely
      process.env.JWT_SECRET_KEY,
      {
        // 1f.iv / 2e.iv. Set token validity (30 days here)
        expiresIn: "30d",
      }
    );
  } catch (error) {
    // 1f.v / 2e.v. If token generation fails, log error → controller still handles response
    console.error(error);
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
