import { supabase } from './supabase.js';

/*=============================================
=            Global App Logic                 =
=============================================*/

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  initNavbar();
  initRevealOnScroll();
  initToasts();
  checkAuthStatus();
  console.log("Movie Booking System Initialized.");
}

/* Navbar Scroll Effect & Mobile Menu */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if(navbar) {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  if(mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
}

/* Scroll Reveal Animations */
function initRevealOnScroll() {
  const revealOnScroll = () => {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach((reveal) => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', revealOnScroll);
  window.triggerReveal = revealOnScroll; // Expose globally for dynamic content
  revealOnScroll(); // Trigger on load
}

/* Global Auth Check */
async function checkAuthStatus() {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    updateNavigationState(session);
    
    // Listen for auth changes
    supabase.auth.onAuthStateChange((event, session) => {
      updateNavigationState(session);
    });
  } catch (error) {
    console.warn("Supabase not fully configured or offline mode:", error.message);
  }
}

function updateNavigationState(session) {
  const authLinks = document.getElementById('auth-links');
  const userLinks = document.getElementById('user-links');
  
  if(!authLinks && !userLinks) return; // Not present on page

  if (session) {
    if(authLinks) authLinks.style.display = 'none';
    if(userLinks) {
        userLinks.style.display = 'flex';
        // Add logout listener if button exists
        const logoutBtn = document.getElementById('logout-btn');
        if(logoutBtn && !logoutBtn.dataset.bound) {
            logoutBtn.dataset.bound = true;
            logoutBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                await supabase.auth.signOut();
                window.location.href = 'index.html';
            });
        }
    }
  } else {
    if(authLinks) authLinks.style.display = 'flex';
    if(userLinks) userLinks.style.display = 'none';
  }
}

/* Toast System Setup */
function initToasts() {
    let container = document.querySelector('.toast-container');
    if(!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }
}

/* Export reusable ShowToast globally */
window.showToast = function(message, type = 'success') {
    const container = document.querySelector('.toast-container');
    if(!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = '';
    if(type === 'success') icon = '✓';
    else if(type === 'error') icon = '⚠';
    else icon = 'ℹ';

    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>
        <div class="toast-message">${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hide');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
