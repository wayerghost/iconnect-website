/**
 * i-Connect Student Society Components
 * Contains reusable <ic-header> and <ic-footer> Custom Elements.
 */

console.log("i-Connect components.js loaded successfully!");

class ICHeader extends HTMLElement {
    connectedCallback() {
        console.log("ic-header element connected!");
        const path = window.location.pathname.split('/').pop() || 'index.html';
        const isHome = path === 'index.html' || path === '';
        const isEvents = path === 'events.html';
        const isReports = path === 'reports.html';
        const isTeam = path === 'team.html';

        const homePrefix = isHome ? '' : 'index.html';

        // Check if navbar scrolled styling is already needed on page load (e.g. if page is refreshed down)
        const isScrolled = window.scrollY > 50;
        const headerClass = `navbar fixed top-0 w-full z-50 py-5 transition-all duration-500${isScrolled ? ' scrolled' : ''}`;

        this.innerHTML = `
            <header class="${headerClass}">
                <div class="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
                    <!-- Brand -->
                    <a href="index.html" class="flex items-center gap-3 cursor-pointer">
                        <div class="relative">
                            <img src="assets/ICSS-t.png" alt="i-Connect Logo"
                                class="h-10 w-auto relative z-10 transition-transform drop-shadow-[0_0_12px_rgba(0,242,254,0.6)]">
                        </div>
                        <div class="hidden md:flex flex-col">
                            <span class="font-poppins font-semibold text-sm tracking-wide uppercase text-[#82C3F8]">
                                I-CONNECT STUDENT SOCIETY
                            </span>
                            <span class="font-poppins font-semibold text-xs tracking-wide uppercase text-white/90">
                                URS BINANGONAN
                            </span>
                        </div>
                    </a>

                    <!-- Desktop Nav -->
                    <nav class="hidden lg:flex items-center gap-8 font-medium text-sm">
                        <a href="${homePrefix}#home"
                            class="nav-link ${isHome ? 'active' : ''} text-white font-semibold py-2 relative transition-colors duration-300">
                            Home
                            <span class="nav-indicator absolute bottom-0 left-0 ${isHome ? 'w-full' : 'w-0'} h-[2px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300"></span>
                        </a>
                        <a href="${homePrefix}#about" class="nav-link text-white font-semibold py-2 relative transition-colors duration-300">
                            About Us
                            <span class="nav-indicator absolute bottom-0 left-0 w-0 h-[2px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300"></span>
                        </a>
                        <a href="${homePrefix}#officers"
                            class="nav-link text-white font-semibold py-2 relative transition-colors duration-300">
                            Officers
                            <span class="nav-indicator absolute bottom-0 left-0 w-0 h-[2px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300"></span>
                        </a>
                        <a href="${homePrefix}#faqs" class="nav-link text-white font-semibold py-2 relative transition-colors duration-300">
                            FAQs
                            <span class="nav-indicator absolute bottom-0 left-0 w-0 h-[2px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300"></span>
                        </a>
                        <a href="events.html"
                            class="nav-link ${isEvents ? 'active' : ''} text-white font-semibold py-2 relative transition-colors duration-300">
                            Events
                            <span class="nav-indicator absolute bottom-0 left-0 ${isEvents ? 'w-full' : 'w-0'} h-[2px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)] transition-all duration-300"></span>
                        </a>
                    </nav>

                    <a href="reports.html"
                        class="nav-action-btn ${isReports ? 'ring-2 ring-accent/50 shadow-glow-accent border-white' : ''} hidden lg:flex items-center justify-center border-2 border-transparent px-6 py-2 transition-all duration-300 transform hover:scale-105 rounded-lg">
                        <span class="bg-gradient-to-r from-[#75BBF0] to-[#4DA1E0] text-white bg-clip-text font-medium text-sm tracking-wide">
                            View Reports
                        </span>
                    </a>

                    <!-- Mobile Menu Toggle -->
                    <button id="mobile-menu"
                        class="lg:hidden flex flex-col gap-1.5 cursor-pointer z-[60] p-2 hover:bg-white/5 rounded-lg transition-all">
                        <span class="bar w-7 h-0.5 bg-white rounded-full transition-all"></span>
                        <span class="bar w-5 h-0.5 bg-white rounded-full transition-all self-end"></span>
                        <span class="bar w-7 h-0.5 bg-white rounded-full transition-all"></span>
                    </button>
                </div>

                <!-- Mobile Nav Menu -->
                <div id="mobile-nav"
                    class="fixed inset-0 bg-[#051923]/98 backdrop-blur-3xl flex flex-col items-center justify-center gap-8 translate-x-full transition-transform duration-500 lg:hidden z-50 overflow-hidden">
                    <div class="flex flex-col items-center gap-6 z-10 w-full px-6 text-center">
                        <a href="${homePrefix}#home"
                            class="mobile-link text-white hover:text-accent text-3xl font-bold transition-all duration-300">Home</a>
                        <a href="${homePrefix}#about"
                            class="mobile-link text-white hover:text-accent text-3xl font-bold transition-all duration-300">About Us</a>
                        <a href="${homePrefix}#officers"
                            class="mobile-link text-white hover:text-accent text-3xl font-bold transition-all duration-300">Officers</a>
                        <a href="${homePrefix}#faqs"
                            class="mobile-link text-white hover:text-accent text-3xl font-bold transition-all duration-300">FAQs</a>
                        <a href="events.html"
                            class="mobile-link text-white hover:text-accent text-3xl font-bold transition-all duration-300">Events</a>
                        <div class="w-16 h-px bg-white/10 my-4"></div>
                        <a href="reports.html"
                            class="mobile-link w-full max-w-xs text-center border border-white/20 text-white px-8 py-4 rounded-2xl font-black text-lg transition-all active:scale-95">View Reports</a>
                    </div>
                </div>
            </header>
        `;
    }
}

class ICFooter extends HTMLElement {
    connectedCallback() {
        console.log("ic-footer element connected!");
        const path = window.location.pathname.split('/').pop() || 'index.html';
        const isHome = path === 'index.html' || path === '';
        const homePrefix = isHome ? '' : 'index.html';

        this.innerHTML = `
            <footer id="contact" class="footer-glass pt-20 pb-8 mt-auto">
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
                            <a href="${homePrefix}#home" class="text-gray-400 text-xs hover:text-accent transition-colors">Home</a>
                            <a href="${homePrefix}#about" class="text-gray-400 text-xs hover:text-accent transition-colors">About Us</a>
                            <a href="${homePrefix}#officers" class="text-gray-400 text-xs hover:text-accent transition-colors">Officers</a>
                            <a href="${homePrefix}#faqs" class="text-gray-400 text-xs hover:text-accent transition-colors">FAQs</a>
                        </div>

                        <!-- Resources -->
                        <div class="flex flex-col items-center md:items-start gap-4">
                            <h4 class="text-white font-bold text-sm uppercase tracking-widest mb-2">Resources</h4>
                            <a href="events.html" class="text-gray-400 text-xs hover:text-accent transition-colors">Events</a>
                            <a href="reports.html" class="text-gray-400 text-xs hover:text-accent transition-colors">Reports</a>
                            <a href="team.html" class="text-gray-400 text-xs hover:text-accent transition-colors">The Team</a>
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

customElements.define('ic-header', ICHeader);
customElements.define('ic-footer', ICFooter);
