// Enhanced Interactions JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all enhanced interactions
  initMouseParallax();
  initScrollReveal();
  initSplitText();
  initMasonryLayout();
  initTypewriter();
  initTabs();
  initAccordion();
  initTooltips();
  initScrollProgress();
  initFloatingLabels();
});

// Mouse tracking parallax effect
function initMouseParallax() {
  const parallaxContainers = document.querySelectorAll('.mouse-parallax');
  
  if (parallaxContainers.length === 0) return;
  
  parallaxContainers.forEach(container => {
    const layers = container.querySelectorAll('.parallax-layer');
    
    container.addEventListener('mousemove', e => {
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;
      const mouseX = e.clientX - containerRect.left;
      const mouseY = e.clientY - containerRect.top;
      const xOffset = (mouseX - centerX) / centerX;
      const yOffset = (mouseY - centerY) / centerY;
      
      layers.forEach(layer => {
        const speed = parseFloat(layer.dataset.speed || 0.05);
        const x = xOffset * speed * 100;
        const y = yOffset * speed * 100;
        layer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    });
    
    // Reset on mouse leave
    container.addEventListener('mouseleave', () => {
      layers.forEach(layer => {
        layer.style.transform = 'translate3d(0, 0, 0)';
      });
    });
  });
}

// Enhanced scroll reveal animations
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.content-reveal');
  
  if (revealElements.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Only observe once
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(element => {
    observer.observe(element);
  });
}

// Split text animation on reveal
function initSplitText() {
  const elements = document.querySelectorAll('.split-text');
  
  if (elements.length === 0) return;
  
  elements.forEach(element => {
    const text = element.textContent;
    const wrappedText = `<span class="split-text__inner">${text}</span>`;
    element.innerHTML = wrappedText;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    observer.observe(element);
  });
}

// Masonry layout
function initMasonryLayout() {
  const masonryGrids = document.querySelectorAll('.card-grid--masonry');
  
  if (masonryGrids.length === 0) return;
  
  masonryGrids.forEach(grid => {
    const items = grid.querySelectorAll('.card');
    
    // Only proceed if we have image items
    if (items.length === 0) return;
    
    // Handle image loading to calculate heights
    items.forEach(item => {
      const img = item.querySelector('img');
      if (img) {
        // If image is already loaded
        if (img.complete) {
          adjustItemHeight(item, img);
        } else {
          // If image is still loading
          img.addEventListener('load', () => {
            adjustItemHeight(item, img);
          });
        }
      }
    });
  });
  
  function adjustItemHeight(item, img) {
    const aspectRatio = img.naturalHeight / img.naturalWidth;
    const rowSpan = Math.ceil(aspectRatio * 30); // Adjust based on your grid-auto-rows value
    item.style.gridRowEnd = `span ${rowSpan}`;
  }
}

// Typewriter effect
function initTypewriter() {
  const typewriters = document.querySelectorAll('.typewriter');
  
  if (typewriters.length === 0) return;
  
  typewriters.forEach(element => {
    const text = element.textContent;
    element.textContent = '';
    element.style.width = '0';
    
    let charIndex = 0;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Start typing
          const typingInterval = setInterval(() => {
            if (charIndex < text.length) {
              element.textContent += text.charAt(charIndex);
              element.style.width = `${Math.min(100, (charIndex + 1) / text.length * 100)}%`;
              charIndex++;
            } else {
              clearInterval(typingInterval);
            }
          }, 50);
          observer.unobserve(element);
        }
      });
    }, {
      threshold: 0.1
    });
    
    observer.observe(element);
  });
}

// Custom tabs implementation
function initTabs() {
  const tabContainers = document.querySelectorAll('.custom-tabs');
  
  if (tabContainers.length === 0) return;
  
  tabContainers.forEach(container => {
    const tabItems = container.querySelectorAll('.custom-tabs__nav-item');
    const tabPanes = container.querySelectorAll('.custom-tabs__content-pane');
    
    tabItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        // Remove active class from all items
        tabItems.forEach(tab => tab.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to current item
        item.classList.add('active');
        tabPanes[index].classList.add('active');
      });
    });
    
    // Activate first tab by default
    if (tabItems.length > 0) {
      tabItems[0].classList.add('active');
      tabPanes[0].classList.add('active');
    }
  });
}

// Custom accordion implementation
function initAccordion() {
  const accordions = document.querySelectorAll('.custom-accordion');
  
  if (accordions.length === 0) return;
  
  accordions.forEach(accordion => {
    const items = accordion.querySelectorAll('.custom-accordion__item');
    
    items.forEach(item => {
      const header = item.querySelector('.custom-accordion__item-header');
      
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items first if we're in a single-open accordion
        if (accordion.classList.contains('single-open')) {
          items.forEach(i => i.classList.remove('active'));
        }
        
        // Toggle current item
        item.classList.toggle('active', !isActive);
      });
    });
    
    // Activate first item by default if specified
    if (accordion.classList.contains('first-open') && items.length > 0) {
      items[0].classList.add('active');
    }
  });
}

