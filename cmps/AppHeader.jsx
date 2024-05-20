const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header">
        <Link to="/">
            <h3>Appsus</h3>
        </Link>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <i className="fa-solid fa-envelope" /><NavLink to="/mail">Mail</NavLink>
            <i className="fa-solid fa-map-pin" /><NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}
