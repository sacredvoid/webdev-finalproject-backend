import { Router } from "express";
import * as eventsDao from "../../mongo_db/daos/events-dao.js";
import getLatLon from "../../utils/geocoding.js";

const eventsController = Router();
import eventFormReq from "./events-req.json" assert { type: "json" };
import dayjs from "dayjs";

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
    eventFormReq.published = request.publish;
    eventFormReq.hostDetails = request.hostDetails;
    return eventFormReq;
}

async function getCoordinates(address) {
    // const addressJson = JSON.parse(address);
    try {
        let coords = await getLatLon(
            address.venueName, 
            address.street, 
            address.city, 
            address.state, 
            address.country
        );
        return coords;
    } catch (error) {
        console.log(error);
        return [0,0];
    }
}

// Method mapping depending on what's found in the body:
// No Longer required
// const findMethodsMapping = {
//     _id: eventsDao.getEventById,
//     keyword: eventsDao.getEventsByKeyword,
//     location: eventsDao.getEventsByLocation,
//     tags: eventsDao.getEventsByTags,
//     startDate: eventsDao.getEventsOnOrAfterStartDate,
//     hostName: eventsDao.getEventsByHostName
// }

eventsController.get('/events/top-events', async(req, res) => {
    try {
        console.log("------------------------------------------------------------------------");
        console.log(`[${dayjs().toISOString()}] - ${req.method}:${req.originalUrl} - Incoming Request: ${JSON.stringify(req.body)}`);
        const results = await eventsDao.getTop10Events();
        res.status(201).json({events: results});
        console.log(`[${dayjs().toISOString()}] Outgoing Response: Status: ${201}, JSON: ${results}`);
    } catch (error) {
        res.status(400).json({message: error.message});
        console.log(`[${dayjs().toISOString()}] Outgoing Response: Status: ${400}, JSON: ${res.json}`);
    }
    console.log("------------------------------------------------------------------------");
})

// Get all tags used previously by users
eventsController.get('/events/tags', async(req, res) => {
    try {
        console.log("------------------------------------------------------------------------");
        console.log(`[${dayjs().toISOString()}] - ${req.method}:${req.originalUrl} - Incoming Request: ${JSON.stringify(req.body)}`);
        const tags = await eventsDao.getAllTags();
        res.status(201).json({tags: tags});
        console.log(`[${dayjs().toISOString()}] Outgoing Response: Status: ${201}, JSON: ${tags}`);
    } catch (error) {
        res.status(400).json({message: error.message});
        console.log(`[${dayjs().toISOString()}] Outgoing Response: Status: ${400}, JSON: ${res.json}`);
    }
    console.log("------------------------------------------------------------------------");
})

// Find the event
eventsController.get('/events', async(req, res) => {
    try {
        console.log("------------------------------------------------------------------------");
        console.log(`[${dayjs().toISOString()}] - ${req.method}:${req.originalUrl} - Incoming Request: ${JSON.stringify(req.query)}`);
        if (req.query.hasOwnProperty('_id')) {
            const eventFound = await eventsDao.getEventById(req.query._id);
            res.status(201).json(eventFound);
            console.log(`[${dayjs().toISOString()}] Outgoing Response:Status: ${201}, JSON: ${JSON.stringify(eventFound)}`);
            console.log("------------------------------------------------------------------------");
            return;
        }
        // // if body contains any other element
        // else if (req.body.hasOwnProperty()) {}
        // else {
        //     const allEvents = await eventsDao.getAllEvents();
        //     res.status(201).json(allEvents);
        // }
        // for(const searchParameter in findMethodsMapping) {
        //     if(req.body.hasOwnProperty(searchParameter)) {
        //         const method = findMethodsMapping[searchParameter];
        //         const results = await method(req.body[searchParameter]);
        //         console.log("SEARCH RESULTS: $$$$", results);
        //         res.status(201).json(results);
        //         return;
        //     }
            
        // }
        const query_params = ['keyword', 'postalCode','startDateTime', 'endDateTime', 'tags'];
        const final_search_query = {};
        query_params.forEach(param => {
            if(req.query.hasOwnProperty(param) && req.query[param]!== '') {
                final_search_query[param] = req.query[param];
            }
        });
        if (final_search_query !== {}) {
            const results = await eventsDao.getEventsCustomSearch(final_search_query);
            res.status(201).json(results);
            console.log(`[${dayjs().toISOString()}] Outgoing Response:Status: ${201}, JSON: ${results}`);
        }
        else {
            const allEvents = await eventsDao.getAllEvents();
            res.status(201).json(allEvents);
            console.log(`[${dayjs().toISOString()}] Outgoing Response: Status: ${201}, JSON: ${allEvents}`);
        }
        

        
    } catch (error) {
        res.status(400).json({message: error.message});
        console.log(`[${dayjs().toISOString()}] Outgoing Response: Status: ${res.status}, JSON: ${res.json}`);
    }
    console.log("------------------------------------------------------------------------");
        
})


// Create new event
eventsController.post('/events', async(req, res) => {
    console.log("------------------------------------------------------------------------");
    console.log(`[${dayjs().toISOString()}] - ${req.method}:${req.originalUrl} - Incoming Request: ${JSON.stringify(req.body)}`);
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
        console.log(`[${dayjs().toISOString()}] Outgoing Response:Status: ${201}, JSON: ${eventCreated}`);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message});
        console.log(`[${dayjs().toISOString()}] Outgoing Response:Status: ${201}, JSON: ${error.message}`);
    }
    console.log("------------------------------------------------------------------------");
})

// Update the event
eventsController.put('/events', async(req, res) => {
    console.log("------------------------------------------------------------------------");
    console.log(`[${dayjs().toISOString()}] - ${req.method}:${req.originalUrl} - Incoming Request: ${JSON.stringify(req.body)}`);
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
            eventEdited = await eventsDao.updateEvent(id, newFormDetails);
            res.status(201).json(eventEdited);
            console.log(`[${dayjs().toISOString()}] Outgoing Response:Status: ${201}, JSON: ${JSON.stringify(eventEdited)}`);

        } catch(error) {
            console.log(error);
            res.status(400).json({message: error.message})
            console.log(`[${dayjs().toISOString()}] Outgoing Response:Status: ${201}, JSON: ${error.message}`);

        }
    }
    else {
        res.status(404).json({message: 'Missing event ID'})
    }
    console.log("------------------------------------------------------------------------");

})

// Delete the event
eventsController.delete('/events', async(req, res) => {
    console.log("------------------------------------------------------------------------");
    console.log(`[${dayjs().toISOString()}] - ${req.method}:${req.originalUrl} - Incoming Request: ${JSON.stringify(req.body)}`);
    let eventDeleted = null;
    if (req.body.hasOwnProperty('_id')) {
        try {
            eventDeleted = await eventsDao.deleteEvent(req.body._id);
            res.status(201).json(eventDeleted);
            console.log(`[${dayjs().toISOString()}] Outgoing Response:Status: ${201}, JSON: ${JSON.stringify(eventDeleted)}`);
        } catch(error) {
            console.log(error);
            res.status(400).json({message: error.message})
            console.log(`[${dayjs().toISOString()}] Outgoing Response:Status: ${201}, JSON: ${error.message}`);
        }
    }
    else {
        res.status(404).json({message: 'Missing event ID'})
    }
    console.log("------------------------------------------------------------------------");
})

export default eventsController;