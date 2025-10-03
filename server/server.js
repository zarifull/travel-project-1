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


dotenv.config();
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(sanitizeRequest); // ✅ safe custom sanitizer

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.use('/api/tours', tours);
app.use('/api/users', users);
app.use('/api/bookings',bookings);
app.use('/api/admin', admin); 
app.use('/api/resources',resource);



mongoose.connect(process.env.MONGODB)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));

  