const fs = require('fs');
const { Sequelize, DataTypes } = require('sequelize');
const db = require("./dbModel");
const Beer = db.beer;
const config = require('./dbConfig/dbConfig');

const jsonData = require('./initalInfo.json');

const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  }
);

async function saveDataToDatabase() {
  try {
    // Count the total number of rows in the Beer table
    const beerCount = await Beer.count();

    if (beerCount >= 9) {
      console.log('Data count is greater than or equal to 9. Skipping insertion.');
      return;
    }

    // Sync the model with the database
    await sequelize.sync();

    // Iterate over the JSON data and insert into the database
    for (const beer of jsonData.beers) {
      await Beer.create({
        name: beer.name || 'Random Name',
        photos: beer.photos || 'Random Photo URL',
        price: beer.price || Math.random() * 100,
        description: beer.description || 'Random Description',
        rating: beer.rating || Math.floor(Math.random() * 5) + 1,
      });
    }

    console.log('Data inserted successfully!');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
}

// Call the function to save data to the database
saveDataToDatabase();
