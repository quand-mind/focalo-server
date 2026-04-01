import express from 'express';
import {
  createPage,
  getPages,
  getPageById,
  updatePage,
  deletePage
} from '../controllers/page.controller.js';

const router = express.Router();

router.route('/')
  .post(createPage)
  .get(getPages);

router.route('/:id')
  .get(getPageById)
  .put(updatePage)
  .delete(deletePage);

export default router;
