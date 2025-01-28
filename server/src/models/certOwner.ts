import mongoose from "mongoose";

const certOwnerSchema = new mongoose.Schema({
  walletAddress: {
    type: String
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  certificates: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "certificates"
  }]
})

const certOwner = mongoose.model("certOwner", certOwnerSchema)

export default certOwner;