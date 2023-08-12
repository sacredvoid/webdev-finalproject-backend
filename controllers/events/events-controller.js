import { Router } from "express";
import { createEvent } from "../../mongo_db/daos/events-dao.js";
import getLatLon from "../../utils/geocoding.js";

const eventsController = Router();
import eventFormReq from "./events-req.json"

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

eventsController.post('/api/events', async(req, res) => {
    const eventFormDetails = req.body;
    // Call external api here for co-ordinates
    const address = eventFormDetails.address
    if (address!='') {
        const address = address.split(',');
        const coords = getLatLon(address[0],address[1],address[2]);
        eventFormDetails.coordinates = coords;
    }
    
    // Update incoming request and send to DB for saving
    updatedEventFormDetails = mapReqToSchema(eventFormDetails)

    let eventCreated = null;
    try {
        eventCreated = await createEvent(updatedEventFormDetails);
    } catch (error) {
        console.log(error);
        res.statusCode(400).json({message: error.message});
    }
})