const mongoose = require('mongoose');
const { Schema } = mongoose;
const dateFormat = require("../utils/dateFormat");

const reactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },

    reactionBody: {
      type: String,
      required: true,
      maxLength: 300
    },

    username: {
      type: String,
      required: true
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    }
  },

  {
    toJSON: {
      getters: true
    },
    id: false, 
  }
);

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = { Reaction, reactionSchema }