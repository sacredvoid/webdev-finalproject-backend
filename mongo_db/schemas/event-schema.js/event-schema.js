import { Decimal128 } from "mongodb";
import mongoose from "mongoose";
const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true,
        unique: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    coordinates: {
        type: [Decimal128],
        required: true,
        default: [0,0]
    },
    description: {
        type: String,
        required: false,
        default: ''
    },
    reservation: {
        type: Boolean,
        required: false,
        default: false
    },
    maxReservation: {
        type: Number,
        min: 0,
        default: 0
    },
    tags: {
        type: [String],
        required: false,
        default: []
    },
    imgs: {
        type: [String],
        required: false,
        default: []
    }
}, "events")

const eventModel = mongoose.model('Event', eventSchema)

export default eventModel