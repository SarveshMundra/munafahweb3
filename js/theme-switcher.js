// Theme Switcher
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved user preference
    const savedTheme = localStorage.getItem('theme') || 'dark'; // Default to dark theme
    setTheme(savedTheme);
    
    // Set up theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        // Set initial icon based on current theme
        updateThemeIcon(savedTheme);
        
        // Add click event listener
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            updateThemeIcon(newTheme);
        });
    }
});

// Function to set theme
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    // Update video sources and images based on theme
    updateMediaSources(theme);
    
    // Signal to other scripts that theme has changed
    const event = new CustomEvent('themeChanged', { detail: { theme } });
    document.dispatchEvent(event);
}

// Function to update theme toggle icon
function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    
    // Update icon
    if (theme === 'dark') {
        themeToggle.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
        `;
        themeToggle.setAttribute('title', 'Switch to Light Mode');
    } else {
        themeToggle.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        `;
        themeToggle.setAttribute('title', 'Switch to Dark Mode');
    }
}

// Function to update media sources based on theme
function updateMediaSources(theme) {
    // Update background videos
    const backgroundVideos = document.querySelectorAll('.background-video, .platform-video');
    backgroundVideos.forEach(video => {
        const currentSrc = video.querySelector('source').getAttribute('src');
        if (currentSrc) {
            let newSrc;
            if (theme === 'light') {
                // If current src doesn't already have 'lite' in it
                if (!currentSrc.includes('lite')) {
                    // Insert 'lite' before the file extension
                    newSrc = currentSrc.replace(/(\.[^.]+)$/, 'lite$1');
                } else {
                    newSrc = currentSrc;
                }
            } else {
                // Remove 'lite' if it exists
                newSrc = currentSrc.replace('lite.', '.');
            }
            
            // Only update if the source has changed
            if (newSrc !== currentSrc) {
                video.querySelector('source').setAttribute('src', newSrc);
                // Reload the video
                video.load();
                video.play();
            }
        }
    });
    
    // Update images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const currentSrc = img.getAttribute('src');
        if (currentSrc) {
            let newSrc;
            if (theme === 'light') {
                // If current src doesn't already have 'lite' in it
                if (!currentSrc.includes('lite')) {
                    // Insert 'lite' before the file extension
                    newSrc = currentSrc.replace(/(\.[^.]+)$/, 'lite$1');
                } else {
                    newSrc = currentSrc;
                }
            } else {
                // Remove 'lite' if it exists
                newSrc = currentSrc.replace('lite.', '.');
            }
            
            // Only update if the source has changed
            if (newSrc !== currentSrc) {
                img.setAttribute('src', newSrc);
            }
        }
    });
}