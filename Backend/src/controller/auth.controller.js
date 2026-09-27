const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const authService = require("../services/auth.service");

const handleUserLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await authService.loginUserService(email, password);

  return res.status(200).json(
    new ApiResponse(200, result, "Login successful")
  );
});

const handlRefreshTokenRotation = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  const result = await authService.refreshUserSessionService(refreshToken);

  return res.status(200).json(
    new ApiResponse(200, result, "Session refreshed successfully")
  );
});

const handleUserLogout = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  await authService.logoutUserService(refreshToken);

  return res.status(200).json(
    new ApiResponse(200, null, "Logout successful")
  );
});

const handleSetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;

  const user = await authService.setUserPasswordService(
    req.user.sub,
    password
  );

  return res.status(200).json(
    new ApiResponse(200, user, "Password set successfully")
  );
});

module.exports = {
  handleUserLogin,
  handlRefreshTokenRotation,
  handleUserLogout,
  handleSetPassword,
};