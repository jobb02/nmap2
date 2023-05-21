import cors from "cors"
import bodyParser from "body-parser"
import morgan from "morgan"
import express from "express"
import mongoose from "mongoose"
import config from "./src/config.js"
import { UserAuth } from "./src/routes/auth.routes.js"
import { Request } from "./src/routes/request.routes.js"


//database connexion
await mongoose.connect(config.db).then(() => console.log(`Database connected on ${config.db}`)).catch(() => console.log("Database connection failed"))

//express
const app = express()
app.use(cors())
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//routes
UserAuth(app)
Request(app)
app.listen(config.port, () => console.log(`Listening on port ${config.port}`))