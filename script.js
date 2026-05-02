document.addEventListener('DOMContentLoaded', () => {
    // Mouse Spotlight Effect
    const root = document.documentElement;
    document.addEventListener('mousemove', e => {
        root.style.setProperty('--mouse-x', e.clientX + 'px');
        root.style.setProperty('--mouse-y', e.clientY + 'px');
    });

    // Dynamic Falling Stars
    const bgContainer = document.querySelector('.fixed.inset-0');
    if (bgContainer) {
        const createStar = () => {
            const star = document.createElement('span');
            star.classList.add('shooting-star');
            
            // Randomize spawn location (mostly from top right to allow falling left)
            const top = Math.random() * (window.innerHeight * 0.8);
            const left = Math.random() * window.innerWidth + window.innerWidth * 0.2;
            
            star.style.top = `${top}px`;
            star.style.left = `${left}px`;
            
            // Random duration (4s to 8s) and delay (0s to 2s)
            const duration = Math.random() * 4 + 4;
            const delay = Math.random() * 2;
            
            star.style.animation = `animate-star ${duration}s linear ${delay}s`;
            
            bgContainer.appendChild(star);
            
            // Clean up star element after animation completes
            setTimeout(() => {
                star.remove();
            }, (duration + delay) * 1000);
        };

        // Create initial batch of stars
        for (let i = 0; i < 3; i++) {
            createStar();
        }

        // Continually spawn new stars at random intervals
        setInterval(() => {
            if (document.querySelectorAll('.shooting-star').length < 6) {
                createStar();
            }
        }, 2000);
    }

    // Magnetic Effect
    const magneticItems = document.querySelectorAll('.magnetic-item');
    magneticItems.forEach(item => {
        item.addEventListener('mousemove', e => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            item.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translate(0, 0)';
        });
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#' || !href.startsWith('#')) return;
            
            try {
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    e.preventDefault();
                    const headerOffset = 100;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            } catch (err) {
                // Not a valid selector, let the browser handle it
            }
        });
    });

    // Mobile menu logic
    const mobileMenuBtn = document.querySelector('#mobile-menu');
    const mobileNav = document.querySelector('#mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('is-active');
            mobileNav.classList.toggle('translate-x-full');
            mobileNav.classList.toggle('translate-x-0');
            document.body.classList.toggle('overflow-hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuBtn.classList.remove('is-active');
                mobileNav.classList.add('translate-x-full');
                mobileNav.classList.remove('translate-x-0');
                document.body.classList.remove('overflow-hidden');
            });
        });
    }

    // Tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => {
                c.classList.remove('active');
                c.classList.add('hidden');
            });

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding content
            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.remove('hidden');
                targetContent.classList.add('active');
            }
        });
    });
});
