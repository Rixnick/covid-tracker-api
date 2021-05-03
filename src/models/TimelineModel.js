import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  location: 
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
  checkinAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const Timeline = mongoose.model("Timeline", timelineSchema);

export default Timeline;