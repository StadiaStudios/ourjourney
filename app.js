document.addEventListener('DOMContentLoaded', () => {
    const STORAGE_KEY_DATE = '__relationship_start_date';
    const STORAGE_KEY_PHOTO = '__relationship_photo';

    // DOM Elements
    const setupSection = document.getElementById('setupSection');
    const timerSection = document.getElementById('timerSection');
    const photoSection = document.getElementById('photoSection');
    const startDateInput = document.getElementById('startDateInput');
    const saveDateBtn = document.getElementById('saveDateBtn');
    
    // Photo Elements
    const photoContainer = document.getElementById('photoContainer');
    const photoUpload = document.getElementById('photoUpload');
    const uploadedImage = document.getElementById('uploadedImage');
    const photoPlaceholder = document.getElementById('photoPlaceholder');

    let timerInterval = null;

    // Initialize App
    function init() {
        const savedDate = localStorage.getItem(STORAGE_KEY_DATE);
        const savedPhoto = localStorage.getItem(STORAGE_KEY_PHOTO);

        if (savedPhoto) displayPhoto(savedPhoto);

        if (savedDate) {
            setupSection.classList.add('hidden');
            timerSection.classList.remove('hidden');
            photoSection.classList.remove('hidden');
            startTimer(new Date(savedDate));
            if (window.renderAnniversaries) window.renderAnniversaries(new Date(savedDate));
        } else {
            setupSection.classList.remove('hidden');
        }
    }

    // Save Date Handler
    saveDateBtn.addEventListener('click', () => {
        if (!startDateInput.value) return;
        localStorage.setItem(STORAGE_KEY_DATE, startDateInput.value);
        init();
    });

    // Photo Upload Handler
    photoContainer.addEventListener('click', () => photoUpload.click());
    
    photoUpload.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const base64 = event.target.result;
                localStorage.setItem(STORAGE_KEY_PHOTO, base64);
                displayPhoto(base64);
            };
            reader.readAsDataURL(file);
        }
    });

    function displayPhoto(base64) {
        uploadedImage.src = base64;
        uploadedImage.classList.remove('hidden');
        photoPlaceholder.classList.add('hidden');
    }

    // Timer Logic
    function startTimer(startDate) {
        if (timerInterval) clearInterval(timerInterval);
        
        const updateUI = () => {
            const now = new Date();
            if (startDate > now) return; // Future date check

            let years = now.getFullYear() - startDate.getFullYear();
            let months = now.getMonth() - startDate.getMonth();
            let days = now.getDate() - startDate.getDate();

            if (days < 0) {
                months--;
                const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                days += lastMonth.getDate();
            }
            if (months < 0) {
                years--;
                months += 12;
            }

            // Render primary list
            const list = document.getElementById('durationList');
            list.innerHTML = '';
            
            if (years > 0) list.innerHTML += `<li><span>${years}</span> ${years === 1 ? 'Year' : 'Years'}</li>`;
            if (months > 0) list.innerHTML += `<li><span>${months}</span> ${months === 1 ? 'Month' : 'Months'}</li>`;
            list.innerHTML += `<li><span>${days}</span> ${days === 1 ? 'Day' : 'Days'}</li>`;

            // Render alternate stats (Total days, weeks, etc.)
            const totalDays = Math.floor((now - startDate) / 86400000);
            const totalWeeks = Math.floor(totalDays / 7);
            const totalMonths = (years * 12) + months;

            document.getElementById('altStatsContainer').innerHTML = `
                <p><strong>${totalMonths}</strong> months</p>
                <p><strong>${totalWeeks}</strong> weeks</p>
                <p><strong>${totalDays}</strong> days</p>
            `;
        };

        updateUI();
        timerInterval = setInterval(updateUI, 60000); // Update every minute
    }

    init();
});