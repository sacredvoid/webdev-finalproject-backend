import { Decimal128 } from "mongodb";
import mongoose from "mongoose";
export const eventSchema = new mongoose.Schema({
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
    published: {
        type: Boolean,
        required: true,
        default: false
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
}, {collection: "events"})