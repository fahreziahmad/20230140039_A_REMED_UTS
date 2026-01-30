const express = require('express');
const {
  borrowBook,
  getAllBorrowLogs,
  getBorrowLogsByUser,
} = require('../controllers/borrowController');
const { isUser, isAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// User routes
router.post('/', isUser, borrowBook);

// Admin routes (view all borrow logs)
router.get('/', isAdmin, getAllBorrowLogs);
router.get('/user/:userId', isAdmin, getBorrowLogsByUser);

module.exports = router;
