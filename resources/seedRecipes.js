// seedRecipes.js
const mongoose = require("mongoose");
const Recipe = require("../models/recipe");
const User = require("../models/user");

const recipes = [
  // Breakfast recipes
  {
    title: "Classic Pancakes",
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759",
    cookingTime: 20,
    difficulty: "easy",
    servings: 4,
    summary: "Fluffy, golden pancakes perfect for a weekend breakfast. Light and airy with a touch of vanilla.",
    extendedIngredients: [
      { amount: 2, unit: "cups", name: "all-purpose flour" },
      { amount: 2, unit: "tablespoons", name: "sugar" },
      { amount: 2, unit: "teaspoons", name: "baking powder" },
      { amount: 1, unit: "teaspoon", name: "salt" },
      { amount: 2, unit: "large", name: "eggs" },
      { amount: 1.75, unit: "cups", name: "milk" },
      { amount: 4, unit: "tablespoons", name: "melted butter" }
    ],
    dishTypes: ["breakfast", "brunch"],
    spoonacularScore: 85
  },
  {
    title: "Overnight Oats",
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c",
    cookingTime: 5,
    difficulty: "easy",
    servings: 2,
    summary: "Healthy make-ahead breakfast with oats, yogurt, and fresh fruit. Perfect for busy mornings.",
    extendedIngredients: [
      { amount: 1, unit: "cup", name: "rolled oats" },
      { amount: 1, unit: "cup", name: "milk" },
      { amount: 0.5, unit: "cup", name: "Greek yogurt" },
      { amount: 2, unit: "tablespoons", name: "honey" },
      { amount: 1, unit: "teaspoon", name: "vanilla extract" },
      { amount: 0.5, unit: "cup", name: "mixed berries" }
    ],
    dishTypes: ["breakfast", "healthy"],
    spoonacularScore: 92
  },
  {
    title: "Avocado Toast",
    category: "breakfast",
    image: "https://images.unsplash.com/photo-1541519227354-08fa5d50c44d",
    cookingTime: 10,
    difficulty: "easy",
    servings: 2,
    summary: "Simple yet delicious avocado toast topped with everything bagel seasoning and a drizzle of lemon.",
    extendedIngredients: [
      { amount: 2, unit: "slices", name: "whole grain bread" },
      { amount: 1, unit: "large", name: "ripe avocado" },
      { amount: 0.5, unit: "lemon", name: "juice" },
      { amount: 1, unit: "teaspoon", name: "everything bagel seasoning" },
      { amount: 1, unit: "pinch", name: "salt and pepper" }
    ],
    dishTypes: ["breakfast", "healthy", "vegetarian"],
    spoonacularScore: 78
  },

  // Lunch recipes
  {
    title: "Caesar Salad",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1",
    cookingTime: 15,
    difficulty: "easy",
    servings: 4,
    summary: "Classic Caesar salad with crisp romaine lettuce, parmesan cheese, and homemade croutons.",
    extendedIngredients: [
      { amount: 2, unit: "heads", name: "romaine lettuce" },
      { amount: 0.5, unit: "cup", name: "grated parmesan cheese" },
      { amount: 1, unit: "cup", name: "homemade croutons" },
      { amount: 0.25, unit: "cup", name: "Caesar dressing" },
      { amount: 2, unit: "tablespoons", name: "lemon juice" }
    ],
    dishTypes: ["salad", "lunch", "side dish"],
    spoonacularScore: 82
  },
  {
    title: "Grilled Chicken Sandwich",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    cookingTime: 25,
    difficulty: "medium",
    servings: 2,
    summary: "Juicy grilled chicken breast with fresh vegetables on a toasted brioche bun.",
    extendedIngredients: [
      { amount: 2, unit: "pieces", name: "chicken breasts" },
      { amount: 2, unit: "brioche", name: "buns" },
      { amount: 2, unit: "leaves", name: "lettuce" },
      { amount: 1, unit: "medium", name: "tomato" },
      { amount: 0.25, unit: "medium", name: "red onion" },
      { amount: 2, unit: "tablespoons", name: "mayo" }
    ],
    dishTypes: ["lunch", "sandwich", "main course"],
    spoonacularScore: 88
  },
  {
    title: "Quinoa Buddha Bowl",
    category: "lunch",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    cookingTime: 30,
    difficulty: "medium",
    servings: 2,
    summary: "Nutritious bowl with quinoa, roasted vegetables, and tahini dressing. A complete healthy meal.",
    extendedIngredients: [
      { amount: 1, unit: "cup", name: "quinoa" },
      { amount: 1, unit: "cup", name: "chickpeas" },
      { amount: 1, unit: "medium", name: "sweet potato" },
      { amount: 2, unit: "cups", name: "mixed greens" },
      { amount: 0.25, unit: "cup", name: "tahini dressing" }
    ],
    dishTypes: ["lunch", "healthy", "vegetarian", "vegan"],
    spoonacularScore: 95
  },

  // Dinner recipes
  {
    title: "Spaghetti Carbonara",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5",
    cookingTime: 20,
    difficulty: "medium",
    servings: 4,
    summary: "Classic Italian pasta dish with eggs, cheese, pancetta, and black pepper. Simple yet elegant.",
    extendedIngredients: [
      { amount: 1, unit: "pound", name: "spaghetti" },
      { amount: 4, unit: "large", name: "eggs" },
      { amount: 1, unit: "cup", name: "grated pecorino cheese" },
      { amount: 4, unit: "ounces", name: "pancetta" },
      { amount: 1, unit: "teaspoon", name: "black pepper" }
    ],
    dishTypes: ["dinner", "pasta", "Italian", "main course"],
    spoonacularScore: 90
  },
  {
    title: "Grilled Salmon with Vegetables",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288",
    cookingTime: 25,
    difficulty: "medium",
    servings: 4,
    summary: "Fresh salmon fillet grilled to perfection with seasonal roasted vegetables and lemon.",
    extendedIngredients: [
      { amount: 4, unit: "fillets", name: "salmon" },
      { amount: 2, unit: "cups", name: "mixed vegetables" },
      { amount: 1, unit: "lemon", name: "lemon" },
      { amount: 2, unit: "tablespoons", name: "olive oil" },
      { amount: 1, unit: "teaspoon", name: "herbs de provence" }
    ],
    dishTypes: ["dinner", "seafood", "healthy", "main course"],
    spoonacularScore: 93
  },
  {
    title: "Chicken Stir Fry",
    category: "dinner",
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b",
    cookingTime: 15,
    difficulty: "easy",
    servings: 3,
    summary: "Quick and colorful stir fry with tender chicken and fresh vegetables in a savory sauce.",
    extendedIngredients: [
      { amount: 1, unit: "pound", name: "chicken breast" },
      { amount: 2, unit: "cups", name: "mixed stir fry vegetables" },
      { amount: 3, unit: "tablespoons", name: "soy sauce" },
      { amount: 1, unit: "tablespoon", name: "sesame oil" },
      { amount: 2, unit: "cloves", name: "garlic" }
    ],
    dishTypes: ["dinner", "Asian", "quick", "main course"],
    spoonacularScore: 87
  },

  // Snack recipes
  {
    title: "Homemade Hummus",
    category: "snack",
    image: "https://images.unsplash.com/photo-1571197119275-7c566cc2b2c9",
    cookingTime: 10,
    difficulty: "easy",
    servings: 6,
    summary: "Creamy homemade hummus with tahini, lemon, and garlic. Perfect with fresh vegetables or pita.",
    extendedIngredients: [
      { amount: 1, unit: "can", name: "chickpeas" },
      { amount: 2, unit: "tablespoons", name: "tahini" },
      { amount: 1, unit: "lemon", name: "juice" },
      { amount: 2, unit: "cloves", name: "garlic" },
      { amount: 3, unit: "tablespoons", name: "olive oil" }
    ],
    dishTypes: ["snack", "appetizer", "vegetarian", "healthy"],
    spoonacularScore: 89
  },
  {
    title: "Energy Balls",
    category: "snack",
    image: "https://images.unsplash.com/photo-1559116315-702b7de93b9e",
    cookingTime: 15,
    difficulty: "easy",
    servings: 12,
    summary: "No-bake energy balls with dates, nuts, and coconut. Perfect healthy snack for on-the-go.",
    extendedIngredients: [
      { amount: 1, unit: "cup", name: "pitted dates" },
      { amount: 1, unit: "cup", name: "mixed nuts" },
      { amount: 0.25, unit: "cup", name: "shredded coconut" },
      { amount: 1, unit: "tablespoon", name: "chia seeds" },
      { amount: 1, unit: "teaspoon", name: "vanilla extract" }
    ],
    dishTypes: ["snack", "healthy", "vegan", "no-bake"],
    spoonacularScore: 91
  }
];

async function seedDatabase() {
  try {
    // Find a user to associate with the recipes
    const user = await User.findOne({ email: "joshtarget@example.com" });

    if (!user) {
      console.error(
        "No user found with email joshtarget@example.com. Run the seeduser.js script first.",
      );
      mongoose.disconnect();
      return;
    }

    const userId = user._id;
    console.log(`Using user ID: ${userId} for recipes`);

    // Add owner field to each recipe
    const recipesWithOwner = recipes.map((recipe) => ({
      ...recipe,
      owner: userId,
      liked: false, // Initialize with false
    }));

    // Clear existing recipes (optional)
    await Recipe.deleteMany({});

    // Insert the new recipes
    const result = await Recipe.insertMany(recipesWithOwner);

    console.log(
      `Successfully added ${result.length} recipes to the database`,
    );
    mongoose.disconnect();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.disconnect();
  }
}

mongoose
  .connect("mongodb://127.0.0.1:27017/forkloop_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    seedDatabase();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });