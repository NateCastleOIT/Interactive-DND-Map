import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>DND Interactive Map Viewer</h1>
      </header>
      <main>
        <canvas id="mapCanvas"></canvas>
      </main>
      <footer>
        <p>&copy; 2024 DND Map Viewer</p>
      </footer>
    </div>
  );
}

export default App;
