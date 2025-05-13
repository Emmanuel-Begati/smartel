/**
 * Page Speed Optimizer Script
 * Improves site loading performance with lazy loading and resource prioritization
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize performance tracking
    const perfData = {
        start: performance.now()
    };

    // Handle loading animation
    const loadingElement = document.getElementById('pq-loading');
    if (loadingElement) {
        // Hide loading animation after content is ready
        window.addEventListener('load', function() {
            perfData.contentLoaded = performance.now();
            
            // Fade out the loading element smoothly
            setTimeout(() => {
                loadingElement.style.transition = 'opacity 0.3s ease';
                loadingElement.style.opacity = '0';
                
                // Remove it from DOM after transition completes
                setTimeout(() => {
                    loadingElement.style.display = 'none';
                }, 300);
            }, 100); // Small delay to ensure everything is ready
        });
        
        // Safety timeout - hide loader even if something fails to load
        setTimeout(() => {
            if (loadingElement.style.display !== 'none') {
                loadingElement.style.display = 'none';
            }
        }, 5000);
    }

    // Lazy load images that are below the fold
    function lazyLoadImages() {
        // Only target images outside the viewport that don't have data-src already set
        const lazyImages = document.querySelectorAll('img:not([src^="data:"]):not([data-lazy-loaded])');
        
        lazyImages.forEach(img => {
            if (!img.dataset.src && !isElementInViewport(img) && !img.closest('#pq-loading')) {
                // Save original src and replace with a tiny placeholder
                img.dataset.src = img.src;
                img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";
                img.dataset.lazyLoaded = "pending";
                
                // Create intersection observer to load when in viewport
                const observer = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const targetImg = entry.target;
                            targetImg.src = targetImg.dataset.src;
                            targetImg.dataset.lazyLoaded = "loaded";
                            observer.unobserve(targetImg);
                        }
                    });
                });
                observer.observe(img);
            }
        });
    }

    // Check if element is visible in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.top + rect.height >= 0
        );
    }

    // Wait until critical resources are loaded before lazy loading
    setTimeout(lazyLoadImages, 500);
    
    // Monitor performance and send data
    window.addEventListener('load', function() {
        perfData.windowLoaded = performance.now();
        
        // Calculate timings
        const totalLoadTime = perfData.windowLoaded - perfData.start;
        const contentLoadTime = perfData.contentLoaded ? (perfData.contentLoaded - perfData.start) : null;
        
        // Log performance data (could be sent to an analytics endpoint)
        console.log('Page load performance:', {
            totalLoadTime: `${Math.round(totalLoadTime)}ms`,
            contentLoadTime: contentLoadTime ? `${Math.round(contentLoadTime)}ms` : 'Not available'
        });
    });
});
