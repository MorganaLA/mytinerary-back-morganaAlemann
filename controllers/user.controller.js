import User from "../models/User.js";

const controller = {
    getUsers: async (req, res, next) => {
        try {
            const users = await User.find();

            return res.status(200).json({
                success: true,
                users,
            });
        } catch (error) {
            next(error);
        }
    },
    createUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body);

            return res.status(200).json({
                success: true,
                message: 'User created successfully',
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Error creating a user',
            });
        }
    },
    deleteUser: async (req, res) => {
        try {
       
            const userId = req.params.id; 

            const deletedUser = await User.findOneAndRemove({ _id: userId });

            if (!deletedUser) {
                return res.status(404).json({
                    success: false,
                    message: 'User not found',
                });
            }

            return res.status(200).json({
                success: true,
                message: 'User deleted successfully',
                deletedUser,
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: 'Error deleting the user',
            });
        }
    },
};

export default controller;