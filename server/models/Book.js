import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  author: { 
    type: String,
    trim: true,
    default: ''
  },
  genre: { 
    type: String,
    trim: true,
    default: ''
  },
  coverUrl: {
    type: String,
    required: true,
    validate: {
      validator: url => /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(url),
      message: 'Invalid image URL format (must be JPG, PNG, etc.)',
    }
  },
  bookUrl: { 
    type: String,
    validate: {
      validator: url => /^https?:\/\/.+/.test(url),
      message: 'Invalid book URL'
    }
  },
  isPublic: {
    type: Boolean,
    default: true
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  }
}, { 
  timestamps: true 
});

export default mongoose.model('Book', bookSchema);
