# ✅ TESTING CHECKLIST - Library System with Geolocation

Use this checklist to verify all functionality is working correctly.

## Phase 1: Setup Verification

- [ ] Node.js installed (run `node --version`)
- [ ] MySQL installed and running (run `mysql --version`)
- [ ] NPM installed (run `npm --version`)
- [ ] Database created (`CREATE DATABASE library_system;`)
- [ ] .env file configured with correct credentials
- [ ] Dependencies installed (`npm install`)
- [ ] Project folder opened in VS Code

## Phase 2: Application Startup

- [ ] Start application: `npm run dev`
- [ ] See "Database connected successfully" message
- [ ] See "Database synchronized" message
- [ ] See "Server running on http://localhost:3000" message
- [ ] No error messages in console
- [ ] Application ready for requests

## Phase 3: Database Verification

### Using MySQL Command Line
```bash
mysql -u root -p
USE library_system;
SHOW TABLES;
DESC books;
DESC borrow_logs;
EXIT;
```

- [ ] `books` table exists
- [ ] `borrow_logs` table exists
- [ ] Both tables empty initially
- [ ] Correct columns in each table

## Phase 4: Public Endpoints Testing

### 4.1 Test: Get All Books (Empty)
```
GET http://localhost:3000/api/books
Header: x-user-role: user
```
- [ ] Status: 200 OK
- [ ] Response includes success: true
- [ ] Data array exists (empty initially)
- [ ] No error message

### 4.2 Test: Get Book by ID (Not Found)
```
GET http://localhost:3000/api/books/999
Header: x-user-role: user
```
- [ ] Status: 404 Not Found
- [ ] Message: "Book not found"
- [ ] Success: false

### 4.3 Test: Missing x-user-role Header
```
GET http://localhost:3000/api/books
```
- [ ] Status: 400 Bad Request
- [ ] Message: "Header x-user-role is required"
- [ ] Success: false

### 4.4 Test: Invalid x-user-role Value
```
GET http://localhost:3000/api/books
Header: x-user-role: invalid
```
- [ ] Status: 400 Bad Request
- [ ] Message: "Invalid role. Allowed: admin or user"
- [ ] Success: false

## Phase 5: Admin Endpoints Testing

### 5.1 Test: Create Book (Valid)
```
POST http://localhost:3000/api/books
Header: x-user-role: admin
Body: {
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "stock": 5
}
```
- [ ] Status: 201 Created
- [ ] Response includes id: 1
- [ ] Title: "The Great Gatsby"
- [ ] Author: "F. Scott Fitzgerald"
- [ ] Stock: 5
- [ ] createdAt and updatedAt present

### 5.2 Test: Create Book (Empty Title)
```
POST http://localhost:3000/api/books
Header: x-user-role: admin
Body: {
  "title": "",
  "author": "Author Name",
  "stock": 5
}
```
- [ ] Status: 400 Bad Request
- [ ] Message: "Title cannot be empty"
- [ ] Success: false

### 5.3 Test: Create Book (Empty Author)
```
POST http://localhost:3000/api/books
Header: x-user-role: admin
Body: {
  "title": "Book Title",
  "author": "",
  "stock": 5
}
```
- [ ] Status: 400 Bad Request
- [ ] Message: "Author cannot be empty"
- [ ] Success: false

### 5.4 Test: Create Book (Missing Stock)
```
POST http://localhost:3000/api/books
Header: x-user-role: admin
Body: {
  "title": "Book Title",
  "author": "Author Name"
}
```
- [ ] Status: 400 Bad Request
- [ ] Message: "Stock is required"
- [ ] Success: false

### 5.5 Test: Create Book (Negative Stock)
```
POST http://localhost:3000/api/books
Header: x-user-role: admin
Body: {
  "title": "Book Title",
  "author": "Author Name",
  "stock": -5
}
```
- [ ] Status: 400 Bad Request
- [ ] Message: "Stock must be a non-negative number"
- [ ] Success: false

### 5.6 Test: Create Multiple Books
Create 3-4 more books with different titles for later testing.
- [ ] Create "1984" by "George Orwell" (stock: 3)
- [ ] Create "To Kill a Mockingbird" by "Harper Lee" (stock: 2)
- [ ] Create "Harry Potter" by "J.K. Rowling" (stock: 10)
- [ ] All show success: true

### 5.7 Test: Get All Books (Now with Data)
```
GET http://localhost:3000/api/books
Header: x-user-role: user
```
- [ ] Status: 200 OK
- [ ] Data array contains 3-4 books
- [ ] Each book has id, title, author, stock
- [ ] Timestamps present

### 5.8 Test: Get Specific Book
```
GET http://localhost:3000/api/books/1
Header: x-user-role: user
```
- [ ] Status: 200 OK
- [ ] Returns book with id: 1
- [ ] Data matches created book

