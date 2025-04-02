const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true },
  image: { type: String }, // Nuoroda į nuotrauką
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  approved: { type: Boolean, default: false },
  ratings: [{ type: Number, min: 1, max: 5 }],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Event', eventSchema);