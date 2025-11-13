// backend/seed.js
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/mernapp';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

const products = [
  { name: "Laptop", price: 1200, description: "Powerful laptop" },
  { name: "Headphones", price: 200, description: "Noise cancelling" },
  { name: "Smartphone", price: 850, description: "Latest gen phone" },
  { name: "Keyboard", price: 100, description: "Mechanical keyboard" }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to Mongo for seeding...');
    await Product.deleteMany({});
    console.log('Cleared products collection.');
    await Product.insertMany(products);
    console.log('Inserted seed products.');
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();

