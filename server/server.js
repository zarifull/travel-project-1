import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import tours from './routes/tours.js';
import users from './routes/users.js';
import helmet from 'helmet';
import sanitizeRequest from './middleware/sanitize.js';
import bookings from './routes/bookings.js';
import admin from './routes/admin.js';
import resource from './routes/resource.js';
import resourceDetail from './routes/resourceDetail.js';
import customersDetail from './routes/customersDetail.js'

dotenv.config();
const app = express();

app.use(helmet());

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? [
        "https://batkentravels.com",
        "https://batkentravels.netlify.app", 
        "https://travel-project-1-production-589b.up.railway.app"
      ]
    : ["http://localhost:3000"];

    app.use(
      cors({
        origin: allowedOrigins,
        credentials: true,
      })
    );

const PORT = process.env.PORT || 7070;

app.set('trust proxy', 1);

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.get('/api/health', async (req, res) => {
  const dbState = mongoose.connection.readyState;
  res.status(200).json({
    status: 'OK',
    db: dbState === 1 ? 'connected' : 'disconnected'
  });
});

app.use('/api/tours', tours);
app.use('/api/users', users);
app.use('/api/bookings', bookings);
app.use('/api/admin', admin);
app.use('/api/resources', resource);
app.use('/api/resource-details', resourceDetail);
app.use('/api/customers',customersDetail)

app.use(sanitizeRequest); 

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  
  if (process.env.NODE_ENV === 'development') {
    console.error(err.stack); 
    res.status(statusCode).json({ message, stack: err.stack });
  } else {
    console.error(err.message); 
    res.status(statusCode).json({ message });
  }
});


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Mongo atlas connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Mongo connection failed:', err);
    process.exit(1);
  });

