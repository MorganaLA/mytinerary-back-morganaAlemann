import { Schema, model } from "mongoose";

let collection = 'cities'

let schema = new Schema({
    name: { type: String, required: true},
    country: { type: String, required: true},
    image: { type: String, required: true},
    description: { type: String, required: true},
    itineraries: [{
        type: Schema.Types.ObjectId,
        ref: 'Itinerary'
    }]
},{
    timestamps:true
    })

    const City = model(collection, schema)

    export default City;