### 5.9 Test: Update Book (Valid)
```
PUT http://localhost:3000/api/books/1
Header: x-user-role: admin
Body: {
  "title": "The Great Gatsby - Remaster",
  "stock": 8
}
```
- [ ] Status: 200 OK
- [ ] Title updated
- [ ] Stock updated to 8
- [ ] Author unchanged

### 5.10 Test: Update Book (Invalid Title)
```
PUT http://localhost:3000/api/books/1
Header: x-user-role: admin
Body: {
  "title": ""
}
```
- [ ] Status: 400 Bad Request
- [ ] Message: "Title cannot be empty"

### 5.11 Test: Update Non-existent Book
```
PUT http://localhost:3000/api/books/999
Header: x-user-role: admin
Body: {
  "title": "New Title"
}
```
- [ ] Status: 404 Not Found
- [ ] Message: "Book not found"

### 5.12 Test: Delete Book
```
DELETE http://localhost:3000/api/books/4
Header: x-user-role: admin
```
- [ ] Status: 200 OK
- [ ] Success: true
- [ ] Returns deleted book data

### 5.13 Test: Verify Deletion
```
GET http://localhost:3000/api/books/4
Header: x-user-role: user
```
- [ ] Status: 404 Not Found
- [ ] Message: "Book not found"

### 5.14 Test: User Cannot Create Book
```
POST http://localhost:3000/api/books
Header: x-user-role: user
Body: {
  "title": "Book",
  "author": "Author",
  "stock": 1
}
```
- [ ] Status: 403 Forbidden
- [ ] Message: "Access denied. Admin role required"

## Phase 6: User Endpoints Testing

### 6.1 Test: Borrow Book (Valid)
```
POST http://localhost:3000/api/borrow
Header: x-user-role: user
Header: x-user-id: 1
Body: {
  "bookId": 1,
  "latitude": -6.2088,
  "longitude": 106.8456
}
```
- [ ] Status: 201 Created
- [ ] Success: true
- [ ] Response includes userId: 1
- [ ] Response includes bookId: 1
- [ ] Latitude: -6.2088
- [ ] Longitude: 106.8456
- [ ] borrowDate present
- [ ] Book details included in response

### 6.2 Test: Verify Stock Decreased
```
GET http://localhost:3000/api/books/1
Header: x-user-role: user
```
- [ ] Stock decreased by 1 (was 5, now 4)

### 6.3 Test: Borrow Multiple Times
Borrow book 1 three more times with different coordinates:
```
- userId: 2, latitude: -6.1500, longitude: 106.9000
- userId: 3, latitude: -6.1800, longitude: 106.8200
- userId: 1, latitude: -6.1900, longitude: 106.8900
```
- [ ] All successful (Status 201)
- [ ] Stock now: 1 (5 - 4 borrows)

### 6.4 Test: Borrow Out of Stock Book
```
POST http://localhost:3000/api/borrow
Header: x-user-role: user
Header: x-user-id: 4
Body: {
  "bookId": 2,
  "latitude": -6.2088,
  "longitude": 106.8456
}
```
(First borrow book 2 twice to make stock 0)
- [ ] Status: 400 Bad Request
- [ ] Message: "Book is out of stock"

### 6.5 Test: Borrow Non-existent Book
```
POST http://localhost:3000/api/borrow
Header: x-user-role: user
Header: x-user-id: 1
Body: {
  "bookId": 999,
  "latitude": -6.2088,
  "longitude": 106.8456
}
```
- [ ] Status: 404 Not Found
- [ ] Message: "Book not found"

### 6.6 Test: Borrow Invalid Latitude
```
POST http://localhost:3000/api/borrow
Header: x-user-role: user
Header: x-user-id: 1
Body: {
  "bookId": 1,
  "latitude": 91,
  "longitude": 106.8456
}
```
- [ ] Status: 400 Bad Request
- [ ] Message: "latitude must be between -90 and 90"

### 6.7 Test: Borrow Invalid Longitude
```
POST http://localhost:3000/api/borrow
Header: x-user-role: user
Header: x-user-id: 1
Body: {
  "bookId": 1,
  "latitude": -6.2088,
  "longitude": 181
}
```
- [ ] Status: 400 Bad Request
- [ ] Message: "longitude must be between -180 and 180"

### 6.8 Test: Borrow Missing bookId
```
POST http://localhost:3000/api/borrow
Header: x-user-role: user
Header: x-user-id: 1
Body: {
  "latitude": -6.2088,
  "longitude": 106.8456
}
```
- [ ] Status: 400 Bad Request
- [ ] Message: "bookId is required"

### 6.9 Test: Borrow Missing x-user-id Header
```
POST http://localhost:3000/api/borrow
Header: x-user-role: user
Body: {
  "bookId": 1,
  "latitude": -6.2088,
  "longitude": 106.8456
}
```
- [ ] Status: 400 Bad Request
- [ ] Message: "Header x-user-id is required for user role"

