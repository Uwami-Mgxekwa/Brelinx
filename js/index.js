// ========================================
// Theme Toggle Functionality
// ========================================

const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);

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

function updateThemeIcon(theme) {
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
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
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
// Contact Form Handling
// ========================================

const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (name && email && message) {
        // Format WhatsApp message
        const whatsappMessage = `Hi, my name is ${name}. Email: ${email}. Message: ${message}`;
        const encodedMessage = encodeURIComponent(whatsappMessage);
        const whatsappUrl = `https://wa.me/27785002274?text=${encodedMessage}`;

        // Open WhatsApp
        window.open(whatsappUrl, '_blank');

        // Show success notification
        showNotification('Redirecting to WhatsApp...', 'success');

        // Reset form
        contactForm.reset();
    } else {
        showNotification('Please fill in all fields', 'error');
    }
});

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
        console.log(`Copyright year automatically updated to ${currentYear}`);
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
chatbotButton.addEventListener('click', () => {
    chatbotButton.classList.toggle('active');
    chatbotContainer.classList.toggle('active');
    if (chatbotContainer.classList.contains('active')) {
        chatbotInput.focus();
    }
});

// Close chatbot when clicking outside
document.addEventListener('click', (e) => {
    if (!chatbotContainer.contains(e.target) && !chatbotButton.contains(e.target)) {
        chatbotButton.classList.remove('active');
        chatbotContainer.classList.remove('active');
    }
});

// Knowledge base
const knowledgeBase = {
    greetings: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
    services: ['service', 'services', 'what do you do', 'what can you do', 'offerings'],
    website: ['website', 'web development', 'web design', 'site', 'online presence'],
    software: ['software', 'development', 'application', 'custom software'],
    mobile: ['mobile', 'android', 'ios', 'app', 'mobile app'],
    coaching: ['coaching', 'learn', 'teach', 'programming', 'code', 'training', 'tutor'],
    assignment: ['assignment', 'homework', 'help', 'project', 'study', 'university'],
    cloud: ['cloud', 'aws', 'azure', 'hosting', 'cloud solutions'],
    security: ['security', 'cybersecurity', 'protect', 'secure'],
    contact: ['contact', 'phone', 'email', 'reach', 'call', 'whatsapp'],
    pricing: ['price', 'cost', 'how much', 'pricing', 'rates', 'fee'],
    location: ['where', 'location', 'address', 'office'],
    about: ['about', 'who are you', 'company', 'brelinx'],
    faq: ['faq', 'questions', 'frequently asked', 'common questions'],
    nationwide: ['nationwide', 'south africa', 'all provinces', 'country', 'national']
};

