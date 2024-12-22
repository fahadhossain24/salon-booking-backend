import express from 'express';
import wishlistControllers from './wishlist.controllers';
import authorization from '../../middlewares/authorization';

const wishlistRouter = express.Router();

wishlistRouter.post('/add-to-wishlist', authorization('user', 'outlet', 'super-admin', 'admin'), wishlistControllers.addToWishlist);
wishlistRouter.get('/retrive/user/:userId', authorization('user', 'outlet', 'super-admin', 'admin'), wishlistControllers.getWishlistByUserId);

export default wishlistRouter;
