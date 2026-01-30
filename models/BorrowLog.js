const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Book = require('./Book');

const BorrowLog = sequelize.define('BorrowLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  bookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'books',
      key: 'id',
    },
  },
  borrowDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: -90,
      max: 90,
    },
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: -180,
      max: 180,
    },
  },
}, {
  tableName: 'borrow_logs',
  timestamps: true,
});

BorrowLog.belongsTo(Book, { foreignKey: 'bookId' });
Book.hasMany(BorrowLog, { foreignKey: 'bookId' });

module.exports = BorrowLog;
