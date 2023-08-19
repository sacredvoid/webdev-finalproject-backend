
import mongoose from "mongoose"
import { eventSchema } from "../../schemas/event-schema.js/event-schema.js"
const EventModel = mongoose.model("EventModel", eventSchema)
export default EventModel