// Main JavaScript file for AI Musings website - Updated for AI Workshop Series design

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initThemeToggle();
    initNavbar();
    initSmoothScrolling();
    initContactForm();
    initAnimations();
    initSearch();
    initPageTransitions();
    initParallaxEffects();
    initTypingEffect();
    
    // Initialize AOS library if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    }
});

// Navbar scroll effect and animations - Enhanced for AI Workshop Series
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    // Enhanced scroll effect with blur
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.95)';
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.backgroundColor = 'rgba(15, 23, 42, 0.8)';
        }
    });
    
    // Highlight active nav item
    const currentPath = window.location.pathname;
    document.querySelectorAll('.navbar .nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href && (currentPath === href || currentPath.startsWith(href) && href !== '/')) {
            link.classList.add('active');
        }
    });
    
    // Mobile menu animation
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
        navbarToggler.addEventListener('click', function() {
            document.body.classList.toggle('nav-open', navbarCollapse.classList.contains('show'));
        });
        
        // Add hover effect for desktop nav items
        if (window.innerWidth > 992) {
            document.querySelectorAll('.navbar .nav-item').forEach(item => {
                const link = item.querySelector('.nav-link');
                if (!link) return;
                
                item.addEventListener('mouseenter', () => {
                    if (!link.classList.contains('active')) {
                        link.style.transform = 'translateY(-3px)';
                        link.style.textShadow = '0 0 10px rgba(99, 102, 241, 0.5)';
                    }
                });
                
                item.addEventListener('mouseleave', () => {
                    if (!link.classList.contains('active')) {
                        link.style.transform = 'translateY(0)';
                        link.style.textShadow = 'none';
                    }
                });
            });
        }
    }
    
    // Add enhanced styles for nav link hover effects
    const style = document.createElement('style');
    style.textContent = `
        .nav-link {
            transition: transform 0.3s ease, color 0.3s ease, text-shadow 0.3s ease;
            position: relative;
        }
        
        .nav-link::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 50%;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #6366f1, #8b5cf6);
            transition: all 0.3s ease;
            transform: translateX(-50%);
        }
        
        .nav-link:hover::after {
            width: 100%;
        }
        
        .navbar-nav .nav-item:last-child .nav-link:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
        }
        
        @media (max-width: 992px) {
            .navbar-collapse {
                padding-top: 1rem;
                padding-bottom: 1rem;
                background: rgba(15, 23, 42, 0.95);
                backdrop-filter: blur(20px);
                border-radius: 10px;
                margin-top: 1rem;
            }
            
            .navbar-collapse .nav-item {
                margin-bottom: 0.5rem;
            }
            
            .navbar-collapse .nav-link {
                opacity: 0;
                transform: translateX(-20px);
                transition: opacity 0.3s ease, transform 0.3s ease;
            }
            
            .navbar-collapse.show .nav-link {
                opacity: 1;
                transform: translateX(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// Enhanced smooth scrolling for anchor links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Add active state to clicked link
                document.querySelectorAll('a[href^="#"]').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // Basic validation
        if (!data.name || !data.email || !data.message) {
            showNotification('Please fill in all required fields.', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address.', 'error');
            return;
        }
        
        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Simulate form submission (replace with actual form handling)
        setTimeout(() => {
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            this.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Enhanced notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element with enhanced styling
    const notification = document.createElement('div');
    notification.className = `notification notification-${type} alert alert-${type === 'error' ? 'danger' : type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 100px; 
        right: 20px; 
        z-index: 9999; 
        min-width: 350px; 
        border: none;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(10px);
    `;
    notification.innerHTML = `
        <div class="d-flex align-items-center">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
            <span>${message}</span>
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Enhanced animations with AI Workshop Series style
function initAnimations() {
    // Configuration for enhanced animations
    const animationConfig = {
        fadeUp: {
            opacity: [0, 1],
            transform: ['translateY(50px)', 'translateY(0)']
        },
        fadeDown: {
            opacity: [0, 1],
            transform: ['translateY(-50px)', 'translateY(0)']
        },
        fadeLeft: {
            opacity: [0, 1],
            transform: ['translateX(-50px)', 'translateX(0)']
        },
        fadeRight: {
            opacity: [0, 1],
            transform: ['translateX(50px)', 'translateX(0)']
        },
        zoomIn: {
            opacity: [0, 1],
            transform: ['scale(0.8)', 'scale(1)']
        },
        zoomOut: {
            opacity: [0, 1],
            transform: ['scale(1.2)', 'scale(1)']
        },
        slideUp: {
            opacity: [0, 1],
            transform: ['translateY(100px)', 'translateY(0)']
        }
    };

    // Enhanced Intersection Observer options
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const animationType = el.dataset.animate || 'fadeUp';
                const delay = parseInt(el.dataset.delay || '0');
                const duration = parseInt(el.dataset.duration || '800');
                
                if (animationType === 'stagger') {
                    // Handle staggered animations for children
                    Array.from(el.children).forEach((child, index) => {
                        const staggerDelay = delay + (index * 150);
                        animateElement(child, 'fadeUp', staggerDelay, duration);
                    });
                } else {
                    // Single element animation
                    animateElement(el, animationType, delay, duration);
                }
                
                // Only animate once
                observer.unobserve(el);
            }
        });
    }, observerOptions);
    
    // Enhanced helper function to animate an element
    function animateElement(element, type, delay, duration) {
        const animation = animationConfig[type] || animationConfig.fadeUp;
        
        element.style.opacity = '0';
        element.style.willChange = 'opacity, transform';
        
        setTimeout(() => {
            element.animate([
                { opacity: animation.opacity[0], transform: animation.transform[0] },
                { opacity: animation.opacity[1], transform: animation.transform[1] }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
                fill: 'forwards'
            });
            
            // Set final styles after animation
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = animation.transform[1];
                element.style.willChange = 'auto';
            }, duration);
        }, delay);
    }
    
    // Enhanced animation mapping for AI Workshop Series
    const animationMap = [
        { selector: '.hero-section h1', type: 'fadeUp', delay: 0 },
        { selector: '.hero-section p', type: 'fadeUp', delay: 300 },
        { selector: '.hero-section .btn', type: 'fadeUp', delay: 600 },
        { selector: '.card', type: 'fadeUp', delay: 200 },
        { selector: 'section h2', type: 'fadeUp', delay: 0 },
        { selector: 'section .lead', type: 'fadeUp', delay: 200 },
        { selector: '.row .col-md-3, .row .col-md-4, .row .col-lg-3, .row .col-lg-4', type: 'stagger', delay: 0 },
        { selector: '.glass-effect', type: 'fadeUp', delay: 100 },
        { selector: '.text-gradient-primary, .text-gradient-secondary', type: 'fadeUp', delay: 100 }
    ];
    
    animationMap.forEach(item => {
        document.querySelectorAll(item.selector).forEach(el => {
            if (!el.dataset.animate) {
                el.dataset.animate = item.type;
                el.dataset.delay = item.delay.toString();
                observer.observe(el);
            }
        });
    });
    
    // Also observe elements with explicit animation classes
    document.querySelectorAll('[data-animate]').forEach(el => {
        if (!el.dataset.animated) {
            el.dataset.animated = 'true';
            observer.observe(el);
        }
    });
}

