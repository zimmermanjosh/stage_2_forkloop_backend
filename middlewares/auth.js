const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../utils/errors");

const auth = (req, res, next) => {
  console.log("🔧 AUTH MIDDLEWARE HIT");
  console.log("🔧 Headers:", req.headers);

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    console.log("❌ No authorization header or invalid format");
    return next(new UnauthorizedError("Authorization token required"));
  }

  const token = authorization.replace("Bearer ", "");
  console.log("🔧 Token extracted:", token.substring(0, 20) + "...");

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
    console.log("✅ Token verified, user:", payload);
  } catch (err) {
    console.log("❌ Token verification failed:", err.message);
    return next(new UnauthorizedError("Invalid or expired token"));
  }

  req.user = payload;
  console.log("✅ Auth middleware passed, proceeding to controller");
  next();
  return undefined; // Explicitly return undefined to satisfy ESLint
};

module.exports = auth;
