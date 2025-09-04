// Enhanced functionality for Chamal Modiin website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeSmoothScrolling();
    initializeAnimations();
    initializeImagePlaceholders();
    initializeAccessibility();
    initializePerformance();
    initializeGallery();
});

// Navigation functionality
function initializeNavigation() {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('.nav-link, nav a');
    
    // Add scroll effect to navigation
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            nav.classList.add('shadow-lg');
            nav.classList.add('bg-white/95');
            nav.classList.add('backdrop-blur-sm');
        } else {
            nav.classList.remove('shadow-lg');
            nav.classList.remove('bg-white/95');
            nav.classList.remove('backdrop-blur-sm');
        }
    });
    
    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scrolling functionality
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Animation functionality
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.card-hover, .bg-white, .bg-gray-50');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}


// Image placeholder functionality
function initializeImagePlaceholders() {
    const placeholders = document.querySelectorAll('.image-placeholder');
    
    placeholders.forEach(placeholder => {
        // Add click handler for image upload (placeholder)
        placeholder.addEventListener('click', function() {
            if (this.textContent.includes('תמונת')) {
                showNotification('תמונות יועלו בקרוב', 'info');
            }
        });
        
        // Add hover effect
        placeholder.addEventListener('mouseenter', function() {
            this.style.cursor = 'pointer';
            this.style.opacity = '0.8';
        });
        
        placeholder.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });
}

// Accessibility functionality
function initializeAccessibility() {
    // Skip to main content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'דלג לתוכן הראשי';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 bg-blue-600 text-white px-4 py-2 rounded z-50';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content id
    const mainContent = document.querySelector('main') || document.querySelector('#home');
    if (mainContent) {
        mainContent.id = 'main-content';
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Escape key to close dropdowns
        if (e.key === 'Escape') {
            const dropdowns = document.querySelectorAll('el-dropdown');
            dropdowns.forEach(dropdown => {
                // Close dropdown logic would go here
            });
        }
    });
}

// Performance optimization
function initializePerformance() {
    // Lazy loading for images (when they're added)
    if ('IntersectionObserver' in window) {
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
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
    
    // Preload critical resources
    const criticalResources = [
        'https://fonts.googleapis.com/css2?family=Heebo:wght@400;600;700&display=swap'
    ];
    
    criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource;
        link.as = 'style';
        document.head.appendChild(link);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm transform transition-all duration-300 translate-x-full`;
    
    // Set notification content and style based on type
    const colors = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-black',
        info: 'bg-blue-500 text-white'
    };
    
    notification.className += ` ${colors[type] || colors.info}`;
    notification.textContent = message;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Click to dismiss
    notification.addEventListener('click', function() {
        this.classList.add('translate-x-full');
        setTimeout(() => {
            if (this.parentNode) {
                this.parentNode.removeChild(this);
            }
        }, 300);
    });
}

// Form validation (for future forms)
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.classList.add('border-red-500');
            
            // Remove error class after user starts typing
            input.addEventListener('input', function() {
                this.classList.remove('border-red-500');
            });
        }
    });
    
    return isValid;
}

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData = {}) {
    // Placeholder for analytics tracking
    console.log('Event tracked:', eventName, eventData);
    
    // Example implementation with Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

    // Gallery functionality
    function initializeGallery() {
        const loadMoreBtn = document.getElementById('loadMoreGallery');
        const additionalGallery = document.getElementById('additionalGallery');
        const moreGallery = document.getElementById('moreGallery');
        const evenMoreGallery = document.getElementById('evenMoreGallery');
        
        // Use a global variable to track state
        window.galleryLevel = window.galleryLevel || 0;
        
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Show loading state
                this.disabled = true;
                
                setTimeout(() => {
                    if (window.galleryLevel === 0 && additionalGallery) {
                        additionalGallery.style.display = 'grid';
                        additionalGallery.style.opacity = '0';
                        setTimeout(() => { additionalGallery.style.opacity = '1'; }, 50);
                        window.galleryLevel = 1;
                        
                    } else if (window.galleryLevel === 1 && moreGallery) {
                        moreGallery.style.display = 'grid';
                        moreGallery.style.opacity = '0';
                        setTimeout(() => { moreGallery.style.opacity = '1'; }, 50);
                        window.galleryLevel = 2;
                        
                    } else if (window.galleryLevel === 2 && evenMoreGallery) {
                        evenMoreGallery.style.display = 'grid';
                        evenMoreGallery.style.opacity = '0';
                        setTimeout(() => { evenMoreGallery.style.opacity = '1'; }, 50);
                        window.galleryLevel = 3;
                        
                    } else if (window.galleryLevel === 3) {
                        if (additionalGallery) additionalGallery.style.display = 'none';
                        if (moreGallery) moreGallery.style.display = 'none';
                        if (evenMoreGallery) evenMoreGallery.style.display = 'none';
                        window.galleryLevel = 0;
                    }
                    
                    this.disabled = false;
                }, 500);
            });
        }
        
        // Add click handlers for gallery images
        const galleryImages = document.querySelectorAll('#gallery img');
        galleryImages.forEach(img => {
            img.addEventListener('click', function() {
                // Create simple lightbox effect
                createImageLightbox(this.src, this.alt);
            });
        });
    }
    
    // Simple lightbox function
    function createImageLightbox(imageSrc, imageAlt) {
        // Create lightbox overlay
        const lightbox = document.createElement('div');
        lightbox.className = 'fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4';
        lightbox.style.cursor = 'pointer';
        
        // Create image
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = imageAlt;
        img.className = 'max-w-full max-h-full object-contain rounded-lg';
        
        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.className = 'absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 hover:bg-opacity-75 transition-colors';
        
        // Add elements to lightbox
        lightbox.appendChild(img);
        lightbox.appendChild(closeBtn);
        
        // Close handlers
        const closeLightbox = () => {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
        };
        
        lightbox.addEventListener('click', closeLightbox);
        closeBtn.addEventListener('click', closeLightbox);
        
        // Prevent image click from closing lightbox
        img.addEventListener('click', (e) => e.stopPropagation());
        
        // Add to page
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Add escape key handler
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }
    
    // Image format conversion helper
    function convertImageFormat(inputFile, outputFormat = 'jpg', quality = 0.8) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            
            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                canvas.toBlob((blob) => {
                    resolve(blob);
                }, `image/${outputFormat}`, quality);
            };
            
            img.onerror = reject;
            img.src = URL.createObjectURL(inputFile);
        });
    }
    
    // Export functions for use in other scripts
    window.ChamalModiin = {
        showNotification,
        trackEvent,
        validateForm,
        debounce,
        throttle,
        convertImageFormat
    };