// Custom tooltips
function initTooltips() {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');
  
  if (tooltipElements.length === 0) return;
  
  tooltipElements.forEach(element => {
    const tooltipText = element.dataset.tooltip;
    const position = element.dataset.tooltipPosition || 'top';
    
    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = `tooltip tooltip--${position}`;
    tooltip.textContent = tooltipText;
    
    // Add tooltip to element
    element.classList.add('tooltip-container');
    element.appendChild(tooltip);
    
    // Position tooltip on mouseover
    element.addEventListener('mouseenter', () => {
      const rect = element.getBoundingClientRect();
      const tooltipRect = tooltip.getBoundingClientRect();
      
      tooltip.style.opacity = '1';
      tooltip.style.visibility = 'visible';
    });
    
    // Hide tooltip on mouseleave
    element.addEventListener('mouseleave', () => {
      tooltip.style.opacity = '0';
      tooltip.style.visibility = 'hidden';
    });
  });
}

// Scroll progress indicator
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    
    progressBar.style.width = `${progress}%`;
  });
}

// Floating label form inputs
function initFloatingLabels() {
  const formInputs = document.querySelectorAll('.form-group__input');
  
  if (formInputs.length === 0) return;
  
  formInputs.forEach(input => {
    const formGroup = input.closest('.form-group');
    
    // Initial state check
    if (input.value !== '') {
      formGroup.classList.add('form-group--focus');
    }
    
    // Focus event
    input.addEventListener('focus', () => {
      formGroup.classList.add('form-group--focus');
    });
    
    // Blur event
    input.addEventListener('blur', () => {
      if (input.value === '') {
        formGroup.classList.remove('form-group--focus');
      }
    });
  });
}

// 3D card effect
function init3DCards() {
  const cards = document.querySelectorAll('.card-3d');
  
  if (cards.length === 0) return;
  
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

// Initialize 3D cards
init3DCards();

// Progress steps functionality
function initProgressSteps() {
  const stepsContainers = document.querySelectorAll('.progress-steps');
  
  if (stepsContainers.length === 0) return;
  
  stepsContainers.forEach(container => {
    const steps = container.querySelectorAll('.progress-steps__step');
    const nextButtons = container.querySelectorAll('[data-step-next]');
    const prevButtons = container.querySelectorAll('[data-step-prev]');
    
    let currentStep = 0;
    
    // Set initial state
    updateSteps();
    
    // Next button click
    nextButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (currentStep < steps.length - 1) {
          currentStep++;
          updateSteps();
        }
      });
    });
    
    // Previous button click
    prevButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (currentStep > 0) {
          currentStep--;
          updateSteps();
        }
      });
    });
    
    // Update steps states
    function updateSteps() {
      steps.forEach((step, index) => {
        if (index < currentStep) {
          step.classList.remove('active');
          step.classList.add('completed');
        } else if (index === currentStep) {
          step.classList.add('active');
          step.classList.remove('completed');
        } else {
          step.classList.remove('active', 'completed');
        }
      });
    }
  });
}

// Initialize progress steps
initProgressSteps();

// Cursor follower effect implementation
function initCursorFollower() {
  const cursor = document.createElement('div');
  cursor.className = 'cursor-follower';
  document.body.appendChild(cursor);
  
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Add hover effect on interactive elements
    const target = e.target;
    if (
      target.tagName === 'A' || 
      target.tagName === 'BUTTON' || 
      target.classList.contains('card') ||
      target.closest('.card') ||
      target.closest('.btn')
    ) {
      cursor.classList.add('hover');
    } else {
      cursor.classList.remove('hover');
    }
  });
  
  // Animate cursor with requestAnimationFrame for smooth performance
  function animateCursor() {
    const speed = 0.1;
    
    cursorX += (mouseX - cursorX) * speed;
    cursorY += (mouseY - cursorY) * speed;
    
    if (cursor) {
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
    }
    
    requestAnimationFrame(animateCursor);
  }
  
  // Start animation
  animateCursor();
  
  // Hide default cursor
  document.documentElement.style.cursor = 'none';
  
  // Add styles for clickable elements to show they're interactive
  const style = document.createElement('style');
  style.innerHTML = `
    a, button, .btn, .card, .card *, .custom-tabs__nav-item, .custom-accordion__item-header {
      cursor: none !important;
    }
  `;
  document.head.appendChild(style);
}

// Scroll to top button implementation
function initScrollToTop() {
  const scrollButton = document.querySelector('.scroll-to-top');
  
  if (!scrollButton) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollButton.classList.add('visible');
    } else {
      scrollButton.classList.remove('visible');
    }
  });
  
  scrollButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Notification toast functionality
function initToastNotifications() {
  const toasts = document.querySelectorAll('.toast-notification');
  
  if (toasts.length === 0) return;
  
  toasts.forEach(toast => {
    // Show toast after a delay
    setTimeout(() => {
      toast.classList.add('visible');
    }, 1000);
    
    // Close button functionality
    const closeButton = toast.querySelector('.toast-notification__close');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        toast.classList.remove('visible');
        
        // Remove from DOM after animation
        setTimeout(() => {
          toast.remove();
        }, 500);
      });
    }
    
    // Auto-close after 5 seconds
    setTimeout(() => {
      toast.classList.remove('visible');
      
      // Remove from DOM after animation
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, 5000);
  });
}

// Initialize on document load
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all enhanced interactions
  initMouseParallax();
  initScrollReveal();
  initSplitText();
  initMasonryLayout();
  initTypewriter();
  initTabs();
  initAccordion();
  initTooltips();
  initScrollProgress();
  initFloatingLabels();
  init3DCards();
  initProgressSteps();
  initScrollToTop();
  initToastNotifications();
  
  // Uncomment the line below to enable cursor follower effect
  // initCursorFollower();
});