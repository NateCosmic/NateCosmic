// Canvas setup
const canvas = document.getElementById("dotCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dots = [];
let dotColor = "white"; // Default color

// Create random dots
function createDots(count) {
  for (let i = 0; i < count; i++) {
    dots.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
    });
  }
}

// Draw dots
function drawDots() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dots.forEach(dot => {
    ctx.beginPath();
    ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
    ctx.fillStyle = dotColor;
    ctx.fill();
    dot.x += dot.vx;
    dot.y += dot.vy;

    // Bounce dots off edges
    if (dot.x < 0 || dot.x > canvas.width) dot.vx *= -1;
    if (dot.y < 0 || dot.y > canvas.height) dot.vy *= -1;
  });
}

// Change dot color to purple
function changeDotColor() {
  dotColor = dotColor === "white" ? "purple" : "white";
}

// Animation loop
function animate() {
  drawDots();
  requestAnimationFrame(animate);
}

// Initialize dots and start animation
createDots(100);
animate();
