import express from 'express';
import { randomUUID } from 'node:crypto';
import db from './config/database.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

const getApiBaseUrl = () => {
  const codespaceName = process.env.CODESPACE_NAME;
  return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
};

app.use(express.json());
app.use((_request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  if (_request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }

  next();
});

const users = [
  { id: 'user-1', name: 'Ava Johnson', email: 'ava@example.com', fitnessLevel: 'intermediate' },
  { id: 'user-2', name: 'Noah Patel', email: 'noah@example.com', fitnessLevel: 'advanced' },
];

const teams = [
  { id: 'team-1', name: 'Storm Squad', members: ['user-1', 'user-2'], goal: 'Weekly 200k steps' },
  { id: 'team-2', name: 'Summit Crew', members: ['user-1'], goal: 'Trail challenge' },
];

const activities = [
  { id: 'activity-1', userId: 'user-1', type: 'run', duration: 35, calories: 420, date: '2026-09-11' },
  { id: 'activity-2', userId: 'user-2', type: 'strength', duration: 50, calories: 610, date: '2026-09-10' },
];

const leaderboard = [
  { id: 'leaderboard-1', userId: 'user-2', username: 'Noah Patel', score: 9800 },
  { id: 'leaderboard-2', userId: 'user-1', username: 'Ava Johnson', score: 8740 },
];

const workouts = [
  { id: 'workout-1', title: 'HIIT Cardio Blast', level: 'intermediate', duration: 25, focus: 'endurance' },
  { id: 'workout-2', title: 'Core Strength Circuit', level: 'beginner', duration: 20, focus: 'stability' },
];

const createCrudHandlers = <T extends { id: string }>(collection: T[], basePath: string) => {
  app.get(basePath, (_request, response) => {
    response.json(collection);
  });

  app.get(`${basePath}:id`, (request, response) => {
    const item = collection.find((entry) => entry.id === request.params.id);

    if (!item) {
      response.status(404).json({ message: `${basePath.replace('/api/', '').slice(0, -1)} not found` });
      return;
    }

    response.json(item);
  });

  app.post(basePath, (request, response) => {
    const item = {
      ...request.body,
      id: randomUUID(),
    } as T;

    collection.push(item);
    response.status(201).json(item);
  });

  app.put(`${basePath}:id`, (request, response) => {
    const itemIndex = collection.findIndex((entry) => entry.id === request.params.id);

    if (itemIndex === -1) {
      response.status(404).json({ message: `${basePath.replace('/api/', '').slice(0, -1)} not found` });
      return;
    }

    const updatedItem = {
      ...(collection[itemIndex] as T),
      ...request.body,
      id: request.params.id,
    } as T;

    collection[itemIndex] = updatedItem;
    response.json(updatedItem);
  });

  app.delete(`${basePath}:id`, (request, response) => {
    const itemIndex = collection.findIndex((entry) => entry.id === request.params.id);

    if (itemIndex === -1) {
      response.status(404).json({ message: `${basePath.replace('/api/', '').slice(0, -1)} not found` });
      return;
    }

    const [deletedItem] = collection.splice(itemIndex, 1);
    response.json({ deleted: deletedItem });
  });
};

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: db.readyState === 1 ? 'connected' : 'disconnected', apiBaseUrl: getApiBaseUrl() });
});

app.get('/api/config', (_request, response) => {
  response.json({ apiBaseUrl: getApiBaseUrl(), port });
});

createCrudHandlers(users, '/api/users/');
createCrudHandlers(teams, '/api/teams/');
createCrudHandlers(activities, '/api/activities/');
createCrudHandlers(leaderboard, '/api/leaderboard/');
createCrudHandlers(workouts, '/api/workouts/');

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
  console.log(`API base URL: ${getApiBaseUrl()}`);
});