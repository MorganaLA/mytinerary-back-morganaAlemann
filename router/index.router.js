import express from 'express';
import cityRouter from './city.router.js';

const router = express.Router();

router.use('/cities', cityRouter);

export default router;