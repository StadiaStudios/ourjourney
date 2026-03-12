/**
 * premium.js - Pro purchase banner with Expired State detection
 */
(function() {
    const STORAGE_KEY = '__app_premium_unlocked';
    const EXPIRY_KEY = '__app_premium_expiry';
    
    // Check current status
    const isUnlocked = localStorage.getItem(STORAGE_KEY) === "true";
    const expiry = parseInt(localStorage.getItem(EXPIRY_KEY) || "0");
    const now = Date.now();

    // If currently active and valid, don't show the banner at all
    if (isUnlocked && now < expiry) {
        console.log("Pro active: Banner suppressed.");
        return; 
    }

    function injectPremiumBanner() {
        // Detect if we are in the "Expired" state
        // It's expired if we aren't unlocked but an expiry date exists in the past
        const isExpired = !isUnlocked && expiry > 0 && now >= expiry;
        
        const PURCHASE_URL = "https://google.com";
        const banner = document.createElement('div');
        banner.id = 'premium-banner';
        
        // Use orange theme for expired state, pink/purple for default
        const bannerBg = isExpired 
            ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' 
            : 'linear-gradient(135deg, #be185d 0%, #7a0174 100%)';
        
        const btnColor = isExpired ? '#d97706' : '#be185d';

        const style = document.createElement('style');
        style.textContent = `
            #premium-banner {
                position: fixed; bottom: 0; left: 0; right: 0;
                background: ${bannerBg};
                color: white; padding: 16px 20px; display: flex;
                align-items: center; justify-content: space-between;
                box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.15); z-index: 1000;
                font-family: 'Inter', sans-serif; border-top: 1px solid rgba(255, 255, 255, 0.2);
                transition: all 0.3s ease;
            }
            .premium-title { font-weight: 800; display: flex; align-items: center; gap: 8px; }
            .premium-subtitle { font-size: 0.8rem; opacity: 0.9; }
            .purchase-btn-link { 
                background: white; color: ${btnColor}; padding: 10px 18px; 
                border-radius: 99px; font-weight: 700; text-decoration: none; font-size: 0.9rem;
                box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            }
        `;
        document.head.appendChild(style);

        // Update text based on state
        const titleText = isExpired ? "OurJourney Pro Expired" : "OurJourney Pro";
        const subtitleText = isExpired ? "Please reactivate your session" : "Unlock Custom App Themes";
        const buttonText = isExpired ? "Reactivate" : "Get Pro • $4.99";

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

        // If expired, the button just triggers a reload to show the lock screen again
        if (isExpired) {
            document.getElementById('premium-banner-btn').onclick = (e) => {
                e.preventDefault();
                location.reload();
            };
        }
    }

    if (document.readyState === 'complete') {
        injectPremiumBanner();
    } else {
        window.addEventListener('load', injectPremiumBanner);
    }
})();