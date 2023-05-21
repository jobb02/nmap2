import axios from "axios"
import { useState } from "react"
import Navbar from "./navbar"
import { useEffect } from "react"
const Result = () => {
    const [result, setResult] = useState({})
    let isRequested = false
    useEffect(() => {
        if (!localStorage.getItem("id")) { window.location.href = "/" }

        const request = async () => {
            if (isRequested) {
                let origin = localStorage.getItem("id")
                origin = origin.split('"').join("").split("'").join("")
                await axios.get(`http://localhost:8080/result?origin=${origin}`, {})
                    .then((response) => {
                        if (response.data) {
                            setResult(response.data.history)
                            console.log(result)
                        }
                    }).catch(() => alert("Impossible d'avoir la liste des requête"))
            }
            // eslint-disable-next-line
            isRequested = true
        }
        request()
    })


    return (
        <div id='requests'>
            <Navbar />

            <div className="request">
                <div className="duo">
                    <p className="left">date</p>
                    <p className="right">{result.date}</p>
                </div>
                <div className="duo">
                    <p className="left">host</p>
                    <p className="right">{result.host}</p>
                </div>
                <div className="duo">
                    <p className="left">hostTimeout</p>
                    <p className="right">{result.hostTimeout}</p>
                </div>
                <div className="duo">
                    <p className="left">maxRetries</p>
                    <p className="right">{result.maxRetries}</p>
                </div>
                <div className="duo">
                    <p className="left">port</p>
                    <p className="right">{result.port}</p>
                </div>
                <div className="duo">
                    <p className="left">scanType</p>
                    <p className="right">{result.scanType}</p>
                </div>
                <div className="duo resultDetailGroup">
                    <p className="left">scanResult</p>
                    <p className="right resultDetail">{result.scanResult}</p>
                </div>
            </div>
        </div>
    )
}

export default Result