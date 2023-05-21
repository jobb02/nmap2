import { spawn } from "child_process"
import RequestModel from "../db/models/Request.model.js"
import { initiateOptions } from "../utils/initiateOption.js"

export const Request = (app) => {
    app.post("/scan", (req, res) => {
        try {
            let scanResult = ""
            const option = initiateOptions(req.body)
            const nmapProcess = spawn("nmap", option)
            nmapProcess.stdout.on("data", async (data) => scanResult += data.toString())
            nmapProcess.on("error", (error) => { console.error("An error occurred while executing Nmap process:", error) })
            nmapProcess.on("close", async (code) => {
                if (code === 0) {
                    let { host, scanType, maxRetries, hostTimeout, port, origin } = req.body
                    origin = origin.split('"').join("").split("'").join("")
                    const NewRequestModel = new RequestModel({ host, scanType, maxRetries, hostTimeout, port, origin, scanResult })
                    await NewRequestModel.save()
                    res.status(200).send({ tip: "Scan success" })
                } else {
                    res.status(500).send({ tip: "Cannot scan" })
                    return
                }
            })
        } catch (error) { res.status(500).send({ tip: `Internal server error, cannot register the user: ${error}` }) }
    })

    app.get("/history", async (req, res) => {
        try {
            const { origin } = req.query
            const history = await RequestModel.find({ origin }).sort({ date: -1 })
            history ? res.status(200).send({ tip: "User's scan history", history }) : res.status(200).send({ tip: "The user did not yet scan anything", history: [] })
        } catch (error) { res.status(500).send({ tip: `Internal server error, cannot get history: ${error}` }) }
    })

    app.get("/result", async (req, res) => {
        try {
            const { origin } = req.query
            const history = await RequestModel.findOne({ origin }).sort({ date: -1 })
            history ? res.status(200).send({ tip: "User's last scan", history }) : res.status(200).send({ tip: "The user did not yet scan anything" })
        } catch (error) { res.status(500).send({ tip: `Internal server error, cannot get last scan: ${error}` }) }
    })
}