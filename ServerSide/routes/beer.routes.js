const express = require('express');
const router = express.Router();
const beerController = require('../controller/beerController'); // Import your controller
const verifyBeerName = require('../middleware/verification');

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, Content-Type, Accept"
      );
      next();
    });

// Create a new beer
app.post('/create',
[
    verifyBeerName.checkDuplicateBeerName
], beerController.createBeer);

// Find a beer by ID
app.get('/beers/:id', (req, res, next) => {
  console.log("Inside beer id");
  next();  // Call next to proceed to the next middleware or the controller function
}, beerController.findBeerById);

app.get("/", beerController.findAll);

module.exports = router;
};