## Phase 7: Admin View Endpoints

### 7.1 Test: Get All Borrow Logs (Admin)
```
GET http://localhost:3000/api/borrow
Header: x-user-role: admin
```
- [ ] Status: 200 OK
- [ ] Success: true
- [ ] Data array contains all borrow transactions
- [ ] Each entry has userId, bookId, borrowDate, latitude, longitude
- [ ] Book details included
- [ ] Ordered by borrowDate DESC

### 7.2 Test: Get User Borrow Logs
```
GET http://localhost:3000/api/borrow/user/1
Header: x-user-role: admin
```
- [ ] Status: 200 OK
- [ ] Data contains only user 1's borrows
- [ ] Multiple entries if user borrowed multiple times

### 7.3 Test: Get Non-existent User Logs
```
GET http://localhost:3000/api/borrow/user/999
Header: x-user-role: admin
```
- [ ] Status: 200 OK
- [ ] Data array is empty

### 7.4 Test: User Cannot View All Borrow Logs
```
GET http://localhost:3000/api/borrow
Header: x-user-role: user
```
- [ ] Status: 403 Forbidden
- [ ] Message: "Access denied. Admin role required"

## Phase 8: Database Verification

### 8.1 Check Books Table
```sql
SELECT * FROM books;
```
- [ ] Show all created books
- [ ] Verify stock decreased for borrowed books
- [ ] Timestamps updated correctly

### 8.2 Check Borrow Logs Table
```sql
SELECT * FROM borrow_logs;
```
- [ ] Show all borrow transactions
- [ ] Geolocation data present
- [ ] Foreign key relationships valid

### 8.3 Advanced Query
```sql
SELECT bl.*, b.title, b.author, b.stock
FROM borrow_logs bl
JOIN books b ON bl.bookId = b.id
ORDER BY bl.borrowDate DESC;
```
- [ ] All borrow transactions with book details visible
- [ ] Relationships working correctly

## Phase 9: Edge Cases & Special Scenarios

### 9.1 Test: Empty String Spaces
```
POST /api/books
Body: {"title": "   ", "author": "Test", "stock": 1}
```
- [ ] Should be rejected (treated as empty)

### 9.2 Test: Very Large Numbers
```
POST /api/borrow
Body: {
  "bookId": 1,
  "latitude": 89.99999,
  "longitude": 179.99999
}
```
- [ ] Should accept (within bounds)

### 9.3 Test: Decimal Values
```
POST /api/borrow
Body: {
  "bookId": 1,
  "latitude": -6.123456,
  "longitude": 106.654321
}
```
- [ ] Should accept and store correctly

### 9.4 Test: Zero Stock Book
```
POST /api/books
Header: x-user-role: admin
Body: {"title": "Limited", "author": "Test", "stock": 0}
```
Then try to borrow:
- [ ] Create successful
- [ ] Borrow fails with "out of stock"

## Phase 10: Health Check

### 10.1 Test: Health Endpoint
```
GET http://localhost:3000/api/health
Header: x-user-role: user
```
- [ ] Status: 200 OK
- [ ] Message: "Server is running"

## Phase 11: Performance & Load

### 11.1 Response Time Check
- [ ] Each request responds within 1 second
- [ ] Database queries efficient
- [ ] No timeout errors

### 11.2 Data Integrity
- [ ] No duplicate borrow entries
- [ ] Stock numbers consistent
- [ ] Foreign keys maintained

## Summary Checklist

### Endpoint Coverage
- [ ] 2 public endpoints working
- [ ] 5 admin endpoints working
- [ ] 1 user endpoint working
- [ ] 1 health check endpoint working
- [ ] Total: 9 endpoints functional

### Error Handling
- [ ] 400 Bad Request for validation errors
- [ ] 403 Forbidden for unauthorized access
- [ ] 404 Not Found for missing resources
- [ ] 201 Created for successful creation
- [ ] 200 OK for successful operations
- [ ] Error messages are descriptive

### Data Management
- [ ] Books properly stored
- [ ] Stock decreases on borrow
- [ ] Borrow logs with geolocation
- [ ] Timestamps working
- [ ] Foreign keys maintained

### Documentation
- [ ] README.md clear and complete
- [ ] Examples provided
- [ ] Error codes documented
- [ ] Setup instructions accurate

## Final Sign-Off

- [ ] All tests passed
- [ ] No errors in console
- [ ] Database consistent
- [ ] Ready for submission

---

**Test Date:** ________________
**Tester Name:** ________________
**Status:** ✅ **PASSED** / ❌ **FAILED**

**Notes:**
_________________________________________________________________
_________________________________________________________________
_________________________________________________________________

---

**Congratulations! Your API is ready for use.** 🎉
