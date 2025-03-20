// Theme Switcher
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark theme
    setTheme(savedTheme);

    // Set up theme toggle functionality for desktop
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Set initial state based on current theme
        updateSwitchState(savedTheme);

        // Add click event listener
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            updateSwitchState(newTheme);
        });
    }

        // Set up theme toggle functionality for mobile
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    if (mobileThemeToggle) {
        // Set initial state based on current theme
        updateSwitchState(savedTheme);

        // Add click event listener
        mobileThemeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            updateSwitchState(newTheme);
        });
    }
});

// Function to set theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // Signal to other scripts that theme has changed
    const event = new CustomEvent('themeChanged', { detail: { theme } });
    document.dispatchEvent(event);

    // Update media sources based on the new theme
    updateMediaSources(theme); // Ensure this function is called
}

// Function to update the switch state
function updateSwitchState(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    if (!themeToggle || !mobileThemeToggle) return;

    if (theme === 'dark') {
        themeToggle.classList.remove('light-mode');
        themeToggle.classList.add('dark-mode');
        mobileThemeToggle.classList.remove('light-mode');
        mobileThemeToggle.classList.add('dark-mode');
    } else {
        themeToggle.classList.remove('dark-mode');
        themeToggle.classList.add('light-mode');
        mobileThemeToggle.classList.remove('dark-mode');
        mobileThemeToggle.classList.add('light-mode');
    }
}



// Function to update media sources based on theme
function updateMediaSources(theme) {
    // Only update elements with the 'theme-aware' class
    const themeAwareElements = document.querySelectorAll('.theme-aware');

    themeAwareElements.forEach(element => {
        // For videos, we need to update the source element
        if (element.tagName === 'VIDEO') {
            const source = element.querySelector('source');
            if (source) {
                const darkSrc = source.getAttribute('data-dark-src');
                const lightSrc = source.getAttribute('data-light-src');

                if (darkSrc && lightSrc) {
                    // Set the appropriate source based on theme
                    const newSrc = theme === 'light' ? lightSrc : darkSrc;
                    const currentSrc = source.getAttribute('src');

                    // Only update if the source has changed
                    if (newSrc !== currentSrc) {
                        source.setAttribute('src', newSrc);
                        // Reload the video
                        element.load();
                        element.play();
                    }
                }
            }
        }
    });
}