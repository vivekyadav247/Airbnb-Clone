const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");
const usersController = require("../controller/users.js");

router.route("/signup")
  .get(wrapAsync(usersController.renderSignupForm))
  .post(wrapAsync(usersController.signup));

// router.post(
//   "/signup",
//   wrapAsync(usersController.signup)
// );

router.route("/login")
  .get(wrapAsync(usersController.renderLoginForm))
  .post(
    saveRedirectUrl,
    passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  wrapAsync(usersController.login)
);

router.get("/logout", usersController.logout);

module.exports = router;
