const mongoose = require('mongoose');
const Food = require('./models/Food');
require('dotenv').config();

// Sample food data
const sampleFoods = [
  {
    food_name: 'Delicious Pizza',
    food_price: 299,
    food_image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=200&fit=crop'
  },
  {
    food_name: 'Crispy Burger',
    food_price: 199,
    food_image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop'
  },
  {
    food_name: 'Tasty Dosa',
    food_price: 149,
    food_image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300&h=200&fit=crop'
  },
  {
    food_name: 'Paneer Parantha',
    food_price: 179,
    food_image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=300&h=200&fit=crop'
  },
  {
    food_name: 'Chocolate Shake',
    food_price: 129,
    food_image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?w=300&h=200&fit=crop'
  },
  {
    food_name: 'Strawberry Shake',
    food_price: 129,
    food_image: 'https://images.unsplash.com/photo-1553787434-6f0acf2b8b6b?w=300&h=200&fit=crop'
  },
  {
    food_name: 'Vanilla Shake',
    food_price: 119,
    food_image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300&h=200&fit=crop'
  },
  {
    food_name: 'Butterscotch Shake',
    food_price: 139,
    food_image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop'
  },
  {
    food_name: 'Pav Bhaji',
    food_price: 89,
    food_image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=300&h=200&fit=crop'
  },
  {
    food_name: 'Aloo Parantha',
    food_price: 99,
    food_image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=300&h=200&fit=crop'
  },
  {
    food_name: 'Gobi Parantha',
    food_price: 109,
    food_image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=300&h=200&fit=crop'
  },
  {
    food_name: 'Pyaz Parantha',
    food_price: 79,
    food_image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=300&h=200&fit=crop'
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/restaurant', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing foods
    await Food.deleteMany({});
    console.log('Cleared existing foods');

    // Insert sample foods
    await Food.insertMany(sampleFoods);
    console.log('Sample foods inserted successfully');

    // Close connection
    await mongoose.disconnect();
    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
