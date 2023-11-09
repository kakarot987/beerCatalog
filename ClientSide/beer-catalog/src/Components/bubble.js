import React, { useEffect } from 'react';
import './bubble.css';

function Bubble() {
  useEffect(() => {
    const bubbleContainer = document.getElementById("bubble-container");

    function createBubble() {
      const bubble = document.createElement("div");
      bubble.className = "bubble";
      bubbleContainer.appendChild(bubble);
    }

    function generateBubbles() {
      for (let i = 0; i < 10; i++) {
        createBubble();
      }
    }

    generateBubbles();
  }, []);

  return (
    <div className="bubble-container" id="bubble-container"></div>
  );
}

export default Bubble;
