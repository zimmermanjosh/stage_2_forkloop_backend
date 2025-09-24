# ForkLoop Backend API

A Node.js/Express backend server for ForkLoop - Smart Recipe Discovery & Meal Planning application with user authentication, recipe collection management, and personalized recommendations.

## 🌐 Live Application

- **Frontend:** https://zimmermanjosh.github.io/stage_1_forkloop_frontend
- **Backend API:** To be deployed

## 🚀 Quick Start

### Prerequisites

- Node.js (v18+)
- MongoDB
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/zimmermanjosh/stage_2_forkloop_backend.git
cd stage_2_forkloop_backend

# Install dependencies
npm run prebuild

# Start MongoDB
brew services start mongodb-community

# Seed the database
npm run seedUser
npm run seedRecipes

# Start development server
npm run dev
```

## 📁 Project Structure

```
├── README.md
├── app.js
├── controllers
│   ├── recipes.js
│   └── users.js
├── middlewares
│   ├── auth.js
│   ├── errorHandler.js
│   ├── logger.js
│   └── validator.js
├── models
│   ├── recipe.js
│   └── user.js
├── package.json
├── resources
│   ├── FRONTEND_WORK_SUMMARY.md
│   ├── seedRecipes.js
│   └── seeduser.js
├── routes
│   ├── index.js
│   ├── recipes.js
│   └── users.js
├── sprint.txt
└── utils
    ├── config.js
    ├── cryptoGen.js
    └── errors/
```

## 🛠️ Available Scripts

| Command                | Description                           |
| ---------------------- | ------------------------------------- |
| `npm start`            | Start production server               |
| `npm run dev`          | Start development server with nodemon |
| `npm run prebuild`     | Clean install dependencies            |
| `npm run seedUser`     | Seed database with test users         |
| `npm run seedRecipes`  | Seed database with sample recipes     |
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

# Add sample recipes
npm run seedRecipes
```

## 🔧 Environment Variables

Create a `.env` file in the root directory:

```env
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRATION_TIME=7d
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/forkloop_db
PORT=3001
CORS_ORIGIN=https://zimmermanjosh.github.io
```

### Port Configuration

**Note:** This backend runs on **port 3001** instead of the standard 3000 to avoid conflicts with the React frontend development server, which traditionally uses port 3000. This allows both frontend and backend to run simultaneously during development without port conflicts.

- **Backend API**: http://localhost:3001
- **Frontend Dev Server**: http://localhost:3000

## 📚 API Endpoints

All API endpoints are prefixed with `/api` for proper API structure.

### Authentication

- `POST /api/signin` - User login
- `POST /api/signup` - User registration

### Users

- `GET /api/users/me` - Get current user
- `PATCH /api/users/me` - Update user profile

### Recipes

- `GET /api/recipes` - Get all recipes
- `POST /api/recipes` - Add recipe to user's collection
- `DELETE /api/recipes/:recipeId` - Remove recipe from collection
- `GET /api/recipes/user/:userId` - Get recipes by specific user
- `PUT /api/recipes/:recipeId/likes` - Like recipe
- `DELETE /api/recipes/:recipeId/likes` - Unlike recipe

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Request validation with Joi/Celebrate
- CORS protection
- Environment variable protection

## 📊 Data Models

### User Schema
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  avatar: String,
  createdAt: Date
}
```

### Recipe Schema
```javascript
{
  _id: ObjectId,
  owner: ObjectId (ref: User),
  title: String,
  category: String (breakfast/lunch/dinner/snack),
  image: String,
  cookingTime: Number,
  difficulty: String (easy/medium/hard),
  servings: Number,
  summary: String,
  extendedIngredients: Array,
  dishTypes: Array,
  sourceUrl: String,
  spoonacularScore: Number,
  liked: Boolean,
  createdAt: Date
}
```

## 🌐 Frontend Integration

The backend is designed to work with the ForkLoop React frontend. To connect:

1. Update frontend API configuration to point to this backend
2. Disable mock authentication in frontend
3. Update CORS settings for production deployment

### Frontend API Integration Points
- `src/utils/auth.jsx` - Replace mock functions with real API calls
- `src/utils/api.jsx` - Add backend endpoint configurations  
- `src/utils/config.jsx` - Update API URLs for production

## 📊 Logging & Monitoring

- Request logging with Winston
- Error logging and tracking
- Console logging for development debugging

## 🚀 Deployment

### Production Environment Setup

1. **Environment Variables for Production:**
```env
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb://your-production-mongo-url/forkloop_db
JWT_SECRET=your-super-secure-production-jwt-secret
JWT_EXPIRATION_TIME=7d
BASE_PATH=https://your-domain.com
CORS_ORIGIN=https://zimmermanjosh.github.io
```

2. **Recommended Deployment Stack:**
- **Server:** Cloud VM (Google Cloud, AWS, DigitalOcean)
- **Process Manager:** PM2 for production process management
- **Web Server:** Nginx as reverse proxy with SSL termination
- **SSL:** Let's Encrypt certificates for HTTPS
- **Database:** MongoDB Atlas or self-hosted MongoDB with authentication

3. **PM2 Setup:**
```bash
# Install PM2 globally
npm install -g pm2

# Start the application with PM2
pm2 start app.js --name "forkloop-backend"

# Auto-restart on server reboot
pm2 startup
pm2 save
```

4. **Nginx Configuration Example:**
```nginx
server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name your-domain.com;
    
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 🧪 Testing

### Development Testing

```bash
# Test user credentials
Email: joshtarget@example.com
Password: mypassword123
```

### API Testing

Use tools like Postman or Thunder Client to test endpoints:

1. Register/Login to get JWT token
2. Use token in Authorization header for protected routes
3. Test recipe CRUD operations

## 🛠️ Troubleshooting

### MongoDB Issues

```bash
# Restart MongoDB
brew services restart mongodb-community

# Check status
brew services list | grep mongodb

# Connect to database
mongosh forkloop_db
```

### Common Issues

1. **Port 3001 in use**: Change PORT in .env file
2. **MongoDB connection failed**: Ensure MongoDB is running
3. **CORS errors**: Update CORS origin in app.js
4. **JWT errors**: Check JWT_SECRET in .env file

## 📝 Project Status

**Stage 2 Backend Development** - Transforming WTWR backend to ForkLoop

### Completed ✅
- Express server setup with middleware
- MongoDB connection with Mongoose
- User authentication system
- Recipe data models and schemas
- CRUD operations for recipes
- Request validation and error handling
- Sample data seeding scripts

### Next Steps 🔄
- Frontend integration testing
- Production deployment setup
- API documentation with Swagger
- Performance optimization
- Unit and integration tests

## 🔗 Related Links

- [Frontend Repository](https://github.com/zimmermanjosh/stage_1_forkloop_frontend)
- [Frontend Live Demo](https://zimmermanjosh.github.io/stage_1_forkloop_frontend)
- [Frontend Work Summary](./resources/FRONTEND_WORK_SUMMARY.md)

---

**Author:** Joshua Zimmerman  
**License:** ISC  
**Project:** ForkLoop - Stage 2 MERN Stack Backend