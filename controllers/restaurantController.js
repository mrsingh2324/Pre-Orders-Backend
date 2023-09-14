const Restaurant = require('../models/restaurant');

const addRestaurant = async (req, res) => {
  try {
    const { name, location, foodType } = req.body;

    // Create a new restaurant
    const newRestaurant = new Restaurant({ name, location, foodType });
    await newRestaurant.save();

    res.status(201).json({ message: 'Restaurant added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

const getRestaurants = async (req, res) => {
  try {
    const { location, foodType } = req.query;

    let filter = {};
    if (location) {
      filter.location = location;
    }
    if (foodType) {
      filter['foodItems.veg.name'] = foodType;
    }

    // Query the restaurants based on the filter
    const restaurants = await Restaurant.find(filter);

    if (restaurants.length) {
      res.status(200).json({ message: 'Restaurants found', restaurants });
    } else {
      res.status(404).json({ message: 'No restaurants found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

module.exports = { addRestaurant, getRestaurants };
