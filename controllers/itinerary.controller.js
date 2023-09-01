import Itinerary from "../models/Itinerary.js";

const controller = {
    getItineraries: async (req, res) => {
        try {

            let itineraries;
            let queries = {}

            if(req.query.cityId) {
                queries.city = req.query.cityId
            }

            if (req.query.city === 'true') {
                itineraries = await Itinerary.find(queries)
                .populate('city');
            } else {
                itineraries = await Itinerary.find(queries);
            }
            
            if (itineraries.length > 0) {
                return res.status(200).json({
                    success: true,
                    itineraries: itineraries
                });
            }

            return res.status(404).json({
                success: false,
                message: 'No itineraries found'
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Error in obtaining the itineraries'
            });
        }
    },

    getItineraryById: async (req, res) => {
        try {
            const oneItinerary = await Itinerary.findById(req.params.id);

            if (oneItinerary) {
                return res.status(200).json({
                    success: true,
                    itinerary: oneItinerary
                });
            }

            return res.status(404).json({
                success: false,
                message: 'Itinerary not found'
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Error in obtaining the itinerary'
            });
        }
    },

    createItinerary: async (req, res) => {
        try {
            const newItinerary = await Itinerary.create(req.body);

            return res.status(201).json({
                success: true,
                message: 'Itinerary created'
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Error creating the itinerary'
            });
        }
    },

    updateItinerary: async (req, res) => {
        const updatedItineraryData = {
            user: {
                name: req.body.name,
                photo: req.body.photo
            },
            title: req.body.title,
            price: req.body.price,
            duration: req.body.duration,
            likes: req.body.likes,
            hashtags: req.body.hashtags,
            comments: req.body.comments
        };

        try {
            const updatedItinerary = await Itinerary.findByIdAndUpdate(
                req.params.id,
                updatedItineraryData,
                { new: true }
            );

            if (updatedItinerary) {
                return res.status(200).json({
                    success: true,
                    message: 'Itinerary updated',
                    itinerary: updatedItinerary
                });
            }

            return res.status(404).json({
                success: false,
                message: 'Itinerary not found'
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Error updating the itinerary'
            });
        }
    },

    deleteItinerary: async (req, res) => {
        try {
            const deletedItinerary = await Itinerary.findByIdAndRemove(req.params.id);

            if (deletedItinerary) {
                return res.status(200).json({
                    success: true,
                    message: 'Itinerary deleted',
                    itinerary: deletedItinerary
                });
            }

            return res.status(404).json({
                success: false,
                message: 'Itinerary not found'
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Error deleting the itinerary'
            });
        }
    }
};

export default controller;
