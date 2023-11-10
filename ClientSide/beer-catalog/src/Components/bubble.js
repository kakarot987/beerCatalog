import React, { useEffect, useState } from 'react';

const Bubble = () => {
  const [particleArray, setParticleArray] = useState([]);

  useEffect(() => {
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext("2d");

    const handleDrawCircle = (event) => {
      const a = event.pageX;
      const b = event.pageY;

      const numberOfParticles = 20; // Change the number of particles here
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
      // Clean up event listeners when the component unmounts
      canvas.removeEventListener("click", handleDrawCircle);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [particleArray]);

  return <canvas id="canvas" style={{ background: "#00b4ff", margin: 0 }} />;
};

class Particle {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 50;
    this.dx = Math.random() * 3;
    this.dy = Math.random() * 7;
    this.hue = 200;
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    context.strokeStyle = `hsl(${this.hue} 100% 50%)`;
    context.stroke();

    const gradient = context.createRadialGradient(
      this.x,
      this.y,
      1,
      this.x + 0.5,
      this.y + 0.5,
      this.radius
    );

    gradient.addColorStop(0.3, "rgba(255, 255, 255, 0.3)");
    gradient.addColorStop(0.95, "#e7feff");

    context.fillStyle = gradient;
    context.fill();
  }

  move() {
    this.x = this.x + this.dx;
    this.y = this.y - this.dy;
  }
}

export default Bubble;
