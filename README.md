# WTWR (What to Wear?): Backend API

A Node.js/Express backend server for the WTWR application with user authentication, clothing item management, and weather-based recommendations.

## 🌐 Live Application

- **Frontend:** https://testwtwr.jumpingcrab.com
- **Backend API:** https://api.testwtwr.jumpingcrab.com

## 🚀 Quick Start

### Prerequisites

- Node.js (v22+)
- MongoDB
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/zimmermanjosh/se_project_express.git
cd se_project_express

# Install dependencies
npm run prebuild

# Start MongoDB
brew services start mongodb-community

# Seed the database
npm run seedUser
npm run seedClothing

# Start development server
npm run dev
```

## 📁 Project Structure

```
├.
├── README.md
├── app.js
├── controllers
│   ├── clothingItems.js
│   └── users.js
├── error.log
├── middlewares
│   ├── auth.js
│   ├── logger.js
│   └── validator.js
├── models
│   ├── clothingItem.js
│   └── user.js
├── package.json
├── request.log
├── resources
│   ├── NOTES.MD
│   ├── db.json
│   ├── seedClothingitems.js
│   └── seeduser.js
├── routes
│   ├── clothingItems.js
│   ├── index.js
│   └── users.js
├── sprint.txt
└── utils
    ├── config.js
    ├── cryptoGen.js
    ├── errors.js
    └── serverHelp.sh
```

## 🛠️ Available Scripts

| Command                | Description                           |
| ---------------------- | ------------------------------------- |
| `npm start`            | Start production server               |
| `npm run dev`          | Start development server with nodemon |
| `npm run prebuild`     | Clean install dependencies            |
| `npm run seedUser`     | Seed database with test users         |
| `npm run seedClothing` | Seed database with clothing items     |
| `npm run lint`         | Run ESLint                            |
| `npm run db:start`     | Start MongoDB and open shell          |
| `npm run db:stop`      | Stop MongoDB                          |

## 🗄️ Database Setup

### Start MongoDB

```bash
# Start service
brew services start mongodb-community

# Verify it's running
brew services list

# Open MongoDB shell
mongosh
```

### Seed Database

```bash
# Create test users
npm run seedUser

# Add clothing items
npm run seedClothing
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRATION_TIME=7d
NODE_ENV=development
```

## 📚 API Endpoints

### Authentication

- `POST /signin` - User login
- `POST /signup` - User registration

### Users

- `GET /users/me` - Get current user
- `PATCH /users/me` - Update user profile

### Clothing Items

- `GET /items` - Get all clothing items
- `POST /items` - Create new clothing item
- `DELETE /items/:itemId` - Delete clothing item
- `PUT /items/:itemId/likes` - Like item
- `DELETE /items/:itemId/likes` - Unlike item

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Request validation with Joi/Celebrate
- CORS protection
- Environment variable protection

## 📊 Logging & Monitoring

- Request logging with Winston
- Error logging and tracking
- PM2 process management in production

## 🚀 Deployment

The application is deployed using:

- **Server:** Google Cloud VM
- **Process Manager:** PM2
- **Web Server:** Nginx
- **SSL:** Let's Encrypt certificates
- **Database:** MongoDB

## 🧪 Testing

### Crash Recovery Test

The application includes PM2 auto-recovery. Test with:

```bash
curl https://api.testwtwr.jumpingcrab.com/crash-test
```

### Development Testing

```bash
# Test user credentials
Email: joshtarget@example.com
Password: mypassword123
```

## 🛠️ Troubleshooting

### MongoDB Issues

```bash
# Restart MongoDB
brew services restart mongodb-community

# Check status
brew services list | grep mongodb
```

### PM2 Issues

```bash
# Restart application
pm2 restart app --update-env

# View logs
pm2 logs app

# Check status
pm2 status
```

## 📝 Sprint Progress

Currently on Sprint 15 - Full deployment with authentication and security features.

## 🔗 Related Links

- [Avatar Generator]
  - https://i.pravatar.cc/300?img=12
- [Frontend Repository](https://github.com/zimmermanjosh/se_project_react)

---

**Author:** Joshua Zimmerman  
**License:** ISC
