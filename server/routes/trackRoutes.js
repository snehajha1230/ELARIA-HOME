import express from 'express';
import Track from '../models/Track.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Middleware to verify user token and attach userId
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// @route   POST /api/tracks
// @desc    Add new track
router.post('/', verifyToken, async (req, res) => {
  const { title, artist, coverUrl, trackUrl } = req.body;

  if (!title || !trackUrl) {
    return res.status(400).json({ message: 'Title and link are required' });
  }

  try {
    const newTrack = new Track({
      user: req.userId,
      title,
      artist,
      coverUrl,
      trackUrl
    });

    const saved = await newTrack.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving track:', err);
    res.status(500).json({ message: 'Server error while saving track' });
  }
});

// @route   GET /api/tracks
// @desc    Get all tracks for the logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const tracks = await Track.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(tracks);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching tracks' });
  }
});

// @route   DELETE /api/tracks/:id
// @desc    Delete a track by ID
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const track = await Track.findOneAndDelete({ _id: req.params.id, user: req.userId });

    if (!track) {
      return res.status(404).json({ message: 'Track not found' });
    }

    res.status(200).json({ message: 'Track deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error while deleting track' });
  }
});

export default router;
