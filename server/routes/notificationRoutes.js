import express from 'express';
import { 
  getNotifications,
  markNotificationAsRead,
  deleteNotification
} from '../controllers/notificationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getNotifications);
router.patch('/:id/read', protect, markNotificationAsRead);
router.post('/:id/remove', protect, deleteNotification);
router.delete('/:id', protect, deleteNotification);

export default router;