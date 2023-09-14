const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://mrsingh2423:satyam@cluster0.3e5ofvg.mongodb.net/?retryWrites=true&w=majority';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    });

    const dbConnection = mongoose.connection;

    dbConnection.on('connected', () => {
      console.log('Connected to MongoDB successfully!');
    });

    dbConnection.on('error', (err) => {
      console.error('Error connecting to MongoDB:', err.message);
    });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
