/**
 * i-Connect Student Society Components
 * Contains reusable <ic-header> and <ic-footer> Custom Elements.
 */

console.log("i-Connect components.js loaded successfully!");

class ICHeader extends HTMLElement {
    connectedCallback() {
        console.log("ic-header element connected!");
        const path = window.location.pathname.split('/').pop() || 'index.html';
        const isHome = path === 'index.html' || path === '' || path === 'index';
        const isEvents = path === 'events.html' || path === 'events';
        const isReports = path === 'reports.html' || path === 'reports';
        const isTeam = path === 'team.html' || path === 'team';

        const homePrefix = isHome ? '' : 'index.html';

        // Check if navbar scrolled styling is already needed on page load (e.g. if page is refreshed down)
        const isScrolled = window.scrollY > 30;
        const headerClass = `navbar fixed top-0 w-full z-[99999] py-3.5 sm:py-5 transition-all duration-500${isScrolled ? ' scrolled' : ''}`;

        this.innerHTML = `
            <header class="${headerClass}">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex justify-between items-center">
                    <!-- Brand -->
                    <a href="index.html" class="flex items-center gap-2 sm:gap-3 cursor-pointer min-w-0">
                        <div class="relative flex-shrink-0">
                            <img src="assets/ICSS-t.png" alt="i-Connect Logo"
                                class="h-7 sm:h-9 md:h-10 w-auto relative z-10 transition-transform drop-shadow-[0_0_12px_rgba(0,242,254,0.6)]">
                        </div>
                        <div class="flex flex-col min-w-0">
                            <span class="font-poppins font-bold text-[10px] sm:text-xs md:text-sm tracking-wide uppercase text-[#82C3F8] leading-tight truncate">
                                I-CONNECT STUDENT SOCIETY
                            </span>
                            <span class="font-poppins font-medium text-[8px] sm:text-[10px] md:text-xs tracking-wider uppercase text-white/80 leading-tight">
                                URS BINANGONAN
                            </span>
                        </div>
                    </a>

                    <!-- Desktop Nav -->
                    <nav class="hidden lg:flex items-center gap-8 font-medium text-sm relative">
                        <a href="${homePrefix}#home"
                            class="nav-link ${isHome ? 'active' : ''} text-white font-semibold py-2 relative transition-colors duration-300">
                            Home
                        </a>
                        <a href="${homePrefix}#about" class="nav-link text-white font-semibold py-2 relative transition-colors duration-300">
                            About Us
                        </a>
                        <a href="${homePrefix}#officers"
                            class="nav-link text-white font-semibold py-2 relative transition-colors duration-300">
                            Officers
                        </a>
                        <a href="${homePrefix}#faqs" class="nav-link text-white font-semibold py-2 relative transition-colors duration-300">
                            FAQs
                        </a>
                        <a href="events.html"
                            class="nav-link ${isEvents ? 'active' : ''} text-white font-semibold py-2 relative transition-colors duration-300">
                            Events
                        </a>
                        <a href="reports.html"
                            class="nav-link ${isReports ? 'active' : ''} text-white font-semibold py-2 relative transition-colors duration-300">
                            Reports
                        </a>
                        <!-- Sliding Indicator Underline -->
                        <div class="nav-indicator-line"></div>
                    </nav>

                    <!-- Mobile Menu Toggle Button -->
                    <button id="mobile-menu" aria-label="Toggle Navigation Menu"
                        class="lg:hidden flex flex-col items-center justify-center gap-1.5 cursor-pointer z-[999999] w-9 h-9 sm:w-10 sm:h-10 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all active:scale-95 flex-shrink-0">
                        <span class="bar w-5 h-0.5 bg-white rounded-full transition-all duration-300"></span>
                        <span class="bar w-5 h-0.5 bg-white rounded-full transition-all duration-300"></span>
                        <span class="bar w-5 h-0.5 bg-white rounded-full transition-all duration-300"></span>
                    </button>
                </div>

                <!-- Mobile Nav Menu Drawer (Opaque Fullscreen Body Overlay) -->
                <div id="mobile-nav"
                    class="fixed inset-0 flex flex-col justify-between py-8 px-6 translate-x-full transition-transform duration-500 lg:hidden z-[9999999] overflow-y-auto"
                    style="background-color: #051923 !important; background-image: radial-gradient(circle at 50% 20%, rgba(117,187,240,0.15) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(48,211,208,0.1) 0%, transparent 50%);">
                    
                    <!-- Drawer Header -->
                    <div class="flex items-center justify-between border-b border-white/10 pb-4 pt-2 max-w-sm mx-auto w-full">
                        <div class="flex items-center gap-3">
                            <img src="assets/ICSS-t.png" alt="i-Connect Logo" class="h-8 w-auto">
                            <div class="flex flex-col text-left">
                                <span class="font-poppins font-bold text-xs tracking-wider uppercase text-[#82C3F8]">
                                    I-CONNECT STUDENT SOCIETY
                                </span>
                                <span class="font-poppins font-medium text-[9px] tracking-wider uppercase text-white/60">
                                    NAVIGATION MENU
                                </span>
                            </div>
                        </div>
                        <button id="mobile-drawer-close" aria-label="Close Navigation Menu"
                            class="w-9 h-9 flex items-center justify-center text-white/80 hover:text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl transition-all active:scale-95">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>

                    <!-- Drawer Links -->
                    <div class="flex flex-col items-center gap-3 py-6 w-full max-w-sm mx-auto text-center my-auto">
                        <a href="${homePrefix}#home"
                            class="mobile-link text-white hover:text-[#75BBF0] text-lg font-bold py-3 px-6 w-full rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all ${isHome ? 'bg-gradient-to-r from-[#75BBF0]/20 to-[#30D3D0]/20 border-[#75BBF0]/40 text-[#75BBF0] font-extrabold' : ''}">
                            Home
                        </a>
                        <a href="${homePrefix}#about"
                            class="mobile-link text-white hover:text-[#75BBF0] text-lg font-bold py-3 px-6 w-full rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all">
                            About Us
                        </a>
                        <a href="${homePrefix}#officers"
                            class="mobile-link text-white hover:text-[#75BBF0] text-lg font-bold py-3 px-6 w-full rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all">
                            Officers
                        </a>
                        <a href="${homePrefix}#faqs"
                            class="mobile-link text-white hover:text-[#75BBF0] text-lg font-bold py-3 px-6 w-full rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all">
                            FAQs
                        </a>
                        <a href="events.html"
                            class="mobile-link text-white hover:text-[#75BBF0] text-lg font-bold py-3 px-6 w-full rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all ${isEvents ? 'bg-gradient-to-r from-[#75BBF0]/20 to-[#30D3D0]/20 border-[#75BBF0]/40 text-[#75BBF0] font-extrabold' : ''}">
                            Events
                        </a>
                        <a href="reports.html"
                            class="mobile-link text-white hover:text-[#75BBF0] text-lg font-bold py-3 px-6 w-full rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all ${isReports ? 'bg-gradient-to-r from-[#75BBF0]/20 to-[#30D3D0]/20 border-[#75BBF0]/40 text-[#75BBF0] font-extrabold' : ''}">
                            Reports
                        </a>
                    </div>

                    <!-- Drawer Footer -->
                    <div class="w-full max-w-sm mx-auto pt-4 border-t border-white/10 flex flex-col items-center gap-1 text-center">
                        <span class="text-[10px] text-gray-500 font-poppins uppercase tracking-wider">i-Connect Student Society</span>
                    </div>
                </div>
            </header>
        `;

        // Attach direct mobile menu event listeners inside component & relocate drawer to body root
        setTimeout(() => {
            const headerEl = this.querySelector('header');
            const mobileMenuBtn = this.querySelector('#mobile-menu');
            let mobileNav = this.querySelector('#mobile-nav');

            if (mobileNav && mobileNav.parentElement !== document.body) {
                document.body.appendChild(mobileNav);
            }

            mobileNav = document.getElementById('mobile-nav');
            const drawerCloseBtn = document.getElementById('mobile-drawer-close');
            const mobileLinks = document.querySelectorAll('.mobile-link');

            const handleScroll = () => {
                if (headerEl) {
                    if (window.scrollY > 20) {
                        headerEl.classList.add('scrolled');
                    } else {
                        headerEl.classList.remove('scrolled');
                    }
                }
            };

            window.addEventListener('scroll', handleScroll, { passive: true });
            handleScroll();

            const closeMenu = () => {
                if (mobileMenuBtn) mobileMenuBtn.classList.remove('is-active');
                if (mobileNav) {
                    mobileNav.classList.remove('translate-x-0');
                    mobileNav.classList.add('translate-x-full');
                }
                document.body.classList.remove('overflow-hidden');
            };

            const openMenu = () => {
                if (mobileMenuBtn) mobileMenuBtn.classList.add('is-active');
                if (mobileNav) {
                    mobileNav.classList.add('translate-x-0');
                    mobileNav.classList.remove('translate-x-full');
                }
                document.body.classList.add('overflow-hidden');
            };

            if (mobileMenuBtn && mobileNav) {
                mobileMenuBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const isOpen = mobileNav.classList.contains('translate-x-0');
                    if (isOpen) {
                        closeMenu();
                    } else {
                        openMenu();
                    }
                });
            }

            if (drawerCloseBtn) {
                drawerCloseBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    closeMenu();
                });
            }

            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    closeMenu();
                });
            });
        }, 0);
    }
}

