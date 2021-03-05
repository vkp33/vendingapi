const sql = require("./db.js");

const Drink = function(drink) {
    this.name = drink.name;
    this.price = drink.price;
    this.available_stock = drink.available_stock;
    this.max_stock = drink.max_stock;
    this.description = drink.description;
    this.logo = drink.logo;
  };


//creates a new drink item 
Drink.newDrink = (newDrink, result) => {
  sql.query(`INSERT INTO drinks (name, price, available_stock, max_stock, description, logo) VALUES ('${newDrink.name}', ${newDrink.price}, ${newDrink.available_stock}, ${newDrink.max_stock}, '${newDrink.description}', '${newDrink.logo}')`, 
  (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    //console.log("created drink: ", {res});
    result(null, { id: res.insertId});
  });
};

Drink.getAll = result => {
  sql.query('SELECT * FROM drinks', (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("drinks: ", res);
    result(null, res);
  });
};



Drink.get = (id, result) => {
  sql.query('SELECT * FROM drinks WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("successfully retrieved drink: ", res);
    result(null, res);
  });
};

Drink.delete = (id, result) => {
  sql.query('DELETE FROM drinks WHERE id = ?', id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log("successfully deleted drink: ", res);
    result(null, res);
  });
};

//update a whole drink item 
Drink.update = (id, newDrink, result) => {
  var queryText = 'UPDATE drinks SET ? WHERE id = ?';
  var params = [
      {
          name: newDrink.name,
          price: newDrink.price,
          available_stock: newDrink.available_stock,
          max_stock: newDrink.max_stock,
          description: newDrink.description,
          logo: newDrink.logo
      }, id];
  sql.query(queryText, params, function(err, res, fields){
      if(err){
          console.log('Error: ' + err);
          result(err, null);
          return
      }
      //console.log('Updated Drink ' + res);
      result(null, res);
      return;
  });
};

//updates the field in updatedField for drink specified by id 
Drink.updateField = (id, updatedField, result) => {
  var queryText = 'UPDATE drinks SET ? WHERE id = ?';
  var params = [updatedField, id];
  sql.query(queryText, params, function(err, res, fields){
      if(err){
          console.log('Error: ' + err);
          result(err, null);
          return
      }
      //console.log('Updated Drink ' + res);
      result(null, res);
      return;
  });
};

//reduces available stock of drink specified by id by 1. Available stock can't be set below 1 or greater than max_stock.
Drink.purchase = (id, result) => {
  sql.query('UPDATE drinks SET available_stock = available_stock - 1 WHERE id = ? and available_stock > 0', id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("successfully purchased the selected drink: ", res);
    result(null, res);
    //console.log(res.message);
  });
};

module.exports = Drink;