import { Request, Response } from 'express';
import { ResourceQuerySchema } from '../schemas';
import { dataStore } from '../services/store.service';

export const getResources = async (req: Request, res: Response): Promise<void> => {
  const query = ResourceQuerySchema.parse(req.query);
  const resources = await dataStore.getResources(query.category, query.search);

  res.status(200).json({
    resources,
    total: resources.length,
  });
};
