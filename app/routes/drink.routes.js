module.exports = app => {
    const drink = require('../controllers/drink.controller.js');

    //gets all drinks
    app.get('/api/drink', drink.getAll);
    //creates a new drink 
    app.post('/api/drink', drink.newDrink);


    //get a specific drink (to purchase)
    app.get('/api/drink/:id', drink.get);
    //delete a drink from the list
    app.delete('/api/drink/:id', drink.delete);


    //update whole drink drink
    app.put('/api/drink/update/:id', drink.update);
    //update single field
    app.put('/api/drink/update/:id/:field', drink.updateField);

    
    //purchase a drink
    app.put('/api/drink/purchase/:id', drink.purchase);
};