import express from 'express';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.get('/me', protect, (req, res) => {
  res.json({
    message: 'Authenticated user',
  });
});

export default router;
