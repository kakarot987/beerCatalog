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
router.post('/create',
[
    verifyBeerName.checkDuplicateBeerName
], beerController.createBeer);

// Find a beer by ID
router.get('/:id', beerController.findBeerById);

module.exports = router;
};