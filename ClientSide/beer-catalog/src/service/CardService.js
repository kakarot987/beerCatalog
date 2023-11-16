// CardService.js
import axios from 'axios';

const API_ENDPOINT = 'http://localhost:8080/beers'; // Replace with your actual API endpoint

const fetchCardData = async () => {
  try {
    const response = await axios.get(API_ENDPOINT);
    return response.data;
  } catch (error) {
    console.error('Error fetching card data:', error);
    throw error;
  }
};
const addBeer = async (beerData) => {
  try {
    const response = await axios.post(API_ENDPOINT + '/create', beerData);
    return response.data;
  } catch (error) {
    console.error('Error adding beer:', error);
    throw error;
  }
};

export { fetchCardData , addBeer};
