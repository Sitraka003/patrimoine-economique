import { Link } from 'react-router-dom';
import "./header.css"

function Header() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary aNav">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <a className="navbar-brand tittle" href="#">Patrimoine HEI</a>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Possession
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/PatrimoinePage">Patrimoine</Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn cd search" type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Header;
