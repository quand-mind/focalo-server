import express from 'express';
import {
  createProfileConfig,
  getProfileConfigs,
  getProfileConfigById,
  updateProfileConfig,
  deleteProfileConfig
} from '../controllers/profileConfig.controller.js';

const router = express.Router();

router.route('/')
  .post(createProfileConfig)
  .get(getProfileConfigs);

router.route('/:id')
  .get(getProfileConfigById)
  .put(updateProfileConfig)
  .delete(deleteProfileConfig);

export default router;
