import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    const userData = [
      { id: 'user-1', username: 'avajohnson', name: 'Ava Johnson', email: 'ava@example.com', fitnessLevel: 'intermediate', team: 'team-1' },
      { id: 'user-2', username: 'noahpatel', name: 'Noah Patel', email: 'noah@example.com', fitnessLevel: 'advanced', team: 'team-1' },
      { id: 'user-3', username: 'liamchen', name: 'Liam Chen', email: 'liam@example.com', fitnessLevel: 'beginner', team: 'team-2' },
      { id: 'user-4', username: 'zoerivera', name: 'Zoe Rivera', email: 'zoe@example.com', fitnessLevel: 'intermediate', team: 'team-2' },
    ];

    const teamData = [
      { id: 'team-1', name: 'Storm Squad', members: ['user-1', 'user-2'], goal: 'Weekly 200k steps' },
      { id: 'team-2', name: 'Summit Crew', members: ['user-3', 'user-4'], goal: 'Trail challenge' },
    ];

    const activityData = [
      { id: 'activity-1', userId: 'user-1', type: 'run', duration: 35, calories: 420, date: '2026-09-11' },
      { id: 'activity-2', userId: 'user-2', type: 'strength', duration: 50, calories: 610, date: '2026-09-10' },
      { id: 'activity-3', userId: 'user-3', type: 'walk', duration: 45, calories: 280, date: '2026-09-09' },
      { id: 'activity-4', userId: 'user-4', type: 'cycle', duration: 30, calories: 390, date: '2026-09-08' },
    ];

    const leaderboardData = [
      { id: 'leaderboard-1', userId: 'user-2', username: 'Noah Patel', score: 9800, rank: 1 },
      { id: 'leaderboard-2', userId: 'user-1', username: 'Ava Johnson', score: 8740, rank: 2 },
      { id: 'leaderboard-3', userId: 'user-4', username: 'Zoe Rivera', score: 8125, rank: 3 },
      { id: 'leaderboard-4', userId: 'user-3', username: 'Liam Chen', score: 7540, rank: 4 },
    ];

    const workoutData = [
      { id: 'workout-1', title: 'HIIT Cardio Blast', level: 'intermediate', duration: 25, focus: 'endurance' },
      { id: 'workout-2', title: 'Core Strength Circuit', level: 'beginner', duration: 20, focus: 'stability' },
      { id: 'workout-3', title: 'Trail Sprint Intervals', level: 'advanced', duration: 30, focus: 'speed' },
      { id: 'workout-4', title: 'Mobility Reset Flow', level: 'beginner', duration: 18, focus: 'recovery' },
    ];

    await User.deleteMany({});
    await Team.deleteMany({});
    await Activity.deleteMany({});
    await LeaderboardEntry.deleteMany({});
    await Workout.deleteMany({});

    await User.insertMany(userData);
    await Team.insertMany(teamData);
    await Activity.insertMany(activityData);
    await LeaderboardEntry.insertMany(leaderboardData);
    await Workout.insertMany(workoutData);

    console.log('Seeded users, teams, activities, leaderboard, and workouts');
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
