const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const colors = ['#FF5733', '#FFBD33', '#75FF33', '#33FFF5', '#DA33FF'];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function createFirework(x, y) {
    const count = random(20, 50);
    for (let i = 0; i < count; i++) {
        particles.push({
            x: x,
            y: y,
            angle: random(0, Math.PI * 2),
            speed: random(2, 10),
            radius: random(2, 5),
            color: colors[Math.floor(Math.random() * colors.length)],
            alpha: 1,
        });
    }
}

function updateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        particle.alpha -= 0.02;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${hexToRgb(particle.color)},${particle.alpha})`;
        ctx.fill();

        if (particle.alpha <= 0) {
            particles.splice(index, 1);
        }
    });
}

function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `${r},${g},${b}`;
}

function animate() {
    updateParticles();
    requestAnimationFrame(animate);
}

canvas.addEventListener('click', (e) => {
    createFirework(e.clientX, e.clientY);
});

animate();