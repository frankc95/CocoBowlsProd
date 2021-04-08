// require is a standard expression that node.js uses -> i.e. const express = require('express');
// ES6 uses import instead
import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import morgan from 'morgan';
// import custom error middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import connectDB from './config/db.js';

// import all routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// initialize dotenv - this links with .env file in root folder
dotenv.config();

// call connectDB
connectDB();

// call express
const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// this allows accepting JSON data in the body. Needed for req.body to request email, password, etc.
app.use(express.json());

// mouting routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// call notFound middleware
app.use(notFound);
// call error middleware
app.use(errorHandler);

// PORT = PORT var from .env file or 5000
const PORT = process.env.PORT || 5000;

// Server running in development mode on port 5000
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