// Parallax effects for AI Workshop Series
function initParallaxEffects() {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Typing effect for hero section
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-section h1');
    if (!heroTitle) return;
    
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.borderRight = '2px solid #6366f1';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                heroTitle.style.borderRight = 'none';
            }, 1000);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    if (!searchInput || !searchResults) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        const query = this.value.trim();
        
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        searchTimeout = setTimeout(() => {
            performSearch(query);
        }, 300);
    });
    
    // Close search results when clicking outside
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

// Perform search (placeholder function)
function performSearch(query) {
    const searchResults = document.getElementById('search-results');
    if (!searchResults) return;
    
    // This is a placeholder - implement actual search logic
    const results = [
        { title: 'Sample Result 1', url: '/sample1', excerpt: 'This is a sample search result...' },
        { title: 'Sample Result 2', url: '/sample2', excerpt: 'Another sample search result...' }
    ];
    
    if (results.length > 0) {
        searchResults.innerHTML = results.map(result => `
            <a href="${result.url}" class="dropdown-item">
                <h6 class="mb-1">${result.title}</h6>
                <small class="text-muted">${result.excerpt}</small>
            </a>
        `).join('');
        searchResults.style.display = 'block';
    } else {
        searchResults.innerHTML = '<div class="dropdown-item text-muted">No results found</div>';
        searchResults.style.display = 'block';
    }
}

