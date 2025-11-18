// ========================================
// Loading Screen
// ========================================
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 1000);
});

// ========================================
// Theme Toggle
// ========================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to 'dark'
const currentTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
  const theme = html.getAttribute('data-theme');
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Add animation
  themeToggle.style.transform = 'rotate(360deg)';
  setTimeout(() => {
    themeToggle.style.transform = '';
  }, 300);
});

// ========================================
// Mobile Menu Toggle
// ========================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
  });
});

// ========================================
// Smooth Scrolling
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerOffset = 80;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// Scroll Progress Bar
// ========================================
const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
  const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (window.pageYOffset / windowHeight) * 100;
  progressBar.style.width = scrolled + '%';
});

// ========================================
// Header Scroll Effect
// ========================================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ========================================
// Scroll to Top Button
// ========================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// ========================================
// Intersection Observer for Animations
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Add staggered animation for cards
      if (entry.target.classList.contains('card')) {
        const cards = entry.target.parentElement.querySelectorAll('.card');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('visible');
          }, index * 100);
        });
      }
    }
  });
}, observerOptions);

// Observe all sections and cards
document.querySelectorAll('.section, .card').forEach(el => {
  observer.observe(el);
});

// ========================================
// AOS Animation (Custom Implementation)
// ========================================
const aosElements = document.querySelectorAll('[data-aos]');

const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
    }
  });
}, {
  threshold: 0.2
});

aosElements.forEach(el => {
  aosObserver.observe(el);
});

// ========================================
// Project Filtering
// ========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active class from all buttons
    filterBtns.forEach(b => b.classList.remove('active'));
    // Add active class to clicked button
    btn.classList.add('active');
    
    const filter = btn.getAttribute('data-filter');
    
    projectCards.forEach(card => {
      // Add fade out effect
      card.style.opacity = '0';
      card.style.transform = 'scale(0.9)';
      
      setTimeout(() => {
        if (filter === 'all') {
          card.style.display = 'block';
        } else {
          const tags = card.getAttribute('data-tags');
          if (tags && tags.includes(filter)) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        }
        
        // Add fade in effect
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        }, 50);
      }, 300);
    });
  });
});

// ========================================
// Typing Effect for Hero Title
// ========================================
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Optional: Activate typing effect
// const heroTitle = document.querySelector('.hero-title');
// if (heroTitle) {
//   const originalText = heroTitle.textContent;
//   typeWriter(heroTitle, originalText, 50);
// }

// ========================================
// Particle Background Effect (Optional)
// ========================================
function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';
  particle.style.cssText = `
    position: fixed;
    width: 2px;
    height: 2px;
    background: rgba(6, 182, 212, 0.5);
    pointer-events: none;
    z-index: 0;
    border-radius: 50%;
  `;
  
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  const duration = Math.random() * 3 + 2;
  
  particle.style.left = x + 'px';
  particle.style.top = y + 'px';
  particle.style.animation = `float ${duration}s ease-in-out infinite`;
  
  document.body.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, duration * 1000);
}

// Optional: Activate particle effect
// setInterval(createParticle, 500);

// ========================================
// Active Navigation Link on Scroll
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinksArray = document.querySelectorAll('.nav-link');

function highlightNavLink() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinksArray.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavLink);

// ========================================
// Counter Animation for Stats
// ========================================
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current * 100) / 100;
    }
  }, 16);
}

// Animate stats when they come into view
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      const target = parseFloat(entry.target.textContent);
      animateCounter(entry.target, target);
      entry.target.classList.add('animated');
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-value').forEach(stat => {
  statObserver.observe(stat);
});

// ========================================
// Copy Email on Click
// ========================================
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const email = link.getAttribute('href').replace('mailto:', '');
    
    // Optional: Copy to clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        // Show tooltip or notification
        const tooltip = document.createElement('div');
        tooltip.textContent = 'Email copied!';
        tooltip.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          color: white;
          padding: 1rem 2rem;
          border-radius: 8px;
          font-weight: 600;
          z-index: 10000;
          animation: fadeInUp 0.3s ease-out;
        `;
        
        document.body.appendChild(tooltip);
        
        setTimeout(() => {
          tooltip.style.opacity = '0';
          setTimeout(() => tooltip.remove(), 300);
        }, 2000);
      });
    }
  });
});

// ========================================
// Cursor Follow Effect (Optional Advanced Feature)
// ========================================
let cursorDot, cursorOutline;

function initCursor() {
  cursorDot = document.createElement('div');
  cursorOutline = document.createElement('div');
  
  cursorDot.style.cssText = `
    width: 8px;
    height: 8px;
    background: #06b6d4;
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 10000;
    transition: transform 0.1s;
  `;
  
  cursorOutline.style.cssText = `
    width: 40px;
    height: 40px;
    border: 2px solid rgba(6, 182, 212, 0.5);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 10000;
    transition: transform 0.15s, width 0.3s, height 0.3s;
  `;
  
  document.body.appendChild(cursorDot);
  document.body.appendChild(cursorOutline);
  
  document.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    
    cursorOutline.style.left = e.clientX - 20 + 'px';
    cursorOutline.style.top = e.clientY - 20 + 'px';
  });
  
  // Expand cursor on hover
  document.querySelectorAll('a, button, .card').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursorOutline.style.width = '60px';
      cursorOutline.style.height = '60px';
      cursorOutline.style.left = parseInt(cursorOutline.style.left) - 10 + 'px';
      cursorOutline.style.top = parseInt(cursorOutline.style.top) - 10 + 'px';
    });
    
    el.addEventListener('mouseleave', () => {
      cursorOutline.style.width = '40px';
      cursorOutline.style.height = '40px';
      cursorOutline.style.left = parseInt(cursorOutline.style.left) + 10 + 'px';
      cursorOutline.style.top = parseInt(cursorOutline.style.top) + 10 + 'px';
    });
  });
}

// Optional: Activate custom cursor (only on desktop)
// if (window.innerWidth > 768) {
//   initCursor();
// }

// ========================================
// Form Validation (If contact form is added)
// ========================================
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// ========================================
// Performance Optimization
// ========================================
// Debounce function for scroll events
function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll events
window.addEventListener('scroll', debounce(() => {
  highlightNavLink();
}, 10));

// ========================================
// Console Message
// ========================================
console.log('%c👋 Hi there! Welcome to my portfolio!', 'color: #06b6d4; font-size: 16px; font-weight: bold;');
console.log('%c🚀 Built with HTML, CSS, and JavaScript', 'color: #3b82f6; font-size: 14px;');
console.log('%c💼 Looking for opportunities in AI/ML and Embedded Systems', 'color: #10b981; font-size: 14px;');
console.log('%c📧 Contact: ajjudec7@gmail.com', 'color: #f59e0b; font-size: 14px;');

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // Trigger initial scroll event to set active nav link
  highlightNavLink();
  
  // Add subtle parallax effect to hero
  window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
      const scrolled = window.pageYOffset;
      hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      hero.style.opacity = 1 - (scrolled / 600);
    }
  });
});
