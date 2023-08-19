import EventModel from "../models/event-models/event-model.js";
import dayjs from "dayjs";

export const createEvent = (eventData) => {
    return EventModel.create(eventData);
}

export const updateEvent = (id, eventData) => {
    return EventModel.updateOne({_id: id}, {$set: eventData})
}

export const deleteEvent = (id) => {
    return EventModel.deleteOne({_id: id});
}

export const getAllEvents = () => {
    return EventModel.find();
}

export const getEventById = (id) => {
    return EventModel.findById(id);
}

export const getEventsByKeyword = (keyword) => {
    return EventModel.find({$text: {$search: keyword}});
}

export const getEventsByTags = (tags) => {
    return EventModel.find({ tags: { $all: tags } });
}

export const getEventsOnOrAfterStartDate = (startDate) => {
    const startDateObj = dayjs(startDate);
    return EventModel.find({ date: { $gte: startDateObj.toString() } });
}

export const getEventsCustomSearch = (queryObject) => {
    const keyword = queryObject.keyword; 
    const postalCode = queryObject.postalCode; 
    const startDateTime = queryObject.startDateTime; 
    const endDateTime = queryObject.endDateTime;
    const tags = queryObject.tags; 

    const query = {};

    if (keyword) {
    // Search for keyword in eventName and description fields using text search
    query.$text = { $search: keyword };
    }

    if (postalCode) {
    // Search for events with matching postalCode
    query['address.zipcode'] = postalCode;
    }

    if (startDateTime) {
    // Search for events within a date range
    query.startDate = { $gte: startDateTime };
    }

    if(endDateTime) {
        query.endDate = { $lte: endDateTime };
    }

    if (tags) {
    // Search for events with matching tags
    query.tags = { $in: tags}; // Assuming tags are provided as a comma-separated string
    }
    return EventModel.find(query);
}

export const getAllTags = async () => {
    const allEvents = await EventModel.find();
    const allTagsSet = new Set();
    allEvents.forEach(eventFound => {
        const currentTags = eventFound.tags;
        currentTags.forEach(tag => {
            allTagsSet.add(tag);
        });
    });
    return [...allTagsSet];
}


// fetch all currently used tags from DB