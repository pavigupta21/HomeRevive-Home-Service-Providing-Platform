# HomeRevive Backend

Backend API for the HomeRevive home service platform built with Node.js, Express, and MongoDB.

## Features

- User authentication (signup/login) with JWT
- Service booking management
- Review system
- MongoDB Atlas integration
- CORS enabled for frontend communication

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

1. Copy `config.env` to `.env`:
```bash
cp config.env .env
```

2. Update the `.env` file with your MongoDB Atlas credentials:
```
MONGO_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/homerevive?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_jwt_key_here
PORT=5000
```

### 3. MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and update `MONGO_URI` in `.env`

### 4. Run the Server

For development:
```bash
npm run dev
```

For production:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Orders
- `POST /api/orders` - Create new service booking (requires auth)
- `GET /api/orders/:userId` - Get user's bookings (requires auth)
- `PUT /api/orders/:orderId` - Update order status (requires auth)

### Reviews
- `POST /api/reviews` - Add review for service (requires auth)
- `GET /api/reviews/:serviceId` - Get reviews for specific service
- `GET /api/reviews` - Get all reviews
- `DELETE /api/reviews/:reviewId` - Delete review (requires auth)

### Health Check
- `GET /api/health` - Server health check

## Request/Response Examples

### Signup
```json
POST /api/auth/signup
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Order
```json
POST /api/orders
Headers: { "Authorization": "Bearer <token>" }
{
  "serviceName": "Deep Cleaning of Entire House",
  "bookingDate": "2025-03-02T15:00:00.000Z",
  "price": 499,
  "location": "8-12, Clover Hills, abc road, Pune",
  "serviceType": "cleaning"
}
```

### Add Review
```json
POST /api/reviews
Headers: { "Authorization": "Bearer <token>" }
{
  "serviceId": "cleaning-service-1",
  "serviceName": "AC Repair & Service",
  "rating": 5,
  "comment": "Excellent service! The technician was professional and fixed my AC quickly."
}
```

## Database Models

### User
- name: String
- email: String (unique)
- password: String (hashed)
- createdAt: Date

### Order
- userId: ObjectId (ref: User)
- serviceName: String
- bookingDate: Date
- status: String (scheduled, in-progress, completed, cancelled)
- price: Number
- location: String
- serviceType: String
- createdAt: Date

### Review
- userId: ObjectId (ref: User)
- serviceId: String
- serviceName: String
- rating: Number (1-5)
- comment: String
- userName: String
- createdAt: Date

## Error Handling

All API responses follow this format:
```json
{
  "success": boolean,
  "message": string,
  "data": object (optional)
}
```

## CORS Configuration

The server is configured to accept requests from:
- http://localhost:3000
- http://localhost:5173
- http://127.0.0.1:3000
- http://127.0.0.1:5173

Update the CORS configuration in `server.js` if needed.
