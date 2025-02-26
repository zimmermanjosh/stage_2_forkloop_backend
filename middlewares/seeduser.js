const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user"); // Adjust the path based on your structure

mongoose.connect("mongodb://localhost:27017/wtwr_db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// not my code modified from the tutorial to create a user for demonstration purposes.

const seedUser = async () => {
  const hashedPassword = await bcrypt.hash("mypassword123", 10);

  await User.create([
    {
      //_id: new mongoose.Types.ObjectId("673a687016619aa93deecaa1"), // Replace with your own unique ID generator
      name: "testjoshtarget",
      avatar: "https://example.com/testjoshtarget.jpg",
      email: "testjoshtarget@example.com",
      password: hashedPassword,
    },
    {
      //_id: new mongoose.Types.ObjectId("673a687016619aa93deecaa1"), // Replace with your own unique ID generator
      name: "testjoshtargetagain",
      avatar: "https://example.com/testjoshtargetagain.jpg",
      email: "testjoshtargetagain@example.com",
      password: hashedPassword,
    },
  ]);

  console.log("User added!");
  mongoose.disconnect();
};

seedUser();
