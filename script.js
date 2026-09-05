// ---------- Mobile Nav Toggle ----------
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active', open);
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ---------- Header Shadow + Scroll Progress Bar ----------
const header = document.getElementById('site-header');
const scrollProgress = document.getElementById('scroll-progress');
if (header) {
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 10);
    if (scrollProgress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? window.scrollY / docHeight : 0;
      scrollProgress.style.transform = `scaleX(${Math.min(1, Math.max(0, pct))})`;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// ---------- Cursor-Tracked Card Spotlight ----------
// Sets --mx/--my custom properties so CSS can render a glow that follows the pointer.
const spotlightEls = document.querySelectorAll('.card-glass, .product-card, .quiz-card');
spotlightEls.forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
  });
});

// Subtle 3D tilt for the hero card, following the cursor across the whole hero panel.
const heroPanel = document.querySelector('.hero-panel');
const heroCard = document.querySelector('.card-glass');
if (heroPanel && heroCard && window.matchMedia('(hover: hover)').matches) {
  heroPanel.addEventListener('mousemove', (e) => {
    const rect = heroPanel.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    heroCard.style.transform = `rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg)`;
  });
  heroPanel.addEventListener('mouseleave', () => {
    heroCard.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
}

// ---------- Interactive Finder Quiz Helper ----------
const quizCards = document.querySelectorAll('.quiz-card');
quizCards.forEach(card => {
  card.addEventListener('click', () => {
    quizCards.forEach(c => c.classList.remove('active'));
    card.classList.add('active');

    const targetId = card.getAttribute('data-target');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetElement.classList.add('featured');
      setTimeout(() => {
        if (targetId !== 'tier-2') {
          targetElement.classList.remove('featured');
        }
      }, 2500);
    }
  });
});

// ---------- Spec Sheet Expand/Collapse ----------
document.querySelectorAll('.spec-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const sheet = btn.nextElementSibling;
    const isOpen = sheet.classList.toggle('open');
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    btn.textContent = isOpen ? 'Hide full spec list' : 'View full spec list';
  });
});

// ---------- Build Selection -> Prefill Quote Form ----------
const tierSelect = document.getElementById('qf-tier');
document.querySelectorAll('.select-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tierName = btn.getAttribute('data-tier-name');
    if (tierSelect && tierName) {
      [...tierSelect.options].forEach(opt => {
        if (opt.value === tierName) tierSelect.value = tierName;
      });
    }
    const quoteSection = document.getElementById('quote');
    if (quoteSection) quoteSection.scrollIntoView({ behavior: 'smooth' });
    const nameField = document.getElementById('qf-name');
    if (nameField) setTimeout(() => nameField.focus(), 500);
  });
});

// ---------- Quote Form Submission Handler ----------
const quoteForm = document.getElementById('quote-form');
const qfStatus = document.getElementById('qf-status');

if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('qf-name').value.trim();
    const tier = document.getElementById('qf-tier').value;

    qfStatus.classList.remove('show');

    if (!name) {
      qfStatus.textContent = 'Please enter your name so we know who to respond to.';
      qfStatus.classList.remove('qf-success');
      qfStatus.classList.add('qf-error');
      requestAnimationFrame(() => qfStatus.classList.add('show'));
      return;
    }

    qfStatus.classList.remove('qf-error');
    qfStatus.classList.add('qf-success');
    qfStatus.textContent = `Thank you, ${name}! Your request for "${tier}" has been received. We'll be in touch soon!`;
    requestAnimationFrame(() => qfStatus.classList.add('show'));
    quoteForm.reset();
  });
}

// ---------- Scroll Reveal Animation Observer ----------
// Groups elements by parent so siblings (cards in a grid) stagger in together.
const revealEls = document.querySelectorAll('.reveal');
const staggerIndex = new Map();
revealEls.forEach(el => {
  const parent = el.parentElement;
  const count = staggerIndex.get(parent) || 0;
  el.style.setProperty('--reveal-delay', `${Math.min(count, 5) * 90}ms`);
  staggerIndex.set(parent, count + 1);
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ---------- Footer Dynamic Year ----------
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = `© ${new Date().getFullYear()} Pulse Builds. All rights reserved.`;
}
// ---------- Part Image Modal ----------
const partModal = document.getElementById('part-modal');
const modalImage = document.getElementById('modal-image');

if (partModal && modalImage) {
  const closeModal = () => partModal.classList.remove('open');
  
  // Attach click listener to any card with a data-image attribute
  document.querySelectorAll('.anatomy-card').forEach(card => {
    card.addEventListener('click', () => {
      const src = card.getAttribute('data-image');
      if (src) {
        modalImage.src = src;
        partModal.classList.add('open');
      }
    });
  });

  // Close modal via background click, close button, or Escape key
  partModal.querySelector('.modal-backdrop').addEventListener('click', closeModal);
  partModal.querySelector('.modal-close').addEventListener('click', closeModal);
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}
// ---------- Floating Project Guide Modal Logic ----------
const guideFloatingBtn = document.getElementById('guide-floating-btn');
const guideModal = document.getElementById('guide-modal');
const guideCloseBtn = document.getElementById('guide-close-btn');
const guideBackdrop = document.getElementById('guide-backdrop');
const guideJumpReviews = document.getElementById('guide-jump-reviews');

if (guideFloatingBtn && guideModal) {
  const openGuide = () => {
    guideModal.classList.add('active');
    guideModal.setAttribute('aria-hidden', 'false');
  };

  const closeGuide = () => {
    guideModal.classList.remove('active');
    guideModal.setAttribute('aria-hidden', 'true');
  };

  guideFloatingBtn.addEventListener('click', openGuide);

  if (guideCloseBtn) guideCloseBtn.addEventListener('click', closeGuide);
  if (guideBackdrop) guideBackdrop.addEventListener('click', closeGuide);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && guideModal.classList.contains('active')) {
      closeGuide();
    }
  });

  if (guideJumpReviews) {
    guideJumpReviews.addEventListener('click', closeGuide);
  }
}