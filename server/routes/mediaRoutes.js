import express from 'express';
import Media from '../models/Media.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const router = express.Router();

// Helper function to extract YouTube video ID
const extractYouTubeId = (url) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
};

const getBestThumbnail = (thumbnails = {}) =>
  thumbnails.maxres?.url ||
  thumbnails.standard?.url ||
  thumbnails.high?.url ||
  thumbnails.medium?.url ||
  thumbnails.default?.url ||
  '';

const parseTypeFromTitle = (title = '') => {
  const lower = title.toLowerCase();
  if (lower.includes('trailer') || lower.includes('teaser')) return 'Movie';
  if (lower.includes('episode') || lower.includes('season') || lower.includes('series')) return 'Series';
  if (lower.includes('anime')) return 'Anime';
  if (lower.includes('documentary') || lower.includes('docu')) return 'Documentary';
  return '';
};

const fetchYouTubeData = async (videoId) => {
  if (!videoId) return {};

  // Primary method: YouTube Data API (if configured)
  if (process.env.YOUTUBE_API_KEY) {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet&key=${process.env.YOUTUBE_API_KEY}`
      );

      if (response.data.items?.length) {
        const snippet = response.data.items[0].snippet;
        return {
          title: snippet.title || '',
          thumbnailUrl: getBestThumbnail(snippet.thumbnails),
          type: parseTypeFromTitle(snippet.title),
        };
      }
    } catch (error) {
      console.error('Error fetching YouTube data from API:', error.message);
    }
  }

  // Fallback method: noembed (works without API key for public videos)
  try {
    const fallbackResponse = await axios.get(`https://noembed.com/embed?url=https://www.youtube.com/watch?v=${videoId}`);
    if (fallbackResponse.data) {
      return {
        title: fallbackResponse.data.title || '',
        thumbnailUrl: fallbackResponse.data.thumbnail_url || '',
        type: parseTypeFromTitle(fallbackResponse.data.title),
      };
    }
  } catch (error) {
    console.error('Error fetching YouTube fallback data:', error.message);
  }

  return {};
};

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

// POST /api/media/fetch-info - Fetch media info from YouTube URL
router.post('/fetch-info', verifyToken, async (req, res) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ message: 'URL is required' });
    }

    const isYouTubeUrl = url.includes('youtube.com') || url.includes('youtu.be');
    if (!isYouTubeUrl) {
      return res.status(200).json({});
    }

    const videoId = extractYouTubeId(url);
    if (!videoId) {
      return res.status(200).json({});
    }

    const mediaInfo = await fetchYouTubeData(videoId);
    return res.status(200).json(mediaInfo);
  } catch (err) {
    console.error('Error fetching media info:', err);
    return res.status(500).json({ message: 'Failed to fetch media information' });
  }
});

// POST /api/media - Add new media
router.post('/', verifyToken, async (req, res) => {
  const { title, type, thumbnailUrl, mediaUrl, isPublic } = req.body;
  if (!title || !mediaUrl) {
    return res.status(400).json({ message: 'Title and media URL are required' });
  }

  try {
    const newMedia = new Media({
      user: req.userId,
      title,
      type,
      thumbnailUrl,
      mediaUrl,
      isPublic: isPublic !== undefined ? isPublic : true // Default to true if not provided
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

// GET /api/media/public/:userId - Get public media for a specific user
router.get('/public/:userId', async (req, res) => {
  try {
    const media = await Media.find({ 
      user: req.params.userId,
      isPublic: true 
    }).sort({ createdAt: -1 });
    
    res.status(200).json(media);
  } catch (err) {
    console.error('Error fetching public media:', err);
    res.status(500).json({ message: 'Server error while fetching public media' });
  }
});

// PUT /api/media/:id - Update a media item
router.put('/:id', verifyToken, async (req, res) => {
  const { title, type, thumbnailUrl, mediaUrl, isPublic } = req.body;
  if (!title || !mediaUrl) {
    return res.status(400).json({ message: 'Title and media URL are required' });
  }

  try {
    const media = await Media.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { 
        title, 
        type, 
        thumbnailUrl, 
        mediaUrl,
        isPublic: isPublic !== undefined ? isPublic : true
      },
      { new: true }
    );

    if (!media) {
      return res.status(404).json({ message: 'Media not found' });
    }

    res.status(200).json(media);
  } catch (err) {
    console.error('Error updating media:', err);
    res.status(500).json({ message: 'Server error while updating media' });
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
