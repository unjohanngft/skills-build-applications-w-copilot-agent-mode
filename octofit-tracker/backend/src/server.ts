import express from 'express';
import db from './config/database.js';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models/index.js';

const app = express();
const port = Number(process.env.PORT) || 8000;

const getApiBaseUrl = () => {
  const codespaceName = process.env.CODESPACE_NAME?.trim();
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

const createCrudHandlers = <T extends Record<string, unknown>>(model: any, basePath: string) => {
  app.get(basePath, async (_request, response) => {
    try {
      const items = await model.find({}).lean();
      response.json(items);
    } catch (error) {
      response.status(500).json({ message: 'Failed to fetch records', error });
    }
  });

  app.get(`${basePath}:id`, async (request, response) => {
    try {
      const item = await model.findOne({ id: request.params.id }).lean();

      if (!item) {
        response.status(404).json({ message: `${basePath.replace('/api/', '').slice(0, -1)} not found` });
        return;
      }

      response.json(item);
    } catch (error) {
      response.status(500).json({ message: 'Failed to fetch record', error });
    }
  });

  app.post(basePath, async (request, response) => {
    try {
      const payload = { ...request.body };
      const item = await model.create(payload);
      response.status(201).json(item.toJSON ? item.toJSON() : item);
    } catch (error) {
      response.status(400).json({ message: 'Failed to create record', error });
    }
  });

  app.put(`${basePath}:id`, async (request, response) => {
    try {
      const updatedItem = await model.findOneAndUpdate(
        { id: request.params.id },
        { $set: request.body },
        { new: true, runValidators: true },
      );

      if (!updatedItem) {
        response.status(404).json({ message: `${basePath.replace('/api/', '').slice(0, -1)} not found` });
        return;
      }

      response.json(updatedItem.toJSON ? updatedItem.toJSON() : updatedItem);
    } catch (error) {
      response.status(400).json({ message: 'Failed to update record', error });
    }
  });

  app.delete(`${basePath}:id`, async (request, response) => {
    try {
      const deletedItem = await model.findOneAndDelete({ id: request.params.id });

      if (!deletedItem) {
        response.status(404).json({ message: `${basePath.replace('/api/', '').slice(0, -1)} not found` });
        return;
      }

      response.json({ deleted: deletedItem.toJSON ? deletedItem.toJSON() : deletedItem });
    } catch (error) {
      response.status(400).json({ message: 'Failed to delete record', error });
    }
  });
};

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', database: db.readyState === 1 ? 'connected' : 'disconnected', apiBaseUrl: getApiBaseUrl() });
});

app.get('/api/config', (_request, response) => {
  response.json({ apiBaseUrl: getApiBaseUrl(), port });
});

createCrudHandlers(User, '/api/users/');
createCrudHandlers(Team, '/api/teams/');
createCrudHandlers(Activity, '/api/activities/');
createCrudHandlers(LeaderboardEntry, '/api/leaderboard/');
createCrudHandlers(Workout, '/api/workouts/');

app.listen(port, () => {
  console.log(`OctoFit API listening on port ${port}`);
  console.log(`API base URL: ${getApiBaseUrl()}`);
});