/* ═══════════════════════════════════════════════
   VELORA SKINCARE — script.js
═══════════════════════════════════════════════ */

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

/* ── Hamburger menu ── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
});

// Close on link click
document.querySelectorAll('.mobile-link, .mobile-btn').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  });
});

/* ── Scroll Reveal ── */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children within containers
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('[data-reveal], [data-reveal-right]').forEach((el, i) => {
  revealObserver.observe(el);
});

// Stagger product cards & testimonial cards & trust items
function staggerChildren(parentSelector, childSelector, delayStep = 120) {
  document.querySelectorAll(parentSelector).forEach(parent => {
    const children = parent.querySelectorAll(childSelector);
    children.forEach((child, i) => {
      child.style.transitionDelay = `${i * delayStep}ms`;
    });
  });
}

staggerChildren('.products-grid',     '.product-card',     150);
staggerChildren('.testimonials-grid', '.testimonial-card', 150);
staggerChildren('.trust-container',   '.trust-item',       100);
staggerChildren('.routine-steps',     '.routine-step',     120);

/* ── Animated Counters ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1600;
  const step = Math.ceil(target / (duration / 16));
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = current;
  }, 16);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('[data-count]').forEach(el => {
  counterObserver.observe(el);
});

/* ── Add to Cart button ── */
document.querySelectorAll('.btn-add').forEach(btn => {
  btn.addEventListener('click', function () {
    const original = this.textContent;
    this.textContent = '✓';
    this.style.background = 'var(--green-mid)';
    this.style.transform = 'scale(1.15)';
    setTimeout(() => {
      this.textContent = original;
      this.style.background = '';
      this.style.transform = '';
    }, 1200);
  });
});

/* ── Newsletter submit ── */
const emailInput = document.querySelector('.email-input');
const subscribBtn = document.querySelector('.btn-subscribe');

if (subscribBtn && emailInput) {
  subscribBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    if (!email || !email.includes('@')) {
      emailInput.style.borderColor = '#e57373';
      emailInput.style.outline = '2px solid rgba(229,115,115,0.25)';
      setTimeout(() => {
        emailInput.style.borderColor = '';
        emailInput.style.outline = '';
      }, 1800);
      return;
    }
    subscribBtn.textContent = '✓';
    subscribBtn.style.background = 'var(--green-mid)';
    emailInput.value = '';
    emailInput.placeholder = 'Thanks for joining the Glow Club! 🌿';
    setTimeout(() => {
      subscribBtn.textContent = '→';
      subscribBtn.style.background = '';
      emailInput.placeholder = 'Enter your email';
    }, 3000);
  });

  emailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') subscribBtn.click();
  });
}

/* ── Phone quiz interactivity ── */
document.querySelectorAll('.phone-options li').forEach(item => {
  item.addEventListener('click', function () {
    document.querySelectorAll('.phone-options li').forEach(i => i.classList.remove('active'));
    this.classList.add('active');
  });
});

/* ── Smooth active nav link ── */
const sections = document.querySelectorAll('section[id], .hero[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            'active-nav',
            link.getAttribute('href') === `#${entry.target.id}`
          );
        });
      }
    });
  },
  { rootMargin: '-50% 0px -50% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));

/* ── Parallax on hero blobs (subtle) ── */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const blobs = document.querySelectorAll('.hero-bg-blob');
  blobs.forEach((blob, i) => {
    const speed = (i + 1) * 0.08;
    blob.style.transform = `translateY(${scrollY * speed}px)`;
  });
}, { passive: true });

/* ── Cursor glow effect on product cards ── */
document.querySelectorAll('.product-card, .testimonial-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width)  * 100;
    const y = ((e.clientY - rect.top)  / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});
