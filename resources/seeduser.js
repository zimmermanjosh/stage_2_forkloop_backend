const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Set a proper salt rounds value (10 is common)
const SALT_ROUNDS = 10;

const seedUser = async () => {
  try {
    // Hash password with proper salt rounds
    const hashedPassword = await bcrypt.hash("mypassword123", SALT_ROUNDS);

    // Clear any existing users with these emails
    await User.deleteMany({
      email: { $in: ["joshtarget@example.com", "josh1again@example.com"] },
    });

    const users = await User.create([
      {
        name: "joshtarget",
        avatar: "https://example.com/joshtarget.jpg",
        email: "joshtarget@example.com",
        password: hashedPassword,
      },
      {
        name: "josh1again",
        avatar: "https://example.com/josh1again.jpg",
        email: "josh1again@example.com",
        password: hashedPassword,
      },
    ]);

    console.log("Users added successfully!");
    console.log(`First user ID (for seedClothingItems.js): ${users[0]._id}`);
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    mongoose.disconnect();
  }
};

seedUser();
