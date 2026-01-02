import mongoose, { Schema, Document } from "mongoose";

export interface ISkill extends Document {
  user: mongoose.Types.ObjectId;
  name: string;
  level: number; // 1–5
  intent: "teach" | "learn";
  category?: string;
}

const skillSchema = new Schema<ISkill>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    level: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    intent: {
      type: String,
      enum: ["teach", "learn"],
      required: true,
    },
    category: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Skill = mongoose.model<ISkill>("Skill", skillSchema);
