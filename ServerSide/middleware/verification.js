const db = require("../dbModel");
const Beer = db.beer; // Ensure that Beer is correctly imported from dbModel

// Middleware to check for duplicate beer names
const checkDuplicateBeerName = async (req, res, next) => {
  try {
    // Check for duplicate beer name
    const existingBeer = await Beer.findOne({
      where: {
        name: req.body.name // Assuming the beer name is in the request body
      }
    });

    if (existingBeer) {
      return res.status(400).json({
        message: "Failed! Beer name is already in use."
      });
    }

    next();
  } catch (error) {
    console.error('Error checking duplicate beer name:', error);
    return res.status(500).json({
      message: error.message
    });
  }
};

const verifyBeerName = {
  checkDuplicateBeerName
};

module.exports = verifyBeerName;
