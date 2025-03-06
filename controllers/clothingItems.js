const mongoose = require("mongoose");
const ClothingItem = require("../models/clothingItem");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/errors");


// Centralized error handler
const handleError = (err, res) => {
  // eslint-disable-next-line no-console
  console.error("Error:", err.name, err.message);
  if (err.name === "ValidationError") {
    return res
      .status(ERROR_CODES.BAD_REQUEST)
      .send({ message: ERROR_MESSAGES.BAD_REQUEST });
  }
  if (err.name === "CastError") {
    return res
      .status(ERROR_CODES.BAD_REQUEST)
      .send({ message: "Invalid ID format." });
  }
  if (err.name === "DocumentNotFoundError") {
    return res
      .status(ERROR_CODES.NOT_FOUND)
      .send({ message: ERROR_MESSAGES.NOT_FOUND });
  }
  return res
    .status(ERROR_CODES.SERVER_ERROR)
    .send({ message: ERROR_MESSAGES.SERVER_ERROR });
};

// Create a clothing item
const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  // Manual validation for required fields
  if (!name || !weather || !imageUrl) {
    return res.status(ERROR_CODES.BAD_REQUEST).send({
      message: "Missing required fields: name, weather, imageUrl",
    });
  }

  // Create the item and let Mongoose handle the schema validation
  return ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      // eslint-disable-next-line no-console
      console.log("Item created successfully:", item);
      return res.status(ERROR_CODES.CREATED).send({ data: item });
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error("Error during creation:", err);
      return handleError(err, res);
    });
};

// Get all clothing items
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      // eslint-disable-next-line no-console
      console.log("Items fetched successfully", items);
      res.status(ERROR_CODES.OK).send({ data: items });
    })
    .catch((err) => handleError(err, res));
};

// Delete a clothing item
const deleteItem = (req, res) => {
  const { itemId } = req.params;

  // Validate ID format first
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(ERROR_CODES.BAD_REQUEST).send({
      message: "Invalid ID format"
    });
  }

  ClothingItem.findById(itemId)
    .orFail(() => {
      const error = new Error("Item not found");
      error.name = "DocumentNotFoundError";
      throw error;
    })
    .then((item) => {
      // Check if the current user is the owner of the item
      if (item.owner.toString() !== req.user._id.toString()) {
        return res.status(ERROR_CODES.UNAUTHORIZED).send({
          message: "You are not authorized to delete this item"
        });
      }

      // If user is owner, proceed with deletion
      return ClothingItem.findByIdAndDelete(itemId)
        .then(() => res.status(ERROR_CODES.OK).send({ message: ERROR_MESSAGES.OK }));
    })
    .catch((err) => handleError(err, res));
};

// Like a clothing item
const likeItem = (req, res) => {
  const { itemId } = req.params;

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(ERROR_CODES.BAD_REQUEST).send({
      message: "Invalid ID format"
    });
  }
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.name = "DocumentNotFoundError";
      throw error;
    })
    .then((item) => res.status(ERROR_CODES.OK).send({ data: item }))
    .catch((err) => handleError(err, res));
};

// Dislike a clothing item
const dislikeItem = (req, res) => {
  const { itemId } = req.params;

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(itemId)) {
    return res.status(ERROR_CODES.BAD_REQUEST).send({
      message: "Invalid ID format"
    });
  }
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(() => {
      const error = new Error("Item not found");
      error.name = "DocumentNotFoundError";
      throw error;
    })
    .then((item) => res.status(ERROR_CODES.OK).send({ data: item }))
    .catch((err) => handleError(err, res));
};

module.exports = {
  createItem,
  getItems,
  deleteItem,
  likeItem,
  dislikeItem,
};
