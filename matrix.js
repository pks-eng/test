// Matrix Rain Effect
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();

const letters = "アァイィウヴエェオカガキクケコ01234567890abcdefghijklmnopqrstuvwxyz".split("");
const fontSize = 18;
let columns = Math.floor(canvas.width / fontSize);
let drops = Array.from({length: columns}, () => 1);

function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0F0";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);
    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  }
}

setInterval(draw, 33);

window.addEventListener('resize', () => {
  resize();
  columns = Math.floor(canvas.width / fontSize);
  drops = Array.from({length: columns}, () => 1);
});

// Loading overlay for navigation and overlay open
function setupLoadingLinks() {
  const buttons = document.querySelectorAll('a, button');

  buttons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();

      // Check if this button opens overlay — skip loading for overlays!
      if (button.classList.contains('open-overlay-btn')) return;

      const href = button.href || button.getAttribute('data-href');
      if (!href) return;

      const loadingOverlay = document.getElementById('loading-overlay');
      loadingOverlay.style.display = 'flex';

      setTimeout(() => {
        window.location.href = href;
      }, 1000);
    });
  });
}

// Overlay open/close logic
function setupOverlay() {
  const overlay = document.getElementById('content-overlay');
  const overlayText = document.getElementById('overlay-text');
  const closeBtn = document.getElementById('close-overlay');
  const openButtons = document.querySelectorAll('.open-overlay-btn');

  openButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Show loading animation for 1 second
      const loadingOverlay = document.getElementById('loading-overlay');
      loadingOverlay.style.display = 'flex';

      setTimeout(() => {
        loadingOverlay.style.display = 'none';

        const content = btn.getAttribute('data-content') || '<p>No content available.</p>';
        overlayText.innerHTML = content;
        overlay.style.display = 'flex';

        // Prevent background scroll
        document.body.style.overflow = 'hidden';
      }, 1000); // 1 second delay
    });
  });

  closeBtn.addEventListener('click', () => {
    overlay.style.display = 'none';
    overlayText.innerHTML = '';

    // Enable page scroll again
    document.body.style.overflow = 'auto';
  });
}

// Initialization
window.onload = () => {
  setupLoadingLinks();
  setupOverlay();
};
