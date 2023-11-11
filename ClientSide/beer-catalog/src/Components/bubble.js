// Bubble.js
import React, { useEffect, useState } from 'react';
import Particle from './Particle'; // Import the Particle component

const Bubble = () => {
  const [particleArray, setParticleArray] = useState([]);

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    const handleDrawCircle = (event) => {
      const a = event.pageX;
      const b = event.pageY;

      const numberOfParticles = 20;
      const newParticles = Array.from({ length: numberOfParticles }, () => new Particle(a, b));
      setParticleArray((prevParticles) => [...prevParticles, ...newParticles]);
    };

    const animate = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);

      particleArray.forEach((particle) => {
        particle.move();
        particle.draw(context);
      });

      requestAnimationFrame(animate);
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    animate();

    canvas.addEventListener("click", handleDrawCircle);
    window.addEventListener("resize", resizeCanvas);

    return () => {
      canvas.removeEventListener("click", handleDrawCircle);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [particleArray]);

  return <canvas id="canvas" style={{ background: "#00b4ff", margin: 0 }} />;
};

export default Bubble;
