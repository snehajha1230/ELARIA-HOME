import express from 'express';
import Media from '../models/Media.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Middleware to verify user token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// POST /api/media - Add new media
router.post('/', verifyToken, async (req, res) => {
  const { title, type, thumbnailUrl, mediaUrl } = req.body;
  if (!title || !mediaUrl) {
    return res.status(400).json({ message: 'Title and media URL are required' });
  }

  try {
    const newMedia = new Media({
      user: req.userId,
      title,
      type,
      thumbnailUrl,
      mediaUrl
    });

    const saved = await newMedia.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving media:', err);
    res.status(500).json({ message: 'Server error while saving media' });
  }
});

// GET /api/media - Get all media for the logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const media = await Media.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(media);
  } catch {
    res.status(500).json({ message: 'Server error while fetching media' });
  }
});

// DELETE /api/media/:id - Delete a media item
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const media = await Media.findOneAndDelete({ _id: req.params.id, user: req.userId });

    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    res.status(200).json({ message: 'Media deleted successfully' });
  } catch {
    res.status(500).json({ message: 'Server error while deleting media' });
  }
});

export default router;
