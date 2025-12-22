import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Tour from './models/tour.model.js'

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('mongo atlas connected'))
  .catch((err) => console.log("error was", err)); 

const tours = JSON.parse(fs.readFileSync("./data/tours.json", "utf-8"));

const importData = async () => {
    try {
        await Tour.deleteMany();
        await Tour.insertMany(tours);
        console.log('Data imported');
        process.exit();
    } catch (error) {  
        console.log(error);  
        process.exit(1);
    }
}

importData();
