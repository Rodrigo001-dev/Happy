import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload';

import OrphanagesConttrollerCreate from './controllers/OrphanagesController/create';
import OrphanagesConttrollerList from './controllers/OrphanagesController/index';
import OrphanagesConttrollerListOne from './controllers/OrphanagesController/show';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/orphanages', OrphanagesConttrollerList.index);
routes.get('/orphanages/:id', OrphanagesConttrollerListOne.show);
routes.post('/orphanages', upload.array('images'), OrphanagesConttrollerCreate.create);

export default routes;