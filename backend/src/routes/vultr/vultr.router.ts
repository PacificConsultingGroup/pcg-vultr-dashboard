
import express from 'express';
import { vultrGetController } from './vultr.controller';

const vultrRouter = express.Router();

vultrRouter.get('/*', vultrGetController);

export default vultrRouter;