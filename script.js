/**
 * PORTFOLIO CLIENT-SIDE INTERACTION SCRIPT
 * Student: DEEPA LAKSHMI V
 * Description: Clean, accessible vanilla JavaScript handling mobile navigation,
 * project dossier modal (<dialog>), scroll tracking, clipboard copy, and contact form.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. MOBILE NAVIGATION TOGGLE
  // =========================================================================
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close mobile menu when any nav link is tapped
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          navToggle.classList.remove('open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        navMenu.classList.contains('open') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        navMenu.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // =========================================================================
  // 2. ACTIVE NAVBAR LINK TRACKING ON SCROLL (IntersectionObserver)
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -65% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach((link) => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((sec) => sectionObserver.observe(sec));
  }

  // =========================================================================
  // 3. MAJOR PROJECT DOSSIER MODAL (<dialog>)
  // =========================================================================
  const modal = document.getElementById('project-modal');
  const btnOpenModal = document.getElementById('btn-open-project-details');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnCloseModalFooter = document.getElementById('btn-modal-close-footer');

  function openProjectModal() {
    if (modal && typeof modal.showModal === 'function') {
      modal.showModal();
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
  }

  function closeProjectModal() {
    if (modal && typeof modal.close === 'function') {
      modal.close();
      document.body.style.overflow = ''; // Restore background scrolling
    }
  }

  if (btnOpenModal && modal) {
    btnOpenModal.addEventListener('click', openProjectModal);
  }

  if (btnCloseModal && modal) {
    btnCloseModal.addEventListener('click', closeProjectModal);
  }

  if (btnCloseModalFooter && modal) {
    btnCloseModalFooter.addEventListener('click', closeProjectModal);
  }

  // Native ESC key handler sync
  if (modal) {
    modal.addEventListener('close', () => {
      document.body.style.overflow = '';
    });

    // Light-dismiss: Click outside modal body to close
    modal.addEventListener('click', (event) => {
      const rect = modal.getBoundingClientRect();
      const isInDialog =
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width;

      if (!isInDialog) {
        closeProjectModal();
      }
    });
  }

  // =========================================================================
  // 4. INLINE QUICK EXPAND TOGGLE (Alternative View for Recruiters)
  // =========================================================================
  const btnToggleInline = document.getElementById('btn-toggle-inline-details');
  const inlineContainer = document.getElementById('projects-expandable');
  const btnCloseInline = document.getElementById('btn-close-inline');

  if (btnToggleInline && inlineContainer) {
    btnToggleInline.addEventListener('click', (e) => {
      e.preventDefault();
      const isHidden = inlineContainer.style.display === 'none';
      if (isHidden) {
        inlineContainer.style.display = 'block';
        btnToggleInline.innerHTML = '<i class="fa-solid fa-chevron-up"></i> Collapse Inline View';
        inlineContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } else {
        inlineContainer.style.display = 'none';
        btnToggleInline.innerHTML = '<i class="fa-solid fa-layer-group"></i> Quick Expand Inline';
      }
    });
  }

  if (btnCloseInline && inlineContainer) {
    btnCloseInline.addEventListener('click', () => {
      inlineContainer.style.display = 'none';
      if (btnToggleInline) {
        btnToggleInline.innerHTML = '<i class="fa-solid fa-layer-group"></i> Quick Expand Inline';
      }
    });
  }

  // =========================================================================
  // 5. COPY EMAIL TO CLIPBOARD
  // =========================================================================
  const btnCopyEmail = document.getElementById('btn-copy-email');

  if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', async () => {
      const emailToCopy = btnCopyEmail.getAttribute('data-clipboard') || 'deepalakshmi.v@example.com';
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(emailToCopy);
        } else {
          // Fallback method for non-HTTPS local contexts
          const tempInput = document.createElement('input');
          tempInput.value = emailToCopy;
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }

        const copyTextSpan = btnCopyEmail.querySelector('.copy-text');
        const originalText = copyTextSpan ? copyTextSpan.textContent : 'Copy';

        if (copyTextSpan) {
          copyTextSpan.textContent = 'Copied!';
        }
        btnCopyEmail.classList.add('copied');

        showToast('Email address copied to clipboard!');

        setTimeout(() => {
          if (copyTextSpan) {
            copyTextSpan.textContent = originalText;
          }
          btnCopyEmail.classList.remove('copied');
        }, 2500);
      } catch (err) {
        console.error('Clipboard copy failed:', err);
        showToast('Unable to copy automatically. Email: ' + emailToCopy);
      }
    });
  }

  // =========================================================================
  // 6. CONTACT FORM VALIDATION & HANDLING
  // =========================================================================
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const subjectInput = document.getElementById('contact-subject');
      const messageInput = document.getElementById('contact-message');

      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const messageError = document.getElementById('message-error');

      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameError.style.display = 'block';
        isValid = false;
      } else {
        nameError.style.display = 'none';
      }

      // Validate Email
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        emailError.style.display = 'block';
        isValid = false;
      } else {
        emailError.style.display = 'none';
      }

      // Validate Message
      if (!messageInput.value.trim()) {
        messageError.style.display = 'block';
        isValid = false;
      } else {
        messageError.style.display = 'none';
      }

      if (isValid) {
        // Construct mailto link as direct action
        const name = encodeURIComponent(nameInput.value.trim());
        const email = encodeURIComponent(emailInput.value.trim());
        const subject = encodeURIComponent(subjectInput.value.trim() || 'Placement Inquiry for Deepa Lakshmi V');
        const body = encodeURIComponent(
          `Candidate: Deepa Lakshmi V\nFrom: ${name} (${email})\n\nMessage:\n${messageInput.value.trim()}`
        );

        const mailtoUri = `mailto:deepalakshmi.v@example.com?subject=${subject}&body=${body}`;

        if (formStatus) {
          formStatus.className = 'form-status success';
          formStatus.innerHTML = `
            <strong>Thank you, ${nameInput.value.trim()}!</strong><br>
            Preparing email dispatch. If your email client doesn't open automatically, 
            <a href="${mailtoUri}" style="text-decoration:underline; font-weight:600; color:#38bdf8;">click here to send directly</a>.
          `;
        }

        // Open recruiter's email client
        window.location.href = mailtoUri;

        // Reset form fields
        contactForm.reset();

        showToast('Message formatted! Opening your email client...');
      }
    });
  }

  // =========================================================================
  // 7. SCROLL-TO-TOP BUTTON
  // =========================================================================
  const btnScrollTop = document.getElementById('btn-scroll-top');

  if (btnScrollTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btnScrollTop.classList.add('visible');
      } else {
        btnScrollTop.classList.remove('visible');
      }
    });

    btnScrollTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // =========================================================================
  // 8. ACCESSIBILITY & TOAST HELPER
  // =========================================================================
  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 3000);
  }

  // =========================================================================
  // 9. INTERACTIVE PROFILE PHOTO UPLOAD & LOCAL CACHING
  // =========================================================================
  const photoWrapper = document.getElementById('profile-photo-wrapper');
  const photoInput = document.getElementById('photo-upload-input');
  const profileImg = document.getElementById('profile-img');
  const btnResetPhoto = document.getElementById('btn-reset-photo');
  const defaultPhotoSrc = 'assets/images/profile-placeholder.svg';

  // Restore previously uploaded photo if saved in browser storage
  try {
    const savedPhoto = localStorage.getItem('deepa_portfolio_profile_photo');
    if (savedPhoto && profileImg) {
      profileImg.src = savedPhoto;
      if (btnResetPhoto) btnResetPhoto.style.display = 'flex';
    }
  } catch (err) {
    console.warn('LocalStorage unavailable:', err);
  }

  // Trigger file selection when photo card is clicked or activated
  if (photoWrapper && photoInput) {
    photoWrapper.addEventListener('click', (e) => {
      // Do not trigger file picker if clicking reset button
      if (e.target.closest('#btn-reset-photo')) return;
      photoInput.click();
    });

    photoWrapper.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        photoInput.click();
      }
    });

    photoInput.addEventListener('change', () => {
      const file = photoInput.files && photoInput.files[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          showToast('Please select a valid image file (PNG, JPG, JPEG, WebP).');
          return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
          const newPhotoDataUrl = event.target.result;
          if (profileImg) {
            profileImg.src = newPhotoDataUrl;
          }
          try {
            localStorage.setItem('deepa_portfolio_profile_photo', newPhotoDataUrl);
          } catch (storageErr) {
            console.warn('Could not persist to localStorage:', storageErr);
          }
          if (btnResetPhoto) {
            btnResetPhoto.style.display = 'flex';
          }
          showToast('Profile photo updated successfully!');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Reset photo back to default placeholder
  if (btnResetPhoto && profileImg) {
    btnResetPhoto.addEventListener('click', (e) => {
      e.stopPropagation();
      profileImg.src = defaultPhotoSrc;
      try {
        localStorage.removeItem('deepa_portfolio_profile_photo');
      } catch (err) {}
      btnResetPhoto.style.display = 'none';
      if (photoInput) photoInput.value = '';
      showToast('Reset photo to default placeholder.');
    });
  }
});
