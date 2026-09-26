const jwt = require("jsonwebtoken");

const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

function getAccessTokenSecret() {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("JWT_ACCESS_SECRET is not configured.");
  }

  return process.env.JWT_ACCESS_SECRET;
}

function getRefreshTokenSecret() {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_REFRESH_SECRET is not configured.");
  }

  return process.env.JWT_REFRESH_SECRET;
}

function generateAccessToken(payload) {
  return jwt.sign(payload, getAccessTokenSecret(), {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    issuer: "tallyspurt",
    audience: "tallyspurt-client",
  });
}

function generateRefreshToken(payload) {
  return jwt.sign(payload, getRefreshTokenSecret(), {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN,
    issuer: "tallyspurt",
    audience: "tallyspurt-client",
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, getAccessTokenSecret(), {
    issuer: "tallyspurt",
    audience: "tallyspurt-client",
  });
}

function verifyRefreshToken(token) {
  return jwt.verify(token, getRefreshTokenSecret(), {
    issuer: "tallyspurt",
    audience: "tallyspurt-client",
  });
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};