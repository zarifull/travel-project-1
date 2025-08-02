import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import {
  getAdminStats,
  getAllUsers,
  deleteUser,
  promoteToAdmin,
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/dashboard', protect, isAdmin, getAdminStats);
router.get('/users', protect, isAdmin, getAllUsers);
router.post('/users/promote', protect, isAdmin, promoteToAdmin);
router.delete('/users/:id', protect, isAdmin, deleteUser);

export default router;
