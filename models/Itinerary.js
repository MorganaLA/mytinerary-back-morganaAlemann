import { Schema, model } from "mongoose";

const itinerarySchema = new Schema({
    city: {
        type: Schema.Types.ObjectId,
        ref: 'City',
        required: true
    },
    user: {
        name: { type: String, required: true },
        photo: { type: String, required: true },
    },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    likes: { type: Number, default: 0 },
    hashtags: [{ type: String }],
    comments: [{ type: String }],
}, {
    timestamps: true,
});

const Itinerary = model("Itinerary", itinerarySchema);

export default Itinerary;