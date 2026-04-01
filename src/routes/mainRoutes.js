import express from 'express';
import { getMains, createMain } from '../controllers/mainController.js';

const router = express.Router();

router.route('/').get(getMains).post(createMain);

export default router;
