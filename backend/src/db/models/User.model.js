import mongoose from "mongoose"
import UserSchema from "../schemas/User.schema.js"
const UserModel = mongoose.model("users", UserSchema)
export default UserModel
