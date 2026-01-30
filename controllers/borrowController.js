const Book = require('../models/Book');
const BorrowLog = require('../models/BorrowLog');

// POST borrow book (User only)
exports.borrowBook = async (req, res, next) => {
  try {
    const { bookId, latitude, longitude } = req.body;
    const userId = req.userId;

    // Validation
    if (!bookId) {
      return res.status(400).json({
        success: false,
        message: 'bookId is required',
      });
    }

    if (latitude === undefined || latitude === null) {
      return res.status(400).json({
        success: false,
        message: 'latitude is required',
      });
    }

    if (longitude === undefined || longitude === null) {
      return res.status(400).json({
        success: false,
        message: 'longitude is required',
      });
    }

    if (isNaN(latitude) || latitude < -90 || latitude > 90) {
      return res.status(400).json({
        success: false,
        message: 'latitude must be between -90 and 90',
      });
    }

    if (isNaN(longitude) || longitude < -180 || longitude > 180) {
      return res.status(400).json({
        success: false,
        message: 'longitude must be between -180 and 180',
      });
    }

    // Check if book exists
    const book = await Book.findByPk(bookId);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    // Check stock availability
    if (book.stock <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Book is out of stock',
      });
    }

    // Create borrow log
    const borrowLog = await BorrowLog.create({
      userId: parseInt(userId),
      bookId: parseInt(bookId),
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });

    // Decrease book stock
    await book.update({
      stock: book.stock - 1,
    });

    // Get the created borrow log with book details
    const borrowLogWithBook = await BorrowLog.findByPk(borrowLog.id, {
      include: [{ model: Book }],
    });

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrowLogWithBook,
    });
  } catch (error) {
    next(error);
  }
};

// GET all borrow logs
exports.getAllBorrowLogs = async (req, res, next) => {
  try {
    const borrowLogs = await BorrowLog.findAll({
      include: [{ model: Book }],
      order: [['borrowDate', 'DESC']],
    });

    res.status(200).json({
      success: true,
      message: 'Borrow logs retrieved successfully',
      data: borrowLogs,
    });
  } catch (error) {
    next(error);
  }
};

// GET borrow logs by user
exports.getBorrowLogsByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const borrowLogs = await BorrowLog.findAll({
      where: { userId: parseInt(userId) },
      include: [{ model: Book }],
      order: [['borrowDate', 'DESC']],
    });

    res.status(200).json({
      success: true,
      message: 'User borrow logs retrieved successfully',
      data: borrowLogs,
    });
  } catch (error) {
    next(error);
  }
};
