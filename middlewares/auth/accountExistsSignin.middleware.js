import User from "../../models/User.js";

export const accountExistsSignin = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            req.user = {
                id: user._id,
                email: user.email,
                photo: user.photo,
                online: user.online,
                verified: user.verified,
                password: user.password
            };
            return next();
        }
        return res.status(400).json({
            success: false,
            message: 'User not registered'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};
