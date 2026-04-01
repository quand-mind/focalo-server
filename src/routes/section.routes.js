import express from 'express';
import {
  createSection,
  getSections,
  getSectionById,
  updateSection,
  deleteSection
} from '../controllers/section.controller.js';

const router = express.Router();

router.route('/')
  .post(createSection)
  .get(getSections);

router.route('/:id')
  .get(getSectionById)
  .put(updateSection)
  .delete(deleteSection);

export default router;
