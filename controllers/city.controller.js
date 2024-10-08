import City from "../models/City.js";

const controller = {
    getCities: async (req, res) => {
        let queries = {};
    
        if (req.query.name) {
            queries.name = new RegExp(`^${req.query.name}`, 'i');
        }
    
        if (req.query.country) {
            queries.country = new RegExp(`^${req.query.country}`, 'i');
        }
    
        console.log('Query parameters:', queries);
    
        try {
            const cities = await City.find(queries).populate('itineraries');
            console.log('Cities found:', cities);
    
            if (cities.length > 0) {
                return res.status(200).json({
                    success: true,
                    cities: cities
                });
            }
    
            return res.status(404).json({
                success: false,
                message: 'Cities not found'
            });
    
        } catch (error) {
            console.error('Error fetching cities:', error);
            return res.status(500).json({
                success: false,
                message: 'Error in obtaining the cities'
            });
        }
    },

    getCityById: async (req, res) => {
        try {
            const oneCity = await City.findById(req.params.id);

            if (oneCity) {
                return res.status(200).json({
                    success: true,
                    city: oneCity
                });
            }

            return res.status(404).json({
                success: false,
                message: 'City not found'
            });

        } catch (error) {
            console.error('Error fetching city by ID:', error);
            return res.status(500).json({
                success: false,
                message: 'Error in obtaining the city'
            });
        }
    },

    createCity: async (req, res) => {
        try {
            const newCity = await City.create(req.body);

            return res.status(201).json({
                success: true,
                message: 'City created',
                city: newCity // Agregado: devolviendo la ciudad creada
            });

        } catch (error) {
            console.error('Error creating the city:', error);
            return res.status(500).json({
                success: false,
                message: 'Error creating the city'
            });
        }
    },

    updateCity: async (req, res) => {
        const updatedCityData = { ...req.body };

        try {
            const updatedCity = await City.findByIdAndUpdate(req.params.id, updatedCityData, { new: true });

            if (updatedCity) {
                return res.status(200).json({
                    success: true,
                    message: 'City updated',
                    city: updatedCity
                });
            }

            return res.status(404).json({
                success: false,
                message: 'City not found'
            });

        } catch (error) {
            console.error('Error updating the city:', error);
            return res.status(500).json({
                success: false,
                message: 'Error updating the city'
            });
        }
    },

    deleteCity: async (req, res) => {
        try {
            const deletedCity = await City.findByIdAndRemove(req.params.id);

            if (deletedCity) {
                return res.status(200).json({
                    success: true,
                    message: 'City deleted',
                    city: deletedCity
                });
            }

            return res.status(404).json({
                success: false,
                message: 'City not found'
            });

        } catch (error) {
            console.error('Error deleting the city:', error);
            return res.status(500).json({
                success: false,
                message: 'Error deleting the city'
            });
        }
    },
};

export default controller;
