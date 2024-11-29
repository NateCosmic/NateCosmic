// Global variable for particle color
let particleColor = "white";

// Track the current theme (1 = default, 2 = dark theme, 3 = blue theme)
let currentTheme = 1;

// Toggle Features Menu visibility
function toggleFeatures() {
  const menu = document.getElementById("features-menu");
  menu.style.display = menu.style.display === "none" || !menu.style.display ? "block" : "none";
}

document.querySelector(".features-button").addEventListener("click", toggleFeatures);

// Toggle theme (background, text, and dots)
function toggleTheme() {
  const body = document.body;
  const canvas = document.getElementById("background-canvas");

  // Remove all theme classes
  body.classList.remove('dark-theme', 'blue-theme');
  canvas.style.backgroundColor = '';

  // Cycle through themes
  currentTheme++;
  if (currentTheme > 3) {
    currentTheme = 1;
  }

  if (currentTheme === 1) {
    // Default theme (black background, white dots)
    body.classList.remove('blue-theme', 'dark-theme');
    particleColor = "white";  // Default particle color
    canvas.style.backgroundColor = 'black';  // Default canvas color
  } else if (currentTheme === 2) {
    // Dark theme (pink background, dark gray dots)
    body.classList.add('dark-theme');
    particleColor = "darkgray"; // Dark gray dots
    canvas.style.backgroundColor = 'darkgray';  // Dark canvas color
  } else if (currentTheme === 3) {
    // Blue theme (light blue background, dark blue dots)
    body.classList.add('blue-theme');
    particleColor = "darkblue"; // Dark blue dots
    canvas.style.backgroundColor = 'darkblue';  // Dark blue canvas color
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

function createParticles(e) {
  const xPos = e.x;
  const yPos = e.y;
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
