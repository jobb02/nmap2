import mongoose from "mongoose"
import RequestSchema from "../schemas/Request.schema.js"

const RequestModel = mongoose.model("requests", RequestSchema)
export default RequestModel
