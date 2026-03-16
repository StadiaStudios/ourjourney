document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (!darkModeToggle) return;

    const toggleContainer = darkModeToggle.closest('.flex.items-center.justify-between');

    if (toggleContainer) {
        const resetBtn = document.createElement('button');
        resetBtn.id = 'resetThemeBtn';
        resetBtn.className = 'w-full bg-dark-100 hover:bg-red-50 text-gray-600 hover:text-red-600 font-bold py-3 rounded-xl transition border border-gray-200 mt-4 mb-2';
        resetBtn.innerHTML = 'Reset Theme to Default';

        toggleContainer.parentNode.insertBefore(resetBtn, toggleContainer.nextSibling);

        resetBtn.addEventListener('click', () => {
            localStorage.removeItem('__app_custom_theme_file');
            
            localStorage.setItem('__app_theme', 'dark');

            if (typeof showMessage === 'function') {
                showMessage('Theme reset to Default Dark Mode!', 'bg-green-600');
            }

            setTimeout(() => {
                window.location.reload();
            }, 800);
        });
    }
});