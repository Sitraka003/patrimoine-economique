import { useEffect} from 'react';
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Possession from '../../models/possessions/Possession';
import Flux from '../../models/possessions/Flux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PossessionPage from './Pages/Possession/possession';

function App() {

  return(
    <>
    <div>
      <PossessionPage/>
    </div>
    </>
  )
  
}

export default App;
