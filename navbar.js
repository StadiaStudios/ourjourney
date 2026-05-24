document.addEventListener('DOMContentLoaded', () => {
    // 1. Define the Navbar Component HTML (h1 replaced with id="mainTitle" to populate couple names later)
    const navbarHTML = `
        <header class="sticky-header">
            <div class="nav-container">
                <button id="hamburgerBtn" class="hamburger-btn">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <h1 id="mainTitle">Our Journey</h1>
                <div style="width: 24px;"></div>
            </div>
            
            <nav id="sidebarMenu" class="sidebar">
                <a href="splash.html" id="homeLink">Tracker</a>
                <a href="settings.html" id="settingsLink">Settings</a>
            </nav>
            <div id="sidebarOverlay" class="overlay"></div>
        </header>
    `;

    // 2. Inject the Navbar into the beginning of the body
    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    // 3. Set couple names in navbar, fallback to "Our Journey" if not set or both blank
    const COUPLE_NAMES_KEY = '__couple_names';
    function setNavbarCoupleNames() {
        const mainTitle = document.getElementById('mainTitle');
        let names = null, display = '';
        try {
            names = JSON.parse(localStorage.getItem(COUPLE_NAMES_KEY));
        } catch (e) { /* ignore */ }
        if (Array.isArray(names) && (names[0]?.trim() || names[1]?.trim())) {
            const name1 = (names[0] || '').trim();
            const name2 = (names[1] || '').trim();
            // Show "Name1 & Name2". If only one name set, just show that.
            if (name1 && name2) {
                display = `${name1} & ${name2}`;
            } else if (name1) {
                display = name1;
            } else if (name2) {
                display = name2;
            }
        }
        mainTitle.textContent = display || 'Our Journey';
    }
    setNavbarCoupleNames();

    // 4. Initialize Navbar Logic (Sidebar)
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    // --- BEGIN: Overlay Fullscreen Darkening Fix
    // Ensure overlay covers the entire viewport and applies a dark background
    sidebarOverlay.style.position = 'fixed';
    sidebarOverlay.style.top = '0';
    sidebarOverlay.style.left = '0';
    sidebarOverlay.style.width = '100vw';
    sidebarOverlay.style.height = '100vh';
    sidebarOverlay.style.background = 'rgba(0,0,0,0.48)';
    sidebarOverlay.style.transition = 'opacity 0.24s';
    sidebarOverlay.style.opacity = '0';
    sidebarOverlay.style.pointerEvents = 'none';
    sidebarOverlay.style.zIndex = '99';
    // Add or remove "active" styling via classList below

    // Patch active state to control opacity and pointer events
    function setSidebarOverlayActive(isActive) {
        if (isActive) {
            sidebarOverlay.classList.add('active');
            sidebarOverlay.style.opacity = '1';
            sidebarOverlay.style.pointerEvents = 'auto';
        } else {
            sidebarOverlay.classList.remove('active');
            sidebarOverlay.style.opacity = '0';
            sidebarOverlay.style.pointerEvents = 'none';
        }
    }
    // --- END: Overlay Fullscreen Darkening Fix

    // Sidebar Toggle Function
    function toggleSidebar() {
        const isActive = !sidebarMenu.classList.contains('active');
        sidebarMenu.classList.toggle('active', isActive);
        setSidebarOverlayActive(isActive);
    }

    hamburgerBtn.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', toggleSidebar);

    // Optionally listen for localStorage changes for live update if settings.html is open in another tab
    window.addEventListener('storage', (event) => {
        if (event.key === COUPLE_NAMES_KEY) {
            setNavbarCoupleNames();
        }
    });
});