const mongoose = require("mongoose");

const PaintingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
	default: 'Untitled Painting',
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  caption: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Painting", PaintingSchema);
