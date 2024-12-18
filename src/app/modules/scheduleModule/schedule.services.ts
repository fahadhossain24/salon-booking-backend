import { ISchedule } from "./schedule.interface";
import Schedule from "./schedule.model";

// service for create new schedule
const createScheduleByOutletId = async(data: Partial<ISchedule>) => {
  return await Schedule.create(data)
}

// service for update new schedule
const updateScheduleByOutletId = async(outletId: string, data: Partial<ISchedule>) => {
  return await Schedule.updateOne({'outlet.outletId': outletId}, data, {
    runValidators: true
  })
}

export default {
    createScheduleByOutletId,
    updateScheduleByOutletId
}
