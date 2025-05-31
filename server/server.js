import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import tours from './routes/tours.js';


dotenv.config();
const app = express();


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Server is running');
});


app.use('/api/tours', tours);


mongoose.connect(process.env.MONGODB) 
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
      console.log('MONGO_URL:', process.env.MONGODB);
    });
  })
  .catch(err => console.error(err));
