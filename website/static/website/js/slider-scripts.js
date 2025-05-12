/**
 * Custom JavaScript for Smartel's HTML Slider
 * Provides basic slider functionality without Revolution Slider dependencies
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the slider
    const slider = {
        slides: document.querySelectorAll('.smartel-slide'),
        currentSlide: 0,
        slideCount: document.querySelectorAll('.smartel-slide').length,
        autoSlideInterval: null,
        
        init: function() {
            // Set first slide as active
            this.slides[0].classList.add('active');
            
            // Setup navigation
            document.getElementById('slider-prev').addEventListener('click', () => this.prevSlide());
            document.getElementById('slider-next').addEventListener('click', () => this.nextSlide());
            
            // Start auto-slide
            this.startAutoSlide();
            
            // Pause auto-slide on hover
            const sliderContainer = document.querySelector('.smartel-slider');
            sliderContainer.addEventListener('mouseenter', () => this.stopAutoSlide());
            sliderContainer.addEventListener('mouseleave', () => this.startAutoSlide());
        },
        
        // Navigate to next slide
        nextSlide: function() {
            this.slides[this.currentSlide].classList.remove('active');
            this.currentSlide = (this.currentSlide + 1) % this.slideCount;
            this.slides[this.currentSlide].classList.add('active');
        },
        
        // Navigate to previous slide
        prevSlide: function() {
            this.slides[this.currentSlide].classList.remove('active');
            this.currentSlide = (this.currentSlide - 1 + this.slideCount) % this.slideCount;
            this.slides[this.currentSlide].classList.add('active');
        },
        
        // Auto-slide functionality
        startAutoSlide: function() {
            this.stopAutoSlide();
            this.autoSlideInterval = setInterval(() => this.nextSlide(), 7000); // Change slide every 7 seconds
        },
        
        stopAutoSlide: function() {
            if (this.autoSlideInterval) {
                clearInterval(this.autoSlideInterval);
            }
        }
    };
    
    // Initialize the slider if it exists on the page
    if (document.querySelector('.smartel-slider')) {
        slider.init();
    }
});
