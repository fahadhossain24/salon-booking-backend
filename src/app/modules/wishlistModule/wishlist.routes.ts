import express from 'express';
import wishlistControllers from './wishlist.controllers';

const wishlistRouter = express.Router();

wishlistRouter.post('/add-to-wishlist', wishlistControllers.addToWishlist);
wishlistRouter.get('/retrive/user/:userId', wishlistControllers.getWishlistByUserId);

export default wishlistRouter;
