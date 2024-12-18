import express from 'express';
import outletControllers from './outlet.controllers';
import authorization from '../../middlewares/authorization';

const outletRouter = express.Router();

outletRouter.post('/create', authorization('super-admin', 'admin'), outletControllers.createOutlet);
outletRouter.get(
  '/retrive/category/:serviceCategoryId/search',
  authorization('outlet', 'super-admin', 'admin'),
  outletControllers.getOutletsByServiceCategory,
);
outletRouter.get(
  '/retrive/recommended/category/:serviceCategoryId/search',
  authorization('outlet', 'super-admin', 'admin'),
  outletControllers.getRecommendedOutletsByServiceCategory,
);
outletRouter.patch('/update/:id', authorization('outlet', 'super-admin', 'admin'), outletControllers.updateSpecificOutlet);
outletRouter.patch('/change/profile/:id', authorization('outlet', 'super-admin', 'admin'), outletControllers.changeOutletProfileImage);
outletRouter.patch('/change/cover/:id', authorization('outlet', 'super-admin', 'admin'), outletControllers.changeOutletCoverImage);

export default outletRouter;
