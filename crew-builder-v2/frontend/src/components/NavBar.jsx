import { Link } from 'react-router-dom'
import './NavBar.css'

function NavBar() {
  return (
    <div className="navbar">
      <nav>
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/">
              <span>Pirate Rush</span>
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/About">
              <span>About</span>
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/Leaderboard">
              <span>Leaderboard</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar
