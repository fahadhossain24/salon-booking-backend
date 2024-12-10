import express from 'express'
import outletControllers from './outlet.controllers';

const outletRouter = express.Router();

outletRouter.post('/create', outletControllers.createOutlet)

export default outletRouter