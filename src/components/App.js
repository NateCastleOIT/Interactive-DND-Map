import React, { useEffect, useRef} from 'react';
import '../styles/App.css';
import { initializeCanvas } from '../utils/canvasUtils';

function App() {

  const canvasRef = useRef(null);

  // Using the useEffect hook to run code after the component mounts
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas){
      initializeCanvas(canvas);
    }
  }, []); // empty dependency array ensures that the effect runs only once

  return (
    <div className="App">
      <header className="App-header">
        <h1>DND Interactive Map Viewer</h1>
      </header>
      <main>
        <canvas id="mapCanvas" ref={canvasRef}></canvas>
      </main>
      <footer>
        <p>&copy; 2024 DND Map Viewer</p>
      </footer>
    </div>
  );
}

export default App;
