/* ==========================================================
   DYNAMIC SPACE CANVAS WITH MOVING STARS & ORBITING PLANETS
   Color Theme: Cyan, Magenta, Purple, Dark Emerald, Deep Black
   ========================================================== */
const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];
let planets = [];

function initCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  stars = [];
  planets = [];

  // Generate multi-depth star field
  const starCount = Math.floor((width * height) / 4500);
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.6 + 0.3,
      alpha: Math.random() * 0.8 + 0.2,
      speedX: (Math.random() - 0.5) * 0.25,
      speedY: (Math.random() - 0.5) * 0.25,
      color: ['#00f0ff', '#ffffff', '#e0218a', '#9d4edd', '#00ff87'][Math.floor(Math.random() * 5)]
    });
  }

  // Floating Nebula Planets / Glowing Celestial Orbs
  const planetColors = [
    { inner: '#9d4edd', outer: '#05050c', glow: 'rgba(157, 78, 221, 0.2)' }, // Purple
    { inner: '#e0218a', outer: '#05050c', glow: 'rgba(224, 33, 138, 0.18)' }, // Magenta
    { inner: '#00f0ff', outer: '#05050c', glow: 'rgba(0, 240, 255, 0.16)' }, // Cyan
    { inner: '#00ff87', outer: '#05050c', glow: 'rgba(0, 255, 135, 0.15)' }  // Emerald
  ];

  for (let i = 0; i < 4; i++) {
    planets.push({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 120 + 80,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      theme: planetColors[i % planetColors.length]
    });
  }
}

function animateSpace() {
  ctx.clearRect(0, 0, width, height);

  // Draw floating deep space orbs / planets
  planets.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < -p.radius) p.x = width + p.radius;
    if (p.x > width + p.radius) p.x = -p.radius;
    if (p.y < -p.radius) p.y = height + p.radius;
    if (p.y > height + p.radius) p.y = -p.radius;

    const grad = ctx.createRadialGradient(p.x, p.y, p.radius * 0.1, p.x, p.y, p.radius);
    grad.addColorStop(0, p.theme.inner);
    grad.addColorStop(0.7, p.theme.glow);
    grad.addColorStop(1, 'transparent');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fill();
  });

  // Draw moving starfield
  stars.forEach(star => {
    star.x += star.speedX;
    star.y += star.speedY;

    if (star.x < 0) star.x = width;
    if (star.x > width) star.x = 0;
    if (star.y < 0) star.y = height;
    if (star.y > height) star.y = 0;

    ctx.globalAlpha = star.alpha;
    ctx.fillStyle = star.color;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.globalAlpha = 1.0;
  requestAnimationFrame(animateSpace);
}

window.addEventListener('resize', initCanvas);
initCanvas();
animateSpace();

/* ==========================================================
   NAVIGATION, SCROLL HIGHLIGHT & MOBILE TOGGLE
   ========================================================== */
const mobileToggle = document.getElementById('mobile-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

// Toggle mobile menu
if (mobileToggle) {
  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

// Close mobile menu on link click
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});

// Highlight active section on scroll
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

/* ==========================================================
   CONTACT FORM SUBMISSION FEEDBACK
   ========================================================== */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('form-name').value;
    alert(`Thank you, ${name}! Your message has been prepared.`);
    contactForm.reset();
  });
}
