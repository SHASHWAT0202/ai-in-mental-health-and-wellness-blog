// AI Mental Health Blog - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100
    });

    // Progress Bar
    const progressBar = document.getElementById('progress-bar');
    
    function updateProgressBar() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    }

    window.addEventListener('scroll', updateProgressBar);

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);

    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars text-xl';
            } else {
                icon.className = 'fas fa-times text-xl';
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!mobileMenuButton.contains(event.target) && !mobileMenu.contains(event.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.querySelector('i').className = 'fas fa-bars text-xl';
            }
        });

        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.querySelector('i').className = 'fas fa-bars text-xl';
            });
        });
    }

    // Smooth scrolling for navigation links (only internal anchor links)
    const navLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    
    function handleBackToTop() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    }

    window.addEventListener('scroll', handleBackToTop);

    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);

    // Observe elements for loading animations
    const elementsToObserve = document.querySelectorAll('.content-section, .feature-card, .use-case-card');
    elementsToObserve.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });

    // Enhanced scroll-triggered animations
    function checkScroll() {
        const cards = document.querySelectorAll('.use-case-card');
        cards.forEach((card, index) => {
            const cardTop = card.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (cardTop < windowHeight * 0.8) {
                setTimeout(() => {
                    card.style.transform = 'translateX(0)';
                    card.style.opacity = '1';
                }, index * 100);
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run on load

    // Typing effect for hero subtitle
    const heroSubtitle = document.querySelector('#home p');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        
        setTimeout(() => {
            typeText(heroSubtitle, originalText, 30);
        }, 1000);
    }

    function typeText(element, text, speed) {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);
    }

    // Parallax effect for floating shapes
    function parallaxEffect() {
        const shapes = document.querySelectorAll('.shape');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${rate * speed}px)`;
        });
    }

    window.addEventListener('scroll', parallaxEffect);

    // Interactive hover effects for feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Reading progress indicator
    function updateReadingProgress() {
        const article = document.querySelector('article');
        if (!article) return;

        const articleTop = article.offsetTop;
        const articleHeight = article.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY;

        const progress = Math.max(0, Math.min(100, 
            ((scrollY - articleTop + windowHeight) / articleHeight) * 100
        ));

        // Update progress bar color based on reading progress
        if (progress > 50) {
            progressBar.style.background = 'linear-gradient(90deg, #10b981, #06b6d4)';
        } else {
            progressBar.style.background = 'linear-gradient(90deg, #0ea5e9, #d946ef)';
        }
    }

    window.addEventListener('scroll', updateReadingProgress);

    // Social share functionality (only for share buttons with .share-btn class, not profile links)
    function initSocialShare() {
        const shareButtons = document.querySelectorAll('a.share-btn, button.share-btn');
        const currentUrl = window.location.href;
        const title = document.title;

        shareButtons.forEach(button => {
            // Only handle elements that actually have the share-btn class
            if (!button.classList.contains('share-btn')) return;
            
            const icon = button.querySelector('i');
            if (!icon) return;
            
            const platform = icon.className;
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                let shareUrl = '';
                
                if (platform.includes('twitter')) {
                    shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(currentUrl)}`;
                } else if (platform.includes('facebook')) {
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
                } else if (platform.includes('linkedin')) {
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
                }
                
                if (shareUrl) {
                    window.open(shareUrl, '_blank', 'width=600,height=400');
                }
            });
        });
    }

    initSocialShare();

    // Lazy loading for images (if any are added later)
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    lazyLoadImages();

    // Performance optimization: throttle scroll events
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
        }
    }

    // Apply throttling to scroll events
    const throttledScroll = throttle(() => {
        updateProgressBar();
        handleNavbarScroll();
        handleBackToTop();
        updateReadingProgress();
        parallaxEffect();
    }, 16); // 60fps

    window.addEventListener('scroll', throttledScroll);

    // Easter egg: Konami code
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiPosition = 0;

    document.addEventListener('keydown', function(e) {
        if (e.keyCode === konamiCode[konamiPosition]) {
            konamiPosition++;
            if (konamiPosition === konamiCode.length) {
                activateEasterEgg();
                konamiPosition = 0;
            }
        } else {
            konamiPosition = 0;
        }
    });

    function activateEasterEgg() {
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
        
        // Show a fun message
        const message = document.createElement('div');
        message.innerHTML = '🎉 You found the secret! Mental health is important! 🧠✨';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(45deg, var(--primary-500), var(--accent-500));
            color: white;
            padding: 2rem;
            border-radius: 1rem;
            z-index: 9999;
            font-size: 1.2rem;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        `;
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    // Service Worker registration for PWA capabilities
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful');
                })
                .catch(function(err) {
                    console.log('ServiceWorker registration failed');
                });
        });
    }

    console.log('🧠 AI Mental Health Blog loaded successfully! ✨');
    console.log('Built with ❤️ for mental wellness and AI innovation');
});