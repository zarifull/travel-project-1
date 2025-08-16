import express from 'express';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import {
  getAdminStats,
  getAllUsers,
  deleteUser,
  promoteToAdmin,demoteToUser
} from '../controllers/adminController.js';

const router = express.Router();

router.get('/dashboard', protect, isAdmin, getAdminStats);
router.get('/users', protect, isAdmin, getAllUsers);
router.put('/promote', protect, isAdmin, promoteToAdmin);
router.put('/demote',protect,isAdmin,demoteToUser);
router.delete('/users/:id', protect, isAdmin, deleteUser);

export default router;
