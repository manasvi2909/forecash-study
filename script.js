document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animations
    const animatedElements = document.querySelectorAll('.animate-up');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, rootMargin: '0px', threshold: 0.15 });

    animatedElements.forEach(el => observer.observe(el));

    // 2. Journey Track Active State (highlight node when section scrolls into view)
    const journeySections = document.querySelectorAll('.showcase-section, .journey-section');
    const journeyLinks = document.querySelectorAll('.journey-track .node');

    const journeyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                journeyLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    journeySections.forEach(sec => journeyObserver.observe(sec));

    // 3. Initialise all theme-switchable images to 'light' mode
    document.querySelectorAll('.theme-switchable img').forEach(img => {
        if (!img.dataset.mode) {
            img.dataset.mode = 'light';
        }
    });
});

// ─── HELPERS ───────────────────────────────────────────────────────────────

/**
 * Get the current carousel index for an image (defaulting to 0).
 */
function getIdx(img) {
    return parseInt(img.dataset.idx || '0');
}

/**
 * Given an img element, the desired mode ('light'|'dark') and the current index,
 * return the correct src filename.
 */
function getSrc(img, mode, idx) {
    const key = mode === 'light' ? img.dataset.light : img.dataset.dark;
    if (!key) return img.src; // fallback — should never happen
    if (key.includes(',')) {
        const parts = key.split(',');
        return parts[idx % parts.length].trim();
    }
    return key.trim();
}

// ─── PUBLIC FUNCTIONS ───────────────────────────────────────────────────────

/**
 * Toggle between light and dark mode for a single-image or carousel image.
 * @param {string}      imageId   - id of the <img> element
 * @param {HTMLElement} btnElement - the toggle button that was clicked
 * @param {string|null} headerId  - optional id of a browser-header element
 */
function toggleTheme(imageId, btnElement, headerId = null) {
    const img = document.getElementById(imageId);
    const currentMode = img.dataset.mode || 'light';
    const newMode = currentMode === 'light' ? 'dark' : 'light';
    const idx = getIdx(img);

    img.style.opacity = '0';

    setTimeout(() => {
        img.src = getSrc(img, newMode, idx);
        img.dataset.mode = newMode;

        if (newMode === 'dark') {
            btnElement.innerHTML = `<i data-lucide="sun"></i> Light Mode`;
            btnElement.style.background = 'rgba(255, 255, 255, 0.9)';
            btnElement.style.color = '#0F172A';
            if (headerId) document.getElementById(headerId).classList.add('dark-header');
        } else {
            btnElement.innerHTML = `<i data-lucide="moon"></i> Dark Mode`;
            btnElement.style.background = 'rgba(15, 23, 42, 0.85)';
            btnElement.style.color = 'white';
            if (headerId) document.getElementById(headerId).classList.remove('dark-header');
        }

        if (window.lucide) window.lucide.createIcons();
        img.style.opacity = '1';
    }, 150);
}

/**
 * Advance the carousel index while preserving the current light/dark mode.
 * @param {string} imageId - id of the <img> element
 */
function nextCarouselState(imageId, dotsId = null) {
    const img = document.getElementById(imageId);
    const currentMode = img.dataset.mode || 'light';
    const key = img.dataset.light; // use light array to determine total screens
    const total = key.includes(',') ? key.split(',').length : 1;

    let idx = getIdx(img);
    idx = (idx + 1) % total;
    img.dataset.idx = idx.toString();

    img.style.opacity = '0';
    setTimeout(() => {
        img.src = getSrc(img, currentMode, idx);
        img.style.opacity = '1';
    }, 150);

    // update dot indicators if provided
    if (dotsId) updateDots(dotsId, idx);
}

/** Update carousel dot active state */
function updateDots(dotsId, activeIdx) {
    const container = document.getElementById(dotsId);
    if (!container) return;
    container.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIdx);
    });
}

/** Jump to a specific slide index for any carousel image */
function goToCarouselSlide(imageId, dotsId, idx) {
    const img = document.getElementById(imageId);
    if (!img) return;
    const currentMode = img.dataset.mode || 'light';
    img.dataset.idx = idx.toString();
    img.style.opacity = '0';
    setTimeout(() => {
        img.src = getSrc(img, currentMode, idx);
        img.style.opacity = '1';
    }, 150);
    if (dotsId) updateDots(dotsId, idx);
}

function goToDashSlide(idx)     { goToCarouselSlide('img-dashboard', 'dots-dashboard', idx); }
function goToSettingsSlide(idx) { goToCarouselSlide('img-settings',  'dots-settings',  idx); }


/**
 * Advance a simple single-array carousel (no light/dark split).
 * @param {string}      imageId    - id of the <img> element
 * @param {HTMLElement} btnElement - button element (unused, kept for API compat)
 */
function nextEmptyState(imageId, btnElement) {
    const img = document.getElementById(imageId);
    const screens = img.dataset.screens.split(',');
    let idx = getIdx(img);

    idx = (idx + 1) % screens.length;
    img.dataset.idx = idx.toString();

    img.style.opacity = '0';
    setTimeout(() => {
        img.src = screens[idx].trim();
        img.style.opacity = '1';
    }, 150);
}
