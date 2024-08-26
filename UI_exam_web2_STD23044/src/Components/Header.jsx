import React from "react";
import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Show patrimoine</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/patrimoine">Patrimoine</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/possession">Possession list</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}