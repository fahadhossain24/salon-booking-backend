import express from 'express'
import serviceControllers from './service.controllers';

const serviceRouter = express.Router();

serviceRouter.post('/create', serviceControllers.createService)
serviceRouter.get('/retrive/outlet/:outletId', serviceControllers.getServiceByOutletId)
serviceRouter.patch('/update/:id', serviceControllers.updateServiceByServiceId)
serviceRouter.delete('/delete/:id', serviceControllers.deleteServiceByServiceId)
serviceRouter.get('/offered/retrive', serviceControllers.getDiscountedServices)
serviceRouter.get('/popular/retrive', serviceControllers.getPopularServices)

export default serviceRouter;