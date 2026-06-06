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

    // Sparkle Animation Logic
    const heroSection = document.getElementById('home');
    if (heroSection) {
        // Shooting Star Logic
        const createShootingStar = () => {
            const star = document.createElement('div');
            star.classList.add('shooting-star');

            // Randomize spawn location (mostly from top right to allow falling left)
            const top = Math.random() * (window.innerHeight * 0.8);
            const left = Math.random() * window.innerWidth + window.innerWidth * 0.2;

            star.style.top = `${top}px`;
            star.style.left = `${left}px`;

            // Random duration (4s to 8s) and delay (0s to 2s)
            const duration = Math.random() * 4 + 4;
            const delay = Math.random() * 2;

            star.style.animation = `animate-star ${duration}s linear ${delay}s forwards`;

            document.body.appendChild(star);

            // Remove after animation completes
            setTimeout(() => {
                star.remove();
            }, (duration + delay) * 1000);
        };

        // Create initial batch of stars
        for (let i = 0; i < 3; i++) {
            createShootingStar();
        }

        // Continually spawn new stars at random intervals
        setInterval(() => {
            if (document.querySelectorAll('.shooting-star').length < 6) {
                createShootingStar();
            }
        }, 2000);
    }

    // Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const headerOffset = 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - headerOffset)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            // Remove active classes
            link.classList.remove('active', 'font-bold');
            link.classList.add('text-white'); // ensure it stays white

            const indicator = link.querySelector('.nav-indicator');
            if (indicator) {
                indicator.classList.remove('w-full');
                indicator.classList.add('w-0');
            }

            // Add active class if this is the current section
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active', 'font-bold');
                if (indicator) {
                    indicator.classList.remove('w-0');
                    indicator.classList.add('w-full');
                }
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

    // FAQ Accordion Logic
    const faqBtns = document.querySelectorAll('.faq-btn');

    faqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('.faq-icon');
            const isOpen = content.classList.contains('open');

            // Close other FAQs (Accordion style)
            faqBtns.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    const otherContent = otherBtn.nextElementSibling;
                    const otherIcon = otherBtn.querySelector('.faq-icon');
                    otherContent.classList.remove('open');
                    otherContent.style.maxHeight = '0px';
                    otherContent.style.opacity = '0';
                    otherIcon.classList.remove('active');
                }
            });

            // Toggle current FAQ
            if (isOpen) {
                content.classList.remove('open');
                content.style.maxHeight = '0px';
                content.style.opacity = '0';
                icon.classList.remove('active');
            } else {
                content.classList.add('open');
                content.style.maxHeight = content.scrollHeight + 'px';
                content.style.opacity = '1';
                icon.classList.add('active');
            }
        });
    });

    // Mirror Background Generator for seamless scrolling (rotated downward)
    try {
        const bgImg = new Image();
        bgImg.onload = () => {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = bgImg.width;
                canvas.height = bgImg.height * 2;
                const ctx = canvas.getContext('2d');

                const crop = 4; // crop top 4px to remove edge/border artifacts from the source image

                // Draw vertically flipped (downward-facing) image at top (Y = 0 to 2000)
                ctx.save();
                ctx.translate(0, bgImg.height);
                ctx.scale(1, -1);
                ctx.drawImage(bgImg, 0, crop, bgImg.width, bgImg.height - crop, 0, 0, bgImg.width, bgImg.height);
                ctx.restore();

                // Draw normal image at bottom (Y = 2000 to 4000)
                ctx.drawImage(bgImg, 0, crop, bgImg.width, bgImg.height - crop, 0, bgImg.height, bgImg.width, bgImg.height);

                // Apply the new seamless image as the background
                document.body.style.backgroundImage = `url(${canvas.toDataURL()})`;
            } catch (canvasErr) {
                console.warn("Canvas background generator failed (likely CORS on file://). Falling back to CSS.", canvasErr);
            }
        };
        bgImg.src = 'assets/BG.png';
    } catch (err) {
        console.warn("Background generator failed:", err);
    }

    // Officers Carousel Logic
    const track = document.getElementById('officers-track');
    const prevBtn = document.getElementById('prev-officer');
    const nextBtn = document.getElementById('next-officer');
    
    if (track && prevBtn && nextBtn) {
        let currentIndex = 0;
        let autoplayInterval = null;
        const AUTOPLAY_DELAY = 3000; // 3 seconds
        
        const getVisibleCount = () => {
            if (window.innerWidth >= 768) return 3;
            if (window.innerWidth >= 640) return 2;
            return 1;
        };
        
        const updateCarousel = () => {
            const items = track.querySelectorAll('.carousel-item');
            const totalItems = items.length;
            const visibleCount = getVisibleCount();
            const maxIndex = Math.max(0, totalItems - visibleCount);
            
            // Bounds check
            if (currentIndex > maxIndex) currentIndex = maxIndex;
            if (currentIndex < 0) currentIndex = 0;
            
            // Calculate slide translation (item width + gap spacing)
            const gap = 24; // matches Tailwind gap-6 (1.5rem / 24px)
            const itemWidth = items[0].getBoundingClientRect().width;
            const offset = currentIndex * (itemWidth + gap);
            track.style.transform = `translateX(${-offset}px)`;
            
            // Disable buttons if we reach boundaries
            prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
            prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
            
            nextBtn.style.opacity = currentIndex === maxIndex ? '0.3' : '1';
            nextBtn.style.pointerEvents = currentIndex === maxIndex ? 'none' : 'auto';
        };

        const startAutoplay = () => {
            stopAutoplay();
            autoplayInterval = setInterval(() => {
                const items = track.querySelectorAll('.carousel-item');
                const totalItems = items.length;
                const visibleCount = getVisibleCount();
                const maxIndex = Math.max(0, totalItems - visibleCount);
                
                if (maxIndex > 0) {
                    if (currentIndex >= maxIndex) {
                        currentIndex = 0;
                    } else {
                        currentIndex++;
                    }
                    updateCarousel();
                }
            }, AUTOPLAY_DELAY);
        };

        const stopAutoplay = () => {
            if (autoplayInterval) {
                clearInterval(autoplayInterval);
                autoplayInterval = null;
            }
        };
        
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
                startAutoplay(); // Reset timer on manual action
            }
        });
        
        nextBtn.addEventListener('click', () => {
            const visibleCount = getVisibleCount();
            const totalItems = track.querySelectorAll('.carousel-item').length;
            if (currentIndex < totalItems - visibleCount) {
                currentIndex++;
                updateCarousel();
                startAutoplay(); // Reset timer on manual action
            }
        });

        // Pause autoplay when hovering over the carousel
        const container = track.closest('.relative');
        if (container) {
            container.addEventListener('mouseenter', stopAutoplay);
            container.addEventListener('mouseleave', startAutoplay);
            container.addEventListener('touchstart', stopAutoplay, { passive: true });
            container.addEventListener('touchend', startAutoplay, { passive: true });
        }
        
        // Initial setup and resize updates
        updateCarousel();
        startAutoplay();
        window.addEventListener('resize', () => {
            updateCarousel();
            startAutoplay();
        });
    }
});
