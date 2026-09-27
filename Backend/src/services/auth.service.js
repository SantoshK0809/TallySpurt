const crypto = require("crypto");

const prisma = require("../config/prisma");
const { hashPassword, comparePassword } = require("../utils/password");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require("../utils/jwt");
const ApiError = require("../utils/ApiError");

const REFRESH_TOKEN_EXPIRES_IN_DAYS = 7;

function hashRefreshToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function getRefreshTokenExpiryDate() {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + REFRESH_TOKEN_EXPIRES_IN_DAYS);

  return expiresAt;
}

function sanitizeUser(user) {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
    shopId: user.shopId,
    isActive: user.isActive,
  };
}

function generateUserAccessToken(user) {
  return generateAccessToken({
    sub: user.id,
    shopId: user.shopId,
    role: user.role,
  });
}

async function createRefreshToken(userId) {
  const refreshToken = generateRefreshToken({
    sub: userId,
  });

  await prisma.refresh_token.create({
    data: {
      tokenHash: hashRefreshToken(refreshToken),
      userId,
      expiresAt: getRefreshTokenExpiryDate(),
    },
  });

  return refreshToken;
}

async function loginUserService(email, password) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
    include: {
      shop: true,
    },
  });

  if (!user || !user.passwordHash) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (!user.isActive) {
    throw new ApiError(403, "Your account is inactive");
  }

  if (!user.shop || user.shop.status !== "ACTIVE") {
    throw new ApiError(403, "Your shop is currently unavailable");
  }

  const isPasswordValid = await comparePassword(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = generateUserAccessToken(user);
  const refreshToken = await createRefreshToken(user.id);

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      lastLoginAt: new Date(),
    },
  });

  return {
    accessToken,
    refreshToken,
    user: sanitizeUser(user),
  };
}

async function refreshUserSessionService(refreshToken) {
  if (!refreshToken) {
    throw new ApiError(401, "Refresh token is required");
  }

  let payload;

  try {
    payload = verifyRefreshToken(refreshToken);
  } catch {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const tokenHash = hashRefreshToken(refreshToken);

  const storedToken = await prisma.refresh_token.findUnique({
    where: {
      tokenHash,
    },
    include: {
      user: {
        include: {
          shop: true,
        },
      },
    },
  });

  if (!storedToken) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  if (storedToken.revokedAt) {
    throw new ApiError(401, "Refresh token has been revoked");
  }

  if (storedToken.expiresAt <= new Date()) {
    throw new ApiError(401, "Refresh token has expired");
  }

  if (storedToken.user.id !== payload.sub) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const user = storedToken.user;

  if (!user.isActive) {
    throw new ApiError(403, "Your account is inactive");
  }

  if (!user.shop || user.shop.status !== "ACTIVE") {
    throw new ApiError(403, "Your shop is currently unavailable");
  }

  const newAccessToken = generateUserAccessToken(user);

  const newRefreshToken = generateRefreshToken({
    sub: user.id,
  });

  await prisma.$transaction([
    prisma.refresh_token.update({
      where: {
        id: storedToken.id,
      },
      data: {
        revokedAt: new Date(),
      },
    }),

    prisma.refresh_token.create({
      data: {
        tokenHash: hashRefreshToken(newRefreshToken),
        userId: user.id,
        expiresAt: getRefreshTokenExpiryDate(),
      },
    }),
  ]);

  return {
    accessToken: newAccessToken,
    refreshToken: newRefreshToken,
    user: sanitizeUser(user),
  };
}

async function logoutUserService(refreshToken) {
  if (!refreshToken) {
    return;
  }

  const tokenHash = hashRefreshToken(refreshToken);

  await prisma.refresh_token.updateMany({
    where: {
      tokenHash,
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  });
}

async function setUserPasswordService(userId, password) {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!user.isActive) {
    throw new ApiError(403, "Your account is inactive");
  }

  if (user.passwordSet) {
    throw new ApiError(409, "Password has already been set");
  }

  const passwordHash = await hashPassword(password);

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      passwordHash,
      passwordSet: true,
      passwordChangedAt: new Date(),
      inviteTokenHash: null,
      inviteExpiresAt: null,
    },
  });

  return sanitizeUser(updatedUser);
}

module.exports = {
  loginUserService,
  refreshUserSessionService,
  logoutUserService,
  setUserPasswordService,
};
