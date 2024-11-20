/* eslint-disable no-console */
const ClothingItem = require("../models/clothingItem");
const { ERROR_CODES, ERROR_MESSAGES } = require("../utils/util");

// Centralized error handler
const handleError = (err, res) => {
  console.error(err);
  if (err.name === "ValidationError") {
    return res.status(400).send({ message: "Validation failed." });
  }
  if (err.name === "CastError") {
    return res.status(400).send({ message: "Invalid ID format." });
  }
  if (err.name === "DocumentNotFoundError") {
    return res.status(404).send({ message: "Document not found." });
  }
  return res.status(500).send({ message: "Internal server error." });
};

// Create a clothing item
const createItem = (req, res) => {
  const { name, weather, imageURL } = req.body;

  // Validate input fields
  if (!name || !weather || !imageURL) {
    console.log("Validation failed:", req.body); // Debug log
    return res
      .status(ERROR_CODES.BAD_REQUEST)
      .send({ message: "Missing required fields: name, weather, imageURL." });
  }

  return ClothingItem.create({ name, weather, imageURL, owner: req.user._id }) // Explicitly return here
    .then((item) => {
      console.log("Item created successfully:", item); // Debug log
      return res.status(201).send({ data: item }); // Explicitly return here
    })
    .catch((err) => {
      console.error("Error during creation:", err); // Debug log

      if (err.name === "ValidationError") {
        return res.status(400).send({ message: err.message });
      }

      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

// Get all clothing items
const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => {
      console.log("Items fetched successfully", items);
      res.status(200).send({ data: items });
    })
    .catch((err) => handleError(err, res));
};

// Update a clothing item
const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  if (!imageURL) {
    return res
      .status(ERROR_CODES.BAD_REQUEST)
      .send({ message: ERROR_MESSAGES.BAD_REQUEST });
  }

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $set: { imageURL } },
    { new: true, runValidators: true }
  )
    .orFail(new Error("DocumentNotFoundError"))
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => handleError(err, res));
  return {};
};

// Delete a clothing item
const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .orFail(() => {
      const error = new Error("DocumentNotFoundError");
      error.name = "DocumentNotFoundError";
      throw error;
    })
    .then(() => res.status(204).send()) // No content for successful deletion
    .catch((err) => {
      console.error("Error during item deletion:", err); // Log the error for debugging

      if (err.name === "DocumentNotFoundError") {
        return res
          .status(ERROR_CODES.NOT_FOUND)
          .send({ message: ERROR_MESSAGES.NOT_FOUND });
      }

      if (err.name === "CastError") {
        return res
          .status(ERROR_CODES.BAD_REQUEST)
          .send({ message: "Invalid ID format." });
      }

      return res
        .status(ERROR_CODES.SERVER_ERROR)
        .send({ message: ERROR_MESSAGES.SERVER_ERROR });
    });
};

// Like a clothing item
const likeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } }, // Add user ID if not already in likes array
    { new: true }
  )
    .orFail(new Error("DocumentNotFoundError"))
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => handleError(err, res));
};

// Dislike a clothing item
const dislikeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } }, // Remove user ID from likes array
    { new: true }
  )
    .orFail(new Error("DocumentNotFoundError"))
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => handleError(err, res));
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  dislikeItem,
};
