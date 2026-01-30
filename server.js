require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const bookRoutes = require('./routes/bookRoutes');
const borrowRoutes = require('./routes/borrowRoutes');
const { checkRole } = require('./middleware/authMiddleware');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Custom role checking middleware for all routes
app.use(checkRole);

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
  });
});

// Error handling middleware
app.use(errorHandler);

// Database synchronization and server startup
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully');

    // Sync all models
    await sequelize.sync({ alter: true });
    console.log('Database synchronized');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log('API Documentation:');
      console.log('- GET /api/books - Get all books (Public)');
      console.log('- GET /api/books/:id - Get book by ID (Public)');
      console.log('- POST /api/books - Create book (Admin)');
      console.log('- PUT /api/books/:id - Update book (Admin)');
      console.log('- DELETE /api/books/:id - Delete book (Admin)');
      console.log('- POST /api/borrow - Borrow book (User)');
      console.log('- GET /api/borrow - Get all borrow logs (Admin)');
      console.log('- GET /api/borrow/user/:userId - Get user borrow logs (Admin)');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
