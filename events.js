/**
 * i-Connect Student Society Events Calendar Logic
 * Features dynamic month generation, category filters, and bidirectional interaction.
 */

document.addEventListener('DOMContentLoaded', () => {
    // Current date state
    let navDate = new Date();
    let selectedDate = null; // Stores currently clicked { year, month, day }
    let activeFilter = 'all';
    let selectedEventId = null;

    // Helper to get current month details
    const getMonthName = (monthIndex) => {
        const months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        return months[monthIndex];
    };

    // Dynamic mock events scheduled relative to the CURRENT month & year of system time
    const currentYear = navDate.getFullYear();
    const currentMonth = navDate.getMonth(); // 0-indexed

    const eventsData = [
        {
            id: 'evt-1',
            title: 'CCS General Assembly & Tech Vision',
            type: 'meeting',
            year: currentYear,
            month: currentMonth,
            day: 5,
            time: '9:00 AM - 12:00 PM',
            location: 'URSB Gymnasium',
            desc: 'Kick off the semester! Meet the new iCSS executive officers, discover the organization roadmap, and learn about upcoming tech projects, budget allocations, and student benefits. Attending members will receive general assembly credits.',
            speaker: 'i-Connect Officer Board',
            registrationLink: '#'
        },
        {
            id: 'evt-2',
            title: 'Intro to Generative AI & Prompt Engineering',
            type: 'seminar',
            year: currentYear,
            month: currentMonth,
            day: 12,
            time: '1:00 PM - 4:00 PM',
            location: 'CCS Computer Lab 1 & Zoom',
            desc: 'A seminar detailing the core concepts of Large Language Models (LLMs), artificial intelligence, and how to write effective prompts to boost productivity in programming, design, and academic research. Includes a live demonstration of API integrations.',
            speaker: 'Engr. Julian De Silva (AI Architect)',
            registrationLink: '#'
        },
        {
            id: 'evt-3',
            title: 'Full-Stack Web Dev Boot Camp: Master HTML & CSS',
            type: 'workshop',
            year: currentYear,
            month: currentMonth,
            day: 18,
            time: '8:00 AM - 12:00 PM',
            location: 'CCS AVR Room',
            desc: 'Day 1 of our intensive web development boot camp. Learn semantic HTML, styling systems with CSS Variables, Flexbox, CSS Grid layouts, and the fundamentals of responsive design. Best suited for beginners looking to build solid foundations.',
            speaker: 'i-Connect Web Development Team',
            registrationLink: '#'
        },
        {
            id: 'evt-4',
            title: 'Advanced TailwindCSS & Dynamic Frameworks',
            type: 'workshop',
            year: currentYear,
            month: currentMonth,
            day: 19,
            time: '1:00 PM - 5:00 PM',
            location: 'CCS AVR Room',
            desc: 'Day 2 of our web development boot camp. Shift gears into utility-first CSS using Tailwind CSS, and learn how to implement interactive elements, micro-animations, theme configurations, and deploy your frontend projects to production hosting.',
            speaker: 'Lead Frontend Devs, iCSS',
            registrationLink: '#'
        },
        {
            id: 'evt-5',
            title: 'iCSS Coders Cup: Competitive Programming',
            type: 'competition',
            year: currentYear,
            month: currentMonth,
            day: 25,
            time: '10:00 AM - 4:00 PM',
            location: 'CCS Main Lab',
            desc: 'The annual speed-coding contest! Test your logical, algorithmic, and problem-solving skills under timed pressure. Battle against top CCS minds in Python, Java, or C++. Exciting prizes and certificates await the champions!',
            speaker: 'iCSS Academic Committee',
            registrationLink: '#'
        }
    ];

    // Setup DOM Elements
    const monthYearDisplay = document.getElementById('current-month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const daysGrid = document.getElementById('calendar-days');
    const selectedEventPanel = document.getElementById('selected-event-panel');
    const upcomingEventsList = document.getElementById('upcoming-events-list');
    const upcomingCount = document.getElementById('upcoming-count');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Get color theme utilities by category type
    const getCategoryStyles = (type) => {
        const styles = {
            seminar: {
                label: 'Seminar',
                bg: 'bg-[#75BBF0]/10',
                text: 'text-[#75BBF0]',
                border: 'border-[#75BBF0]/20',
                dot: 'bg-[#75BBF0] shadow-[0_0_8px_#75BBF0]'
            },
            workshop: {
                label: 'Workshop',
                bg: 'bg-[#5abeb0]/10',
                text: 'text-[#5abeb0]',
                border: 'border-[#5abeb0]/20',
                dot: 'bg-[#5abeb0] shadow-[0_0_8px_rgba(90,190,176,0.8)]'
            },
            competition: {
                label: 'Competition',
                bg: 'bg-[#a855f7]/10',
                text: 'text-[#a855f7]',
                border: 'border-[#a855f7]/20',
                dot: 'bg-[#a855f7] shadow-[0_0_8px_rgba(168,85,247,0.8)]'
            },
            meeting: {
                label: 'Meeting',
                bg: 'bg-white/5',
                text: 'text-white/80',
                border: 'border-white/10',
                dot: 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]'
            }
        };
        return styles[type] || styles.meeting;
    };

    // Filter events based on active category
    const getFilteredEvents = () => {
        if (activeFilter === 'all') {
            return eventsData;
        }
        return eventsData.filter(evt => evt.type === activeFilter);
    };

    // Render calendar view
    const renderCalendar = () => {
        daysGrid.innerHTML = '';
        
        // Remove and re-add transition classes to trigger grid transition
        daysGrid.classList.remove('calendar-grid-animate');
        void daysGrid.offsetWidth; // Trigger reflow
        daysGrid.classList.add('calendar-grid-animate');

        const year = navDate.getFullYear();
        const month = navDate.getMonth();

        // Update title
        monthYearDisplay.textContent = `${getMonthName(month)} ${year}`;

        // Get first day of the month index (0: Sun, 1: Mon, etc.)
        const firstDayIndex = new Date(year, month, 1).getDay();

        // Get total days in month
        const totalDays = new Date(year, month + 1, 0).getDate();

        // Render preceding empty spacer elements
        for (let i = 0; i < firstDayIndex; i++) {
            const spacer = document.createElement('div');
            spacer.className = 'empty-day p-2 text-center text-white/10 text-sm';
            daysGrid.appendChild(spacer);
        }

        // Get events in current month view that match the active filter
        const filteredEvents = getFilteredEvents();
        const monthEvents = filteredEvents.filter(evt => evt.year === year && evt.month === month);

        // Render days
        const today = new Date();
        for (let dayNum = 1; dayNum <= totalDays; dayNum++) {
            const dayBtn = document.createElement('button');
            dayBtn.className = 'calendar-day-btn text-sm w-full aspect-square font-medium text-gray-300 relative';
            dayBtn.innerHTML = `<span>${dayNum}</span>`;

            // Check if this date matches "today"
            if (today.getFullYear() === year && today.getMonth() === month && today.getDate() === dayNum) {
                dayBtn.classList.add('today');
            }

            // Check if this date has events
            const dayEvents = monthEvents.filter(evt => evt.day === dayNum);
            if (dayEvents.length > 0) {
                dayBtn.classList.add('has-event');
                // Use the category of the first event for styling indicator
                dayBtn.classList.add(`event-${dayEvents[0].type}`);
            }

            // Check if this date is the selected date
            if (selectedDate && selectedDate.year === year && selectedDate.month === month && selectedDate.day === dayNum) {
                dayBtn.classList.add('active-day');
            }

            // Day click handler
            dayBtn.addEventListener('click', () => {
                // Remove active class from previous active day
                const prevActive = daysGrid.querySelector('.active-day');
                if (prevActive) prevActive.classList.remove('active-day');

                // Set new selected date
                selectedDate = { year, month, day: dayNum };
                dayBtn.classList.add('active-day');

                // Find event for selected day
                const dayEvent = dayEvents[0]; // Gets first event of the day
                if (dayEvent) {
                    selectedEventId = dayEvent.id;
                    renderSelectedEvent(dayEvent.id);
                } else {
                    selectedEventId = null;
                    renderSelectedEvent(null, dayNum);
                }
            });

            daysGrid.appendChild(dayBtn);
        }
    };

    // Render detailed Event Panel on the right
    const renderSelectedEvent = (eventId, selectedDayNum = null) => {
        selectedEventPanel.innerHTML = '';
        
        // Trigger reflow for animations
        selectedEventPanel.style.opacity = '0';
        selectedEventPanel.style.transform = 'translateY(10px)';
        void selectedEventPanel.offsetWidth;
        selectedEventPanel.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        selectedEventPanel.style.opacity = '1';
        selectedEventPanel.style.transform = 'translateY(0)';

        // Find the event
        const event = eventsData.find(evt => evt.id === eventId);

        if (event) {
            const styles = getCategoryStyles(event.type);
            selectedEventPanel.innerHTML = `
                <!-- Background ambient colors inside card -->
                <div class="absolute -top-12 -right-12 w-36 h-36 bg-[#5abeb0]/5 blur-3xl rounded-full"></div>
                <div class="absolute -bottom-12 -left-12 w-36 h-36 bg-[#1b75bc]/5 blur-3xl rounded-full"></div>

                <div class="relative z-10 flex flex-col h-full justify-between">
                    <div>
                        <!-- Category Badge -->
                        <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles.bg} ${styles.text} ${styles.border} mb-4">
                            <span class="w-1.5 h-1.5 rounded-full ${styles.dot}"></span>
                            ${styles.label}
                        </span>

                        <!-- Event Title -->
                        <h3 class="text-xl sm:text-2xl font-black text-white leading-tight mb-4 text-glow-white">
                            ${event.title}
                        </h3>

                        <!-- Description -->
                        <p class="text-xs sm:text-sm text-gray-300 leading-relaxed font-regular mb-6">
                            ${event.desc}
                        </p>

                        <!-- Logistics Details -->
                        <div class="space-y-3.5 mb-6 text-xs sm:text-sm text-gray-400">
                            <div class="flex items-center gap-3">
                                <svg class="w-4 h-4 text-[#75BBF0]" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                                <span class="font-medium text-gray-200">${getMonthName(event.month)} ${event.day}, ${event.year}</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <svg class="w-4 h-4 text-[#75BBF0]" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                <span class="font-medium text-gray-300">${event.time}</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <svg class="w-4 h-4 text-[#75BBF0]" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                                <span class="font-medium text-gray-300 truncate max-w-[280px]">${event.location}</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <svg class="w-4 h-4 text-[#75BBF0]" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="12" cy="7" r="4"></circle>
                                </svg>
                                <span class="font-medium text-gray-300">Speaker: <strong class="text-white">${event.speaker}</strong></span>
                            </div>
                        </div>
                    </div>

                    <!-- Call To Action -->
                    <div class="pt-4 border-t border-white/5 mt-auto">
                        <a href="${event.registrationLink}" class="w-full flex items-center justify-center border-2 border-transparent px-6 py-3 rounded-xl bg-gradient-to-r from-[#75BBF0] to-[#4DA1E0] hover:shadow-glow-accent transition-all duration-300 transform active:scale-95 font-bold text-sm tracking-wide text-white">
                            Register Now
                        </a>
                    </div>
                </div>
            `;
        } else {
            // Render Fallback State
            const formattedDayStr = selectedDayNum ? `${getMonthName(navDate.getMonth())} ${selectedDayNum}` : 'Select a date';
            selectedEventPanel.innerHTML = `
                <div class="absolute -top-12 -right-12 w-36 h-36 bg-[#1b75bc]/3 blur-3xl rounded-full"></div>
                <div class="flex flex-col items-center justify-center text-center h-full min-h-[260px] p-6 relative z-10">
                    <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 mb-4">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                    </div>
                    <h4 class="text-lg font-bold text-white mb-2">${formattedDayStr}</h4>
                    <p class="text-xs text-gray-400 max-w-[240px] leading-relaxed">
                        There are no events scheduled on this day. Explore other dates or select from the upcoming feed below.
                    </p>
                </div>
            `;
        }
    };

    // Render Upcoming Events Feed
    const renderUpcomingFeed = () => {
        upcomingEventsList.innerHTML = '';
        const filteredEvents = getFilteredEvents();

        // Sort events chronologically by day
        const sortedEvents = [...filteredEvents].sort((a, b) => {
            // Compare month and then day
            if (a.month !== b.month) return a.month - b.month;
            return a.day - b.day;
        });

        // Set counts badge
        upcomingCount.textContent = `${sortedEvents.length} Event${sortedEvents.length !== 1 ? 's' : ''}`;

        if (sortedEvents.length === 0) {
            upcomingEventsList.innerHTML = `
                <div class="text-center py-8 text-gray-500 text-xs font-semibold uppercase tracking-wider">
                    No matching events found
                </div>
            `;
            return;
        }

        sortedEvents.forEach(event => {
            const styles = getCategoryStyles(event.type);
            const isSelected = event.id === selectedEventId;

            const item = document.createElement('div');
            item.className = `p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-4 items-center hover-lift select-none ${
                isSelected 
                ? 'bg-gradient-to-r from-white/10 to-white/5 border-[#75BBF0]/50 shadow-[0_0_15px_rgba(117,187,240,0.15)]' 
                : 'bg-white/3 border-white/5 hover:border-white/10 hover:bg-white/5'
            }`;

            item.innerHTML = `
                <!-- Date Circle -->
                <div class="flex-none w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">
                    <span class="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none">${getMonthName(event.month).substring(0, 3)}</span>
                    <span class="text-lg font-black text-white leading-none mt-1">${event.day}</span>
                </div>

                <!-- Event Details Brief -->
                <div class="flex-grow min-w-0">
                    <div class="flex items-center gap-2 mb-1">
                        <span class="inline-block w-1.5 h-1.5 rounded-full ${styles.dot}"></span>
                        <span class="text-[9px] font-bold uppercase tracking-wider ${styles.text}">${styles.label}</span>
                    </div>
                    <h4 class="text-sm font-bold text-white truncate leading-tight hover:text-[#75BBF0] transition-colors">${event.title}</h4>
                    <span class="text-[10px] text-gray-400 block truncate mt-0.5">${event.location}</span>
                </div>
            `;

            // Click event list triggers selected state on calendar & details card
            item.addEventListener('click', () => {
                // Navigate calendar date to event month/year
                navDate = new Date(event.year, event.month, 1);
                selectedDate = { year: event.year, month: event.month, day: event.day };
                selectedEventId = event.id;

                renderCalendar();
                renderSelectedEvent(event.id);
                renderUpcomingFeed(); // refresh classes
            });

            upcomingEventsList.appendChild(item);
        });
    };

    // Initialize calendar functionality
    const initCalendar = () => {
        // Prev Month click
        prevMonthBtn.addEventListener('click', () => {
            navDate.setMonth(navDate.getMonth() - 1);
            renderCalendar();
            renderUpcomingFeed();
        });

        // Next Month click
        nextMonthBtn.addEventListener('click', () => {
            navDate.setMonth(navDate.getMonth() + 1);
            renderCalendar();
            renderUpcomingFeed();
        });

        // Filter button click logic
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                activeFilter = btn.getAttribute('data-filter');
                
                // Re-render calendar and feed
                renderCalendar();
                renderUpcomingFeed();

                // If filter changed, select the first matching event if available
                const filtered = getFilteredEvents();
                if (filtered.length > 0) {
                    const firstEvt = filtered[0];
                    // Navigate to event month
                    navDate = new Date(firstEvt.year, firstEvt.month, 1);
                    selectedDate = { year: firstEvt.year, month: firstEvt.month, day: firstEvt.day };
                    selectedEventId = firstEvt.id;

                    renderCalendar();
                    renderSelectedEvent(firstEvt.id);
                } else {
                    selectedEventId = null;
                    renderSelectedEvent(null);
                }
            });
        });

        // Initial Selection: Auto-select the first event of the current month
        const thisMonthEvents = eventsData.filter(evt => evt.year === currentYear && evt.month === currentMonth);
        if (thisMonthEvents.length > 0) {
            const initialEvent = thisMonthEvents[0];
            selectedDate = { year: initialEvent.year, month: initialEvent.month, day: initialEvent.day };
            selectedEventId = initialEvent.id;
            renderSelectedEvent(initialEvent.id);
        } else {
            renderSelectedEvent(null);
        }

        renderCalendar();
        renderUpcomingFeed();
    };

    // Boot calendar
    initCalendar();
});
