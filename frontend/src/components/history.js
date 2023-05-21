import axios from "axios"
import { useState } from "react"
import { useEffect } from "react"
import Navbar from "./navbar"
const History = () => {
    const [items, setItems] = useState([])
    let isRequested = false
    useEffect(() => {
        if (!localStorage.getItem("id")) { window.location.href = "/" }

        const request = async () => {
            if (isRequested) {
                let origin = localStorage.getItem("id")
                origin = origin.split('"').join("").split("'").join("")
                await axios.get(`http://localhost:8080/history?origin=${origin}`, {}).then((response) => { if (response.data) { setItems(response.data.history) } }).catch(() => alert("Impossible d'avoir la liste des requête"))
            }
            // eslint-disable-next-line
            isRequested = true
        }
        request()
    })


    return (
        <div id='requests'>
            <Navbar />
            {items.map((item, index) => (
                <div className="request" key={index}>
                    <div className="duo">
                        <p className="left">date</p>
                        <p className="right">{item.date}</p>
                    </div>
                    <div className="duo">
                        <p className="left">host</p>
                        <p className="right">{item.host}</p>
                    </div>
                    <div className="duo">
                        <p className="left">hostTimeout</p>
                        <p className="right">{item.hostTimeout}</p>
                    </div>
                    <div className="duo">
                        <p className="left">maxRetries</p>
                        <p className="right">{item.maxRetries}</p>
                    </div>
                    <div className="duo">
                        <p className="left">port</p>
                        <p className="right">{item.port}</p>
                    </div>
                    <div className="duo">
                        <p className="left">scanType</p>
                        <p className="right">{item.scanType}</p>
                    </div>
                    <div className="duo resultDetailGroup">
                        <p className="left">scanResult</p>
                        <p className="right resultDetail">{item.scanResult}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default History