const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
<<<<<<< HEAD
=======
    email: {
      type: String,
      trim: true,
      require: true,
      unique: true,
    },
>>>>>>> 55e607dd2d4c201ee6bd7530d27aab18d681216f
    firstName: {
      type: String,
      trim: true,
      require: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      require: [true, 'E-mail is required'],
      unique: [true, 'This e-mail is already being used'],
    },
    password: {
      type: String,
      required: true,
    },
    entries: [{ type: Schema.Types.ObjectId, ref: 'Entry' }],
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