// Utility functions
function debounce(func, wait) {
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

// Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.className = 'btn btn-primary position-fixed d-flex align-items-center justify-content-center';
    backToTopBtn.style.cssText = 'bottom: 20px; right: 20px; z-index: 1000; display: none; width: 50px; height: 50px; border-radius: 50%; box-shadow: 0 4px 12px rgba(0,0,0,0.15);';
    backToTopBtn.id = 'back-to-top';
    
    document.body.appendChild(backToTopBtn);
    
    // Function to check scroll position
    function checkScrollPosition() {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    }
    
    // Check initial position
    checkScrollPosition();
    
    // Add scroll listener
    window.addEventListener('scroll', () => {
        checkScrollPosition();
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize back to top button
initBackToTop();

// Theme toggle functionality - Default to dark theme like the beautiful original
function initThemeToggle() {
    // Create theme toggle button with better styling
    const themeToggleBtn = document.createElement('button');
    themeToggleBtn.className = 'theme-toggle';
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
    themeToggleBtn.ariaLabel = 'Toggle light mode';
    themeToggleBtn.title = 'Toggle theme (Light/Dark)';
    document.body.appendChild(themeToggleBtn);
    
    // Check for saved theme preference - default to dark theme like the original
    const savedTheme = localStorage.getItem('theme');
    
    // Apply theme based on preference - default to dark theme
    if (savedTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        themeToggleBtn.title = 'Switch to dark mode';
    } else {
        // Default to dark theme (like the beautiful original)
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        themeToggleBtn.title = 'Switch to light mode';
    }
    
    // Toggle theme with improved feedback
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'light') {
            // Switch to dark theme
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggleBtn.title = 'Switch to light mode';
        } else {
            // Switch to light theme
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
            themeToggleBtn.title = 'Switch to dark mode';
        }
        
        // Add visual feedback
        themeToggleBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            themeToggleBtn.style.transform = 'scale(1)';
        }, 200);
        
        // Animation effect for theme change
        const ripple = document.createElement('div');
        ripple.className = 'theme-toggle-ripple';
        document.body.appendChild(ripple);
        
        // Animate ripple
        setTimeout(() => {
            ripple.style.transform = 'scale(150)';
            ripple.style.opacity = '0';
            
            // Remove ripple
            setTimeout(() => {
                if (document.body.contains(ripple)) {
                    document.body.removeChild(ripple);
                }
            }, 1000);
        }, 10);
    });
    
    // Add ripple style
    const style = document.createElement('style');
    style.textContent = `
        .theme-toggle-ripple {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: var(--bg-primary);
            transform: scale(0);
            opacity: 0.5;
            z-index: 9999;
            pointer-events: none;
            transition: transform 1s ease, opacity 1s ease;
        }
        
        .theme-toggle {
            transition: all 0.3s ease, transform 0.2s ease !important;
        }
    `;
    document.head.appendChild(style);
    
    // Make sure the button is visible
    setTimeout(() => {
        themeToggleBtn.style.opacity = '1';
        themeToggleBtn.style.visibility = 'visible';
    }, 100);
}

// Page transitions - Improved for smoother navigation
function initPageTransitions() {
    // Only proceed if the browser supports the History API
    if (!window.history || !window.history.pushState) return;
    
    // Get all internal links
    const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"], a[href^="' + window.location.origin + '"]');
    
    internalLinks.forEach(link => {
        // Skip links with special attributes
        if (link.hasAttribute('download') || link.getAttribute('target') === '_blank' || link.getAttribute('data-no-transition')) {
            return;
        }
        
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip links to the current page
            if (href === window.location.pathname) {
                return;
            }
            
            e.preventDefault();
            
            // Add loading state to the clicked link
            this.style.pointerEvents = 'none';
            this.style.opacity = '0.7';
            
            // Smooth fade out
            document.body.style.opacity = '0.8';
            document.body.style.transition = 'opacity 0.2s ease-out';
            
            // Navigate after a brief delay
            setTimeout(() => {
                window.location.href = href;
            }, 150);
        });
    });
    
    // Smooth fade in on page load
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.3s ease-in';
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        document.body.style.opacity = '0.8';
        setTimeout(() => {
            window.location.reload();
        }, 100);
    });
}
