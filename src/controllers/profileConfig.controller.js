import ProfileConfig from '../models/profileConfig.model.js';

export const createProfileConfig = async (req, res) => {
  try {
    const doc = await ProfileConfig.create(req.body);
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProfileConfigs = async (req, res) => {
  try {
    const docs = await ProfileConfig.find({});
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfileConfigById = async (req, res) => {
  try {
    const doc = await ProfileConfig.findById(req.params.id).populate('template').populate('pages');
    if (!doc) return res.status(404).json({ error: 'ProfileConfig not found' });
    res.status(200).json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfileConfig = async (req, res) => {
  try {
    const doc = await ProfileConfig.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ error: 'ProfileConfig not found' });
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProfileConfig = async (req, res) => {
  try {
    const doc = await ProfileConfig.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'ProfileConfig not found' });
    res.status(200).json({ message: 'ProfileConfig deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
