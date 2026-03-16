(async function() {
    const EXPECTED_HASH = "0b53b54e85feb3c5031da9beaa28ba5dbdcb921bb980ad6d97f0fc88f1b94665"; 
    const STORAGE_KEY = "__app_premium_unlocked";
    const EXPIRY_KEY = "__app_premium_expiry";
    const LOCK_DURATION_MS = 40 * 60 * 1000; 

    async function sha256(message) {
        const msgUint8 = new TextEncoder().encode(message);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }

    function checkLockStatus() {
        const isUnlocked = localStorage.getItem(STORAGE_KEY) === "true";
        const expiryTime = parseInt(localStorage.getItem(EXPIRY_KEY) || "0");
        const currentTime = Date.now();

        if (isUnlocked && currentTime > expiryTime) {
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(EXPIRY_KEY);
            location.reload(); 
            return false;
        }
        return isUnlocked;
    }

    // Initialize logic
    if (checkLockStatus()) {
        // --- HIDE BANNER LOGIC ---
        const hideBannerStyle = document.createElement('style');
        hideBannerStyle.textContent = '#premium-banner { display: none !important; }';
        document.head.appendChild(hideBannerStyle);
        
        const expiry = parseInt(localStorage.getItem(EXPIRY_KEY));
        const timeRemaining = expiry - Date.now();
        setTimeout(() => {
            localStorage.removeItem(STORAGE_KEY);
            localStorage.removeItem(EXPIRY_KEY);
            location.reload();
        }, timeRemaining);
        return;
    }

    // UI Overlay (Locked State)
    const overlay = document.createElement('div');
    overlay.id = "premium-lock-overlay";
    overlay.style = `position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(15, 15, 15, 0.4);backdrop-filter:blur(35px);-webkit-backdrop-filter:blur(35px);z-index:999999;display:flex;align-items:center;justify-content:center;font-family:sans-serif;`;
    overlay.innerHTML = `
        <div style="background:#111;padding:40px;border-radius:30px;box-shadow:0 25px 60px rgba(0,0,0,0.2);text-align:center;max-width:360px;width:90%;border:1px solid rgba(0,0,0,0.05);">
            <div style="font-size:50px;margin-bottom:15px;">⭐</div>
            <h2 style="margin:0;font-weight:800;font-size:24px;">Pro Features</h2>
            <p style="color:#666;font-size:15px;margin:10px 0 30px;">Enter your 40-minute access code.</p>
            <input type="password" id="premium-code-input" placeholder="Enter Code" style="width:100%;padding:15px;border:2px solid #525252;border-radius:15px;margin-bottom:15px;background-color:#222;text-align:center;outline:none;font-size:18px;">
            <button id="premium-unlock-btn" style="width:100%;padding:15px;background:#db2777;color:white;border:none;border-radius:15px;font-weight:700;cursor:pointer;">Unlock Now</button>
            <p id="lock-error" style="color:#ef4444;font-size:13px;margin-top:15px;display:none;">Invalid Code.</p><br><br>
            <a href="splash.html"><button style="width:100%;padding:15px;background:#111;color:white;border:1px white solid;border-radius:15px;font-weight:700;cursor:pointer;">Go Back</button></a>
        </div>`;
    document.body.appendChild(overlay);

    const input = document.getElementById('premium-code-input');
    const btn = document.getElementById('premium-unlock-btn');
    const error = document.getElementById('lock-error');

    btn.onclick = async () => {
        const hashedAttempt = await sha256(input.value.trim());
        if (hashedAttempt === EXPECTED_HASH) {
            localStorage.setItem(STORAGE_KEY, "true");
            localStorage.setItem(EXPIRY_KEY, (Date.now() + LOCK_DURATION_MS).toString());
            location.reload();
        } else {
            error.style.display = "block";
            input.value = "";
        }
    };
})();