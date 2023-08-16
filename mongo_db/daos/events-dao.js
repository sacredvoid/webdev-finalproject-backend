import EventModel from "../models/event-models/event-model.js";

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
    EventModel.find({$text: {$search: keyword}}, (err, events) => {
        if(err) {
            return null;
        }
        else {
            return events;
        }
    });
}

export const getEventsByLocation = (location) => {

}

export const getEventsByTags = (tags) => {
    EventModel.find({ tags: { $all: tags } }, (err, events) => {
        if (err) {
          return null;
        } else {
          return events;
        }
      });
}

export const getEventsOnOrAfterStartDate = (startDate) => {
    const startDateObj = dayjs(startDate);
    EventModel.find({ date: { $gte: startDateObj.toString() } }, (err, events) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Events after the specified date:', events);
        }
      });
}

export const getEventsByHostName = (hostName) => {
    EventModel.find({ 'hostDetails.name': hostName }, (err, events) => {
        if (err) {
          console.error(err);
        } else {
          console.log('Matching events:', events);
        }
      });
}