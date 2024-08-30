import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ListPossession from './components/ListPossession.jsx';
import Patrimoine from './components/patrimoine.jsx';
import Menu from './components/menu.jsx';

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/possession" element={<ListPossession />} />
        <Route path="/patrimoine" element={<Patrimoine />} />
        <Route path="/" element={<Menu />} />
        
      </Routes>
    </Router>
  );
}

export default App;


