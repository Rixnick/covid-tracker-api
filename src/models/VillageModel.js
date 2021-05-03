import mongoose from "mongoose";

const villageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  district: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "District",
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const Village = mongoose.model("Village", villageSchema);

export default Village;