import UserModel from "../db/models/User.model.js"
import { generateToken } from "../utils/generateToken.js"
import hashPassword from "../utils/hashPassword.js"

export const UserAuth = (app) => {
  app.post("/register", async (req, res) => {
    try {
      const { email, password } = req.body
      const newUser = await new UserModel({ email, password: hashPassword(password) }).save()
      res.status(200).send({ tip: "User registered", token: generateToken(newUser._id, email), id: newUser._id })
    } catch (error) { res.status(500).send({ tip: `Internal server error, cannot register the user: ${error}` }) }
  })
  app.post("/login", async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email, password: hashPassword(password) })
    user ? res.status(200).send({ tip: "User Connected successfully", token: generateToken(user._id, email), id: user._id }) : res.status(403).send({ tip: "Wrong creadentials" })
  })
}