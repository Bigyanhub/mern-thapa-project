// Import mongoose for MongoDB schema and model
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
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

//secure the password with bcrypt
userSchema.pre("save", async function (next) {
  // console.log("pre method", this);
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  try {
    //hash the password
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password
  } catch (error) {
    next(error);
  }
});

//define the model or the collection name
const User = mongoose.model("User", userSchema);

module.exports = User;
