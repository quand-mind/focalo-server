import Page from '../models/page.model.js';

export const createPage = async (req, res) => {
  try {
    const doc = await Page.create(req.body);
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPages = async (req, res) => {
  try {
    const docs = await Page.find({});
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPageById = async (req, res) => {
  try {
    const doc = await Page.findById(req.params.id).populate('sections');
    if (!doc) return res.status(404).json({ error: 'Page not found' });
    res.status(200).json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePage = async (req, res) => {
  try {
    const doc = await Page.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ error: 'Page not found' });
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePage = async (req, res) => {
  try {
    const doc = await Page.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Page not found' });
    res.status(200).json({ message: 'Page deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
