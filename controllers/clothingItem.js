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

module.exports = {
  createItem,
};
