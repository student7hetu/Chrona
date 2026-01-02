import { ISkill } from "../models/Skill.model";
import { SKILL_CATEGORY_MAP } from "./skillMap";

export const calculateMatchScore = (
  learner: ISkill,
  teacher: ISkill
): number => {
  let score = 0;

  if (learner.name === teacher.name) {
    score += 50;
  }

  const learnerCat =
    learner.category || SKILL_CATEGORY_MAP[learner.name];
  const teacherCat =
    teacher.category || SKILL_CATEGORY_MAP[teacher.name];

  if (learnerCat && learnerCat === teacherCat) {
    score += 30;
  }

  const levelDiff = Math.abs(teacher.level - learner.level);
  if (levelDiff <= 1) {
    score += 20;
  } else if (levelDiff === 2) {
    score += 10;
  }

  return score;
};
