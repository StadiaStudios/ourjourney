(function() {
    const STORAGE_KEY = '__app_premium_unlocked';
    const EXPIRY_KEY = '__app_premium_expiry';
    const HIDE_BANNER_KEY = '__app_hide_pro_banner';
    
    const isUnlocked = localStorage.getItem(STORAGE_KEY) === "true";
    const expiry = parseInt(localStorage.getItem(EXPIRY_KEY) || "0");
    const isBannerHiddenByChoice = localStorage.getItem(HIDE_BANNER_KEY) === "true";
    const now = Date.now();

    if (isUnlocked && now < expiry) {
        return; 
    }

    if (isBannerHiddenByChoice) {
        return;
    }

    function injectPremiumBanner() {
        const isExpired = !isUnlocked && expiry > 0 && now >= expiry;
        const PURCHASE_URL = "https://google.com";
        const banner = document.createElement('div');
        banner.id = 'premium-banner';
        
        const bannerBg = isExpired 
            ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' 
            : 'linear-gradient(135deg, #be185d 0%, #7a0174 100%)';

        const style = document.createElement('style');
        style.textContent = `
            #premium-banner {
                position: fixed;
                bottom: 20px;
                left: 20px;
                right: 20px;
                background: ${bannerBg};
                color: white;
                padding: 16px;
                border-radius: 16px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
                z-index: 1000;
                font-family: 'Inter', sans-serif;
                animation: slideUp 0.5s ease-out;
            }
            @keyframes slideUp {
                from { transform: translateY(100px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .premium-content { flex: 1; }
            .premium-title { font-weight: 800; font-size: 16px; display: flex; align-items: center; gap: 6px; }
            .premium-subtitle { font-size: 12px; opacity: 0.9; margin-top: 2px; }
            .purchase-btn-link {
                background: white;
                color: #be185d;
                padding: 8px 16px;
                border-radius: 12px;
                font-weight: 700;
                font-size: 14px;
                text-decoration: none;
                white-space: nowrap;
                margin-left: 12px;
                transition: transform 0.2s;
            }
            .purchase-btn-link:active { transform: scale(0.95); }
        `;
        document.head.appendChild(style);

        const titleText = isExpired ? "OurJourney Pro Expired" : "OurJourney Pro";
        const subtitleText = isExpired ? "Please reactivate your session" : "Unlock Custom App Themes";
        const buttonText = isExpired ? "Reactivate" : "Get Pro • $2.99";

        banner.innerHTML = `
            <div class="premium-content">
                <div class="premium-title">
                    <span>${titleText}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="color:#fbbf24;"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <div class="premium-subtitle">${subtitleText}</div>
            </div>
            <a href="${isExpired ? '#' : PURCHASE_URL}" class="purchase-btn-link" id="premium-banner-btn">${buttonText}</a>
        `;
        document.body.appendChild(banner);

        if (isExpired) {
            document.getElementById('premium-banner-btn').onclick = (e) => {
                e.preventDefault();
                location.reload();
            };
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectPremiumBanner);
    } else {
        injectPremiumBanner();
    }
})();