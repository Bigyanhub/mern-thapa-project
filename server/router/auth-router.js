const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/auth-controller");

/* ---------------------------- send to home page --------------------------- */
router.route("/").get(authcontroller.home);
/* -------------------------- send to register page ------------------------- */
router.route("/register").post(authcontroller.register);
/* ---------------------------- send to login page --------------------------- */
router.route("/login").post(authcontroller.login);


module.exports = router;
