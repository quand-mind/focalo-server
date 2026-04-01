import express from 'express';
import {
  createTemplate,
  getTemplates,
  getTemplateById,
  updateTemplate,
  deleteTemplate
} from '../controllers/template.controller.js';

const router = express.Router();

router.route('/')
  .post(createTemplate)
  .get(getTemplates);

router.route('/:id')
  .get(getTemplateById)
  .put(updateTemplate)
  .delete(deleteTemplate);

export default router;
