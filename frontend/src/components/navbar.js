const Navbar = () => {
    const handleDisconnect = () => {
        localStorage.removeItem("id")
        window.location.href = "/"
    }

    return (
        <nav>
            <a href="/nmaper">nmaper</a>
            <a href="/history">historique</a>
            <a href="/result">resultat</a>
            <a id="disconnect" href="/" onClick={handleDisconnect}>Deconnexion</a>
        </nav>
    )
}

export default Navbar