// Get references to the button and canvas elements
const enemy = document.getElementById("enemy");
const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");

// Adjust canvas to fill the window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Particle class to manage each particle's state
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // Random angle and speed
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3 + 2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    
    // Random size and rotation
    this.radius = Math.random() * 3 + 3;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.2;
    
    // Lifetime in ms (approx. 3 seconds)
    this.life = 3000;
    this.elapsed = 0;
  }
  
  update(dt) {
    // Move particle
    this.x += this.vx;
    this.y += this.vy;
    // Apply slight friction so it slows down over time
    this.vx *= 0.98;
    this.vy *= 0.98;
    // Update rotation
    this.rotation += this.rotationSpeed;
    // Update elapsed time
    this.elapsed += dt;
  }
  
  draw(ctx) {
    // Compute current alpha based on lifetime progress
    const progress = this.elapsed / this.life;
    const alpha = Math.max(1 - progress, 0);
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = alpha;
    
    // Draw a 4-point star shape.
    // We'll draw an 8-vertex star (alternating outer and inner points)
    const spikes = 4;
    const outerRadius = this.radius;
    const innerRadius = outerRadius * 0.5;
    
    ctx.beginPath();
    for (let i = 0; i < spikes * 2; i++) {
      // Alternate between outer and inner radii
      const r = (i % 2 === 0) ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / spikes;
      const x = Math.cos(angle) * r;
      const y = Math.sin(angle) * r;
     
