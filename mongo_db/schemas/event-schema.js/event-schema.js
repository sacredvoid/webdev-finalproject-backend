import { Decimal128 } from "mongodb";
import mongoose from "mongoose";

const HostnameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: ''
    },
    email: {
        type: String,
        required: true,
        default: ''
    },
  });

const AddressSchema = new mongoose.Schema({
    venueName: {
        type: String,
        required: true
    },
    street: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    }
})

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
    address: AddressSchema,
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
    },
    hostDetails: HostnameSchema
}, {collection: "events"})

eventSchema.index(
    {
      eventName: "text",
      description: "text",
      tags:"text",
      'address.venueName':"text",
      'address.street': "text",
      'address.city': "text",
      'address.state': "text",
      'address.country': "text",
      'address.zipcode': "text"
      // add hostname
    }
  );