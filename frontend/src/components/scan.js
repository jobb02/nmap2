import axios from "axios"
import { useEffect } from "react"
import Navbar from "./navbar"

const Scan = () => {
    useEffect(() => { if (!localStorage.getItem("id")) { window.location.href = "/" } })

    const handleEvent = async () => {
        let maxRetries = document.getElementById("maxRetries").value
        let scanType = document.getElementById("scanType").value
        let host = document.getElementById("host").value
        let port = document.getElementById("port").value
        let hostTimeout = document.getElementById("hostTimeout").value
        let origin = localStorage.getItem("id")
        let data = {}
        port ? data = { maxRetries, scanType, host, port, hostTimeout, origin } : data = { maxRetries, scanType, host, hostTimeout, origin }

        if (host && origin) {
            const scanning = document.getElementById("blocker")
            scanning.style.display = "flex"
            await axios.post("http://localhost:8080/scan", data).then(() => {
                window.location.href = "/result"
            }).catch(() => alert("Impossible de faire le scan"))
            scanning.style.display = "none"
        } else {
            alert("Indique l'host")
        }
    }

    return (

        <div className='scan'>
            <Navbar />

            <div id="blocker">
                <h1>Scan en cours...</h1>
            </div>
            <h2>Nmaper</h2>
            <div className="nmapForm">
                <span>
                    <label htmlFor="scanType">Type de scan</label>
                    <select id="scanType">
                        <option selected value="">Aucun</option>
                        <option value="-sS">-sS</option>
                        <option value="-sO">-sO</option>
                    </select>
                </span>
                <span>
                    <label htmlFor="host">Host</label>
                    <input type='text' id='host' placeholder='127.0.0.1' required></input>
                </span>
                <span>
                    <label htmlFor="port">Port</label>
                    <input type='number' id='port' placeholder='27014' required></input>
                </span>
                <span>
                    <label htmlFor="maxRetries">max retries</label>
                    <input type='number' id='maxRetries' placeholder='1' required></input>
                </span>
                <span>
                    <label htmlFor="hostTimeout">host TimeOut (ms)</label>
                    <input type='number' id='hostTimeout' placeholder='1000' required></input>
                </span>

                <button onClick={handleEvent}>nmap</button>
            </div>

        </div>
    )
}

export default Scan