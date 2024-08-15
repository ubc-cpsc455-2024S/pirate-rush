import './style.css'

import NavBar from './components/NavBar.jsx'
import HomePage from './pages/HomePage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import LeaderboardPage from './pages/LeaderboardPage.jsx'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <>
      <div>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/About" element={<AboutPage />} />
            <Route path="/Leaderboard" element={<LeaderboardPage />} />
          </Routes>
        </Router>
      </div>
    </>
  )
}

export default App
