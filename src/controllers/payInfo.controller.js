import PayInfo from '../models/payInfo.model.js';

export const createPayInfo = async (req, res) => {
  try {
    const doc = await PayInfo.create(req.body);
    res.status(201).json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getPayInfos = async (req, res) => {
  try {
    const docs = await PayInfo.find({});
    res.status(200).json(docs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPayInfoById = async (req, res) => {
  try {
    const doc = await PayInfo.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'PayInfo not found' });
    res.status(200).json(doc);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePayInfo = async (req, res) => {
  try {
    const doc = await PayInfo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!doc) return res.status(404).json({ error: 'PayInfo not found' });
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deletePayInfo = async (req, res) => {
  try {
    const doc = await PayInfo.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'PayInfo not found' });
    res.status(200).json({ message: 'PayInfo deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
