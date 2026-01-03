const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './config.env' });

// Routes
const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orders');
const reviewRoutes = require('./routes/reviews');

// Middleware
const errorHandler = require('./middleware/errorHandler');

const app = express();

/* ============================
   ✅ CORS (FIXED & SAFE)
   ============================ */

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'https://home-revive-home-services-provider.netlify.app'
];

const corsOptions = {
  origin: (origin, callback) => {
    // allow requests with no origin (Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With'
  ],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

/* ============================
   Body Parsers
   ============================ */

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

/* ============================
   Routes
   ============================ */
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);

/* ============================
   Health Check
   ============================ */

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'HomeRevive Backend is running!',
    timestamp: new Date().toISOString(),
  });
});

/* ============================
   404 Handler
   ============================ */

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

/* ============================
   Error Handler
   ============================ */

app.use(errorHandler);

/* ============================
   MongoDB Connection
   ============================ */

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

/* ============================
   Server Start
   ============================ */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* ============================
   Process Handlers
   ============================ */

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
