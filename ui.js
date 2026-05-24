const THEMES = {
    dark: 'themes/dark.css',
    light: 'themes/lightmode.css',
    pink: 'themes/pink.css',
    moogle: 'themes/moogle.css',
    purple: 'themes/purple.css',
    xmas: 'themes/xmas.css',
    spooky: 'themes/spooky.css',
};

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

document.addEventListener('DOMContentLoaded', () => {
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

    const savedTheme = localStorage.getItem('__app_theme') || 'dark';
    loadTheme(savedTheme);

    themeToggle?.addEventListener('click', (e) => {
        e.preventDefault();
        const current = localStorage.getItem('__app_theme') || 'dark';
        const keys = Object.keys(THEMES);
        let idx = keys.indexOf(current);
        let nextTheme = keys[(idx + 1) % keys.length];
        loadTheme(nextTheme);
        toggleSidebar();
    });

    const themeSelect = document.getElementById('themeSelect');
    if (themeSelect) {
        themeSelect.innerHTML = '';
        for (const key in THEMES) {
            const opt = document.createElement('option');
            opt.value = key;
            opt.textContent = key.charAt(0).toUpperCase() + key.slice(1);
            themeSelect.appendChild(opt);
        }
        const currentTheme = localStorage.getItem('__app_theme') || 'dark';
        themeSelect.value = currentTheme;
        themeSelect.addEventListener('change', (e) => {
            loadTheme(e.target.value);
        });
    }
});