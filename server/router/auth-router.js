const express = require("express");
const router = express.Router();
const authcontroller = require("../controllers/auth-controller")

/* ---------------------------- send to home page --------------------------- */
router.route("/").get(authcontroller.home);
/* -------------------------- send to register page ------------------------- */
router.route("/register").get(authcontroller.register)

module.exports = router;
