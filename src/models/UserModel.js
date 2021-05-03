import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  contact: {
    type: String,
    required: true,
    maxlength: 15,
    minlength: 8
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordTokenExpiry: {
    type: Number,
  },
  timelines: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Timeline",
    },
  ],
  locations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Location",
    },
  ],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

export default User;
