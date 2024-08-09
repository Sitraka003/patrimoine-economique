import React from 'react';
import ReactDOM from 'react-dom/client'; // Importez 'react-dom/client'
import App from './App.jsx';


// Créez un conteneur racine
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendre l'application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
