import mongoose from "mongoose"

const RequestSchema = mongoose.Schema({
  scanResult: {
    type: String,
    required: true,
  },
  host: {
    type: String,
    required: true,
  },
  scanType: {
    type: String,
  },
  maxRetries: {
    type: String,
    required: false,
  },
  hostTimeout: {
    type: String,
    required: false,
  },
  port: {
    type: String,
    required: false,
  },
  origin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  date: {
    type: Date,
    default: Date.now
  }
})

export default RequestSchema
