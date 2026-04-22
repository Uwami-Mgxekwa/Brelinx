// ========================================
// Theme Toggle Functionality
// ========================================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);

        // Add animation to theme toggle button
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });
}

function updateThemeIcon(theme) {
    if (!themeIcon) return; // Guard clause
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// ========================================
// Mobile Menu Toggle
// ========================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Prevent scrolling when menu is open
        if (navMenu.classList.contains('active')) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto';
        }
    });
}

// Close menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = 'auto';
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (hamburger && navMenu && !hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        body.style.overflow = 'auto';
    }
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
// Header Scroll Effect
// ========================================

const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    if (!header) return; // Guard clause
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ========================================
// Intersection Observer for Animations
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe contact items
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`;
    observer.observe(item);
});

// ========================================
// Contact Form Handling with EmailJS
// ========================================

const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');

if (contactForm && submitBtn) {
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const message = document.getElementById('message').value;

        if (name && email && phone && message) {
            // Show loading state
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-block';
            formStatus.style.display = 'none';

            // Get current time
            const now = new Date();
            const time = now.toLocaleString('en-ZA', {
                dateStyle: 'medium',
                timeStyle: 'short'
            });

            // EmailJS template parameters
            const templateParams = {
                name: name,
                email: email,
                phone: phone,
                message: message,
                time: time
            };

            // Send email using EmailJS
            emailjs.send('service_swdllg9', 'template_m749al5', templateParams)
                .then((response) => {
                    
                    // Show success message
                    formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Message sent successfully! We\'ll get back to you soon.';
                    formStatus.className = 'form-status success';
                    formStatus.style.display = 'block';
                    
                    // Show success notification
                    showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
                    
                    // Reset form
                    contactForm.reset();
                    
                    // Reset button state
                    submitBtn.disabled = false;
                    btnText.style.display = 'inline-block';
                    btnLoading.style.display = 'none';
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                })
                .catch((error) => {
                    
                    // Show error message
                    formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Failed to send message. Please try again or contact us via WhatsApp.';
                    formStatus.className = 'form-status error';
                    formStatus.style.display = 'block';
                    
                    // Show error notification
                    showNotification('Failed to send message. Please try again.', 'error');
                    
                    // Reset button state
                    submitBtn.disabled = false;
                    btnText.style.display = 'inline-block';
                    btnLoading.style.display = 'none';
                });
        } else {
            formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please fill in all fields.';
            formStatus.className = 'form-status error';
            formStatus.style.display = 'block';
            showNotification('Please fill in all fields', 'error');
        }
    });
}

// ========================================
// Notification System
// ========================================

function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2d8a5f' : '#dc3545'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ========================================
// Active Nav Link on Scroll
// ========================================

const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active-link'));
            if (navLink) {
                navLink.classList.add('active-link');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// Add active link styles
const activeStyle = document.createElement('style');
activeStyle.textContent = `
    .nav-link.active-link {
        color: var(--primary-color);
    }
    
    .nav-link.active-link::after {
        width: 100%;
    }
