# DATABASE QUERIES REFERENCE

## Initial Setup Queries

### 1. Create Database
```sql
CREATE DATABASE library_system;
USE library_system;
```

## Table Structure (Auto-created by Sequelize)

### Books Table
```sql
CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `stock` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
);
```

### Borrow Logs Table
```sql
CREATE TABLE `borrow_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `bookId` int NOT NULL,
  `borrowDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `latitude` float NOT NULL,
  `longitude` float NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bookId` (`bookId`),
  CONSTRAINT `borrow_logs_ibfk_1` FOREIGN KEY (`bookId`) REFERENCES `books` (`id`)
);
```

## Data Manipulation Queries

### View All Books
```sql
SELECT * FROM books;
```

### View Book Details
```sql
SELECT * FROM books WHERE id = 1;
```

### View All Borrow Logs
```sql
SELECT * FROM borrow_logs;
```

### View Borrow Logs by User
```sql
SELECT * FROM borrow_logs WHERE userId = 1;
```

### View Borrow Logs by Book
```sql
SELECT * FROM borrow_logs WHERE bookId = 1;
```

### View Borrow Logs with Book Details
```sql
SELECT bl.*, b.title, b.author, b.stock
FROM borrow_logs bl
JOIN books b ON bl.bookId = b.id
ORDER BY bl.borrowDate DESC;
```

### View Borrow Logs with Geolocation
```sql
SELECT 
  bl.id,
  bl.userId,
  b.title,
  b.author,
  bl.borrowDate,
  bl.latitude,
  bl.longitude,
  CONCAT(bl.latitude, ', ', bl.longitude) AS location_coordinates
FROM borrow_logs bl
JOIN books b ON bl.bookId = b.id;
```

### Count Total Borrow Transactions
```sql
SELECT COUNT(*) as total_transactions FROM borrow_logs;
```

### Count Borrow Transactions by User
```sql
SELECT userId, COUNT(*) as total_borrows
FROM borrow_logs
GROUP BY userId;
```

### Count Borrow Transactions by Book
```sql
SELECT b.id, b.title, COUNT(bl.id) as times_borrowed
FROM books b
LEFT JOIN borrow_logs bl ON b.id = bl.bookId
GROUP BY b.id, b.title
ORDER BY times_borrowed DESC;
```

### View Books with Current Stock
```sql
SELECT 
  id,
  title,
  author,
  stock,
  CASE 
    WHEN stock = 0 THEN 'Out of Stock'
    WHEN stock < 3 THEN 'Low Stock'
    ELSE 'Available'
  END as status
FROM books;
```

### Delete Sample Data
```sql
-- Delete all borrow logs
DELETE FROM borrow_logs;

-- Delete all books
DELETE FROM books;

-- Reset auto increment
ALTER TABLE books AUTO_INCREMENT = 1;
ALTER TABLE borrow_logs AUTO_INCREMENT = 1;
```

## Advanced Queries

### Get Most Popular Books (by borrow count)
```sql
SELECT 
  b.id,
  b.title,
  b.author,
  COUNT(bl.id) as borrow_count,
  b.stock as current_stock
FROM books b
LEFT JOIN borrow_logs bl ON b.id = bl.bookId
GROUP BY b.id, b.title, b.author, b.stock
ORDER BY borrow_count DESC;
```

### Get Geolocation Heatmap (where books are most borrowed)
```sql
SELECT 
  ROUND(latitude, 2) as lat_rounded,
  ROUND(longitude, 2) as lon_rounded,
  COUNT(*) as borrow_count,
  GROUP_CONCAT(DISTINCT userId) as user_ids,
  GROUP_CONCAT(DISTINCT b.title SEPARATOR ', ') as books_borrowed
FROM borrow_logs bl
JOIN books b ON bl.bookId = b.id
GROUP BY lat_rounded, lon_rounded
ORDER BY borrow_count DESC;
```

### Get User Borrowing Pattern
```sql
SELECT 
  userId,
  COUNT(DISTINCT bookId) as unique_books,
  COUNT(*) as total_borrows,
  GROUP_CONCAT(DISTINCT b.title SEPARATOR ', ') as books_read,
  AVG(bl.latitude) as avg_latitude,
  AVG(bl.longitude) as avg_longitude
FROM borrow_logs bl
JOIN books b ON bl.bookId = b.id
GROUP BY userId;
```

### Get Last Borrowing Location per User
```sql
SELECT 
  b.id,
  userId,
  (SELECT bl2.latitude FROM borrow_logs bl2 WHERE bl2.userId = b.userId ORDER BY borrowDate DESC LIMIT 1) as last_latitude,
  (SELECT bl2.longitude FROM borrow_logs bl2 WHERE bl2.userId = b.userId ORDER BY borrowDate DESC LIMIT 1) as last_longitude
FROM (
  SELECT DISTINCT userId FROM borrow_logs
) b;
```

## Index Optimization Queries (Optional)

```sql
-- Add indexes for better query performance
CREATE INDEX idx_bookId ON borrow_logs(bookId);
CREATE INDEX idx_userId ON borrow_logs(userId);
CREATE INDEX idx_borrowDate ON borrow_logs(borrowDate);
CREATE INDEX idx_location ON borrow_logs(latitude, longitude);
CREATE INDEX idx_title ON books(title);
CREATE INDEX idx_author ON books(author);

-- Check indexes
SHOW INDEXES FROM borrow_logs;
SHOW INDEXES FROM books;
```

## Sample Data Insertion (Manual)

```sql
-- Insert sample books
INSERT INTO books (title, author, stock, createdAt, updatedAt) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 5, NOW(), NOW()),
('To Kill a Mockingbird', 'Harper Lee', 3, NOW(), NOW()),
('1984', 'George Orwell', 4, NOW(), NOW()),
('The Catcher in the Rye', 'J.D. Salinger', 2, NOW(), NOW()),
('Harry Potter and the Sorcerers Stone', 'J.K. Rowling', 10, NOW(), NOW());

-- Insert sample borrow logs
INSERT INTO borrow_logs (userId, bookId, borrowDate, latitude, longitude, createdAt, updatedAt) VALUES
(1, 1, NOW(), -6.2088, 106.8456, NOW(), NOW()),
(2, 2, NOW(), -6.1245, 106.8456, NOW(), NOW()),
(1, 3, NOW(), -6.2088, 106.7654, NOW(), NOW()),
(3, 5, NOW(), -6.1500, 106.9000, NOW(), NOW());
```

---

**Note**: These queries are optional for manual database inspection.
The Sequelize ORM in the Node.js application automatically manages database operations.
