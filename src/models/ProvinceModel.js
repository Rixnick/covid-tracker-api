import mongoose from "mongoose";

const provinceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  districts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "District",
    },
  ],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const Province = mongoose.model("Province", provinceSchema);

export default Province;
