import Profile from '../models/profile.model.js';

export const createProfile = async (req, res) => {
  try {
    const doc = await Profile.create(req.body);
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProfiles = async (req, res) => {
  try {
    const docs = await Profile.find({});
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfileById = async (req, res) => {
  try {
    const doc = await Profile.findById(req.params.id).populate('payInfo').populate('profileConfig');
    if (!doc) return res.status(404).json({ error: 'Profile not found' });
    res.status(200).json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const doc = await Profile.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ error: 'Profile not found' });
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const doc = await Profile.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Profile not found' });
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
