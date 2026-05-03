// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Helper function to extract filename from full image path
function getImageKey(src) {
  try {
    const url = new URL(src, window.location.origin);
    const filename = url.pathname.split('/').pop();
    return 'images/' + filename;
  } catch (e) {
    const match = src.match(/([^\/\\]+\.(jpg|jpeg|png|gif|webp))$/i);
    return match ? 'images/' + match[1] : src;
  }
}

// === ANIMATED COUNTERS ===
function animateCounters() {
  const counters = document.querySelectorAll('.trust-number');
  counters.forEach(counter => {
    if (counter.dataset.animated) return;
    const target = parseInt(counter.dataset.target);
    const duration = 1800;
    const start = performance.now();
    counter.dataset.animated = 'true';

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(target * eased);
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    }
    requestAnimationFrame(update);
  });
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

// === HAMBURGER MENU ===
function setupHamburger() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });
}

// === MAIN INIT ===
document.addEventListener('DOMContentLoaded', () => {
  // Feature cards scroll animation
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(card);
  });

  // Event cards
  document.querySelectorAll('.event-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.03}s`;
    observer.observe(el);
  });

  // Marketing cards
  document.querySelectorAll('.marketing-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.03}s`;
    observer.observe(el);
  });

  // Onboarding cards
  document.querySelectorAll('.onboarding-card').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.06}s`;
    observer.observe(el);
  });

  // Cost cards + transform items + onboarding steps
  document.querySelectorAll('.animate-on-scroll').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.05}s`;
    observer.observe(el);
  });

  // Trust bar counter animation
  const trustBar = document.getElementById('trust-bar');
  if (trustBar) counterObserver.observe(trustBar);

  // Navbar shadow on scroll
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 6px 24px rgba(224, 124, 58, 0.12)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  // Booking modal outside click
  const bookingModal = document.getElementById('bookingModal');
  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay')) {
        closeBookingModal();
      }
    });
  }

  // Setup hamburger menu
  setupHamburger();

  // Image click handlers
  setupImageClickHandlers();
});

// Booking Modal Functions
// === SUBMISSION LIMIT (2 Days) ===
function checkSubmissionLimit(email) {
  const cleanEmail = email.trim().toLowerCase();
  const storageKey = 'cora_demo_' + cleanEmail;
  const lastSubmission = localStorage.getItem(storageKey);
  
  if (!lastSubmission) {
    return { allowed: true, daysRemaining: 0 };
  }
  
  const lastSubmitTime = parseInt(lastSubmission);
  const now = Date.now();
  const twoDays = 1 * 24 * 60 * 60 * 1000;
  const timePassed = now - lastSubmitTime;
  
  if (timePassed >= twoDays) {
    localStorage.removeItem(storageKey);
    return { allowed: true, daysRemaining: 0 };
  }
  
  const daysRemaining = Math.ceil((twoDays - timePassed) / (24 * 60 * 60 * 1000));
  return { allowed: false, daysRemaining: daysRemaining };
}

function updateSubmitButton() {
  const emailInput = document.getElementById('email');
  const submitBtn = document.querySelector('.form-submit');
  
  if (!emailInput || !submitBtn || !emailInput.value) return;
  
  const limitCheck = checkSubmissionLimit(emailInput.value.trim().toLowerCase());
  
  if (!limitCheck.allowed) {
    submitBtn.disabled = true;
    submitBtn.textContent = `Please wait ${limitCheck.daysRemaining} day(s) to send another request`;
    submitBtn.style.opacity = '0.6';
    submitBtn.style.cursor = 'not-allowed';
  } else {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Secure My Spot in the Free Demo';
    submitBtn.style.opacity = '1';
    submitBtn.style.cursor = 'pointer';
  }
}

function openBookingModal(e) {
  e.preventDefault();
  document.getElementById('bookingModal').classList.add('active');
  document.body.style.overflow = 'hidden';
  updateSubmitButton();
  if (typeof fbq === 'function') {
    fbq('trackCustom', 'OpenBookingModal');
  }
}

function closeBookingModal() {
  document.getElementById('bookingModal').classList.remove('active');
  document.body.style.overflow = '';
}

function submitBooking(e) {
  e.preventDefault();
  
  const email = document.getElementById("email").value.trim().toLowerCase();
  const limitCheck = checkSubmissionLimit(email);
  
  if (!limitCheck.allowed) {
    alert(`Your message has been sent. Please wait ${limitCheck.daysRemaining} day(s) to send another request.`);
    return;
  }
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  emailjs.init("wU74bNn0Kht8Sa4J4");

  // Get firstName and lastName separately
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;

  // Check if subscription checkbox is checked
  const isSubscribed = document.getElementById("subscribe").checked;

  const emailParams = {
    first_name: firstName,
    last_name: lastName,
    from_email: document.getElementById("email").value,
    cooperative_name: document.getElementById("coop").value,
    phone: document.getElementById("phone").value,
    demo_date: document.getElementById("date").value || 'May 8, 3:00–4:00 PM',
    subscribed: isSubscribed ? 'User has checked the subscription box, agreeing to receive newsletters, updates, and announcements. The user may unsubscribe at any time.' : 'User has not checked the subscription box; no consent to receive newsletters, updates, and announcements.',
    to_email: 'edgepoint.solutions.inc@gmail.com'
  };

  emailjs.send("service_aay4edu", "template_os99snq", emailParams)
    .then(function(response) {
      console.log('Email sent successfully!', response.status, response.text);
      
      // Store submission timestamp in localStorage (2-day limit)
      const storageKey = 'cora_demo_' + email;
      localStorage.setItem(storageKey, Date.now().toString());
      
      if (typeof fbq === 'function') {
        fbq('track', 'Lead', { content_name: 'Free Demo Booking' });
        fbq('track', 'Schedule');
      }
      alert('We sent you the link of online demo already in your Gmail. See you there!');
      closeBookingModal();
      e.target.reset();
    }, function(error) {
      console.error('Email sending failed:', error);
      alert('Sorry, there was an error booking your demo. Please try again or contact us directly.');
    });
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeBookingModal();
    closeLightbox();
  }
});

