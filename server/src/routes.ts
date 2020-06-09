import { Router } from 'express';
import { pointId, postPoint, getFilteredPoints } from './controllers/PointsController';
import { getItemsController } from './controllers/ItemsController';
import multer from 'multer';
import multerConfig from './config/multer';

const routes = Router();
const upload = multer(multerConfig);

routes.get('/items', getItemsController);

routes.post('/points', upload.single('image'), postPoint);

routes.get('/points/:id',  pointId);

routes.get('/points', getFilteredPoints);

export default routes;