const mongoose = require('mongoose');
const dburl = process.env.dburl;


const connectDB = async () => {
  try {
    await mongoose.connect(dburl);
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
};

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.error(`MongoDB connection error: ${err}`));

module.exports = connectDB;