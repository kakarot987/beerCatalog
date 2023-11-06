const db = require("../dbModel");

// Middleware to check for duplicate usernames or emails
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
      return res.status(500).json({
        message: error.message
      });
    }
  };
  


const verifyBeerName = {
    checkDuplicateBeerName
};

module.exports = verifyBeerName;