# QUICK REFERENCE CARD

## Installation & Running

```bash
# Install dependencies
npm install

# Development (with auto-reload)
npm run dev

# Production
npm start
```

## Database Setup

```bash
# MySQL Command
mysql -u root -p
CREATE DATABASE library_system;
EXIT;
```

## Configuration (.env)

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=library_system
DB_PORT=3306
NODE_ENV=development
SERVER_PORT=3000
```

## API Request Examples

### 1. Create Book (Admin)
```bash
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -H "x-user-role: admin" \
  -d '{"title":"Book Title","author":"Author Name","stock":5}'
```

### 2. Get All Books (User/Admin)
```bash
curl -X GET http://localhost:3000/api/books \
  -H "x-user-role: user"
```

### 3. Get Book by ID
```bash
curl -X GET http://localhost:3000/api/books/1 \
  -H "x-user-role: user"
```

### 4. Update Book (Admin)
```bash
curl -X PUT http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -H "x-user-role: admin" \
  -d '{"title":"Updated Title","stock":10}'
```

### 5. Delete Book (Admin)
```bash
curl -X DELETE http://localhost:3000/api/books/1 \
  -H "x-user-role: admin"
```

### 6. Borrow Book (User)
```bash
curl -X POST http://localhost:3000/api/borrow \
  -H "Content-Type: application/json" \
  -H "x-user-role: user" \
  -H "x-user-id: 1" \
  -d '{"bookId":1,"latitude":-6.2088,"longitude":106.8456}'
```

### 7. Get All Borrow Logs (Admin)
```bash
curl -X GET http://localhost:3000/api/borrow \
  -H "x-user-role: admin"
```

### 8. Get User Borrow Logs (Admin)
```bash
curl -X GET http://localhost:3000/api/borrow/user/1 \
  -H "x-user-role: admin"
```

## Postman Setup

1. Import `postman_collection.json` into Postman
2. Headers required:
   - `x-user-role`: admin or user
   - `x-user-id`: (for user role only)

## Database Queries

```sql
-- View all books
SELECT * FROM books;

-- View all borrow logs
SELECT * FROM borrow_logs;

-- View borrow logs with book details
SELECT bl.*, b.title, b.author 
FROM borrow_logs bl 
JOIN books b ON bl.bookId = b.id;

-- Check stock of specific book
SELECT id, title, stock FROM books WHERE id = 1;

-- Delete all data (reset)
DELETE FROM borrow_logs;
DELETE FROM books;
ALTER TABLE books AUTO_INCREMENT = 1;
ALTER TABLE borrow_logs AUTO_INCREMENT = 1;
```

## Error Codes

| Status | Meaning | Example |
|--------|---------|---------|
| 200 | Success | GET /api/books |
| 201 | Created | POST /api/books |
| 400 | Bad Request | Empty title |
| 403 | Forbidden | Non-admin accessing POST |
| 404 | Not Found | GET /api/books/999 |
| 500 | Server Error | Database error |

## Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| Cannot connect to MySQL | Check .env config, ensure MySQL is running |
| Port 3000 in use | Change SERVER_PORT in .env |
| Database doesn't exist | Run `CREATE DATABASE library_system;` |
| Permission denied | Check DB_USER and DB_PASSWORD in .env |
| Missing x-user-role header | Add header to request |
| Book not found | Check if bookId exists in database |

## File Location Quick Map

```
server.js                    ← Main entry point
├── routes/
│   ├── bookRoutes.js       ← Book endpoints
│   └── borrowRoutes.js     ← Borrow endpoints
├── controllers/
│   ├── bookController.js   ← Book logic
│   └── borrowController.js ← Borrow logic
├── models/
│   ├── Book.js             ← Book model
│   └── BorrowLog.js        ← BorrowLog model
├── middleware/
│   ├── authMiddleware.js   ← Role checking
│   └── errorHandler.js     ← Error handling
├── config/
│   └── database.js         ← Database config
└── .env                    ← Configuration
```

## API Response Format

### Success Response (200, 201)
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* resource data */ }
}
```

### Error Response (400, 404, 403, 500)
```json
{
  "success": false,
  "message": "Error description",
  "errors": ["optional", "error", "details"]
}
```

## Key Information

- **Server Port**: 3000 (configurable in .env)
- **Database**: MySQL (Sequelize ORM)
- **Auth Method**: Header-based (x-user-role, x-user-id)
- **Validation**: Input validation on all endpoints
- **Error Handling**: Centralized middleware

## Testing Workflow

1. ✅ Start server: `npm run dev`
2. ✅ Create sample book (Admin)
3. ✅ Get all books (User)
4. ✅ Borrow book (User with location)
5. ✅ Check borrow logs (Admin)
6. ✅ Verify stock decreased
7. ✅ Test error scenarios

## Database Verification

```bash
# Login to MySQL
mysql -u root -p

# Select database
USE library_system;

# Check tables
SHOW TABLES;

# View structure
DESC books;
DESC borrow_logs;

# View data
SELECT * FROM books;
SELECT * FROM borrow_logs;
```

## Important Notes

- Location coordinates are stored with geolocation
- Stock automatically decreases on borrow
- Users need x-user-id header for borrow endpoint
- Admin can view all borrow logs
- Validation prevents invalid data entry
- Error messages are descriptive

---

**For complete documentation, see:**
- README.md - Full API docs
- SETUP_GUIDE.md - Detailed setup
- SPECIFICATION_CHECKLIST.md - Requirements verification
