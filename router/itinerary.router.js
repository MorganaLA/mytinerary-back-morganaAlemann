import express from 'express';
import itineraryController from '../controllers/itinerary.controller.js'; 
//import { isAdmin } from '../middlewares/isAdmin.middleware.js';
import passport from '../middlewares/passport.js';

const router = express.Router();
const { getItineraries, createItinerary, getItineraryById, updateItinerary, deleteItinerary } = itineraryController;

router.get('/', getItineraries);
router.get('/:id', getItineraryById);
router.post('/', passport.authenticate('jwt', { session: false }), createItinerary)
router.put('/:id', updateItinerary);
router.delete('/:id',
    //isAdmin,
    deleteItinerary 
)


export default router;