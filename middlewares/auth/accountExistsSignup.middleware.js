import User from "../../models/User.js";

export const accountExistsSignup = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: 'User is already registered'
            });
        }
        return next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
