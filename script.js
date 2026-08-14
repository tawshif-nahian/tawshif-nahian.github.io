/* ==========================================================
   MINIMALIST STARFIELD & SUBTLE TWINKLE (NO COLORED ORBS)
   Clean, dark, elegant space background matching modern portfolios
   ========================================================== */
const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];

function initCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  stars = [];

  // Generate sparse, clean, subtle starlight points
  const starCount = Math.floor((width * height) / 5500);
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.4 + 0.3,
      alpha: Math.random() * 0.75 + 0.15,
      alphaSpeed: (Math.random() * 0.015 + 0.005) * (Math.random() < 0.5 ? 1 : -1),
      speedX: (Math.random() - 0.5) * 0.15,
      speedY: (Math.random() - 0.5) * 0.15,
      color: ['#00f0ff', '#ffffff', '#b285ff', '#94a3b8'][Math.floor(Math.random() * 4)]
    });
  }
}

function animateSpace() {
  ctx.clearRect(0, 0, width, height);

  // Render and animate subtle twinkling stars
  stars.forEach(star => {
    star.x += star.speedX;
    star.y += star.speedY;

    // Pulse / twinkle effect
    star.alpha += star.alphaSpeed;
    if (star.alpha > 0.85 || star.alpha < 0.15) {
      star.alphaSpeed = -star.alphaSpeed;
    }

    // Screen wrap-around
    if (star.x < 0) star.x = width;
    if (star.x > width) star.x = 0;
    if (star.y < 0) star.y = height;
    if (star.y > height) star.y = 0;

    ctx.globalAlpha = Math.max(0.1, Math.min(1.0, star.alpha));
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
