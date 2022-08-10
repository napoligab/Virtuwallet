const { Schema, model } = require('mongoose');
const capitalized = require('../utils/capitalized');

const userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
      set: capitalized,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      set: capitalized,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      default: '/images/inverse.png',
    },
    entries: [{ type: Schema.Types.ObjectId, ref: 'Entry' }],
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
