const mongoose = require('mongoose');
const constants = require('./constants/modelConstants')

// Define the schema for a note
const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  deletedAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: constants.USER,
    required: [true, 'User ID is required']
  },
  isActive: {
    type: Boolean,
    default: true
  }
},
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  });

module.exports = mongoose.model(constants.NOTE, noteSchema);
