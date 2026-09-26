const validate = require("express-validator");
const errorHandler = require("../middleware/error.middleware");
const pg = require("@prisma/adapter-pg");
const jwt = require("jsonwebtoken");

async function handleUserLogin(req, res) {
  try {
    const { email, password, shopName } = req.body;
    if (!email || !password || ! shopName) {
      return res
        .status(400)
        .json({ message: "Please enter valid credentials." });
    }
    //const user = await PrismaPg( SELECT user WHERE email= `${email}`)

    if (!user) {
      return res.status(404).json({ message: "User with mail doesn't exist" });
    }

    const token = jwt.sign({ email, user_name }, process.env.JWT_SECRET);
    res.cookies(token);

    return res.status(200).json({
      token,
      user,
      message: "User fetched successfully.",
    });
  } catch (err) {
    console.log(`Something went wrong while login user process - ${err}`);
    throw errorHandler(err);
  }
}

async function handleUserLogout(req, res) {
  try {
    const header = req.authHeader(Brerar);
    const token = header.split[1];
    if(!token){
        return res.status(403).json({message: "You can't be logged out"})
    }

    const blackListToken = await pg()
  } catch (err) {
    console.log(`Something went while logged out process - ${err}`);
    return res.status(500).json({ message: "Internal Server error." });
  }
}

module.exports = { handleUserLogin, handleUserLogout };
