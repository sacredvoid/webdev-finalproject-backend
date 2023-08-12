import EventModel from "../models/event-models/event-model.js";

export const createEvent = (eventData) => {
    return EventModel.create(eventData);
}