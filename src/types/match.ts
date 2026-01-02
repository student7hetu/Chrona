import { ISkill } from "../models/Skill.model";

export interface SkillMatch {
  score: number;
  learnSkill: ISkill;
  teachSkill: ISkill;
}
