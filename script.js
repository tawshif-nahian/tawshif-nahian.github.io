/* ==========================================================
   MINIMALIST STARFIELD & CONSTELLATION NODES
   Clean, subtle, high-performance dark space background
   ========================================================== */
const canvas = document.getElementById('space-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];

function initCanvas() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;

  stars = [];

  // Generate sparse, elegant star points
  const starCount = Math.floor((width * height) / 6000);
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.5 + 0.4,
      alpha: Math.random() * 0.7 + 0.2,
      speedX: (Math.random() - 0.5) * 0.18,
      speedY: (Math.random() - 0.5) * 0.18,
      color: ['#00f0ff', '#ffffff', '#b285ff', '#38f8ff'][Math.floor(Math.random() * 4)]
    });
  }
}

function animateSpace() {
  ctx.clearRect(0, 0, width, height);

  // Draw twinkling star points
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
