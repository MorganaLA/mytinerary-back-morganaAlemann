import crypto from 'crypto';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { verify } from '../helpers/google-verify.js';

const controller = {
    signup: async (req, res) => {
        try {
            req.body.verified_code = crypto.randomBytes(10).toString('hex');
            req.body.password = bcryptjs.hashSync(req.body.password, 10);

            const user = await User.create(req.body);

            return res.status(201).json({
                success: true,
                message: 'User registered!',
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Error registering the user',
            });
        }
    },

    signin: async (req, res) => {
        try {
            let user = await User.findOneAndUpdate(
                { email: req.user.email },
                { online: true },
                { new: true }
            );

            const token = jwt.sign(
                {
                    _id: user._id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    photo: user.photo,
                },
                process.env.SECRET_TOKEN,
                { expiresIn: '10h' }
            );

            user.password = null;

            return res.status(200).json({
                success: true,
                message: 'User logged in successfully',
                response: {
                    token,
                    user: {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        photo: user.photo,
                    },
                },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Error authenticating the user',
            });
        }
    },

    googleSignin: async (req, res) => {
        const { token_id } = req.body;

        try {
            const { first_name, last_name, email, photo } = await verify(token_id);

            let user = await User.findOne({ email: email });

            if (!user) {
                const data = {
                    first_name,
                    last_name,
                    email,
                    photo,
                    password: bcryptjs.hashSync(process.env.STANDARD_PASS, 10),
                    google: true,
                    verified_code: crypto.randomBytes(10).toString('hex'),
                };

                user = await User.create(data);
            }

            user.online = true;
            await user.save();

            const token = jwt.sign(
                {
                    _id: user._id,
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    photo: user.photo,
                },
                process.env.SECRET_TOKEN,
                { expiresIn: '10h' }
            );

            return res.status(200).json({
                success: true,
                message: 'User logged in successfully with Google',
                response: {
                    token,
                    user: {
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        photo: user.photo,
                    },
                },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Error authenticating the user with Google',
            });
        }
    },

    signout: async (req, res) => {
        try {
            await User.findOneAndUpdate(
                { email: req.user.email },
                { online: false },
                { new: true }
            );

            return res.status(200).json({
                success: true,
                message: 'User logged out',
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Error logging out the user',
            });
        }
    },

    token: async (req, res) => {
        const { user } = req;
        try {
            return res.status(200).json({
                user: {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    photo: user.photo,
                },
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Error retrieving user token information',
            });
        }
    },
};

export default controller;
