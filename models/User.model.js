const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      require: true,
      unique: true,
    },
<<<<<<< HEAD

=======
>>>>>>> c30af80d769e878ef18c365d47baad8bc3adb95e
    firstName: {
      type: String,
      trim: true,
      require: true,
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
