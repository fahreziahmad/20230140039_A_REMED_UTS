# SETUP GUIDE - Library System with Geolocation

## Step 1: Database Setup

### 1.1 Create Database
```sql
CREATE DATABASE library_system;
```

### 1.2 Configure .env
Edit file `.env` dengan konfigurasi database Anda:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password (biarkan kosong jika no password)
DB_NAME=library_system
DB_PORT=3306
NODE_ENV=development
SERVER_PORT=3000
```

## Step 2: Install Dependencies

```bash
npm install
```

Dependencies yang akan diinstall:
- express@^4.18.2 - Web framework
- sequelize@^6.35.2 - ORM untuk MySQL
- mysql2@^3.6.5 - MySQL driver
- cors@^2.8.5 - CORS middleware
- dotenv@^16.3.1 - Environment variables
- nodemon@^3.0.2 - Auto-reload (dev only)

## Step 3: Run Application

### Development Mode (dengan auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

### Expected Output
```
Database connected successfully
Database synchronized
Server running on http://localhost:3000
API Documentation:
- GET /api/books - Get all books (Public)
- GET /api/books/:id - Get book by ID (Public)
- POST /api/books - Create book (Admin)
- PUT /api/books/:id - Update book (Admin)
- DELETE /api/books/:id - Delete book (Admin)
- POST /api/borrow - Borrow book (User)
- GET /api/borrow - Get all borrow logs (Admin)
- GET /api/borrow/user/:userId - Get user borrow logs (Admin)
```

## Step 4: Test Endpoints

### 4.1 Menggunakan Postman

1. Import file `postman_collection.json` ke Postman
2. Atau buat manual dengan cara berikut:

**Create Book (Admin)**
```
POST http://localhost:3000/api/books

Headers:
x-user-role: admin

Body (JSON):
{
  "title": "Harry Potter and the Sorcerer's Stone",
  "author": "J.K. Rowling",
  "stock": 10
}
```

Expected Response (201 Created):
```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "id": 1,
    "title": "Harry Potter and the Sorcerer's Stone",
    "author": "J.K. Rowling",
    "stock": 10,
    "createdAt": "2024-01-27T10:00:00.000Z",
    "updatedAt": "2024-01-27T10:00:00.000Z"
  }
}
```

**Get All Books (Public)**
```
GET http://localhost:3000/api/books

Headers:
x-user-role: user
```

**Borrow Book (User)**
```
POST http://localhost:3000/api/borrow

Headers:
x-user-role: user
x-user-id: 1

Body (JSON):
{
  "bookId": 1,
  "latitude": -6.2088,
  "longitude": 106.8456
}
```

### 4.2 Menggunakan cURL

```bash
# Create book
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -H "x-user-role: admin" \
  -d '{
    "title": "The Lord of the Rings",
    "author": "J.R.R. Tolkien",
    "stock": 8
  }'

# Get all books
curl -X GET http://localhost:3000/api/books \
  -H "x-user-role: user"

# Borrow book
curl -X POST http://localhost:3000/api/borrow \
  -H "Content-Type: application/json" \
  -H "x-user-role: user" \
  -H "x-user-id: 1" \
  -d '{
    "bookId": 1,
    "latitude": -6.2088,
    "longitude": 106.8456
  }'
```

## Step 5: Verify Database

### Check Tables di MySQL
```sql
USE library_system;
SHOW TABLES;
DESC books;
DESC borrow_logs;
```

### View Data
```sql
SELECT * FROM books;
SELECT * FROM borrow_logs;
```

## Troubleshooting

### Error: "ECONNREFUSED" (Cannot connect to MySQL)
- Pastikan MySQL Server sudah running
- Cek konfigurasi `.env` - hostname, user, password
- Pastikan database sudah dibuat

### Error: "Access denied for user 'root'@'localhost'"
- Update password di `.env` sesuai konfigurasi MySQL Anda
- Atau create user baru di MySQL:
```sql
CREATE USER 'library_user'@'localhost' IDENTIFIED BY 'password123';
GRANT ALL PRIVILEGES ON library_system.* TO 'library_user'@'localhost';
FLUSH PRIVILEGES;
```

### Error: "Unknown database 'library_system'"
- Create database dulu:
```sql
CREATE DATABASE library_system;
```

### Error: "Port 3000 already in use"
- Change port di `.env`:
```
SERVER_PORT=3001
```
- Atau stop aplikasi lain yang menggunakan port 3000

## Project Structure Explanation

```
config/
  └── database.js              # Sequelize configuration & connection

models/
  ├── Book.js                  # Book model dengan fields: title, author, stock
  └── BorrowLog.js            # BorrowLog model dengan fields: userId, bookId, latitude, longitude

controllers/
  ├── bookController.js       # Business logic untuk operasi buku
  └── borrowController.js     # Business logic untuk operasi peminjaman

routes/
  ├── bookRoutes.js           # Routing untuk endpoint /api/books
  └── borrowRoutes.js         # Routing untuk endpoint /api/borrow

middleware/
  ├── authMiddleware.js       # Role checking berdasarkan x-user-role header
  └── errorHandler.js         # Centralized error handling

server.js                       # Main entry point - Express setup & server start
package.json                    # Dependencies & scripts
.env                           # Environment variables
README.md                      # Complete API documentation
postman_collection.json        # Postman collection untuk testing
```

## Key Features Implemented

✅ Node.js & Express.js backend
✅ MySQL database dengan Sequelize ORM
✅ Custom middleware untuk role-based access control
✅ Geolocation tracking saat peminjaman buku
✅ Automatic stock management
✅ Comprehensive input validation
✅ Proper error handling
✅ RESTful API design
✅ Database relationships (Book ↔ BorrowLog)
✅ Complete API documentation
✅ Postman collection untuk testing

## Next Steps (Optional Enhancements)

1. Implement JWT authentication
2. Add return/pengembalian buku functionality
3. Add late return penalties
4. Implement book search & filtering
5. Add pagination support
6. Create admin dashboard UI
7. Add unit & integration tests
8. Setup CI/CD pipeline
9. Add API rate limiting
10. Implement logging system

---

**Good luck with your UCP 1 exam!**
