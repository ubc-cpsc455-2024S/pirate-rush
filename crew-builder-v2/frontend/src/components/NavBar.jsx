import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar">
      <nav>
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/">
              <span>Home</span>
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/About">
              <span>About</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
