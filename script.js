// ===================================
// Cybersecurity Portfolio - JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    // Typing Animation
    initTypingAnimation();
    
    // Smooth Scrolling
    initSmoothScrolling();
    
    // Navbar Scroll Effect
    initNavbarScroll();
    
    // Matrix Rain Effect
    initMatrixRain();
    
    // Animate on Scroll
    initScrollAnimations();
});

// ===================================
// Typing Animation for Hero Section
// ===================================
function initTypingAnimation() {
    const roles = [
        'Cybersecurity Enthusiast',
        'Ethical Hacker in Training',
        'Security Analyst',
        'Network Security Specialist',
        'Penetration Tester',
        'IDS/IPS Developer',
        'Python Security Automation Expert'
    ];
    
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typedTextElement = document.getElementById('typed-text');
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDuration = 2000;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let speed = isDeleting ? deletingSpeed : typingSpeed;
        
        if (!isDeleting && charIndex === currentRole.length) {
            speed = pauseDuration;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            speed = 500;
        }
        
        setTimeout(type, speed);
    }
    
    type();
}

// ===================================
// Smooth Scrolling for Navigation
// ===================================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
            }
        });
    });
}

// ===================================
// Navbar Scroll Effect
// ===================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 10, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 255, 65, 0.2)';
        } else {
            navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 255, 65, 0.1)';
        }
        
        // Highlight active nav link
        highlightActiveSection();
    });
}

// ===================================
// Highlight Active Navigation Link
// ===================================
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ===================================
// Matrix Rain Animation
// ===================================
function initMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const matrixContainer = document.querySelector('.matrix-rain');
    
    if (!matrixContainer) return;
    
    matrixContainer.appendChild(canvas);
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const characters = matrix.split('');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff41';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
    
    // Resize canvas on window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===================================
// Scroll Animations
// ===================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animatedElements = document.querySelectorAll('.skill-card, .project-card, .cert-card, .contact-card, .learning-item, .roadmap-item');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ===================================
// Skills Progress Animation
// ===================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress-bar');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        
        setTimeout(() => {
            bar.style.transition = 'width 1.5s ease';
            bar.style.width = width;
        }, 100);
    });
}

// ===================================
// Dynamic Year in Footer
// ===================================
function updateFooterYear() {
    const yearElement = document.querySelector('.footer p');
    if (yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace(/\d{4}/, currentYear);
    }
}

// Call on load
updateFooterYear();

// ===================================
// Particle Background Effect (Optional)
// ===================================
function initParticles() {
    // This is a placeholder for a particle.js or similar library
    // You can integrate libraries like particles.js for additional effects
    console.log('Particle effects initialized');
}

// ===================================
// Theme Toggle (Future Enhancement)
// ===================================
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
        }
    }
}

// ===================================
// Loading Animation
// ===================================
window.addEventListener('load', function() {
    // Hide loading screen if implemented
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
    
    // Trigger skill bar animation
    animateSkillBars();
});

// ===================================
// Easter Egg: Console Message
// ===================================
console.log('%c🛡️ Welcome to Rahul R\'s Cybersecurity Portfolio! 🛡️', 'color: #00ff41; font-size: 20px; font-weight: bold;');
console.log('%c🔒 Security Tip: Always validate your inputs! 🔒', 'color: #00d4ff; font-size: 14px;');
console.log('%c💻 Interested in collaborating? Let\'s connect! 💻', 'color: #ffffff; font-size: 12px;');

// ===================================
// Form Validation (if contact form is added)
// ===================================
function validateContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return false;
            }
            
            // Success message
            alert('Thank you for your message! I will get back to you soon.');
            form.reset();
        });
    }
}

// ===================================
// Mobile Menu Close on Outside Click
// ===================================
document.addEventListener('click', function(e) {
    const navbar = document.querySelector('.navbar-collapse');
    const toggler = document.querySelector('.navbar-toggler');
    
    if (navbar && navbar.classList.contains('show')) {
        if (!navbar.contains(e.target) && !toggler.contains(e.target)) {
            navbar.classList.remove('show');
        }
    }
});

// ===================================
// Scroll to Top Button (Optional)
// ===================================
function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollButton.className = 'scroll-to-top';
    scrollButton.style.display = 'none';
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });
    
    scrollButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll to top button
initScrollToTop();

// ===================================
// Performance Monitoring
// ===================================
if (window.performance) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page load time: ${pageLoadTime}ms`);
}