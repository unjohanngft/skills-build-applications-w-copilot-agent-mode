import mongoose, { Schema } from 'mongoose';

const withId = {
  id: {
    type: String,
    required: true,
    unique: true,
  },
};

const jsonTransform = (_doc: unknown, ret: Record<string, unknown>) => {
  if (ret._id) {
    delete ret._id;
  }

  if (ret.__v !== undefined) {
    delete ret.__v;
  }

  if (typeof ret.id === 'undefined' && ret._id) {
    ret.id = String(ret._id);
  }

  return ret;
};

const userSchema = new Schema(
  {
    ...withId,
    username: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    fitnessLevel: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
    team: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'users' },
);
userSchema.set('toJSON', { transform: jsonTransform });

const teamSchema = new Schema(
  {
    ...withId,
    name: { type: String, required: true, trim: true },
    members: [{ type: String, required: true }],
    goal: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'teams' },
);
teamSchema.set('toJSON', { transform: jsonTransform });

const activitySchema = new Schema(
  {
    ...withId,
    userId: { type: String, required: true },
    type: { type: String, required: true, trim: true },
    duration: { type: Number, required: true, min: 0 },
    calories: { type: Number, required: true, min: 0 },
    date: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'activities' },
);
activitySchema.set('toJSON', { transform: jsonTransform });

const leaderboardSchema = new Schema(
  {
    ...withId,
    userId: { type: String, required: true },
    username: { type: String, required: true, trim: true },
    score: { type: Number, required: true, min: 0 },
    rank: { type: Number, min: 1 },
    updatedAt: { type: Date, default: Date.now },
  },
  { collection: 'leaderboard' },
);
leaderboardSchema.set('toJSON', { transform: jsonTransform });

const workoutSchema = new Schema(
  {
    ...withId,
    title: { type: String, required: true, trim: true },
    level: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    duration: { type: Number, required: true, min: 0 },
    focus: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { collection: 'workouts' },
);
workoutSchema.set('toJSON', { transform: jsonTransform });

export const User = mongoose.model('User', userSchema);
export const Team = mongoose.model('Team', teamSchema);
export const Activity = mongoose.model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.model('Workout', workoutSchema);
