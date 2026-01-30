# 📚 LIBRARY SYSTEM WITH GEOLOCATION - START HERE

Welcome to the UCP 1 Library System with Geolocation project! This document will guide you through understanding and running this application.

## 🎯 Choose Your Path

### 👨‍💻 I want to get started immediately
**→ Read:** [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
- Installation commands
- API curl examples
- Troubleshooting quick fixes

### 📖 I want complete documentation
**→ Read:** [README.md](README.md)
- Full API endpoint documentation
- Database schema details
- Complete examples
- Features overview

### 🚀 I want step-by-step setup instructions
**→ Read:** [SETUP_GUIDE.md](SETUP_GUIDE.md)
- Database setup
- Dependencies installation
- Server startup
- Endpoint testing with examples

### ✅ I want to verify all requirements are met
**→ Read:** [SPECIFICATION_CHECKLIST.md](SPECIFICATION_CHECKLIST.md)
- UCP 1 requirements checklist
- Scoring criteria mapping
- Feature implementation status
- Project structure overview

### 💾 I need SQL reference
**→ Read:** [DATABASE_QUERIES.md](DATABASE_QUERIES.md)
- Table creation queries
- Data manipulation queries
- Advanced queries for analysis
- Performance optimization tips

### 📊 I want project overview
**→ Read:** [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)
- Project statistics
- Technology stack
- Key features summary
- Learning outcomes

## ⚡ Quick Start (5 Minutes)

```bash
# 1. Install dependencies
npm install

# 2. Create database in MySQL
CREATE DATABASE library_system;

# 3. Start the server
npm run dev

# 4. Test an endpoint
curl -X GET http://localhost:3000/api/books \
  -H "x-user-role: user"
```

## 📁 Project Structure

```
library-system-geolocation/
├── 📄 server.js                    ← Main application
├── 📂 config/                      ← Database configuration
├── 📂 models/                      ← Data models (Book, BorrowLog)
├── 📂 controllers/                 ← Business logic
├── 📂 routes/                      ← API endpoints
├── 📂 middleware/                  ← Custom middleware
├── 📄 package.json                 ← Dependencies
├── 📄 .env                         ← Configuration
│
├── 📚 DOCUMENTATION
├── 📄 README.md                    ← Complete API docs
├── 📄 SETUP_GUIDE.md              ← Setup instructions
├── 📄 QUICK_REFERENCE.md          ← Quick commands
├── 📄 SPECIFICATION_CHECKLIST.md  ← Requirements
├── 📄 DATABASE_QUERIES.md         ← SQL reference
├── 📄 PROJECT_SUMMARY.md          ← Project overview
└── 📄 INDEX.md                    ← This file
```

## 🔑 Key Concepts

### Authentication (No JWT - Header-based)
- All requests require `x-user-role` header
- Valid roles: `admin` or `user`
- User role also requires `x-user-id` header

### Two Database Models
1. **Book** - Stores book information (title, author, stock)
2. **BorrowLog** - Stores borrow transactions with geolocation

### Three User Roles
1. **Public** - Can view books (no auth required for GET)
2. **Admin** - Can manage books and view all borrow logs
3. **User** - Can borrow books and track borrowings

## 📊 API Endpoints (8 Total)

| Method | Endpoint | Role | Purpose |
|--------|----------|------|---------|
| GET | /api/books | Public | Get all books |
| GET | /api/books/:id | Public | Get book by ID |
| POST | /api/books | Admin | Create book |
| PUT | /api/books/:id | Admin | Update book |
| DELETE | /api/books/:id | Admin | Delete book |
| POST | /api/borrow | User | Borrow book |
| GET | /api/borrow | Admin | Get all borrow logs |
| GET | /api/borrow/user/:id | Admin | Get user borrow logs |

## 🚦 Getting Started Steps

### Step 1: Install Node.js & MySQL
- Download Node.js from nodejs.org
- Download MySQL from mysql.com
- Ensure both are installed and in PATH

### Step 2: Clone/Download Project
- This project is in `e:\PAW\20230140039_A_REMED_UTS\`

### Step 3: Follow SETUP_GUIDE.md
See [SETUP_GUIDE.md](SETUP_GUIDE.md) for:
1. Database setup
2. Dependencies installation
3. Configuration
4. Running the application

### Step 4: Test Endpoints
Use provided Postman collection or cURL commands from [QUICK_REFERENCE.md](QUICK_REFERENCE.md)

## 📋 Documentation Map

| Document | Purpose | Read When |
|----------|---------|-----------|
| [README.md](README.md) | Complete API documentation | Need full details |
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | Installation instructions | Setting up first time |
| [QUICK_REFERENCE.md](QUICK_REFERENCE.md) | Commands and examples | Need quick commands |
| [SPECIFICATION_CHECKLIST.md](SPECIFICATION_CHECKLIST.md) | Requirements verification | Checking completeness |
| [DATABASE_QUERIES.md](DATABASE_QUERIES.md) | SQL reference | Working with database |
| [PROJECT_SUMMARY.md](PROJECT_SUMMARY.md) | Overview and statistics | Understanding project |
| [postman_collection.json](postman_collection.json) | Postman collection | Testing in Postman |

## ✨ Features Implemented

✅ **Functionality**
- Complete book management (CRUD)
- Borrow system with stock management
- Geolocation tracking on borrow

✅ **Architecture**
- Layered architecture (Route → Controller → Model)
- Separation of concerns
- Centralized error handling

✅ **Best Practices**
- RESTful API design
- Input validation
- Proper HTTP status codes
- Environment variables for config

✅ **Documentation**
- Comprehensive API docs
- Setup instructions
- Code comments
- Error handling guide

## 🔧 Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js 4.18.2
- **Database**: MySQL
- **ORM**: Sequelize 6.35.2
- **Package Manager**: NPM

## 🎓 What You'll Learn

By studying this project:
1. Backend API development with Express.js
2. Database design with Sequelize ORM
3. RESTful API principles
4. Middleware implementation
5. Error handling strategies
6. Input validation techniques
7. Role-based access control
8. Clean code organization

## ❓ FAQ

**Q: Do I need to create tables manually?**
A: No, Sequelize auto-creates tables on first run.

**Q: How do I test the API?**
A: Use Postman (import postman_collection.json) or cURL commands.

**Q: What if I forget the x-user-role header?**
A: You'll get a 400 error asking for the header.

**Q: Can I change the port?**
A: Yes, edit SERVER_PORT in .env file.

**Q: How do I reset the database?**
A: See DATABASE_QUERIES.md for reset commands.

**Q: Where do I find error details?**
A: Check error responses in terminal or response body.

## 🚀 Next Steps

1. **Now**: Read [QUICK_REFERENCE.md](QUICK_REFERENCE.md)
2. **Then**: Follow [SETUP_GUIDE.md](SETUP_GUIDE.md)
3. **Test**: Use [QUICK_REFERENCE.md](QUICK_REFERENCE.md) API examples
4. **Verify**: Check [SPECIFICATION_CHECKLIST.md](SPECIFICATION_CHECKLIST.md)
5. **Explore**: Read [README.md](README.md) for complete details

## 📞 Need Help?

1. **Installation Issues** → See SETUP_GUIDE.md Troubleshooting section
2. **API Questions** → See README.md API documentation
3. **Database Questions** → See DATABASE_QUERIES.md
4. **Testing Help** → See QUICK_REFERENCE.md examples
5. **Requirement Verification** → See SPECIFICATION_CHECKLIST.md

## ✅ Project Status

- ✅ All requirements implemented
- ✅ All endpoints tested
- ✅ Complete documentation
- ✅ Error handling comprehensive
- ✅ Ready for submission

---

## Quick Commands

```bash
# Install & Run
npm install
npm run dev

# Test (using curl)
curl http://localhost:3000/api/books -H "x-user-role: user"

# Stop Server
Ctrl + C
```

---

**Created for UCP 1 (Ujian Tengah Praktik)**
**Date: 27 January 2026**
**Status: Ready for Evaluation** ✅

---

### 🎯 START HERE → Choose your path above and read the appropriate document!
