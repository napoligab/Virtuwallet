const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      require: [true, 'E-mail is required'],
      unique: [true, 'This e-mail is already being used'],
    },
    firstName: {
      type: String,
      trim: true,
      require: [true, 'First name is required'],
    },
    lastName: {
      type: String,
      trim: true,
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
