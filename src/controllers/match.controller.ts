import { Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { Skill } from '../models/Skill.model';
import { calculateMatchScore } from '../utils/matchEngine';
import { SkillMatch } from '../types/match';

export const findMatches = async (req: AuthRequest, res: Response) => {
  const userId = req.userId;

  const mySkills = await Skill.find({
    user: userId,
    intent: 'learn',
  });

  const teachers = await Skill.find({
    intent: 'teach',
    user: { $ne: userId },
  }).populate('user', 'name email');

  const matches: SkillMatch[] = [];

  for (const learnSkill of mySkills) {
    for (const teachSkill of teachers) {
      const score = calculateMatchScore(learnSkill, teachSkill as any);

      if (score >= 40) {
        matches.push({
          score,
          learnSkill,
          teachSkill: teachSkill as any,
        });
      }
    }
  }

  matches.sort((a, b) => b.score - a.score);

  res.json({
    count: matches.length,
    matches,
  });
};
