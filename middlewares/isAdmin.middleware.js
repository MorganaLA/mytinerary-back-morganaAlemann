import User from "../models/User.js";

export const isAdmin = async (req, res, next) => {
    try {
        const { userId } = req.params; // Cambiado a req.params

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required'
            });
        }

        const user = await User.findById(userId);

        if (user && user.role === 'admin') {
            return next();
        }

        return res.status(403).json({
            success: false,
            message: 'User not authorized to access this resource'
        });

    } catch (error) {
        console.error('Internal server error in isAdmin middleware:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
