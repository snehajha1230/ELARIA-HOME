import express from 'express';
import Book from '../models/Book.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
};

router.post('/', verifyToken, async (req, res) => {
  const { title, author, genre, coverUrl } = req.body;
  if (!title || !coverUrl) {
    return res.status(400).json({ message: 'Title and Cover Image are required' });
  }

  try {
    const newBook = new Book({ user: req.userId, title, author, genre, coverUrl });
    const saved = await newBook.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error('Error saving book:', err);
    res.status(500).json({ message: 'Server error while saving book' });
  }
});

router.get('/', verifyToken, async (req, res) => {
  try {
    const books = await Book.find({ user: req.userId }).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch {
    res.status(500).json({ message: 'Server error while fetching books' });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const deleted = await Book.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!deleted) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch {
    res.status(500).json({ message: 'Server error while deleting book' });
  }
});

export default router;
