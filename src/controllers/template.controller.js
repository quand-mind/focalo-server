import Template from '../models/template.model.js';

export const createTemplate = async (req, res) => {
  try {
    const doc = await Template.create(req.body);
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTemplates = async (req, res) => {
  try {
    const docs = await Template.find({});
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getTemplateById = async (req, res) => {
  try {
    const doc = await Template.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('mainPage')
      .populate('pages');
    if (!doc) return res.status(404).json({ error: 'Template not found' });
    res.status(200).json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTemplate = async (req, res) => {
  try {
    const doc = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ error: 'Template not found' });
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTemplate = async (req, res) => {
  try {
    const doc = await Template.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Template not found' });
    res.status(200).json({ message: 'Template deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
