import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  village: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Village",
  },
  timelines: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Timeline",
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const Location = mongoose.model("Location", locationSchema);

export default Location;
