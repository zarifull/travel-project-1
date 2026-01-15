import express from 'express';
import upload from '../utils/storage.js'; 
import { getAllTours, createTour, updateTour, getTourById, deleteTour, rateTour } from '../controllers/tourController.js';

const router = express.Router();

router.post('/', upload.array('images',10), createTour);

router.get('/', getAllTours);

router.get('/:id', getTourById);

router.put('/:id', upload.array('photo', 10), updateTour);

router.delete('/:id', deleteTour);

router.post('/:id/rate', rateTour);

export default router;
