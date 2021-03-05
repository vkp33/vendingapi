const Drink = require("../models/drink.model.js");

// Creates a new drink item
exports.newDrink = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a drink from req.body
    const drink = new Drink({
      name: req.body.name,
      price: req.body.price,
      available_stock: req.body.available_stock,
      max_stock: req.body.max_stock,
      description: req.body.description,
      logo: req.body.logo
    });
  
    // Save drink in the database
    Drink.newDrink(drink, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the drink."
        });
      else res.send(data);
    });
};
  
// Retrieve all drinks from the database
exports.getAll = (req, res) => {
    Drink.getAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving drink list."
        });
      else res.send(data);
    });
};

//gets a drink by id
exports.get = (req, res) => {
    Drink.get(req.params.id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving drink."
        });
      else res.send(data);
    });
};

exports.delete = (req, res) => {
    Drink.delete(req.params.id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while deleting the selected drink."
        });
      else res.send(data);
    });
};


// Updates a WHOLE drink item -> any fields left blank in body will be blank after request 
exports.update = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a drink object from req.body
    const drink = new Drink({
      name: req.body.name,
      price: req.body.price,
      available_stock: req.body.available_stock,
      max_stock: req.body.max_stock,
      description: req.body.description,
      logo: req.body.logo
    });
  
    //updates drink in the db
    Drink.update(req.params.id, drink, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while editing the drink."
        });
      else res.send(data);
    });
};

//sends request with params as id of drink to be updated and field to updated with body containing updated field
exports.updateField = (req, res) => {
  console.log(Object.keys(req.body));
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  else if(req.body.length > 1){
    res.status(400).send({
      message: "Body length can't be greater than 1"
    });
  }
  else if(Object.keys(req.body) != req.params.field)
  {
    res.status(400).send({
      message: "Field in params doesn't match field in body."
    });
  }
  Drink.updateField(req.params.id, req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while updating the field of the selected drink."
      });
    else res.send(data);
  });
};

//sends request with id of drink that is being purchased as a param
exports.purchase = (req, res) => {
    Drink.purchase(req.params.id, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while purchasing the selected drink."
        });
      else res.send(data);
    });
};