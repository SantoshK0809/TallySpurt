// const jwt = require("jsonwebtoken");

// function isAuthenticated(req, res, next) {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       return res.status(401).json({
//         message: "Access Denied: No Token Provided",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     if (!token) {
//       return res.status(401).json({
//         message: "Access Denied: Invalid Authorization Header",
//       });
//     }

//     const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     req.user = user;

//     next();
//   } catch (error) {
//     console.error(
//       `Something went wrong while authenticating the user - ${error.message}`
//     );

//     return res.status(401).json({
//       message: "Invalid or expired token",
//     });
//   }
// }

// module.exports = isAuthenticated;


const { verifyAccessToken } = require("../utils/jwt");

function isAuthenticated(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access Denied: Invalid Authorization Header",
      });
    }

    const token = authHeader.substring(7).trim();

    if (!token) {
      return res.status(401).json({
        message: "Access Denied: No Token Provided",
      });
    }

    const payload = verifyAccessToken(token);

    req.user = payload;

    next();
  } catch (error) {
    console.error(
      `Authentication failed: ${error.message}`
    );

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}

module.exports = isAuthenticated;