const responses = {
    greetings: "Hello! 👋 Welcome to Brelinx. I'm here to help you with any questions about our IT services across South Africa. What would you like to know?",

    services: "We offer comprehensive business IT services nationwide:\n\n🌐 Website Development\n🖥️ Custom Software Development\n📱 Mobile Applications\n☁️ Cloud Solutions\n🔒 Cybersecurity\n💾 Data Management & Analytics\n🛠️ IT Support 24/7\n🔧 System Integration\n📈 Digital Transformation\n\n🎓 Looking for programming coaching? Visit our Student Portal: brelinx.com/coaching.html\n\nWhich business service interests you?",

    website: "Our Website Development services include:\n\n🌐 Professional, responsive websites\n🌐 Brand showcase design\n🌐 Business growth focused\n🌐 Mobile-optimized\n🌐 SEO-friendly\n\nWe create websites that drive business growth online. Ready to build your online presence?",

    software: "Our Software Development services include:\n\n✨ Custom software solutions\n✨ Web applications\n✨ Enterprise systems\n✨ API development\n✨ System integration\n\nWe design solutions tailored to streamline your business operations and drive growth. Would you like to discuss your project?",

    mobile: "We build exceptional Mobile Applications:\n\n� Natnive iOS & Android apps\n�  Cross-platform solutions\n� U‍ser-friendly interfaces\n📱 Performance optimized\n\nWe create apps that deliver outstanding user experiences. Interested in building an app?",

    coaching: "🎓 Programming Coaching is now on our dedicated Student Portal!\n\nVisit: brelinx.com/coaching.html for:\n\n👨‍💻 One-on-one online sessions\n👨‍💻 Personalized learning pace\n👨‍💻 Languages: Python, JavaScript, Java, React, SQL, HTML/CSS\n👨‍💻 Beginner to advanced levels\n👨‍💻 Real-world projects\n👨‍💻 Flexible scheduling\n👨‍💻 Student-friendly pricing\n\nReady to start your coding journey?",

    assignment: "📚 Assignment Help is available on our Student Portal!\n\nVisit: brelinx.com/coaching.html for:\n\n📚 Understanding complex concepts\n📚 Code debugging & optimization\n📚 Project completion support\n📚 Exam preparation\n📚 Portfolio projects\n📚 Student-friendly rates\n\nWe help you learn and complete your work with confidence. Need help with an assignment?",

    cloud: "Our Cloud Solutions include:\n\n☁️ Cloud infrastructure setup\n☁️ Migration services\n☁️ AWS, Azure, Google Cloud\n☁️ Scalable architecture\n☁️ Cost optimization\n\nTransform your business with modern cloud technology!",

    security: "Cybersecurity Services:\n\n� Secu+rity audits\n🔒 Threat monitoring\n🔒 Data protection\n🔒 Compliance support\n🔒 Incident response\n\nProtect your business with comprehensive security solutions!",

    contact: "Get in touch with us:\n\n📞 Phone: +27 63 572 2080\n💬 WhatsApp: +27 78 500 2274\n�  Location: The Glen Road, Johannesburg, GP 2090\n\nWe serve clients across South Africa! You can also fill out our contact form on the website. How would you prefer to reach us?",

    pricing: "Our pricing varies based on:\n\n💰 Project scope and complexity\n💰 Service type\n💰 Timeline\n💰 Support requirements\n\nFor coaching: We offer flexible hourly rates.\nFor businesses: Competitive rates across South Africa.\n\nContact us for a personalized quote! Would you like to discuss your specific needs?",

    location: "We're located at:\n\n📍 The Glen Road\nJohannesburg, GP 2090\nSouth Africa 🇿🇦\n\nWe serve clients nationwide across South Africa with online services. Visit our Contact section for the map!",

    about: "Brelinx is your trusted business IT partner across South Africa! 🚀\n\nWe're passionate about delivering innovative IT services and software solutions that transform businesses nationwide.\n\n✅ 100+ Business Projects Completed\n✅ 50+ Enterprise Clients\n✅ 24/7 Business Support Available\n✅ 6+ Years Industry Experience\n\n🎓 Students: Visit brelinx.com/coaching.html for programming coaching!\n\nOur commitment to excellence and customer satisfaction sets us apart. What would you like to know more about?",

    faq: "Check out our FAQ section for common questions about:\n\n❓ IT services across South Africa\n❓ Programming coaching for students\n❓ Software development pricing\n❓ Working with small businesses\n❓ University assignment help\n❓ What makes us different\n\nYou can find detailed answers in the FAQ section on our website!",

    nationwide: "Yes! We provide services nationwide across South Africa:\n\n🇿🇦 All provinces covered\n🇿🇦 Remote online services\n🇿🇦 Local support from Johannesburg\n🇿🇦 Flexible scheduling for all time zones\n\nWhether you're in Cape Town, Durban, Pretoria, or anywhere in SA - we're here to help!",

    default: "I'm here to help with business IT services! I can answer questions about:\n\n• Professional IT services\n• Website & software development\n• Mobile applications\n• Cloud solutions & cybersecurity\n• Business pricing & consultations\n• Nationwide service coverage\n\n🎓 Students: Visit brelinx.com/coaching.html for programming coaching!\n\nWhat would you like to know? Or chat with us directly on WhatsApp!"
};

// Find best match
function findBestMatch(userMessage) {
    const message = userMessage.toLowerCase();

    for (const [category, keywords] of Object.entries(knowledgeBase)) {
        if (keywords.some(keyword => message.includes(keyword))) {
            return category;
        }
    }

    return 'default';
}

// Add message to chat
function addMessage(message, isUser = false) {
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

// Remove typing indicator
function removeTyping() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}

// Handle user message
function handleUserMessage(message) {
    if (!message.trim()) return;

    // Add user message
    addMessage(message, true);
    chatbotInput.value = '';

    // Show typing
    showTyping();

    // Simulate thinking delay
    setTimeout(() => {
        removeTyping();
        const category = findBestMatch(message);
        const response = responses[category];
        addMessage(response);

        // Add quick replies after certain responses
        if (category === 'services' || category === 'default') {
            addQuickReplies();
        }
    }, 1000 + Math.random() * 1000);
}

