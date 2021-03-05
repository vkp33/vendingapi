# Vending Machine API 

Before running, make sure NPM and Node are installed! You can check the versions of NPM and Node with the commands "npm -v" and "node -v" respectively. If you're missing either of them click [this link](https://www.npmjs.com/get-npm) to download them.

## To run the project

I've already hosted this api at https://vending-machine-project.herokuapp.com so there's no need to run anything! Heroku is running the project directly from this repository. 

If you have to run it locally the command is 'npm start'.

## Endpoints and their Functions

(all use x-www-form-urlencoded)

1. https://vending-machine-project.herokuapp.com/api/drink
    -a GET request gets all drinks

    -a POST request with body format below creates a new drink 
      {
        name: varchar(45),
        price: (Decimal with max 99.99 and min 0.00,
        available_stock: INT,
        max_stock: INT,
        description: varchar(100),
        logo: (link to image)
      }

2. https://vending-machine-project.herokuapp.com/api/:id
    //a GET request gets the drink with the specified id
    //a DELETE request deletes the drink with the specified id

3. https://vending-machine-project.herokuapp.com/api/drink/update/:id
    -a PUT request with body format below updates the whole drink (Note: if any field is left empty it will update the field to empty so use the second update route for updating single fields)
      {
        name: varchar(45),
        price: (Decimal with max 99.99 and min 0.00,
        available_stock: INT,
        max_stock: INT,
        description: varchar(100),
        logo: (link to image)
      }
    
4. https://vending-machine-project.herokuapp.com/api/drink/update/:id/:field
    -a PUT request with body below updates a single field
      {
        fieldinheader: new value 
      }
      
     Example: change the price of drink with id 1 by sending a PUT request to https://vending-machine-project.herokuapp.com/api/drink/update/1/price and the body would be 
      {
        price: newPrice
      }
    
5. https://vending-machine-project.herokuapp.com/api/drink/purchase/:id
    -a PUT request "purchases" a drink with specified id, reducing it's available stock by 1. 
    
     Example: a PUT request to https://vending-machine-project.herokuapp.com/api/drink/purchase/1 reduces available stock of drink with id 1.
