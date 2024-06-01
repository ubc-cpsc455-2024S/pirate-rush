import './css/style.css'

import NavBar from "./components/NavBar.jsx";
import {BrowserRouter as Router, Route, Routes,} from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

function App() {
    return (
        <>
            <div id="all">
                <Router>
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/About" element={<AboutPage/>}/>
                    </Routes>
                </Router>
            </div>
        </>
    )
}

export default App
