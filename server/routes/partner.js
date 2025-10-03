import express from 'express';
import multer from 'multer';
import { createPartner, getPartners, getPartner, updatePartner, deletePartner } from '../controllers/partnerController.js';
import { isAuthenticated, isAdmin } from '../middleware/auth.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // your preference: dest:'uploads/'

// public list
router.get('/', getPartners);
router.get('/:id', getPartner);

// admin (protected)
router.post('/', isAuthenticated, isAdmin, upload.single('logo'), createPartner);
router.put('/:id', isAuthenticated, isAdmin, upload.single('logo'), updatePartner);
router.delete('/:id', isAuthenticated, isAdmin, deletePartner);

export default router;
