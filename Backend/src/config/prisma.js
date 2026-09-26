// const { PrismaClient } = require("@prisma/client");

// const prisma = new PrismaClient({
//   log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
// });

// async function connectDatabase() {
//   try {
//     await prisma.$connect();
//     console.log("Database connected successfully.");
//   } catch (error) {
//     console.error("Database connection failed:", error);
//     process.exit(1);
//   }
// }

// async function disconnectDatabase() {
//   await prisma.$disconnect();
// }

// module.exports = {
//   prisma,
//   connectDatabase,
//   disconnectDatabase,
// };


const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
});

module.exports = prisma;