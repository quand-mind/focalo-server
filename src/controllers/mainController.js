import Main from '../models/mainModel.js';

// @desc    Get all main items
// @route   GET /api/mains
// @access  Public
export const getMains = async (req, res) => {
  try {
    const mains = await Main.find({});
    res.json(mains);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Create a new main item
// @route   POST /api/mains
// @access  Public
export const createMain = async (req, res) => {
  try {
    const { title, description } = req.body;
    const main = new Main({
      title,
      description
    });
    const createdMain = await main.save();
    res.status(201).json(createdMain);
  } catch (error) {
    res.status(400).json({ message: 'Invalid data' });
  }
};
