module.exports = {
  JWT_SECRET: process.env.JWT_SECRET || "securePassword123",
  JWT_EXPIRATION_TIME: this.JWT_EXPIRATION_TIME || "7d",
};