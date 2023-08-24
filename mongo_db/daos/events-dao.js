import EventModel from "../models/event-models/event-model.js";
import dayjs from "dayjs";
import RegUserModel from "../models/user-models/reg-user-model.js";

export const createEvent = (eventData) => {
    return EventModel.create(eventData);
}

export const updateEvent = (id, eventData) => {
    return EventModel.updateOne({ _id: id }, { $set: eventData })
}

export const deleteEvent = (id) => {
    return EventModel.deleteOne({ _id: id });
}

export const getAllEvents = () => {
    return EventModel.find();
}

export const getEventById = (id) => {
    return EventModel.findById(id);
}

export const getEventsByKeyword = (keyword) => {
    return EventModel.find({ $text: { $search: keyword } });
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
        if (query.startDate) {
            query.startDate.$gte = startDateTime;
        } else {
            query.startDate = { $gte: startDateTime };
        }
    }

    if (endDateTime) {
        if (query.startDate) {
            query.startDate.$lte = endDateTime;
        } else {
            query.startDate = { $lte: endDateTime };
        }
    }

    if (tags) {
        // Search for events with matching tags
        query.tags = { $in: tags }; // Assuming tags are provided as a comma-separated string
    }
    console.log('query:', query)
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

function countItems(arr) {
  const counts = new Map();
  
  for (const item of arr) {
    counts.set(item, (counts.get(item) || 0) + 1);
  }
  
  return counts;
}

function getTopItems(itemCounts) {
  // Convert the Map or object to an array of key-value pairs
  const itemCountArray = Array.from(itemCounts);

  // Sort the array in descending order based on item counts
  itemCountArray.sort((a, b) => b[1] - a[1]);

  // Slice the first 10 items or fewer
  const topItems = itemCountArray.slice(0, 10);

  // Convert the result back to an object if needed
  const topItemsObject = Object.fromEntries(topItems);

  return topItemsObject;
}

// Get top 10 events
export const getTop10Events = async() => {
    const allRegUsers = await RegUserModel.find();
    let allGoingEvents = []
    allRegUsers.forEach(user => {
        allGoingEvents.push(user.goingEventIds);
    });
    const goingEventCount = countItems(allGoingEvents);
    return getTopItems(goingEventCount);
}
// Get users recently liked

// fetch all currently used tags from DB