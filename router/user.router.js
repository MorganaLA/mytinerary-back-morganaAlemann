import express from 'express';
import userController from '../controllers/user.controller.js';
import { validator } from '../middlewares/validator.js';
import { userSignSchema } from '../schema/user.schema.js'

const router = express.Router();

router.get('/', userController.getUsers);

router.post('/', validator(userSignSchema),userController.createUser);

export default router;