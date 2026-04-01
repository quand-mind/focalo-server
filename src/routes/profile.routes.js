import express from 'express';
import {
  createProfile,
  getProfiles,
  getProfileById,
  updateProfile,
  deleteProfile
} from '../controllers/profile.controller.js';

const router = express.Router();

router.route('/')
  .post(createProfile)
  .get(getProfiles);

router.route('/:id')
  .get(getProfileById)
  .put(updateProfile)
  .delete(deleteProfile);

export default router;
