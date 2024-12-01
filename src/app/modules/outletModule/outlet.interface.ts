import mongoose, { Document } from "mongoose";

export interface IOutlet extends Document{
    outletId: string,
    name: string,
    email: string,
    phone: string,
    password: string,
    status: string,
    image: string,
    location: {
        latitude: string,
        longitude: string,
        address: string,
    },
    nidNumber: string,
    nidImage: string,
    bankAccountNumber: string,
    experience: string,
    about: string,
    role: string,
    serviceCategory: {
        name: string,
        categoryId: mongoose.Schema.Types.ObjectId
    },
    type: string,
    isRecommended: boolean
}

