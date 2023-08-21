import { Schema } from "mongoose";
const enums = ["api", "db"]
export const EventSourceSchema = new Schema({
    event_id: String,
    source: {type : String, enum: enums, default: "db"}
})