/* eslint-disable no-console */

const ClothingItem = require("../models/ClothingItem");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageURL } = req.body;

  ClothingItem.create({ name, weather, imageURL })
    .then((item) => {
      console.log("Item created successfully", item);
      res.send({ data: item });
    })
    .catch((err) => {
      res.status(500).send({ message: "Server error in createItem.", err });
    });
};

const getItems = (req, res) => {
  console.log(req);
  console.log(req.body);

  ClothingItem.find({})
    .then((items) => {
      console.log("Item created successfully", items);
      res.send(200).send(items);
    })
    .catch((err) => {
      res.status(500).send({ message: "server error in getItems.", err });
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const {imageURL} = req.body;

  console.log(itemId, imageURL);

  ClothingItem.findByIdAndUpdate(itemId, {$set: { imageURL }})
  .orFail()
  .then((item) => 
    res.send(200).send({data:item}))
    .catch((err) => {
      res.status(500).send({ message: "server error in updateItem.", err })})
};


module.exports = {
  createItem,
  getItems,
  updateItem
};