// Lightbox Functions
const imageData = {
  'images/Onboarding_SEMCO1.jpg': {
    title: 'SEMCO Onboarding Session',
    desc: 'A valuable session with SEMCO as we navigate CORA system. A process shared with a heart. Thanks to Mam Jess and Nina. Mabuhay ang SEMCO!!!!'
  },
  'images/Onboarding_SEMCO2.jpg': {
    title: 'Digital Automation Training',
    desc: 'Learn how CORA can help your cooperative in digital automation'
  },
  'images/Event_COOPdayCamNorte1.jpg': {
    title: 'Cooperative Day Celebration - Camarines Norte',
    desc: 'CORA showcased at the Cooperative Day event, demonstrating how technology transforms cooperative operations.'
  },
  'images/Event_COOPdayCamNorte2.jpg': {
    title: 'Training Workshop - Camarines Norte',
    desc: 'Interactive training session cooperative members learning to use CORA effectively.'
  },
  'images/Event_COOPdayNagaCity1.jpg': {
    title: 'Cooperative Assembly - Naga City',
    desc: 'CORA presentation during the Naga City cooperative general assembly.'
  },
  'images/Event_FACCSliveDemo1.jpg': {
    title: 'Live System Demo - FACCS Conference',
    desc: 'Real-time demonstration of CORA\'s features at the FACCS national conference.'
  },
  'images/Event_FACCSliveDemo2.jpg': {
    title: 'System Walkthrough - FACCS',
    desc: 'Detailed walkthrough of CORA\'s reporting and member management modules.'
  },
  'images/Event_FACCSliveDemo3.jpg': {
    title: 'Exhibition Booth - FACCS',
    desc: 'CORA exhibition booth attracting interest from cooperatives nationwide.'
  },
  'images/Online_onlineDemo1.jpg': {
    title: 'Online Demo Session',
    desc: 'Remote demo session allowing cooperatives from anywhere to join and see CORA in action.'
  },
  'images/posterPortrait1.jpg': {
    title: 'Member Testimonials',
    desc: 'Real feedback from cooperative members who have experienced the benefits of CORA.'
  },
  'images/posterPortrait2.jpg': {
    title: 'Before & After Transformation',
    desc: 'The dramatic improvement in efficiency and accuracy after implementing CORA.'
  },
  'images/posterPortrait3.jpg': {
    title: 'Cooperative Achievements',
    desc: 'Milestones and successes achieved through streamlined operations with CORA.'
  },
  'images/posterLandscape1.jpg': {
    title: 'Platform Overview',
    desc: 'Complete view of CORA\'s integrated cooperative management system.'
  },
  'images/posterLandscape2.jpg': {
    title: 'Key Features',
    desc: 'Core capabilities that make CORA the preferred choice for modern cooperatives.'
  },
  'images/posterLandscape3.jpg': {
    title: 'Key Features',
    desc: 'Core capabilities that make CORA the preferred choice for modern cooperatives.'
  }
};

function openLightbox(imgSrc, title, desc) {
  const lightbox = document.getElementById('lightbox');
  document.getElementById('lightbox-img').src = imgSrc;
  document.getElementById('lightbox-title').textContent = title;
  document.getElementById('lightbox-desc').textContent = desc;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('active');
  document.body.style.overflow = '';
}

function setupImageClickHandlers() {
  function getImageDescription(imgElement, fallbackTitle) {
    const key = getImageKey(imgElement.src);
    if (imageData[key]) return imageData[key];
    return { title: fallbackTitle || 'Image', desc: 'Click to view image' };
  }

  document.querySelectorAll('.hero-img-card').forEach(card => {
    card.addEventListener('click', function() {
      const img = this.querySelector('img');
      const label = this.querySelector('.hero-img-label');
      const data = getImageDescription(img, label ? label.textContent : 'Image');
      openLightbox(img.src, data.title, data.desc);
    });
  });

  document.querySelectorAll('.onboarding-card').forEach(card => {
    card.addEventListener('click', function() {
      const img = this.querySelector('img');
      const label = this.querySelector('.onboarding-label');
      const data = getImageDescription(img, label ? label.textContent : 'Onboarding Step');
      openLightbox(img.src, data.title, data.desc);
    });
  });

  document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('click', function() {
      const img = this.querySelector('img');
      const titleEl = this.querySelector('.event-title');
      const data = getImageDescription(img, titleEl ? titleEl.textContent : 'Event');
      openLightbox(img.src, data.title, data.desc);
    });
  });

  document.querySelectorAll('.marketing-card').forEach(card => {
    card.addEventListener('click', function() {
      const img = this.querySelector('img');
      const titleEl = this.querySelector('.marketing-title');
      const data = getImageDescription(img, titleEl ? titleEl.textContent : 'Image');
      openLightbox(img.src, data.title, data.desc);
    });
  });
}
