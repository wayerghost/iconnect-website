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

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

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

    // ==========================================
    // Navbar Underline Slider & Scroll Highlight Logic
    // ==========================================
    const sections = document.querySelectorAll('section, footer');
    const navLinks = document.querySelectorAll('.nav-link');
    const indicator = document.querySelector('.nav-indicator-line');
    const nav = document.querySelector('nav');

    const updateIndicatorPosition = (element, animate = true) => {
        if (!indicator || !element || !nav) return;
        const navRect = nav.getBoundingClientRect();
        const elemRect = element.getBoundingClientRect();
        const left = elemRect.left - navRect.left;
        const width = elemRect.width;

        if (!animate) {
            indicator.classList.add('no-transition');
        } else {
            indicator.classList.remove('no-transition');
        }

        indicator.style.left = `${left}px`;
        indicator.style.width = `${width}px`;
        indicator.classList.add('active');

        if (!animate) {
            void indicator.offsetHeight;
            indicator.classList.remove('no-transition');
        }
    };

    const highlightNavigation = (animateIndicator = true) => {
        let current = '';
        const headerOffset = 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - headerOffset)) {
                current = section.getAttribute('id');
            }
        });

        let newActiveLink = null;
        navLinks.forEach(link => {
            link.classList.remove('active', 'font-bold');
            link.classList.add('text-white');

            const href = link.getAttribute('href');
            if (href === `#${current}` || (href && href.endsWith('index.html') && current === 'home')) {
                link.classList.add('active', 'font-bold');
                newActiveLink = link;
            }
        });

        if (newActiveLink) {
            updateIndicatorPosition(newActiveLink, animateIndicator);
        } else {
            const path = window.location.pathname.split('/').pop() || 'index.html';
            const isHome = path === 'index.html' || path === '' || path === 'index';
            if (isHome) {
                const homeLink = Array.from(navLinks).find(l => l.getAttribute('href') === '#home' || l.getAttribute('href').endsWith('#home'));
                if (homeLink) {
                    homeLink.classList.add('active', 'font-bold');
                    updateIndicatorPosition(homeLink, animateIndicator);
                }
            } else {
                const activeLinkOnSubpage = document.querySelector('.nav-link.active');
                if (activeLinkOnSubpage) {
                    updateIndicatorPosition(activeLinkOnSubpage, animateIndicator);
                }
            }
        }
    };

    window.addEventListener('scroll', () => {
        highlightNavigation(true);
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

    // Initialize Navbar Underline Slider position
    if (indicator) {
        const activeLink = document.querySelector('.nav-link.active');
        const prevIndexStr = sessionStorage.getItem('prev-nav-index');
        const prevIndex = prevIndexStr !== null ? parseInt(prevIndexStr, 10) : -1;
        let prevLink = null;
        if (prevIndex >= 0 && prevIndex < navLinks.length) {
            prevLink = navLinks[prevIndex];
        }

        sessionStorage.removeItem('prev-nav-index');

        if (prevLink && prevLink !== activeLink) {
            updateIndicatorPosition(prevLink, false);
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    highlightNavigation(true);
                });
            });
        } else {
            highlightNavigation(false);
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            updateIndicatorPosition(link, true);
        });
    });

    if (nav) {
        nav.addEventListener('mouseleave', () => {
            const activeLink = document.querySelector('.nav-link.active');
            if (activeLink) {
                updateIndicatorPosition(activeLink, true);
            } else {
                indicator.classList.remove('active');
            }
        });
    }

    // Double-check active section highlighting after layout paints
    window.addEventListener('load', () => {
        highlightNavigation(false);
    });

    // ==========================================
    // Seamless Page Loading Transition Logic
    // ==========================================
    const loader = document.querySelector('ic-loader');
    const progressBar = document.getElementById('loader-progress-bar');
    let progressInterval = null;

    if (loader && progressBar) {
        let currentProgress = 0;
        progressInterval = setInterval(() => {
            if (currentProgress < 75) {
                currentProgress += Math.random() * 8;
                progressBar.style.width = `${Math.min(currentProgress, 75)}%`;
            } else {
                clearInterval(progressInterval);
            }
        }, 100);
    }

    const hideLoader = () => {
        if (progressInterval) clearInterval(progressInterval);
        if (progressBar) progressBar.style.width = '100%';
        setTimeout(() => {
            if (loader) loader.classList.add('fade-out');
        }, 200);
    };

    if (document.readyState === 'complete') {
        hideLoader();
    } else {
        window.addEventListener('load', hideLoader);
        // Safety fallback: always hide loader after a maximum of 500ms to prevent getting stuck
        setTimeout(hideLoader, 500);
    }

    // Intercept navigation links
    document.body.addEventListener('click', e => {
        const link = e.target.closest('a');
        if (link) {
            const href = link.getAttribute('href');
            if (!href) return;

            const pathname = (typeof link.pathname === 'string') ? link.pathname : '';
            const isSamePage = pathname === window.location.pathname ||
                (pathname === '/' && window.location.pathname.endsWith('index.html')) ||
                (window.location.pathname === '/' && pathname.endsWith('index.html'));
            const isAnchorScroll = isSamePage && link.hash;

            if (
                !href.startsWith('#') &&
                !href.startsWith('javascript:') &&
                !isAnchorScroll &&
                link.target !== '_blank' &&
                link.host === window.location.host
            ) {
                e.preventDefault();

                // Store current nav index to slide from it on the new page
                try {
                    const activeNavIndex = Array.from(navLinks).indexOf(activeLink);
                    if (activeNavIndex !== -1) {
                        sessionStorage.setItem('prev-nav-index', activeNavIndex);
                    }
                } catch (err) {
                    console.warn("Could not save to sessionStorage:", err);
                }

                // Show loader
                if (loader && progressBar) {
                    progressBar.style.width = '0%';
                    loader.classList.remove('fade-out');
                    setTimeout(() => {
                        progressBar.style.width = '90%';
                    }, 50);
                }

                const targetUrl = link.href;
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 400);
            }
        }
    });
});
