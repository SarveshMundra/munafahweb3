﻿window.setupGrid = function () {
    // Get current theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    
    // Retry mechanism for element selection
    const setupGridCells = () => {
        const gridOverlay = document.querySelector('.grid-overlay');
        if (!gridOverlay) {
            console.log('Grid overlay not found, retrying...');
            setTimeout(setupGridCells, 100); // Retry after 100ms
            return;
        }

        // Get actual viewport dimensions
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Responsive cell size
        const cellSize = viewportWidth <= 768 ? 100 : 200;
        const gap = viewportWidth <= 768 ? 10 : 15;

        // Clear existing cells
        gridOverlay.innerHTML = '';

        // Calculate grid dimensions
        const columns = Math.ceil(viewportWidth / (cellSize + gap));
        const rows = Math.ceil(viewportHeight / (cellSize + gap));
        const totalCells = columns * rows;

        // Create cells
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            gridOverlay.appendChild(cell);
        }

        console.log(`Grid created with ${columns}x${rows} cells`);
    };

    // Start the setup process
    setupGridCells();
};

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(window.setupGrid, 250);
});

// Listen for theme changes
document.addEventListener('themeChanged', () => {
    // Recreate grid with new theme colors
    window.setupGrid();
});

console.log("Enhanced grid setup loaded with theme support");