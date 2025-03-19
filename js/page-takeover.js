document.addEventListener('DOMContentLoaded', () => {
    // Wait a bit for all other scripts to initialize
    setTimeout(() => {
      // Check if GSAP and ScrollTrigger are available
      if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error('GSAP or ScrollTrigger not found');
        return;
      }
  
      console.log('Page takeover script running');
      
      // Only run on desktop/tablet
      if (window.innerWidth <= 768) {
        console.log('Skipping page takeover on mobile');
        return;
      }
  
      // Define sections
      const sections = [
        '.hero-section',
        '.services-section.services-split-screen',
        '.features-section',
        '.cross-platform-section'
      ];
  
      // Create animated transitions between sections
      sections.forEach((section, index) => {
        if (index === 0) return; // Skip first section
        
        console.log(`Setting up animation for ${section}`);
        
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "top 20%",
            scrub: 1,
          },
          y: '50%',
          opacity: 0.5,
          scale: 0.9,
          duration: 1
        });
      });
      
      console.log('Page takeover setup complete');
    }, 1500); // Wait 1.5 seconds for other animations to initialize
  });