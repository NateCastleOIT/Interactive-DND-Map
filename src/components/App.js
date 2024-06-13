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
    </header>
    <div className="container">
      <div className="canvas-container">
        <canvas id="mapCanvas" tabIndex="0" ref={canvasRef}></canvas>
      </div>
      <div className="toolkit">
        <h2>Tool Kit</h2>
        <div className="tool" id="tool-brush">
          <label htmlFor="brush-tool">Brush Tool</label>
          <input type="checkbox" id="brush-tool"/>
        </div>
        <div className="tool" id="tool-text">
          <label htmlFor="text-tool">Text Tool</label>
          <input type="checkbox" id="text-tool"/>
        </div>
        <div className="tool" id="tool-layer">
          <label htmlFor="layer-tool">Layers</label>
          <input type="checkbox" id="layer-tool"/>
        </div>
        <div className="layer-list" id="layer-list">
          <div className="layer-item">Layer 1</div>
          <div className="layer-item">Layer 2</div>
          <div className="layer-item">Layer 3</div>
        </div>
        <div className="tool" id="tool-upload">
          <label htmlFor="upload-image">Upload Image</label>
          <input type="file" id="uploadFile" accept="image/*"/>
        </div>
      </div>
    </div>
    <footer className="App-footer">
      <p>&copy; 2024 DND Map Viewer</p>
    </footer>
  </div>
  );
}

export default App;
