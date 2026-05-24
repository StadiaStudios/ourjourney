// Theme definitions - just add new keys for available themes
const THEMES = {
    dark: 'themes/dark.css',
    light: 'themes/lightmode.css',
    pink: 'themes/pink.css',
};

// This will insert or update the theme <link> in <head>
function loadTheme(theme) {
    let themeLink = document.getElementById('themeStylesheet');
    if (!themeLink) {
        themeLink = document.createElement('link');
        themeLink.rel = 'stylesheet';
        themeLink.id = 'themeStylesheet';
        document.head.appendChild(themeLink);
    }
    themeLink.href = THEMES[theme] || THEMES['dark'];
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('__app_theme', theme);
}

// Run after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Controls (unchanged)
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebarMenu = document.getElementById('sidebarMenu');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const themeToggle = document.getElementById('themeToggle');

    function toggleSidebar() {
        sidebarMenu.classList.toggle('active');
        sidebarOverlay.classList.toggle('active');
    }

    hamburgerBtn?.addEventListener('click', toggleSidebar);
    sidebarOverlay?.addEventListener('click', toggleSidebar);

    // Load theme from storage or fallback to dark
    const savedTheme = localStorage.getItem('__app_theme') || 'dark';
    loadTheme(savedTheme);

    // Theme toggle (simple cycling, for now just dark <-> light)
    themeToggle?.addEventListener('click', (e) => {
        e.preventDefault();
        const current = localStorage.getItem('__app_theme') || 'dark';
        const keys = Object.keys(THEMES);
        let idx = keys.indexOf(current);
        let nextTheme = keys[(idx + 1) % keys.length];
        loadTheme(nextTheme);
        toggleSidebar();
    });

    // --- Theme dropdown for settings.html ---
    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) {
        // Populate options dynamically in case themes are added later
        themeSelect.innerHTML = '';
        for (const key in THEMES) {
            const opt = document.createElement('option');
            opt.value = key;
            opt.textContent = key.charAt(0).toUpperCase() + key.slice(1);
            themeSelect.appendChild(opt);
        }
        // Set current value
        const currentTheme = localStorage.getItem('__app_theme') || 'dark';
        themeSelect.value = currentTheme;
        // Handle selection change
        themeSelect.addEventListener('change', (e) => {
            loadTheme(e.target.value);
        });
    }
});