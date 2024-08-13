import { Schema, model } from 'mongoose';

const schema = new Schema({
    name: { type: String, required: true },
    country: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    itineraries: [{
        type: Schema.Types.ObjectId,
        ref: 'Itinerary'
    }]
}, {
    timestamps: true
});

const City = model('City', schema);

export default City;
