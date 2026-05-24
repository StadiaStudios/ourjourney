window.renderAnniversaries = function(startDate) {
    const container = document.getElementById('anniversarySection');
    if (!container || isNaN(startDate.getTime())) return;

    const now = new Date();
    const milestones = [];

    // Date math helpers
    const addYears = (d, n) => new Date(d.getFullYear() + n, d.getMonth(), d.getDate());
    const addMonths = (d, n) => new Date(d.getFullYear(), d.getMonth() + n, d.getDate());
    const addDays = (d, n) => new Date(d.getTime() + n * 86400000);

    // Yearly (from 1 to 25)
    for (let i = 1; i <= 25; i++) {
        const d = addYears(startDate, i);
        if (d > now) milestones.push({
            date: d,
            icon: "💍",
            label: `${i} Year Anniversary`
        });
    }

    // Every 6 months, up to 240 (20 years)
    for (let i = 6; i <= 240; i += 6) {
        const d = addMonths(startDate, i);
        if (d > now) milestones.push({
            date: d,
            icon: "✨",
            label: `${i} Months Together`
        });
    }

    // Big day counts 
    [100, 365, 500, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000].forEach(days => {
        const d = addDays(startDate, days);
        if (d > now) milestones.push({
            date: d,
            icon: "🎯",
            label: `${days} Days Milestone`
        });
    });

    // Sort and take top 3 next
    milestones.sort((a, b) => a.date - b.date);
    const upcoming = milestones.slice(0, 3);

    if (upcoming.length === 0) return;

    let html = `<p class="subtitle mt-3">Upcoming Milestones</p>`;

    function fancyDate(dateObj) {
        // e.g. "Jun 16, 2026"
        return dateObj.toLocaleDateString(undefined, {
            month: "short", day: "numeric", year: "numeric"
        });
    }

    upcoming.forEach(ms => {
        const diffDays = Math.ceil((ms.date - now) / 86400000);
        const dateStr = fancyDate(ms.date);

        html += `
            <div class="milestone-card" style="display: flex; align-items: start; gap: 1.2em; margin-bottom: 1.7em; padding: 1.1em 1.3em;">
                <div style="font-size: 2.1em; line-height: 1;">${ms.icon}</div>
                <div style="flex: 1;">
                    <div style="font-size: 1.08em; font-weight: 700; color: var(--text-primary); margin-bottom: 0.1em;">${ms.label}</div>
                    <div style="color: var(--text-secondary); font-size: 1em; margin-bottom: 0.26em;">${dateStr}</div>
                    <div style="color: var(--accent-color); font-weight: bold; font-size: 0.98em;">in ${diffDays} days</div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    container.classList.remove('hidden');
};