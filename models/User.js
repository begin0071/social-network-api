const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },

    email: { 
      type: String,
      required: true,
      unique: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Invalid email address"]
      
    },
    
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought"
      }
    ],

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },

  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


userSchema.virtual('innerCount').get(function () {
  return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;