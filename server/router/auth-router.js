const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/auth-controller");
const { signupSchema, loginSchema} = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");

/* ---------------------------- send to home page --------------------------- */
router.route("/").get(authcontroller.home);
/* -------------------------- send to register page ------------------------- */
router.route("/register").post(validate(signupSchema), authcontroller.register);
/* ---------------------------- send to login page --------------------------- */
router.route("/login").post(validate(loginSchema) ,authcontroller.login);

module.exports = router;
