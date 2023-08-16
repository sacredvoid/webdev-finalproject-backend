import { Router } from "express";
import * as eventsDao from "../../mongo_db/daos/events-dao.js";
import getLatLon from "../../utils/geocoding.js";

const eventsController = Router();
import eventFormReq from "./events-req.json" assert { type: "json" };
import EventModel from "../../mongo_db/models/event-models/event-model.js";

function mapReqToSchema(request) {
    eventFormReq.address = request.address;
    eventFormReq.coordinates = request.coordinates;
    eventFormReq.eventName = request.eventName;
    eventFormReq.description = request.eventDescription;
    eventFormReq.reservation = request.isReservation;
    eventFormReq.maxReservation = request.maxPeople;
    eventFormReq.startDate = request.startDateAndTimeString;
    eventFormReq.endDate = request.endDateAndTimeString;
    eventFormReq.tags = request.tags;
    eventFormReq.imgs = request.uploadLinks;
    eventFormReq.published = request.publish
    return eventFormReq;
}

async function getCoordinates(address) {
    console.log(address);
    const addressJson = JSON.parse(address);
    console.log("is json: ", addressJson)
    let addressSplit = Object.keys(addressJson).slice(0,-1);
    console.log(addressSplit);
    try {
        let coords = await getLatLon(...addressSplit);
        return coords;
    } catch (error) {
        return [0,0];
    }
}

// Method mapping depending on what's found in the body:
const findMethodsMapping = {
    _id: eventsDao.getEventById,
    keyword: eventsDao.getEventsByKeyword,
    location: eventsDao.getEventsByLocation,
    tags: eventsDao.getEventsByTags,
    startDate: eventsDao.getEventsOnOrAfterStartDate,
    hostName: eventsDao.getEventsByHostName
}

// Find the event
eventsController.get('/events', async(req, res) => {
    try {
        // if (req.body.hasOwnProperty('_id')) {
        //     const eventFound = await eventsDao.getEventById(req.body._id);
        //     res.status(201).json(eventFound);
        // }
        // // if body contains any other element
        // else if (req.body.hasOwnProperty()) {}
        // else {
        //     const allEvents = await eventsDao.getAllEvents();
        //     res.status(201).json(allEvents);
        // }
        for(const searchParameter in findMethodsMapping) {
            if(req.body.hasOwnProperty(searchParameter)) {
                const method = findMethodsMapping[searchParameter];
                const results = await method(req.body[searchParameter]);
                res.status(201).json(results);
                return;
            }
            
        }
        const allEvents = await eventsDao.getAllEvents();
        res.status(201).json(allEvents);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message});
    }
        
})


// Create new event
eventsController.post('/events', async(req, res) => {
    const eventFormDetails = req.body;
    // Call external api here for co-ordinates
    let address = eventFormDetails.address
    eventFormDetails.coordinates = await getCoordinates(address);
    
    // Update incoming request and send to DB for saving
    const updatedEventFormDetails = mapReqToSchema(eventFormDetails)
    console.log(updatedEventFormDetails);
    let eventCreated = null;
    try {
        eventCreated = await eventsDao.createEvent(updatedEventFormDetails);
        res.status(201).json(eventCreated);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message});
    }
})

// Update the event
eventsController.put('/events', async(req, res) => {
    let newFormDetails = req.body;
    // console.log("in controller: ", newFormDetails);
    let eventEdited = null;
    if (newFormDetails.hasOwnProperty('_id')) {
        const id = newFormDetails._id;
        delete newFormDetails['_id']
        if(newFormDetails.hasOwnProperty('address')) {
            newFormDetails['coordinates'] = await getCoordinates(newFormDetails.address);
        }
        try {
            console.log(newFormDetails)
            eventEdited = await eventsDao.updateEvent(id, newFormDetails);
            res.status(201).json(eventEdited);
        } catch(error) {
            console.log(error);
            res.status(400).json({message: error.message})
        }
    }
    else {
        res.status(404).json({message: 'Missing event ID'})
    }
})

// Delete the event
eventsController.delete('/events', async(req, res) => {
    let eventDeleted = null;
    if (req.body.hasOwnProperty('_id')) {
        try {
            eventDeleted = await eventsDao.deleteEvent(req.body._id);
            res.status(201).json(eventDeleted);
        } catch(error) {
            console.log(error);
            res.status(400).json({message: error.message})
        }
    }
    else {
        res.status(404).json({message: 'Missing event ID'})
    }
})

export default eventsController;