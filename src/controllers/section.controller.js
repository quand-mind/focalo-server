import Section from '../models/section.model.js';

export const createSection = async (req, res) => {
  try {
    const doc = await Section.create(req.body);
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getSections = async (req, res) => {
  try {
    const docs = await Section.find({});
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSectionById = async (req, res) => {
  try {
    const doc = await Section.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Section not found' });
    res.status(200).json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSection = async (req, res) => {
  try {
    const doc = await Section.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ error: 'Section not found' });
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteSection = async (req, res) => {
  try {
    const doc = await Section.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Section not found' });
    res.status(200).json({ message: 'Section deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
