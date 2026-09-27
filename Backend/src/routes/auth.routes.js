const express = require("express");

const authController = require("../controller/auth.controller");
const isAuthenticated = require("../middleware/authenticate.middleware");
const validate = require("../middleware/validation.middleware");

const {
  loginValidator,
  refreshTokenValidator,
  passwordValidator,
} = require("../validators/auth.validator");

const router = express.Router();

router.post(
    "/login", 
    loginValidator, 
    validate, 
    authController.handleUserLogin
);

router.post(
  "/refresh",
  refreshTokenValidator,
  validate,
  authController.handlRefreshTokenRotation,
);

router.post(
    "/logout", 
    refreshTokenValidator, 
    validate, 
    authController.handleUserLogout
);

router.post(
 "/set-password",
  isAuthenticated,
  passwordValidator,
  validate,
  authController.handleSetPassword,
);

module.exports = router;
