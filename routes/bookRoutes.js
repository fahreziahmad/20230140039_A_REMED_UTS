const express = require('express');
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');
const { isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Public routes
router.get('/', getAllBooks);
router.get('/:id', getBookById);

// Admin routes
router.post('/', isAdmin, createBook);
router.put('/:id', isAdmin, updateBook);
router.delete('/:id', isAdmin, deleteBook);

module.exports = router;
