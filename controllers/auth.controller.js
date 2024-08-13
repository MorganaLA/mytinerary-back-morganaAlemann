import crypto from 'crypto';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { verify } from '../helpers/google-verify.js';

const controller = {
    signup: async (req, res, next) => {
        try {
            // Validar y sanitizar datos aquí si es necesario
            req.body.verified_code = crypto.randomBytes(10).toString('hex');
            req.body.password = bcryptjs.hashSync(req.body.password, 10);

            const user = await User.create(req.body);

            return res.status(201).json({
                success: true,
                message: 'User registered!',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({
                success: false,
                message: 'Error registering the user',
            });
        }
    },
    signin: async (req, res, next) => {
        try {
            const user = await User.findOneAndUpdate(
                { email: req.body.email }, // Utiliza `req.body.email` si el email se envía en el cuerpo de la solicitud
                { online: true },
                { new: true }
            );

            if (!user || !bcryptjs.compareSync(req.body.password, user.password)) {
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials',
                });
            }

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

            user.password = null; // No enviar la contraseña en la respuesta

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
            res.status(500).json({
                success: false,
                message: 'Error authenticating the user',
            });
        }
    },
    googleSignin: async (req, res, next) => {
        const { token_id } = req.body;
        try {
            const { first_name, last_name, email, photo } = await verify(token_id);

            let user = await User.findOne({ email });

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
            res.status(500).json({
                success: false,
                message: 'Error authenticating the user',
            });
        }
    },
    signout: async (req, res, next) => {
        try {
            const user = await User.findOneAndUpdate(
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
            res.status(500).json({
                success: false,
                message: 'Error logging out the user',
            });
        }
    },
    token: async (req, res, next) => {
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
            next(error);
        }
    },
};

export default controller;
