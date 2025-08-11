// server/models/Poem.js
import mongoose from 'mongoose';

const poemSchema = new mongoose.Schema(
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
    author: String,
    linkUrl: {
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

const Poem = mongoose.model('Poem', poemSchema);
export default Poem;
