// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Typing effect for hero name =====
(function typeEffect(){
  const el = document.getElementById('typedName');
  const text = 'Augustin Thomas';
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if(prefersReduced){
    el.textContent = text;
    return;
  }

  let i = 0;
  function tick(){
    if(i <= text.length){
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(tick, 65);
    }
  }
  tick();
})();

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('active', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Scroll reveal =====
const revealTargets = document.querySelectorAll(
  '.section-title, .section-sub, .skill-group, .project-card, .contact-form, .contact-direct'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// ===== Skill bar fill on scroll =====
const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const bar = entry.target;
      const level = bar.getAttribute('data-level');
      const fill = bar.querySelector('.skill-fill');
      requestAnimationFrame(() => { fill.style.width = level + '%'; });
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));

// ===== Contact form validation =====
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');
const formStatus = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

function setError(input, errorEl, message){
  input.classList.toggle('invalid', Boolean(message));
  errorEl.textContent = message || '';
}

function isValidEmail(value){
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  if(nameInput.value.trim().length < 2){
    setError(nameInput, document.getElementById('nameError'), 'Enter your name.');
    valid = false;
  } else {
    setError(nameInput, document.getElementById('nameError'), '');
  }

  if(!isValidEmail(emailInput.value.trim())){
    setError(emailInput, document.getElementById('emailError'), 'Enter a valid email.');
    valid = false;
  } else {
    setError(emailInput, document.getElementById('emailError'), '');
  }

  if(messageInput.value.trim().length < 10){
    setError(messageInput, document.getElementById('messageError'), 'Message needs a bit more detail (10+ characters).');
    valid = false;
  } else {
    setError(messageInput, document.getElementById('messageError'), '');
  }

  if(!valid){
    formStatus.style.color = '#e5686b';
    formStatus.textContent = 'Fix the fields above and try again.';
    return;
  }

  // No backend wired up: simulate a send so the form feels complete.
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';
  formStatus.style.color = 'var(--accent-2)';
  formStatus.textContent = '';

  setTimeout(() => {
    formStatus.textContent = `Thanks, ${nameInput.value.trim().split(' ')[0]} — message received. I'll reply within a day or two.`;
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send message';
    form.reset();
  }, 900);
});
