import { useState } from "react"
import axios from "axios"
import { useEffect } from "react"

const Auth = () => {
    useEffect(() => { if (localStorage.getItem("id")) { window.location.href = "/result" } })

    const [emailValue, setEmail] = useState("")
    const [passwordValue, setPassword] = useState("")
    const handleRegister = async () => {
        if (!(emailValue && passwordValue)) { alert("Remplissez les deux champs") }
        else {
            await axios.post("http://localhost:8080/register", { email: emailValue, password: passwordValue })
                .then((response) => {
                    localStorage.setItem("id", response.data.id)
                    alert(`Votre compte a été créé`)
                    window.location.href = "/nmaper"
                }).catch(() => { alert("Le compte n'a pas été créé") })
        }
    }
    const handleLogin = async () => {
        if (!(emailValue && passwordValue)) { alert("Remplissez les deux champs") }
        else {
            await axios.post("http://localhost:8080/login", { email: emailValue, password: passwordValue })
                .then((response) => {
                    localStorage.setItem("id", response.data.id)
                    alert(`Vous êtes connecté`)
                    window.location.href = "/nmaper"
                }).catch(() => { alert("Vous avez entré un mauvais email ou un mauvais mot de passe") })
        }
    }

    return (
        <div className='card'>
            <h2>Connectez-vous</h2>
            <label htmlFor='email'>Email</label>
            <input value={emailValue} onChange={(event) => setEmail(event.target.value)} type='email' id='email' placeholder='myemail@mail.org' required></input>
            <label htmlFor='password'>password</label>
            <input value={passwordValue} onChange={(event) => setPassword(event.target.value)} type='password' id='password' placeholder='•••••••••' required></input>
            <button onClick={handleLogin}>Connexion</button>
            <button onClick={handleRegister}>Inscription</button>
        </div>
    )
}

export default Auth