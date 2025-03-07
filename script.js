// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize progress circles
    initProgressCircles();
    
    // Initialize particles for contact section
    initParticles();
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Update active navigation link on scroll
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initialize dark theme toggle
    initThemeToggle();
});

// Initialize progress circles in the skills section
function initProgressCircles() {
    const progressCircles = document.querySelectorAll('.progress-circle');
    
    progressCircles.forEach(circle => {
        const progress = circle.getAttribute('data-progress');
        const progressCircle = circle.querySelector('.progress');
        const progressText = circle.querySelector('.progress-text');
        
        // Set the CSS variable for the progress
        circle.style.setProperty('--progress', progress);
        
        // Animate the progress
        setTimeout(() => {
            progressCircle.style.strokeDashoffset = `calc(283 - (283 * ${progress}) / 100)`;
            
            // Animate the text counter
            let currentProgress = 0;
            const duration = 1500;
            const interval = 20;
            const increment = progress / (duration / interval);
            
            const counter = setInterval(() => {
                currentProgress += increment;
                
                if (currentProgress >= progress) {
                    currentProgress = progress;
                    clearInterval(counter);
                }
                
                progressText.textContent = `${Math.round(currentProgress)}%`;
            }, interval);
        }, 500);
    });
}

// Initialize particles for the contact section
function initParticles() {
    const particlesContainer = document.querySelector('.particles-container');
    
    if (!particlesContainer) return;
    
    // Create particles
    for (let i = 0; i < 50; i++) {
        createParticle(particlesContainer);
    }
}

// Create a single particle
function createParticle(container) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    
    // Random size
    const size = Math.random() * 5 + 2;
    
    // Random opacity
    const opacity = Math.random() * 0.5 + 0.3;
    
    // Random animation duration
    const duration = Math.random() * 20 + 10;
    
    // Set styles
    particle.style.cssText = `
        position: absolute;
        top: ${posY}%;
        left: ${posX}%;
        width: ${size}px;
        height: ${size}px;
        background-color: var(--accent-color);
        border-radius: 50%;
        opacity: ${opacity};
        animation: float ${duration}s infinite ease-in-out;
    `;
    
    // Create and add keyframes for this particle
    const keyframes = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            }
            75% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
            }
        }
    `;
    
    // Add keyframes to the document
    const style = document.createElement('style');
    style.innerHTML = keyframes;
    document.head.appendChild(style);
    
    // Add particle to container
    container.appendChild(particle);
}

// Initialize smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Update active navigation link based on scroll position
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200 && 
            window.pageYOffset < sectionTop + sectionHeight - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Initialize dark theme toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-theme');
        
        if (document.body.classList.contains('light-theme')) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Add glitch effect on hover for the name in hero section
const nameElement = document.querySelector('.glitch-effect');
if (nameElement) {
    nameElement.addEventListener('mouseenter', function() {
        this.style.animation = 'glitch 0.3s infinite';
    });
    
    nameElement.addEventListener('mouseleave', function() {
        this.style.animation = 'glitch 1s infinite';
    });
}