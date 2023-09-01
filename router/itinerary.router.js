import express from 'express';
import itineraryController from '../controllers/itinerary.controller.js'; 

const router = express.Router();
const { getItineraries, createItinerary, getItineraryById, updateItinerary, deleteItinerary } = itineraryController;

router.get('/', getItineraries);
router.get('/:id', getItineraryById);
router.post('/', createItinerary);
router.put('/:id', updateItinerary);
router.delete('/:id', deleteItinerary);

export default router;