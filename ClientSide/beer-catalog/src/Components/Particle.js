// Particle.js
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
  
  export default Particle;
  