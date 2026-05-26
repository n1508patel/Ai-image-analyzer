const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    imageName: {
      type: String,
      default: "Untitled",
    },
    caption: {
      type: String,
      required: true,
    },
    tags: [String],
    mood: String,
    objects: [String],
    colors: [String],
    detailedAnalysis: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Analysis", analysisSchema);
