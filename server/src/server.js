const express = require('express');
const cors = require('cors'); // Middleware to enable cross-origin resource sharing
const dotenv = require('dotenv'); 
const authRoutes = require('./routes/authRoutes');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Calorie Tracker API is running',
    timestamp: new Date().toISOString()
  });
});

// Mount auth routes
app.use('/api/auth', authRoutes);

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler 
// Express recognizes this as an error-handling middleware because it has four arguments
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'An error occurred!',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
