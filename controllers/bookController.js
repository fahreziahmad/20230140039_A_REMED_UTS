const Book = require('../models/Book');

// GET all books
exports.getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.findAll();

    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: books,
    });
  } catch (error) {
    next(error);
  }
};

// GET book by ID
exports.getBookById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

// POST create new book (Admin only)
exports.createBook = async (req, res, next) => {
  try {
    const { title, author, stock } = req.body;

    // Validation
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title cannot be empty',
      });
    }

    if (!author || author.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Author cannot be empty',
      });
    }

    if (stock === undefined || stock === null) {
      return res.status(400).json({
        success: false,
        message: 'Stock is required',
      });
    }

    if (isNaN(stock) || stock < 0) {
      return res.status(400).json({
        success: false,
        message: 'Stock must be a non-negative number',
      });
    }

    const newBook = await Book.create({
      title: title.trim(),
      author: author.trim(),
      stock: parseInt(stock),
    });

    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: newBook,
    });
  } catch (error) {
    next(error);
  }
};

// PUT update book (Admin only)
exports.updateBook = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, author, stock } = req.body;

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    // Validation
    if (title !== undefined && (title === null || title.trim() === '')) {
      return res.status(400).json({
        success: false,
        message: 'Title cannot be empty',
      });
    }

    if (author !== undefined && (author === null || author.trim() === '')) {
      return res.status(400).json({
        success: false,
        message: 'Author cannot be empty',
      });
    }

    if (stock !== undefined && (isNaN(stock) || stock < 0)) {
      return res.status(400).json({
        success: false,
        message: 'Stock must be a non-negative number',
      });
    }

    await book.update({
      title: title !== undefined ? title.trim() : book.title,
      author: author !== undefined ? author.trim() : book.author,
      stock: stock !== undefined ? parseInt(stock) : book.stock,
    });

    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: book,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE book (Admin only)
exports.deleteBook = async (req, res, next) => {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: 'Book not found',
      });
    }

    await book.destroy();

    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: book,
    });
  } catch (error) {
    next(error);
  }
};
