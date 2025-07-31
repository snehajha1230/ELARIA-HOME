import express from 'express';
import Poem from '../models/Poem.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// POST: Add poem
router.post('/', verifyToken, async (req, res) => {
  const { title, author, linkUrl, thumbnailUrl } = req.body;
  if (!title || !linkUrl) return res.status(400).json({ message: 'Title and link are required' });

  try {
    const newPoem = new Poem({ user: req.userId, title, author, linkUrl, thumbnailUrl });
    const saved = await newPoem.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while saving poem' });
  }
});

// PUT: Update poem
router.put('/:id', verifyToken, async (req, res) => {
  const { title, author, linkUrl } = req.body;
  if (!title || !linkUrl) return res.status(400).json({ message: 'Title and link are required' });

  try {
    const updatedPoem = await Poem.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { title, author, linkUrl },
      { new: true }
    );
    
    if (!updatedPoem) return res.status(404).json({ message: 'Poem not found' });
    res.json(updatedPoem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while updating poem' });
  }
});

// GET: Fetch poems for user
router.get('/', verifyToken, async (req, res) => {
  try {
    const poems = await Poem.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(poems);
  } catch {
    res.status(500).json({ message: 'Error fetching poems' });
  }
});

// DELETE: Remove poem
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deleted = await Poem.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deleted) return res.status(404).json({ message: 'Poem not found' });
    res.json({ message: 'Poem deleted' });
  } catch {
    res.status(500).json({ message: 'Error deleting poem' });
  }
});

export default router;