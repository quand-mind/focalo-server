import express from 'express';
import {
  createPayInfo,
  getPayInfos,
  getPayInfoById,
  updatePayInfo,
  deletePayInfo
} from '../controllers/payInfo.controller.js';

const router = express.Router();

router.route('/')
  .post(createPayInfo)
  .get(getPayInfos);

router.route('/:id')
  .get(getPayInfoById)
  .put(updatePayInfo)
  .delete(deletePayInfo);

export default router;
