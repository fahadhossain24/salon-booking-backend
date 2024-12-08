import { Document, Types } from "mongoose";

export interface ISchedule extends Document{
    daySlot: {
        dayName: string,
        openTime: Date,
        closeTime: Date,
        _id: Types.ObjectId
    }[],
    outlet: {
        outletId: Types.ObjectId,
        name: string,
        type: string
    },
    timeSlot: string[],
    capacityOnTime: number
}