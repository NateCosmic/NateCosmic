// Global variable for particle color
let particleColor = "white";

// Toggle Features Menu visibility
function toggleFeatures() {
  const menu = document.getElementById('features-menu');
  menu.classList.toggle('show');
}

// Toggle theme (background, text, and dots)
function toggleTheme() {
  const body = document.body;
  const canvas = document.getElementById("background-canvas");
  const currentClass = body.classList.contains('dark-theme');

  if (currentClass) {
    body.classList.remove('dark-theme');
    particleColor = "white"; // Default color for particles
    canvas.style.backgroundColor = '';  // Reset to default canvas color
  } else {
    body.classList.add('dark-theme');
    particleColor = "darkgray"; // Change particle color to dark when the theme is pink
    canvas.style.backgroundColor = 'darkgray';  // Set canvas background to darkgray
  }
}

// Dots animation
const canvas = document.getElementById("background-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.size = Math.random() * 3 + 1;
  this.speedX = Math.random() * 3 - 1.5;
  this.speedY = Math.random() * 3 - 1.5;
  this.color = particleColor;  // Use global particle color
}

Particle.prototype.update = function () {
  this.x += this.speedX;
  this.y += this.speedY;
  if (this.size > 0.2) this.size -= 0.1;
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.size, this.size);
};

Particle.prototype.draw = function () {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.size, this.size);
};

// Updated createParticles function with a random spread
function createParticles(e) {
  // Get random positions across the canvas
  const xPos = Math.random() * canvas.width;
  const yPos = Math.random() * canvas.height;
  const particleCount = 10;

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle(xPos, yPos));
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].size <= 0.2) {
      particles.splice(i, 1);
      i--;
    }
  }
  requestAnimationFrame(animateParticles);
}

canvas.addEventListener("mousemove", createParticles);
animateParticles();
