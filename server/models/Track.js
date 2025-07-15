// server/models/Track.js
import mongoose from 'mongoose';

const trackSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    artist: { type: String, trim: true, default: '' },

    coverUrl: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.*\.(jpg|jpeg|png|webp|gif)$/i.test(v);
        },
        message: 'Invalid image URL format (must end with .jpg, .png, etc.)',
      },
    },

    trackUrl: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+/.test(v); // Accept any valid http/https link
        },
        message: 'Invalid track URL',
      },
    },

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Track', trackSchema);
