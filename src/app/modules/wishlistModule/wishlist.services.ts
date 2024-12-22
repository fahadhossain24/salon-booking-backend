import { IWishlist } from './wishlist.interface';
import Wishlist from './wishlist.model';

// service for create new wishlist
const createWishlist = async (data: Partial<IWishlist>) => {
  return await Wishlist.create(data);
};

// service for get wishlist by userId
const getWishlistByUserId = async(userId: string) => {
    return await Wishlist.findOne({'user.userId': userId})
}

export default {
  createWishlist,
  getWishlistByUserId
};
