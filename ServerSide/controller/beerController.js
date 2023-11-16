const db = require("../dbModel");
const Beer = db.beer;

  exports.createBeer = async (req, res) => {
    try {
      const newBeer = {
        name: req.body.name,
        // Assuming the file path or URL is provided in the request body
        photos: req.body.photos,
        price: req.body.price,
        description: req.body.description,
        rating: req.body.rating,
      };
  
      const beer = await Beer.create(newBeer);
      res.status(201).json(beer); // Respond with the newly created beer
    } catch (error) {
      console.error('Error creating beer:', error);
      res.status(500).json({ message: error.message });
    }
  };
  
  
  exports.findBeerById = async (req, res) => {
    const beerId = req.params.id; // Assuming the beer ID is provided in the route parameter
  
    try {
      const beer = await Beer.findByPk(beerId);
  
      if (!beer) {
        return res.status(404).json({ message: "Beer not found" });
      }
  
      res.status(200).json(beer);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.findAll = async (req, res) => {
    try {
      const beers = await Beer.findAll();
      res.json(beers);
    } catch (error) {
      console.error('Error fetching beers:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
    