import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { Skill } from '../models/Skill.model';

export const addSkill = async (req: AuthRequest, res: Response) => {
  const { name, level, intent, category } = req.body;

  if (!name || !level || !intent) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const skill = await Skill.create({
    user: req.userId,
    name,
    level,
    intent,
    category,
  });

  res.status(201).json({
    message: 'Skill added',
    skill,
  });
};
