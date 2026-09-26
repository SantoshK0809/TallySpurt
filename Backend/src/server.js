// require("dotenv").config();

// const app = require("../app.js");
// const PORT = process.env.PORT || 3000;
// const prisma = require("./config/database");
// const {
//   // prisma,
//   connectDatabase,
//   disconnectDatabase,
// } = require("./src/config/prisma");

// const startServer = async () => {
//   try {
//     await connectDatabase();
//     console.log("Database connected successfully");

//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Failed to connect to database:", error);

//     await prisma.$disconnect();
//     process.exit(1);
//   }
// };

// startServer();

// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });



require("dotenv").config();

const app = require("../app");
const prisma = require("./config/prisma");

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await prisma.$connect();

    console.log("Database connected successfully");

    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    const shutdown = async (signal) => {
      console.log(`${signal} received. Shutting down server...`);

      server.close(async () => {
        await prisma.$disconnect();
        console.log("Database connection closed");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error("Failed to start server:", error);

    await prisma.$disconnect();
    process.exit(1);
  }
};

startServer();