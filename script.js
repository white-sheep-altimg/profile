/* =====================================================
   DOM Ready
*/
document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------
     1. Header scroll effect
  */
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* -------------------------------------------------
     2. Mobile nav toggle
  */
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');

  navToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Close nav on link click
  nav.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });

  /* -------------------------------------------------
     3. Counter animation (stats)
  */
  const counters = document.querySelectorAll('.stat-number');
  let countersAnimated = false;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = 1 - Math.pow(2, -10 * progress);
      el.textContent = Math.floor(ease * target) + '+';
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const observerCounter = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          counters.forEach(animateCounter);
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsSection = document.querySelector('.stats');
  if (statsSection) observerCounter.observe(statsSection);

  /* -------------------------------------------------
     4. Expertise tabs
  */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');

      tabBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      tabContents.forEach((c) => c.classList.remove('active'));
      document.getElementById('tab-' + tab).classList.add('active');
    });
  });

  /* -------------------------------------------------
     5. Project filter
  */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach((card) => {
        const domain = card.getAttribute('data-domain');
        if (filter === 'all' || domain === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* -------------------------------------------------
     6. Scroll-triggered fade-in animations
  */
  const fadeEls = document.querySelectorAll('.project-card, .skill-group, .timeline-item');

  const observerFade = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observerFade.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  fadeEls.forEach((el) => observerFade.observe(el));

  /* -------------------------------------------------
     7. Contact form (prevent default + message)
  */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value;
      alert(`${name}様\n\n送信ありがとうございます！\n（デモページのため、実際の送信は行われません）`);
      form.reset();
    });
  }

  /* -------------------------------------------------
     8. Smooth scroll for anchor links (fallback)
  */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
