import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String, // Movie / Series / Anime / etc.
      default: '',
    },
    thumbnailUrl: {
      type: String,
      validate: {
        validator: function (url) {
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|webp|gif))$/i.test(url);
        },
        message: 'Invalid image URL',
      },
      required: false,
    },
    mediaUrl: {
      type: String,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: true, 
    },
  },
  { timestamps: true }
);

export default mongoose.model('Media', mediaSchema);
