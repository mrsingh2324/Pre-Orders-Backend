const axios = require('axios');

const fetchApiData = async () => {
  try {
    const encodedParams = new URLSearchParams();
    encodedParams.set('language', 'en_US');
    encodedParams.set('limit', '30');
    encodedParams.set('location_id', '297704');
    encodedParams.set('currency', 'USD');

    const options = {
      method: 'POST',
      url: 'https://worldwide-restaurants.p.rapidapi.com/search',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': 'ea4977bf0amsh9adcd7c26ff2a77p1e9751jsn94843b9f1fe5',
        'X-RapidAPI-Host': 'worldwide-restaurants.p.rapidapi.com'
      },
      data: encodedParams,
    };

    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  fetchApiData
};
