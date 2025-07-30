const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();

const letters = "アァイィウヴエェオカガキクケコ01abcdefghijklmnopqrstuvwxyz".split("");
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
