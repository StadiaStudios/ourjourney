window.renderAnniversaries = function(startDate) {
    const container = document.getElementById('anniversaryContainer');
    if (!container) return;

    const now = new Date();
    const milestones = [];

    for (let i = 1; i <= 10; i++) {
        const date = new Date(startDate);
        date.setFullYear(startDate.getFullYear() + i);
        if (date > now) {
            milestones.push({ date, label: `${i} Year Anniversary`, icon: '💍' });
            if (milestones.length >= 2) break;
        }
    }

    for (let i = 5; i <= 120; i += 5) {
        const date = new Date(startDate);
        date.setMonth(startDate.getMonth() + i);
        if (date > now) {
            milestones.push({ date, label: `${i} Months Together`, icon: '✨' });
            break; // Just show the next one
        }
    }

    const dayTargets = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1500, 2000, 2500, 3000];
    for (let target of dayTargets) {
        const date = new Date(startDate.getTime() + (target * 24 * 60 * 60 * 1000));
        if (date > now) {
            milestones.push({ date, label: `${target} Days Milestone`, icon: '🎯' });
            break; // Just show the next one
        }
    }

    milestones.sort((a, b) => a.date - b.date);

    const upcoming = milestones.slice(0, 3);

    let html = `
        <div class="text-left mt-4 animate-fade-in">
            <h3 class="text-xs font-bold text-gray-600 uppercase tracking-widest mb-4 flex items-center">
                <span class="mr-2">Upcoming Milestones</span>
                <div class="flex-grow border-t border-pink-200"></div>
            </h3>
            <div class="space-y-3">
    `;

    upcoming.forEach(ms => {
        const diffTime = Math.abs(ms.date - now);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const dateStr = ms.date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

        html += `
            <div class="milestone-card flex items-center justify-between p-4 bg-white border border-pink-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div class="flex items-center space-x-4">
                    <div class="text-2xl">${ms.icon}</div>
                    <div>
                        <p class="text-sm font-bold text-gray-700">${ms.label}</p>
                        <p class="text-xs text-gray-500">${dateStr}</p>
                    </div>
                </div>
                <div class="text-right">
                    <span class="text-xs font-bold px-2 py-1 bg-pink-50 text-pink-600 rounded-full">
                        in ${diffDays} days
                    </span>
                </div>
            </div>
        `;
    });

    html += `</div></div>`;
    container.innerHTML = html;
};