// Add quick replies
function addQuickReplies() {
    const lastMessage = chatbotMessages.lastElementChild;
    if (lastMessage && lastMessage.classList.contains('bot')) {
        const quickRepliesDiv = document.createElement('div');
        quickRepliesDiv.className = 'quick-replies';
        quickRepliesDiv.innerHTML = `
            <button class="quick-reply-btn" data-message="Tell me about programming coaching">Coaching</button>
            <button class="quick-reply-btn" data-message="How can I contact you?">Contact</button>
            <button class="quick-reply-btn" data-message="What are your prices?">Pricing</button>
        `;

        const messageContent = lastMessage.querySelector('.message-content') || lastMessage.lastElementChild;
        messageContent.parentElement.appendChild(quickRepliesDiv);

        // Add event listeners to new quick reply buttons
        quickRepliesDiv.querySelectorAll('.quick-reply-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                handleUserMessage(btn.dataset.message);
            });
        });
    }
}

// Send message
chatbotSend.addEventListener('click', () => {
    handleUserMessage(chatbotInput.value);
});

// Send on Enter
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserMessage(chatbotInput.value);
    }
});

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

            console.log(`Hero video ${index + 1} found (${isMobile ? 'mobile' : 'desktop'} version)`);

            // Optimize video loading
            heroVideo.preload = 'metadata'; // Changed from 'auto' for better performance

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
                console.log(`Hero video ${index + 1} loading started`);
            });

            heroVideo.addEventListener('canplay', () => {
                console.log(`Hero video ${index + 1} can play`);
                // Start playing as soon as possible
                heroVideo.play().catch(e => {
                    // Ignore AbortError which is common when scrubbing/loading
                    if (e.name !== 'AbortError') {
                        console.log(`Hero video ${index + 1} autoplay failed:`, e);
                    }
                });
            });

            heroVideo.addEventListener('loadeddata', () => {
                console.log(`Hero video ${index + 1} data loaded`);
                heroVideo.style.opacity = '1';
                heroVideo.style.transition = 'opacity 0.5s ease';
                heroVideo.setAttribute('data-loaded', 'true');
            });

            // Handle video loading errors gracefully
            heroVideo.addEventListener('error', (e) => {
                console.log(`Hero video ${index + 1} loading error:`, e);
                console.log(`Hero video ${index + 1} error details:`, heroVideo.error);
                // Show fallback if video fails to load
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
                    heroVideo.play().catch(e => {
                        console.log(`Hero video ${index + 1} autoplay prevented:`, e);
                    });
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
                                if (e.name !== 'AbortError') console.log(`Hero video ${index + 1} play failed:`, e);
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
        console.log('Video element found');

        // Disable picture-in-picture
        brandVideo.disablePictureInPicture = true;

        // Prevent PiP from being triggered
        brandVideo.addEventListener('enterpictureinpicture', (e) => {
            e.preventDefault();
            document.exitPictureInPicture();
        });

        // Debug video loading
        brandVideo.addEventListener('loadstart', () => {
            console.log('Video loading started');
        });

        brandVideo.addEventListener('canplay', () => {
            console.log('Video can play');
        });

        brandVideo.addEventListener('loadeddata', () => {
            console.log('Video data loaded');
            brandVideo.style.opacity = '1';
        });

        // Handle video loading errors
        brandVideo.addEventListener('error', (e) => {
            console.log('Video loading error:', e);
            console.log('Video error details:', brandVideo.error);
            // Show fallback if video fails to load
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
                brandVideo.play().catch(e => {
                    console.log('Video autoplay prevented:', e);
                });
            };

            // Try to play video on user interaction
            document.addEventListener('touchstart', playVideo, { once: true });
            document.addEventListener('click', playVideo, { once: true });
        }

        // Handle video loading errors
        brandVideo.addEventListener('error', (e) => {
            console.log('Video loading error:', e);
            // Show fallback if video fails to load
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
                        if (e.name !== 'AbortError') console.log('Play failed:', e);
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
                // Handle image loading error
                console.warn('Image failed to load:', img.src);
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
            console.warn('Image failed to load:', this.src);
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

        // Debug hero image loading
        console.log('Hero image found:', img.src);

        // Force load if not loaded
        if (!img.complete) {
            console.log('Hero image not complete, forcing load...');
            img.onload = () => {
                console.log('Hero image loaded successfully');
                img.style.opacity = '1';
                img.style.display = 'block';
                img.style.transition = 'opacity 0.3s ease';
            };
            img.onerror = () => {
                console.error('Hero image failed to load:', img.src);
            };
        } else {
            console.log('Hero image already loaded');
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

        console.log(`Image loading performance: ${loadedImages}/${images.length} images loaded`);
    });
}

// ========================================
// Basic Source Code Protection (Ctrl+U only)
// ========================================

// Disable key combinations for viewing source
document.addEventListener('keydown', function (e) {
    // Only disable Ctrl+U (View Source)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
    }
});

// Prevent iframe embedding (clickjacking protection)
if (window.top !== window.self) {
    window.top.location = window.self.location;
}