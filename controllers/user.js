/* eslint-disable no-console */

const User = require("../models/User");

const createUsers = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl })
    .then((item) => {
      console.log("Item created successfully", item);
      res.send({ data: item });
    })
    .catch((err) => {
      res.status(400).send({ message: "Server error in createItem.", err });
    });
};

const getUser = (req, res) => {
  console.log(req);
  console.log(req.body);

  ClothingItem.find({})
    .then((items) => {
      console.log("GET Item successfully", items);
      res.send(200).send(items);
    })
    .catch((err) => {
      res.status(500).send({ message: "server error in getItems.", err });
    });
};

const getUser = (req, res) => {
  const { itemId } = req.params;
  const { imageURL } = req.body;

  console.log(itemId, imageURL);

  ClothingItem.findByIdAndUpdate(itemId, { $set: { imageURL } })
    .orFail()
    .then((items) => res.send(200).send({ data: items }))
    .catch((err) => {
      res.status(500).send({ message: "server error in updateItem.", err });
    });
};


module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
};
