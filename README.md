# Library System with Geolocation

## Deskripsi Proyek

Aplikasi backend sederhana untuk manajemen perpustakaan dengan fitur peminjaman berbasis lokasi. Sistem ini menggunakan Node.js dengan Express.js sebagai framework web, MySQL sebagai database, dan Sequelize sebagai ORM.

## Fitur Utama

1. **Manajemen Buku**
   - Melihat semua buku (Public)
   - Melihat detail buku (Public)
   - Menambah buku baru (Admin)
   - Mengubah data buku (Admin)
   - Menghapus buku (Admin)

2. **Peminjaman Buku dengan Geolocation**
   - Pengguna dapat meminjam buku
   - Sistem mencatat koordinat lokasi (latitude, longitude) saat peminjaman
   - Otomatis mengurangi stok buku setiap kali peminjaman

3. **Role-Based Access Control**
   - **Admin**: Dapat mengelola data buku dan melihat semua log peminjaman
   - **User**: Dapat melihat buku dan meminjam buku
   - Role diverifikasi melalui header `x-user-role`

4. **Validasi Data**
   - Title dan author tidak boleh kosong
   - Stok harus berupa angka non-negatif
   - Latitude harus antara -90 hingga 90
   - Longitude harus antara -180 hingga 180

## Teknologi yang Digunakan

- **Runtime**: Node.js
- **Framework**: Express.js 4.18.2
- **Database**: MySQL
- **ORM**: Sequelize 6.35.2
- **Package Manager**: NPM

## Struktur Proyek

```
library-system-geolocation/
├── config/
│   └── database.js          # Konfigurasi database Sequelize
├── models/
│   ├── Book.js              # Model untuk tabel books
│   └── BorrowLog.js         # Model untuk tabel borrow_logs
├── controllers/
│   ├── bookController.js    # Logic untuk operasi buku
│   └── borrowController.js  # Logic untuk operasi peminjaman
├── routes/
│   ├── bookRoutes.js        # Endpoint untuk buku
│   └── borrowRoutes.js      # Endpoint untuk peminjaman
├── middleware/
│   ├── authMiddleware.js    # Middleware untuk role checking
│   └── errorHandler.js      # Middleware untuk error handling
├── server.js                # Entry point aplikasi
├── package.json             # Dependencies
├── .env                     # Environment variables
└── README.md               # Dokumentasi ini
```

## Instalasi & Setup

### 1. Prasyarat
- Node.js (v14 atau lebih tinggi)
- MySQL Server
- NPM atau Yarn

### 2. Langkah Instalasi

```bash
# Clone atau buka project directory
cd library-system-geolocation

# Install dependencies
npm install

# Setup database di MySQL
CREATE DATABASE library_system;

# Konfigurasi .env file
nano .env
```

### 3. Konfigurasi .env

Sesuaikan konfigurasi database di file `.env`:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=library_system
DB_PORT=3306
NODE_ENV=development
SERVER_PORT=3000
```

### 4. Jalankan Aplikasi

```bash
# Development mode (dengan auto-reload)
npm run dev

# Production mode
npm start
```

Aplikasi akan berjalan di `http://localhost:3000`

## API Endpoints

### Public Endpoints (Tanpa role requirement)

#### 1. Get All Books
```
GET /api/books
Headers:
  x-user-role: admin | user

Response:
{
  "success": true,
  "message": "Books retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "stock": 5,
      "createdAt": "2024-01-27T10:00:00.000Z",
      "updatedAt": "2024-01-27T10:00:00.000Z"
    }
  ]
}
```

#### 2. Get Book by ID
```
GET /api/books/:id
Headers:
  x-user-role: admin | user

Parameters:
  id: Book ID (number)

Response:
{
  "success": true,
  "message": "Book retrieved successfully",
  "data": {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "stock": 5,
    "createdAt": "2024-01-27T10:00:00.000Z",
    "updatedAt": "2024-01-27T10:00:00.000Z"
  }
}
```

### Admin Endpoints

#### 3. Create Book
```
POST /api/books
Headers:
  x-user-role: admin

Body:
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "stock": 5
}

Response:
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "stock": 5,
    "createdAt": "2024-01-27T10:00:00.000Z",
    "updatedAt": "2024-01-27T10:00:00.000Z"
  }
}
```

