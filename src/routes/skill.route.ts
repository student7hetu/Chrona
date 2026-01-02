import express from 'express';
import { protect } from '../middlewares/auth.middleware';
import { addSkill } from '../controllers/skill.controller';

const router = express.Router();

router.post('/', protect, addSkill);

export default router;