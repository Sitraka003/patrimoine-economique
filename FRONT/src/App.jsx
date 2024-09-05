import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PossessionsPage from './PossessionsPage';
import PatrimoinePage from './PatrimoinePage';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/possessions">Possessions</Link>
            </li>
            <li>
              <Link to="/patrimoine">Patrimoine</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/possessions" element={<PossessionsPage />} />
          <Route path="/patrimoine" element={<PatrimoinePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
