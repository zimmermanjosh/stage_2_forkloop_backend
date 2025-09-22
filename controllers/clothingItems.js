const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingItem");
const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require("../utils/errors/index");

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  // Manual validation for required fields
  if (!name || !weather || !imageUrl) {
    return next(
      new BadRequestError("Missing required fields: name, weather, imageUrl"),
    );
  }

  return ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      // console.log("Item created successfully:", item);
      res.status(201).send({ data: item });
    })
    .catch((err) => {
      // console.error("Error during creation:", err);
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Invalid data passed"));
      }
      return next(err);
    });
};

const getItems = (req, res, next) =>
  ClothingItem.find({})
    .then((items) => res.status(200).send({ data: items }))
    .catch(next);

const deleteItem = (req, res, next) => {
  console.log("🗑️ DELETE CONTROLLER HIT!");
  const { itemId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    console.log("❌ Invalid ObjectId format");
    return next(new BadRequestError("Invalid ID format"));
  }

  console.log("✅ ObjectId validation passed");

  return ClothingItem.findById(itemId)
    .orFail(() => {
      console.log("❌ Item not found in database");
      throw new NotFoundError("Item not found");
    })
    .then((item) => {
      console.log("✅ Item found:", item._id);
      console.log("🔍 Item owner:", item.owner.toString());
      console.log("🔍 Current user:", req.user._id.toString());

      // Check if the current user is the owner of the item
      if (item.owner.toString() !== req.user._id.toString()) {
        console.log("❌ User not authorized to delete");
        throw new ForbiddenError("You are not authorized to delete this item");
      }

      console.log("✅ Authorization passed, proceeding with deletion");

      // If user is owner, proceed with deletion
      return ClothingItem.findByIdAndDelete(itemId).then((deletedItem) => {
        console.log("✅ Item deleted successfully");
        // Send back the deleted item data instead of just a message
        res.status(200).send({
          message: "Item deleted successfully",
          data: deletedItem,
        });
      });
    })
    .catch((err) => {
      console.log("❌ Error in deleteItem:", err.name, err.message);
      return next(err);
    });
};

// Like a clothing item
const likeItem = (req, res, next) => {
  const { itemId } = req.params;

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return next(new BadRequestError("Invalid ID format"));
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch(next);
};

// Dislike a clothing item
const dislikeItem = (req, res, next) => {
  const { itemId } = req.params;

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return next(new BadRequestError("Invalid ID format"));
  }

  return ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError("Item not found");
    })
    .then((item) => res.status(200).send({ data: item }))
    .catch(next);
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
