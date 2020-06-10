import { Router } from 'express';
import { pointId, postPoint, getFilteredPoints } from './controllers/PointsController';
import { getItemsController } from './controllers/ItemsController';
import multer from 'multer';
import multerConfig from './config/multer';
import { celebrate, Joi } from 'celebrate';
import { pointSchema } from './db/schemas/PointsSchema';

const routes = Router();
const upload = multer(multerConfig);

routes.get('/items', getItemsController);

routes.post(
  '/points', 
  upload.single('image'), 
  celebrate({
    body: pointSchema,
  }, {
    abortEarly: false,
  }),
  postPoint
);

routes.get('/points/:id',  pointId);

routes.get('/points', getFilteredPoints);

export default routes;