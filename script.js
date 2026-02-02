// 烟花效果核心代码（无需修改，直接用）
class Firework {
  constructor() {
    this.x = Math.random() * window.innerWidth;
    this.y = window.innerHeight;
    this.speedY = -5 - Math.random() * 5;
    this.speedX = (Math.random() - 0.5) * 4;
    this.radius = 2;
    this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
    this.particles = [];
    this.exploded = false;
  }
  update() {
    if (!this.exploded) {
      this.y += this.speedY;
      this.x += this.speedX;
      this.speedY += 0.1;
      if (this.speedY >= 0) {
        this.explode();
        this.exploded = true;
      }
    } else {
      this.particles.forEach(particle => particle.update());
      this.particles = this.particles.filter(particle => particle.alpha > 0);
    }
  }
  explode() {
    for (let i = 0; i < 100; i++) {
      const particle = new Particle(this.x, this.y, this.color);
      this.particles.push(particle);
    }
  }
  draw(ctx) {
    if (!this.exploded) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    } else {
      this.particles.forEach(particle => particle.draw(ctx));
    }
  }
}
class Particle {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.speedX = (Math.random() - 0.5) * 6;
    this.speedY = (Math.random() - 0.5) * 6;
    this.alpha = 1;
    this.decay = 0.02;
    this.color = color;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.alpha -= this.decay;
    this.speedX *= 0.98;
    this.speedY *= 0.98;
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.restore();
  }
}
// 初始化烟花
const canvas = document.createElement('canvas');
document.getElementById('fireworks').appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let fireworks = [];
// 定时生成烟花
setInterval(() => {
  fireworks.push(new Firework());
}, 800);
// 动画循环
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach(firework => {
    firework.update();
    firework.draw(ctx);
  });
  fireworks = fireworks.filter(firework => !firework.exploded || firework.particles.length > 0);
  requestAnimationFrame(animate);
}
animate();
// 窗口大小适配
window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
// 点击播放音乐（解决浏览器自动播放限制）
document.addEventListener('click', () => {
  const music = document.getElementById('music');
  music.muted = false;
  music.play().catch(err => console.log(err));
});