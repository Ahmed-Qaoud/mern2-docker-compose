// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// اتصال Mongo (اسم الخدمة في docker-compose سيكون "mongo")
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/mernapp';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Mongo Error:', err));

// --- Product Schema & Model ---
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// --- Routes ---
// Health
app.get('/api/health', (req, res) => res.json({ status: 'OK', time: new Date() }));

// GET products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }).limit(100);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST product (useful for admin or seed)
app.post('/api/products', async (req, res) => {
  try {
    const p = await Product.create(req.body);
    res.status(201).json(p);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

