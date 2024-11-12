const express = require('express');
const connectDB = require('./src/config/db');
const postRoutes = require('./src/routes/postRoutes');
const cors = require('cors');
require('dotenv').config();

connectDB();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/posts', postRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

