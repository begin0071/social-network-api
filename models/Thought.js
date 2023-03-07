const mongoose = require('mongoose');
const { Schema } = mongoose;
const { reactionSchema } = require('./Reaction');
const dateFormat = require("../utils/dateFormat");

const thoughtSchema = new mongoose.Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 300,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },

    username: { 
      type: String, 
      required: true
    },

    reactions: [reactionSchema]
  },

  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;