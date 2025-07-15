import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true },
  author: { type: String },
  genre: { type: String },
  coverUrl: {
    type: String,
    required: true,
    validate: {
      validator: url => /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/.test(url),
      message: 'Invalid image URL',
    }
  }
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);
