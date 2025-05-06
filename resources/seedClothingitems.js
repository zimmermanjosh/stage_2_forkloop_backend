// seedClothingItems.js
const mongoose = require('mongoose');
const ClothingItem = require('../models/clothingItem');
const User = require('../models/user');

mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
    seedDatabase();
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const clothingItems = [
  {
    "name": "Linen Shirt",
    "imageUrl": "https://images.unsplash.com/photo-1626497764746-6dc36546b388",
    "weather": "hot"
  },
  {
    "name": "Lightweight Shorts",
    "imageUrl": "https://images.unsplash.com/photo-1591195853828-11db59a44f6b",
    "weather": "hot"
  },
  {
    "name": "Summer Dress",
    "imageUrl": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1",
    "weather": "hot"
  },
  {
    "name": "Tank Top",
    "imageUrl": "https://images.unsplash.com/photo-1503342394128-c104d54dba01",
    "weather": "hot"
  },
  {
    "name": "Sandals",
    "imageUrl": "https://images.unsplash.com/photo-1603487742131-4160ec999306",
    "weather": "hot"
  },
  {
    "name": "Straw Hat",
    "imageUrl": "https://images.unsplash.com/photo-1575428652377-a2d80e2277fc",
    "weather": "hot"
  },
  {
    "name": "Sunglasses",
    "imageUrl": "https://images.unsplash.com/photo-1577803645773-f96470509666",
    "weather": "hot"
  },
  {
    "name": "Light Cardigan",
    "imageUrl": "https://images.unsplash.com/photo-1611911813383-67769b37a149",
    "weather": "warm"
  },
  {
    "name": "Denim Jacket",
    "imageUrl": "https://images.unsplash.com/photo-1551537482-f2075a1d41f2",
    "weather": "warm"
  },
  {
    "name": "Flannel Shirt",
    "imageUrl": "https://images.unsplash.com/photo-1520975954732-35dd22299614",
    "weather": "warm"
  },
  {
    "name": "Chino Pants",
    "imageUrl": "https://images.unsplash.com/photo-1473966968600-fa801b869a1a",
    "weather": "warm"
  },
  {
    "name": "Light Sweater",
    "imageUrl": "https://images.unsplash.com/photo-1616258734925-5139e7e39536",
    "weather": "warm"
  },
  {
    "name": "Loafers",
    "imageUrl": "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4",
    "weather": "warm"
  },
  {
    "name": "Canvas Sneakers",
    "imageUrl": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
    "weather": "warm"
  },
  {
    "name": "Baseball Cap",
    "imageUrl": "https://images.unsplash.com/photo-1588850561407-ed78c282e89b",
    "weather": "warm"
  },
  {
    "name": "Winter Coat",
    "imageUrl": "https://images.unsplash.com/photo-1544923408-75c5cef46f14",
    "weather": "cold"
  },
  {
    "name": "Wool Sweater",
    "imageUrl": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
    "weather": "cold"
  },
  {
    "name": "Thermal Leggings",
    "imageUrl": "https://images.unsplash.com/photo-1535639818669-c059d2f038e6",
    "weather": "cold"
  },
  {
    "name": "Beanie Hat",
    "imageUrl": "https://images.unsplash.com/photo-1510598155053-cdca7dea7f93",
    "weather": "cold"
  },
  {
    "name": "Cashmere Scarf",
    "imageUrl": "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9",
    "weather": "cold"
  },
  {
    "name": "Leather Gloves",
    "imageUrl": "https://images.unsplash.com/photo-1545170122-3ce4d240723d",
    "weather": "cold"
  },
  {
    "name": "Snow Boots",
    "imageUrl": "https://images.unsplash.com/photo-1609342122563-a43ac8917a3a",
    "weather": "cold"
  },
  {
    "name": "Puffer Jacket",
    "imageUrl": "https://images.unsplash.com/photo-1610652492500-ded49ceeb378",
    "weather": "cold"
  },
  {
    "name": "Turtleneck Sweater",
    "imageUrl": "https://images.unsplash.com/photo-1576871337622-98d48d1cf531",
    "weather": "cold"
  },
  {
    "name": "Fleece Hoodie",
    "imageUrl": "https://images.unsplash.com/photo-1565693413579-8a73fcc11d49",
    "weather": "cold"
  },
];

async function seedDatabase() {
  try {
    // Find a user to associate with the clothing items
    const user = await User.findOne({ email: "joshtarget@example.com" });

    if (!user) {
      console.error("No user found with email joshtarget@example.com. Run the seeduser.js script first.");
      mongoose.disconnect();
      return;
    }

    const userId = user._id;
    console.log(`Using user ID: ${userId} for clothing items`);

    // Add owner field to each item
    const itemsWithOwner = clothingItems.map(item => ({
      ...item,
      owner: userId,
      likes: [] // Initialize with empty likes array
    }));

    // Clear existing items (optional)
    await ClothingItem.deleteMany({});

    // Insert the new items
    const result = await ClothingItem.insertMany(itemsWithOwner);

    console.log(`Successfully added ${result.length} clothing items to the database`);
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.disconnect();
  }
}