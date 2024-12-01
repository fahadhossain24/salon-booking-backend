import mongoose from "mongoose";
import { IOutlet } from "./outlet.interface";

const outletSchema = new mongoose.Schema<IOutlet>({

}, {
    timestamps: true
})

const Outlet = mongoose.model<IOutlet>('outlet', outletSchema);
export default Outlet;