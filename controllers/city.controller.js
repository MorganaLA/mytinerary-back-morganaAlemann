import City from "../models/City.js"

const controller = {
    getCities: async (req, res) => {

        let queries = {}

        if (req.query.name) {
            queries.name = new RegExp(`^${req.query.name}`, 'i')
        }

        if (req.query.country) {
            queries.country = new RegExp(`^${req.query.country}`, 'i')
        }

        try {
            const cities = await City.find(queries).populate('itineraries');

            if (cities.length > 0) {
                return res.status(200).json({
                    success: true,
                    cities: cities
                })
            }

            return res.status(404).json({
                success: false,
                message: 'Cities not found'
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: 'Error in obtaining the cities'
            })
        }
    },

    getCityById: async (req, res) => {
        try {
            const oneCity = await City.findById(req.params.id)

            if (oneCity) {
                return res.status(200).json({
                    success: true,
                    city: oneCity
                })
            }

            return res.status(404).json({
                success: false,
                message: 'City not found'
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: 'Error in obtaining the city'
            })
        }
    },

    createCity: async (req, res) => {

        try {
            const newCity = await City.create(req.body);

            return res.status(201).json({
                success: true,
                message: 'City created'
            });

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Error creating the city'
            });
        }
    },

    updateCity: async (req, res) => {
        const updatedCityData = {
            name: req.body.name,
            country: req.body.country,
            image: req.body.image,
            description: req.body.description,
            itineraries: req.body. itineraries
        };
    
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
            console.log(error);
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
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Error deleting the city'
            });
        }
    }
}


export default controller