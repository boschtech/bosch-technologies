/* ============================================
   BOSCH TECHNOLOGIES — Main JS
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile Navigation Toggle ---
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // --- Navbar scroll effect ---
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // --- Active nav link ---
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href && currentPath.includes(href) && href !== '/') {
      link.classList.add('active');
    } else if (href === '/' && (currentPath === '/' || currentPath.endsWith('index.html'))) {
      link.classList.add('active');
    }
  });

  // --- Simple contact form handler (Formspree or PHP) ---
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      // Clear previous email error
      const existingEmailErr = contactForm.querySelector('.email-field-error');
      if (existingEmailErr) existingEmailErr.remove();

      // Validate email
      const emailField = contactForm.querySelector('input[type="email"]');
      if (emailField) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailField.value)) {
          const errEl = document.createElement('p');
          errEl.className = 'email-field-error';
          errEl.style.cssText = 'color: #c0392b; font-size: 0.82rem; margin-top: 4px; font-weight: 600;';
          errEl.textContent = 'Please enter a valid email address.';
          emailField.parentNode.appendChild(errEl);
          emailField.focus();
          return;
        }
      }

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
        // Try PHP endpoint first, fallback to Formspree
        const action = contactForm.getAttribute('action') || '/api/submit-assessment.php';
        const response = await fetch(action, {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          contactForm.innerHTML = `
            <div style="text-align:center; padding: 40px;">
              <h3 style="color: var(--accent);">Message Sent!</h3>
              <p>Thank you for reaching out. We'll be in touch within 24 hours.</p>
            </div>
          `;
        } else {
          throw new Error('Failed to send');
        }
      } catch (err) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        // Show inline error next to submit button
        let errorEl = contactForm.querySelector('.form-submit-error');
        if (!errorEl) {
          errorEl = document.createElement('p');
          errorEl.className = 'form-submit-error';
          errorEl.style.cssText = 'color: #c0392b; font-size: 0.85rem; margin-top: 10px; font-weight: 600;';
          submitBtn.parentNode.insertBefore(errorEl, submitBtn.nextSibling);
        }
        errorEl.textContent = 'Something went wrong. Please try again or email us directly at admin@boschtechnologies.com.';
      }
    });
  }

  // --- Newsletter form ---
  const newsletterForm = document.querySelector('#newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = newsletterForm.querySelector('input[type="email"]').value;
      if (email) {
        newsletterForm.innerHTML = '<p style="color: var(--accent); font-weight: 600;">Thanks! You\'re subscribed.</p>';
      }
    });
  }

});