#### 4. Update Book
```
PUT /api/books/:id
Headers:
  x-user-role: admin

Parameters:
  id: Book ID (number)

Body (all fields optional):
{
  "title": "The Great Gatsby - Updated",
  "author": "F. Scott Fitzgerald",
  "stock": 10
}

Response:
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "id": 1,
    "title": "The Great Gatsby - Updated",
    "author": "F. Scott Fitzgerald",
    "stock": 10,
    "createdAt": "2024-01-27T10:00:00.000Z",
    "updatedAt": "2024-01-27T10:15:00.000Z"
  }
}
```

#### 5. Delete Book
```
DELETE /api/books/:id
Headers:
  x-user-role: admin

Parameters:
  id: Book ID (number)

Response:
{
  "success": true,
  "message": "Book deleted successfully",
  "data": {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "stock": 5,
    "createdAt": "2024-01-27T10:00:00.000Z",
    "updatedAt": "2024-01-27T10:00:00.000Z"
  }
}
```

#### 6. Get All Borrow Logs
```
GET /api/borrow
Headers:
  x-user-role: admin

Response:
{
  "success": true,
  "message": "Borrow logs retrieved successfully",
  "data": [
    {
      "id": 1,
      "userId": 1,
      "bookId": 1,
      "borrowDate": "2024-01-27T10:30:00.000Z",
      "latitude": -6.2088,
      "longitude": 106.8456,
      "createdAt": "2024-01-27T10:30:00.000Z",
      "updatedAt": "2024-01-27T10:30:00.000Z",
      "Book": {
        "id": 1,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "stock": 4
      }
    }
  ]
}
```

#### 7. Get Borrow Logs by User
```
GET /api/borrow/user/:userId
Headers:
  x-user-role: admin

Parameters:
  userId: User ID (number)

Response:
{
  "success": true,
  "message": "User borrow logs retrieved successfully",
  "data": [
    {
      "id": 1,
      "userId": 1,
      "bookId": 1,
      "borrowDate": "2024-01-27T10:30:00.000Z",
      "latitude": -6.2088,
      "longitude": 106.8456,
      "createdAt": "2024-01-27T10:30:00.000Z",
      "updatedAt": "2024-01-27T10:30:00.000Z",
      "Book": {
        "id": 1,
        "title": "The Great Gatsby",
        "author": "F. Scott Fitzgerald",
        "stock": 4
      }
    }
  ]
}
```

### User Endpoints

#### 8. Borrow Book
```
POST /api/borrow
Headers:
  x-user-role: user
  x-user-id: 1

Body:
{
  "bookId": 1,
  "latitude": -6.2088,
  "longitude": 106.8456
}

Response:
{
  "success": true,
  "message": "Book borrowed successfully",
  "data": {
    "id": 1,
    "userId": 1,
    "bookId": 1,
    "borrowDate": "2024-01-27T10:30:00.000Z",
    "latitude": -6.2088,
    "longitude": 106.8456,
    "createdAt": "2024-01-27T10:30:00.000Z",
    "updatedAt": "2024-01-27T10:30:00.000Z",
    "Book": {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "stock": 4
    }
  }
}
```

## Database Schema

### Tabel: books
```sql
CREATE TABLE `books` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `author` VARCHAR(255) NOT NULL,
  `stock` INT NOT NULL DEFAULT 0,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Tabel: borrow_logs
```sql
CREATE TABLE `borrow_logs` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `userId` INT NOT NULL,
  `bookId` INT NOT NULL,
  `borrowDate` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `latitude` FLOAT NOT NULL,
  `longitude` FLOAT NOT NULL,
  `createdAt` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (`bookId`) REFERENCES `books`(`id`)
);
```

## Error Handling

Aplikasi menangani beberapa jenis error:

1. **Validation Error (400)** - Data tidak valid atau tidak lengkap
2. **Not Found Error (404)** - Resource tidak ditemukan
3. **Unauthorized Error (403)** - Role tidak memiliki akses
4. **Server Error (500)** - Error internal server

Contoh error response:
```json
{
  "success": false,
  "message": "Validation error atau error description",
  "errors": ["error detail 1", "error detail 2"]
}
```

## Testing dengan Postman

### Setup Postman Collection

1. Buka Postman
2. Create new collection "Library System"
3. Set authorization header `x-user-role` untuk setiap request

### Test Cases

**1. Create Book (Admin)**
```
POST http://localhost:3000/api/books
Headers:
  x-user-role: admin
Body:
{
  "title": "Harry Potter",
  "author": "J.K. Rowling",
  "stock": 10
}


**2. Get All Books (Public)**


**3. Borrow Book (User)**



