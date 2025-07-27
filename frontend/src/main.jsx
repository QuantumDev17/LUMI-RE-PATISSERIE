import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // ✅ this line is critical
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/Home"> {/* ✅ match with vite.config.js base */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
