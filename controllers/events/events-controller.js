import { Router } from "express";
import { createEvent } from "../../mongo_db/daos/events-dao.js";
import getLatLon from "../../utils/geocoding.js";

const eventsController = Router();
import eventFormReq from "./events-req.json" assert { type: "json" };

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

eventsController.post('/events', async(req, res) => {
    const eventFormDetails = req.body;
    // Call external api here for co-ordinates
    let address = eventFormDetails.address
    if (address!='') {
        let addressSplit = address.split(',');
        const coords = await getLatLon(addressSplit[0],addressSplit[1],addressSplit[2]);
        // console.log("coords: ", coords);
        eventFormDetails.coordinates = coords;
    }
    
    // Update incoming request and send to DB for saving
    const updatedEventFormDetails = mapReqToSchema(eventFormDetails)
    console.log(updatedEventFormDetails);
    let eventCreated = null;
    try {
        eventCreated = await createEvent(updatedEventFormDetails);
        res.status(201).json(eventCreated);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: error.message});
    }
})

export default eventsController;