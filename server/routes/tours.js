import express from 'express';
import upload from '../utils/storage.js'; // Your multer cloudinary setup
import { getAllTours, createTour, updateTour, getTourById, deleteTour } from '../controllers/tourController.js';

const router = express.Router();

// POST route to create a tour with image upload
router.post('/', upload.array('images',10), createTour);

// GET all tours
router.get('/', getAllTours);

// GET a single tour by ID
router.get('/:id', getTourById);

// PUT route to update a tour by ID
router.put('/:id', updateTour);

// DELETE route to delete a tour by ID
router.delete('/:id', deleteTour);

export default router;
