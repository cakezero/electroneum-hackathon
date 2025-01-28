import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  certificateName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  certUrl: {
    type: String,
    required: true,
    unique: true,
  },
  minted: {
    type: Number,
    default: 0,
  },
  owner: {
    type: String,
    required: true
  }
});

const certificateModel = mongoose.model("certificates", certificateSchema);

export default certificateModel;