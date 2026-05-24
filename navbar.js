document.addEventListener('DOMContentLoaded', () => {
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
                <a href="tos.html" rel="noopener">Terms Of Service</a>
                <a href="settings.html" id="settingsLink">Settings</a>
                <a href="https://stadiastudios.github.io/stadia/" id="stadiaStudiosLink" target="_blank" rel="noopener">StadiaStudios</a>
            </nav>
            <div id="sidebarOverlay" class="overlay"></div>
        </header>
    `;

    document.body.insertAdjacentHTML('afterbegin', navbarHTML);

    const COUPLE_NAMES_KEY = '__couple_names';
    function setNavbarCoupleNames() {
        const mainTitle = document.getElementById('mainTitle');
        let names = null, display = '';
        try {
            names = JSON.parse(localStorage.getItem(COUPLE_NAMES_KEY));
        } catch (e) {}
        if (Array.isArray(names) && (names[0]?.trim() || names[1]?.trim())) {
            const name1 = (names[0] || '').trim();
            const name2 = (names[1] || '').trim();
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

    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

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

    function toggleSidebar() {
        const isActive = !sidebarMenu.classList.contains('active');
        sidebarMenu.classList.toggle('active', isActive);
        setSidebarOverlayActive(isActive);
    }

    hamburgerBtn.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', toggleSidebar);

    window.addEventListener('storage', (event) => {
        if (event.key === COUPLE_NAMES_KEY) {
            setNavbarCoupleNames();
        }
    });
});