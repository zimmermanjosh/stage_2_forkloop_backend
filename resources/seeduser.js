const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { JWT_EXPIRATION_TIME } = require("../utils/config");

mongoose.connect("mongodb://localhost:27017/wtwr_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// not my code modified from the tutorial to create a user for demonstration purposes.

const seedUser = async () => {
  const hashedPassword = await bcrypt.hash("mypassword123",  JWT_EXPIRATION_TIME,
  );

  await User.create([
    {
      // _id: new mongoose.Types.ObjectId("673a687016619aa93deecaa1"), // Replace with your own unique ID generator
      name: "joshtarget",
      avatar: "https://example.com/joshtarget.jpg",
      email: "joshtarget@example.com",
      password: hashedPassword,
    },
    {
      // _id: new mongoose.Types.ObjectId("673a687016619aa93deecaa1"), // Replace with your own unique ID generator
      name: "josh1again",
      avatar: "https://example.com/josh1again.jpg",
      email: "josh1again@example.com",
      password: hashedPassword,
    },
  ]);
  // eslint-disable-next-line no-console
  console.log("User added!");
  mongoose.disconnect();
};

seedUser();
