import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    skillTeach: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],
    skillLearn: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Skill' }],

    creditBalance: {
      type: Number,
      default: 30,
      min: 0,
    },

    trustScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model('User', userSchema);
