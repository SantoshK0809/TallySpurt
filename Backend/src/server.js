require("dotenv").config();

const app = require("../app.js");
const PORT = process.env.PORT || 3000;
const prisma = require("./config/database");

const startServer = async () => {
  try {
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to database:", error);

    await prisma.$disconnect();
    process.exit(1);
  }
};

startServer();

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
