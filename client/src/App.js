import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

const FibonacciPage = React.lazy(() => import('./pages/FibonacciPage'));

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<h1>Hello World</h1>} />
          <Route path="/fibonacci" element={<FibonacciPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
