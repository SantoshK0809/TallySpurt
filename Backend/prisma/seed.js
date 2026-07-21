require("dotenv").config();

const bcrypt = require("bcrypt");
const prisma = require("../src/config/database");

const seedPlatformAdmin = async () => {
  try {
    const name = process.env.PLATFORM_ADMIN_NAME;
    const email = process.env.PLATFORM_ADMIN_EMAIL?.trim().toLowerCase();
    const password = process.env.PLATFORM_ADMIN_PASSWORD;

    const adminCount = await prisma.platformAdmin.count();

    if (adminCount > 0) {
      console.log("A platform admin already exists. Skipping seed.");
      return;
    }

    // Validate required environment variables
    if (!name || !email || !password) {
      throw new Error(
        "PLATFORM_ADMIN_NAME, PLATFORM_ADMIN_EMAIL and PLATFORM_ADMIN_PASSWORD are required.",
      );
    }

    // Check whether a platform admin already exists
    const existingAdmin = await prisma.platformAdmin.findUnique({
      where: {
        email,
      },
    });

    if (existingAdmin) {
      console.log("Platform admin already exists. Skipping seed.");
      return;
    }

    // Hash password before storing it
    const passwordHash = await bcrypt.hash(password, 12);

    // Create platform admin
    const platformAdmin = await prisma.platformAdmin.create({
      data: {
        name: name.trim(),
        email,
        passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    });

    console.log("Platform admin created successfully:");
    console.log(platformAdmin);
  } catch (error) {
    console.error("Failed to seed platform admin:", error);
    process.exitCode = 1;
  } finally {
    await prisma.$disconnect();
  }
};

seedPlatformAdmin();
