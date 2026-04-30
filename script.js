// Intersection Observer for scroll animations - Sharper timing
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
    // Create a temporary anchor element to parse URL
    const url = new URL(src, window.location.origin);
    const filename = url.pathname.split('/').pop();
    return 'images/' + filename;
  } catch (e) {
    // Fallback: extract using regex
    const match = src.match(/([^\/\\]+\.(jpg|jpeg|png|gif|webp))$/i);
    return match ? 'images/' + match[1] : src;
  }
}

// Observe all animated elements with faster, snappier staggered delays
document.addEventListener('DOMContentLoaded', () => {
  const featureCards = document.querySelectorAll('.feature-card');
  featureCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.05}s`;
    observer.observe(card);
  });

  const events = document.querySelectorAll('.event-card');
  events.forEach((event, index) => {
    event.style.transitionDelay = `${index * 0.03}s`;
    observer.observe(event);
  });

  const marketingCards = document.querySelectorAll('.marketing-card');
  marketingCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.03}s`;
    observer.observe(card);
  });

  const onboardingCards = document.querySelectorAll('.onboarding-card');
  onboardingCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.06}s`;
    observer.observe(card);
  });

  // Navbar shadow on scroll with improved gradient
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 6px 24px rgba(224, 124, 58, 0.12)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  // Booking modal outside click
  document.getElementById('bookingModal').addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeBookingModal();
    }
  });

  // Image click handlers
  setupImageClickHandlers();
});

// Booking Modal Functions
function openBookingModal(e) {
  e.preventDefault();
  document.getElementById('bookingModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
  document.getElementById('bookingModal').classList.remove('active');
  document.body.style.overflow = '';
}

function submitBooking(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());
  
  // EmailJS Configuration - Replace with your actual values
  const serviceID = 'YOUR_SERVICE_ID'; // Get from EmailJS dashboard
  const templateID = 'YOUR_TEMPLATE_ID'; // Create email template in EmailJS
  const publicKey = 'YOUR_PUBLIC_KEY'; // Get from EmailJS dashboard
  
  // Initialize EmailJS
  emailjs.init("wU74bNn0Kht8Sa4J4");
  
  // Prepare email parameters - match your EmailJS template variables
  const emailParams = {
    from_name: document.getElementById("name").value,
    from_email: document.getElementById("email").value,
    cooperative_name: document.getElementById("coop").value,
    phone: document.getElementById("phone").value,
    demo_date: document.querySelector('input[name="date"]:checked')?.value || '',
    questions: document.getElementById("questions").value,
    to_email: 'edgepoint.solutions.inc@gmail.com'
  };
  
  // Send email
  emailjs.send("service_aay4edu", "template_os99snq", emailParams)
    .then(function(response) {
      console.log('Email sent successfully!', response.status, response.text);
      alert('Thank you! Your free demo has been booked. We will send you a confirmation email shortly.');
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
  // Hero/Onboarding images
  'images/Onboarding_SEMCO1.jpg': {
    title: 'SEMCO Onboarding Session',
    desc: 'A valuable session with SEMCO as we navigate CORA system. A process shared with a heart. Thanks to Mam Jess and Nina. Mabuhay ang SEMCO!!!!'
  },
  'images/Onboarding_SEMCO2.jpg': {
    title: 'Digital Automation Training',
    desc: 'Learn how CORA can help your cooperative in digital automation'
  },
  // Event images
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
  // Online demo
  'images/Online_onlineDemo1.jpg': {
    title: 'Online Demo Session',
    desc: 'Remote demo session allowing cooperatives from anywhere to join and see CORA in action.'
  },
  // Marketing posters
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
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  
  lightboxImg.src = imgSrc;
  lightboxTitle.textContent = title;
  lightboxDesc.textContent = desc;
  
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function setupImageClickHandlers() {
  // Helper to get description for an image
  function getImageDescription(imgElement, fallbackTitle) {
    const src = imgElement.src;
    const key = getImageKey(src);
    
    if (imageData[key]) {
      return imageData[key];
    }
    
    // Fallback: use card title/desc or default
    return {
      title: fallbackTitle || 'Image',
      desc: 'Click to view image'
    };
  }

  // Hero images
  document.querySelectorAll('.hero-img-card').forEach(card => {
    card.addEventListener('click', function() {
      const img = this.querySelector('img');
      const label = this.querySelector('.hero-img-label');
      const fallbackTitle = label ? label.textContent : 'Image';
      const data = getImageDescription(img, fallbackTitle);
      openLightbox(img.src, data.title, data.desc);
    });
  });

  // Onboarding cards
  document.querySelectorAll('.onboarding-card').forEach(card => {
    card.addEventListener('click', function() {
      const img = this.querySelector('img');
      const label = this.querySelector('.onboarding-label');
      const fallbackTitle = label ? label.textContent : 'Onboarding Step';
      const data = getImageDescription(img, fallbackTitle);
      openLightbox(img.src, data.title, data.desc);
    });
  });

  // Event cards
  document.querySelectorAll('.event-card').forEach(card => {
    card.addEventListener('click', function() {
      const img = this.querySelector('img');
      const titleEl = this.querySelector('.event-title');
      const locationEl = this.querySelector('.event-location');
      const fallbackTitle = titleEl ? titleEl.textContent : 'Event';
      const location = locationEl ? locationEl.textContent : '';
      const data = getImageDescription(img, fallbackTitle);
      openLightbox(img.src, data.title, data.desc);
    });
  });

  // Marketing cards
  document.querySelectorAll('.marketing-card').forEach(card => {
    card.addEventListener('click', function() {
      const img = this.querySelector('img');
      const titleEl = this.querySelector('.marketing-title');
      const descEl = this.querySelector('.marketing-desc');
      const fallbackTitle = titleEl ? titleEl.textContent : 'Image';
      const fallbackDesc = descEl ? descEl.textContent : '';
      const data = getImageDescription(img, fallbackTitle);
       openLightbox(img.src, data.title, data.desc || fallbackDesc);
    });
  });
}