`;
document.head.appendChild(activeStyle);

// ========================================
// Stats Counter Animation
// ========================================

const stats = document.querySelectorAll('.stat-item h3');
let hasAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            stats.forEach(stat => {
                const target = stat.textContent;
                const isNumber = !isNaN(parseInt(target));

                if (isNumber) {
                    const targetNumber = parseInt(target);
                    animateCounter(stat, 0, targetNumber, 2000);
                }
            });
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

function animateCounter(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// ========================================
// Form Input Animations
// ========================================

const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function () {
        this.parentElement.style.transform = 'scale(1.02)';
    });

    input.addEventListener('blur', function () {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// ========================================
// Loading Animation
// ========================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// Logo Text Selection Prevention (Optional)
// ========================================

const logoText = document.querySelectorAll('.logo-text');
logoText.forEach(logo => {
    logo.addEventListener('selectstart', (e) => {
        e.preventDefault();
    });
});

// ========================================
// Testimonials Animation
// ========================================

const testimonialCards = document.querySelectorAll('.testimonial-card');

testimonialCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// ========================================
// Automatic Copyright Year Update
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }
});

// ========================================
// Console Message
// ========================================

console.log('%c🌐 Brelinx Website', 'color: #2d8a5f; font-size: 20px; font-weight: bold;');
console.log('%cDeveloped with ❤️ for Brelinx IT Services', 'color: #4a4a4a; font-size: 12px;');

// ========================================
// Chatbot Functionality
// ========================================

const chatbotButton = document.getElementById('chatbotButton');
const chatbotContainer = document.getElementById('chatbotContainer');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');

// Toggle chatbot
if (chatbotButton) {
    chatbotButton.addEventListener('click', () => {
        chatbotButton.classList.toggle('active');
        chatbotContainer.classList.toggle('active');
        if (chatbotContainer.classList.contains('active') && chatbotInput) {
            chatbotInput.focus();
        }
    });
}

// Close chatbot when clicking outside
document.addEventListener('click', (e) => {
    if (chatbotContainer && chatbotButton &&
        !chatbotContainer.contains(e.target) &&
        !chatbotButton.contains(e.target)) {
        chatbotButton.classList.remove('active');
        chatbotContainer.classList.remove('active');
    }
});

// Find best match using knowledgeBase from chatbot-responses.js
function findBestMatch(userMessage) {
    const message = userMessage.toLowerCase().trim();

    // Check multi-word phrases first (longer matches take priority)
    const sorted = Object.entries(knowledgeBase).sort((a, b) => {
        const aMax = Math.max(...a[1].map(k => k.length));
        const bMax = Math.max(...b[1].map(k => k.length));
        return bMax - aMax;
    });

    for (const [category, keywords] of sorted) {
        if (keywords.some(keyword => message.includes(keyword))) {
            return category;
        }
    }
    return 'default';
}

// Add message to chat
function addMessage(message, isUser = false) {
    if (!chatbotMessages) return;
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = isUser ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';

    const content = document.createElement('div');
    content.className = 'message-content';
    content.textContent = message;
    content.style.whiteSpace = 'pre-line';

    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Show typing indicator
function showTyping() {
    if (!chatbotMessages) return;
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typing-indicator';

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = '<i class="fas fa-robot"></i>';

    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';

    typingDiv.appendChild(avatar);
    typingDiv.appendChild(indicator);
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function removeTyping() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}

// Handle user message
function handleUserMessage(message) {
    if (!message || !message.trim()) return;
    addMessage(message, true);
    if (chatbotInput) chatbotInput.value = '';
    showTyping();

    setTimeout(() => {
        removeTyping();
        const category = findBestMatch(message);
        const response = responses[category] || responses['default'];
        addMessage(response);
        if (category === 'services' || category === 'default' || category === 'greetings') {
            addQuickReplies();
        }
    }, 800 + Math.random() * 700);
}

// Add quick replies
function addQuickReplies() {
    if (!chatbotMessages) return;
    const lastMessage = chatbotMessages.lastElementChild;
    if (lastMessage && lastMessage.classList.contains('bot')) {
        const quickRepliesDiv = document.createElement('div');
        quickRepliesDiv.className = 'quick-replies';
        quickRepliesDiv.innerHTML = `
            <button class="quick-reply-btn" data-message="Tell me about coaching">Coaching</button>
            <button class="quick-reply-btn" data-message="What are your prices?">Pricing</button>
            <button class="quick-reply-btn" data-message="How can I contact you?">Contact</button>
            <button class="quick-reply-btn" data-message="Show me your portfolio">Portfolio</button>
        `;
        const messageContent = lastMessage.querySelector('.message-content') || lastMessage.lastElementChild;
        messageContent.parentElement.appendChild(quickRepliesDiv);
        quickRepliesDiv.querySelectorAll('.quick-reply-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                handleUserMessage(btn.dataset.message);
            });
        });
    }
}

// Send message
if (chatbotSend) {
    chatbotSend.addEventListener('click', () => {
        handleUserMessage(chatbotInput.value);
    });
}

// Send on Enter
if (chatbotInput) {
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage(chatbotInput.value);
        }
    });
}

// Initialize event listeners for initial quick reply buttons
document.addEventListener('DOMContentLoaded', () => {
    const initialQuickReplies = document.querySelectorAll('.quick-reply-btn');
    initialQuickReplies.forEach(btn => {
        btn.addEventListener('click', () => {
            handleUserMessage(btn.dataset.message);
        });
    });
});

// Quick reply buttons - handled by individual event listeners in addQuickReplies function

// ========================================
// Hero Background Video Controls & iOS Optimization
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const heroVideos = document.querySelectorAll('.hero-bg-video');

    // Detect if user is on mobile
    const isMobile = window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    heroVideos.forEach((heroVideo, index) => {
        if (heroVideo) {
            // Check if this video should be shown on current device
            const isDesktopVideo = heroVideo.classList.contains('desktop-video');
            const isMobileVideo = heroVideo.classList.contains('mobile-video');

            // Skip processing if video shouldn't be shown on current device
            if ((isMobile && isDesktopVideo) || (!isMobile && isMobileVideo)) {
                return;
            }

            // Optimize video loading
            heroVideo.preload = 'metadata';

            // Disable picture-in-picture
            heroVideo.disablePictureInPicture = true;

            // Prevent PiP from being triggered
            heroVideo.addEventListener('enterpictureinpicture', (e) => {
                e.preventDefault();
                if (document.exitPictureInPicture) {
                    document.exitPictureInPicture();
                }
            });

            // Ensure video is always muted (required for autoplay)
            heroVideo.muted = true;
            heroVideo.defaultMuted = true;

            // Set volume to 0 as additional safety
            heroVideo.volume = 0;

            // Optimized loading events
            heroVideo.addEventListener('loadstart', () => {
            });

            heroVideo.addEventListener('canplay', () => {
                heroVideo.play().catch(e => {
                    if (e.name !== 'AbortError') {
                        // autoplay failed silently
                    }
                });
            });

            heroVideo.addEventListener('loadeddata', () => {
                heroVideo.style.opacity = '1';
                heroVideo.style.transition = 'opacity 0.5s ease';
                heroVideo.setAttribute('data-loaded', 'true');
            });

            // Handle video loading errors gracefully
            heroVideo.addEventListener('error', (e) => {
                const fallback = heroVideo.parentElement.querySelector('.video-fallback');
                if (fallback) {
                    fallback.style.display = 'block';
                    heroVideo.style.display = 'none';
                }
            });

            // iOS-specific video handling
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

            if (isIOS) {
                // Force video to load on iOS
                heroVideo.load();

                // Handle iOS autoplay restrictions
                const playVideo = () => {
                    heroVideo.play().catch(() => {});
                };

                // Try to play video on user interaction
                document.addEventListener('touchstart', playVideo, { once: true });
                document.addEventListener('click', playVideo, { once: true });
            }

            // Ensure video plays when in viewport (for performance)
            const heroVideoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (entry.isIntersecting) {
                            heroVideo.play().catch(e => {
                                if (e.name !== 'AbortError') { /* play failed silently */ }
                            });
                        }
                    }
                    // Don't pause hero videos as they should always play when visible
                });
            }, { threshold: 0.1 });

            heroVideoObserver.observe(heroVideo);

            // Preload video metadata for faster startup
            setTimeout(() => {
                if (heroVideo.readyState < 1) {
                    heroVideo.load();
                }
            }, 100);
        }
    });
});

// ========================================
// Brand Video Controls & iPhone Optimization
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    const brandVideo = document.querySelector('.brand-video');

    if (brandVideo) {
        // Disable picture-in-picture
        brandVideo.disablePictureInPicture = true;

        // Prevent PiP from being triggered
        brandVideo.addEventListener('enterpictureinpicture', (e) => {
            e.preventDefault();
            document.exitPictureInPicture();
        });

        // Video loading events
        brandVideo.addEventListener('loadstart', () => {
        });

        brandVideo.addEventListener('canplay', () => {
        });

        brandVideo.addEventListener('loadeddata', () => {
            brandVideo.style.opacity = '1';
        });

        brandVideo.addEventListener('error', (e) => {
            const fallback = document.querySelector('.video-fallback');
            if (fallback) {
                fallback.style.display = 'flex';
                brandVideo.style.display = 'none';
            }
        });

        // iPhone-specific video handling
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        if (isIOS) {
            // Force video to load on iOS
            brandVideo.load();

            // Handle iOS autoplay restrictions
            const playVideo = () => {
                brandVideo.play().catch(() => {});
            };

            // Try to play video on user interaction
            document.addEventListener('touchstart', playVideo, { once: true });
            document.addEventListener('click', playVideo, { once: true });
        }

        brandVideo.addEventListener('error', (e) => {
            const fallback = document.querySelector('.video-fallback');
            if (fallback) {
                fallback.style.display = 'flex';
                brandVideo.style.display = 'none';
            }
        });

        // Optimize video performance
        brandVideo.addEventListener('loadeddata', () => {
            // Video is ready to play
            brandVideo.style.opacity = '1';
        });

        // Pause video when not in viewport (performance optimization)
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    brandVideo.play().catch(e => {
                        if (e.name !== 'AbortError') { /* play failed silently */ }
                    });
                } else {
                    brandVideo.pause();
                }
            });
        }, { threshold: 0.5 });

        videoObserver.observe(brandVideo);
    }
});
// ========================================
// FAQ Functionality
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
            } else {
                item.classList.add('active');
            }
        });
    });
});
// Enhanced Image Loading & Protection with Performance Optimization
// ========================================

// Basic keyboard protection (only Ctrl+S save)
document.addEventListener('keydown', function (e) {
    // Only disable Ctrl+S (save)
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        return false;
    }
});

// Optimized lazy loading with intersection observer
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;

            // Preload the image for smoother loading
            const imageLoader = new Image();
            imageLoader.onload = () => {
                // Image loaded successfully, show it
                img.style.opacity = '1';
                img.style.background = 'transparent';
                img.classList.add('loaded');

                // Add smooth transition
                img.style.transition = 'opacity 0.3s ease';
            };

            imageLoader.onerror = () => {
                img.style.opacity = '0.5';
                img.alt = 'Image unavailable';
            };

            // Start loading the image
            imageLoader.src = img.src;

            // Basic protection
            img.draggable = false;

            // Stop observing this image
            observer.unobserve(img);
        }
    });
}, {
    // Start loading when image is 50px away from viewport
    rootMargin: '50px 0px',
    threshold: 0.1
});

// Enhanced image loading with immediate fallback
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');

    // Immediate fallback for critical images
    setTimeout(() => {
        lazyImages.forEach(img => {
            if (!img.classList.contains('loaded')) {
                img.style.opacity = '1';
                img.style.background = 'transparent';
                img.classList.add('loaded');
                img.draggable = false;
                img.style.transition = 'opacity 0.3s ease';
            }
        });
    }, 500); // Reduced fallback time for better performance

    lazyImages.forEach(img => {
        // Make sure images are visible by default
        img.style.opacity = '1';
        img.style.background = 'transparent';
        img.draggable = false;

        // Use intersection observer for optimization
        imageObserver.observe(img);
    });

    // Basic protection for all images (including hero images)
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.draggable = false;
        img.style.background = 'transparent';

        // Add error handling for all images
        img.addEventListener('error', function () {
            this.style.opacity = '0.5';
            this.alt = 'Image unavailable';
        });

        // Add load event for smooth appearance
        img.addEventListener('load', function () {
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.3s ease';
        });
    });

    // Ensure hero images are always visible (they have loading="eager")
    const heroImages = document.querySelectorAll('.hero-illustration');
    heroImages.forEach(img => {
        img.style.opacity = '1';
        img.style.background = 'transparent';
        img.style.display = 'block';
        img.draggable = false;

        // Force load if not loaded
        if (!img.complete) {
            img.onload = () => {
                img.style.opacity = '1';
                img.style.display = 'block';
                img.style.transition = 'opacity 0.3s ease';
            };
        }
    });
});

// Optimized preloading for critical images
document.addEventListener('DOMContentLoaded', () => {
    // Preload hero image if not already loaded
    const heroImg = document.querySelector('.hero-illustration');
    if (heroImg && !heroImg.complete) {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = 'image';
        preloadLink.href = heroImg.src;
        document.head.appendChild(preloadLink);
    }

    // Preload portfolio images for better performance
    const portfolioImages = document.querySelectorAll('.portfolio-image img');
    portfolioImages.forEach((img, index) => {
        // Preload first 3 portfolio images
        if (index < 3 && !img.complete) {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'image';
            preloadLink.href = img.src;
            document.head.appendChild(preloadLink);
        }
    });
});

// Performance monitoring with reduced logging
if ('performance' in window) {
    window.addEventListener('load', () => {
        // Log image loading performance (reduced logging)
        const images = document.querySelectorAll('img');
        const loadedImages = Array.from(images).filter(img => img.complete).length;
        // image loading performance tracked silently
    });
}

// ========================================
// Basic Source Code Protection (Ctrl+U only)
// ========================================

// Disable key combinations for viewing source
document.addEventListener('keydown', function (e) {
    // Only disable Ctrl+U (View Source)
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
        return false;
    }
    
    // Disable F12 (DevTools)
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    
    // Disable Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (Inspect/Console)
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        return false;
    }
});

// Disable right-click context menu
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
});

// Prevent iframe embedding (clickjacking protection)
if (window.top !== window.self) {
    window.top.location = window.self.location;
}