class ICFooter extends HTMLElement {
    connectedCallback() {
        console.log("ic-footer element connected!");
        const path = window.location.pathname.split('/').pop() || 'index.html';
        const isHome = path === 'index.html' || path === '' || path === 'index';
        const homePrefix = isHome ? '' : 'index.html';

        this.innerHTML = `
            <footer id="contact" class="footer-glass pt-20 pb-8 mt-auto relative z-20">
                <div class="max-w-7xl mx-auto px-6">
                    <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-center md:text-left">

                        <!-- Brand Info -->
                        <div class="md:col-span-2 flex flex-col items-center md:items-start gap-5">
                            <div class="flex items-center gap-4 text-left">
                                <img src="assets/iconnect_logo.png" alt="i-Connect Logo"
                                    class="h-14 w-auto drop-shadow-[0_0_10px_rgba(0,242,254,0.3)]">
                                <div class="flex flex-col">
                                    <span
                                        class="font-outfit font-bold text-sm sm:text-base tracking-tight text-white leading-tight uppercase">
                                        I-Connect Student Society
                                    </span>
                                    <span
                                        class="font-outfit font-medium text-[10px] sm:text-xs tracking-wider text-white uppercase mt-0.5">
                                        Official Website
                                    </span>
                                </div>
                            </div>
                            <p class="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-sm">
                                The official website of i-Connect Student Society at the University of Rizal System
                                Binangonan.
                            </p>
                            <div class="mt-2 flex flex-col gap-1 text-center md:text-left">
                                <h5 class="text-white font-extrabold text-xs uppercase tracking-wider">
                                    Contact Us
                                </h5>
                                <span class="text-gray-400 text-xs sm:text-sm mb-3 block">icss.2526@gmail.com</span>
                                <!-- Gradient Definition for Social Hover (matches About Us gradient) -->
                                <svg class="w-0 h-0 absolute pointer-events-none" aria-hidden="true">
                                    <defs>
                                        <linearGradient id="about-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stop-color="#75BBF0" />
                                            <stop offset="50%" stop-color="#FFFFFF" />
                                            <stop offset="100%" stop-color="#30D3D0" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div class="flex items-center justify-center md:justify-start gap-3">
                                    <!-- Facebook -->
                                    <a href="https://facebook.com/ursb.ccsiconnect" target="_blank" aria-label="Facebook"
                                        class="social-icon-btn w-11 h-11 rounded-[1rem] border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                                        </svg>
                                    </a>
                                    <!-- Instagram -->
                                    <a href="https://instagram.com" target="_blank" aria-label="Instagram"
                                        class="social-icon-btn w-11 h-11 rounded-[1rem] border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                        </svg>
                                    </a>
                                    <!-- TikTok -->
                                    <a href="https://tiktok.com" target="_blank" aria-label="TikTok"
                                        class="social-icon-btn w-11 h-11 rounded-[1rem] border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg">
                                        <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <!-- Quick Links -->
                        <div class="flex flex-col items-center md:items-start gap-4">
                            <h4 class="text-white font-bold text-sm uppercase tracking-widest mb-2">Quick Links</h4>
                            <a href="${homePrefix}#home" class="footer-link">Home</a>
                            <a href="${homePrefix}#about" class="footer-link">About Us</a>
                            <a href="${homePrefix}#officers" class="footer-link">Officers</a>
                            <a href="${homePrefix}#faqs" class="footer-link">FAQs</a>
                        </div>

                        <!-- Resources -->
                        <div class="flex flex-col items-center md:items-start gap-4">
                            <h4 class="text-white font-bold text-sm uppercase tracking-widest mb-2">Resources</h4>
                            <a href="events.html" class="footer-link">Events</a>
                            <a href="reports.html" class="footer-link">Reports</a>
                            <a href="team.html" class="footer-link">The Team</a>
                        </div>

                    </div>

                    <!-- Bottom -->
                    <div class="pt-8 border-t border-white/5 flex flex-col items-center">
                        <p class="text-gray-500 text-[11px] font-regular tracking-wider">
                            Copyright © 2026 by i-Connect Student Society. All Rights Reserved.
                        </p>
                    </div>
                </div>
            </footer>
        `;
    }
}

class ICLoader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="loader-progress" id="loader-progress-bar"></div>
        `;
    }
}

customElements.define('ic-header', ICHeader);
customElements.define('ic-footer', ICFooter);
customElements.define('ic-loader', ICLoader);
