import express from 'express'
import serviceControllers from './service.controllers';

const serviceRouter = express.Router();

serviceRouter.post('/create', serviceControllers.createService)
serviceRouter.get('/retrive/outlet/:outletId', serviceControllers.getServiceByOutletId)
serviceRouter.patch('/update/:id', serviceControllers.updateServiceByServiceId)
serviceRouter.delete('/delete/:id', serviceControllers.deleteServiceByServiceId)

export default serviceRouter;