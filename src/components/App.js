// src/components/App.js
import React, { useEffect, useRef } from 'react';
import '../styles/App.css';
import { initializeCanvas } from '../utils/canvasUtils';

function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      console.log('Canvas element found:', canvas);
      initializeCanvas(canvas);
    } else {
      console.error('Canvas element not found');
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>DND Interactive Map Viewer</h1>
        <input type="file" id="uploadFile" accept="image/*"/> 
      </header>
      <main>
        <canvas id="mapCanvas" tabIndex="0" ref={canvasRef}></canvas>
      </main>
      <footer>
        <p>&copy; 2024 DND Map Viewer</p>
      </footer>
    </div>
  );
}

export default App;
