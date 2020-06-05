import { Router } from 'express';
import { pointId, postPoint, getFilteredPoints } from './controllers/PointsController';
import { getItemsController } from './controllers/ItemsController';

const routes = Router();

routes.get('/items', getItemsController);

routes.post('/points', postPoint);

routes.get('/points/:id',  pointId);

routes.get('/points', getFilteredPoints);

export default routes;