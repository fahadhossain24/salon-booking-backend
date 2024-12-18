import { IBooking } from "./booking.interface";
import Booking from "./booking.model"

// service for create new booking
const createBooking = async(data: Partial<IBooking>) => {
    return await Booking.create(data);
}

// service for retrive all bookings by userId
const getBookingsByUserId = async(userId: string, skip: number, limit: number) => {
    return await Booking.find({'user.userId': userId}).sort('-createdAt').skip(skip).limit(limit);
}

// service for retrive all bookings by outletId
const getbookingsByOutletId = async(outletId: string, skip: number, limit: number) => {
    console.log(outletId)
    return await Booking.find({'outlet.outletId': outletId}).sort('-createdAt').skip(skip).limit(limit);
}

// service for retrive all bookings by serviceId
const getBookingsByServiceId = async(serviceId: string, skip: number, limit: number) => {
    return await Booking.find({'service.serviceId': serviceId}).sort('-createdAt').skip(skip).limit(limit);
}


export default {
    createBooking,
    getBookingsByServiceId,
    getBookingsByUserId,
    getbookingsByOutletId
}