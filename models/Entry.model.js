const { Schema, model } = require('mongoose');

const entrySchema = new Schema(
  {
    date: {
      type: Date,
      require: [true, 'Date is required'],
    },
    amount: {
      type: Number,
      require: [true, 'Amount is required'],
    },
    category: {
      type: String,
      require: [true, 'Category is required'],
      enum: ['education', 'health', 'general', 'food', 'leisure', 'others'],
    },
    location: {
      type: String,
    },
    type: {
      type: String,
      enum: ['income', 'expense'],
    },
  },
  {
    timestamps: true,
  }
);

const Entry = model('Entry', entrySchema);

module.exports = Entry;
