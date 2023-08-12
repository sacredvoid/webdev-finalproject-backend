
import mongoose from "mongoose"
import eventModel from "../../schemas/event-schema.js/event-schema.js"
const EventModel = mongoose.model("EventModel", eventModel)
export default EventModel