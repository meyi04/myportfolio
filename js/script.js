// Replace this with your actual Cloudinary cloud name
const CLOUDINARY_CLOUD_NAME = 'dj0jlmtwf'; // Change 'demo' to your cloud name!
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/`;

// Define your portfolio images with public IDs from Cloudinary
// After uploading images to Cloudinary, replace these public IDs with yours
const portfolioImages = [
  {
    publicId: 'ce2c67b0-0e65-4e5e-82fd-baa2eeeb4505_fuyzzm',
    title: 'My OG',
    description: 'Where do I run when home is no longer a home'
  },
  {
    publicId: '5c5fa228-5551-43fd-9708-f275af5ac243_gypokv',
    title: 'College Circle',
    description: 'Nothing beats a jet2 holiday'
  },
  {
    publicId: 'f7210e6d-cf65-430f-a58d-5bdf68811a06_llnmsg',
    title: 'Apat Dapat',
    description: 'four constant'
  },
  {
    publicId: '607d0f27-d2b8-4279-b30d-d02180c24368_xkosku',
    title: 'Gandias',
    description: 'Die for you'
  },
  {
    publicId: '3cf65732-124a-4312-87c0-15cda5f965bd_wlsc0q',
    title: 'Partners in Crime',
    description: 'My doppleganger'
  },
  {
    publicId: 'f0d773a1-0ec1-4ae3-b822-c964f9bfe9cc_jzcwz1',
    title: 'The Problem',
    description: 'By Taylor Swift'
  },

];

// Function to get optimized Cloudinary URL
function getCloudinaryImageUrl(publicId, width = 600, height = 400) {
    return `${CLOUDINARY_BASE_URL}w_${width},h_${height},c_fill,q_auto,f_auto/${publicId}.jpg`;
}

// Function to render gallery with filter
function renderGallery(filter = 'all') {
    const galleryGrid = document.getElementById('galleryGrid');
    
    if (!galleryGrid) return;
    
    let filteredImages = portfolioImages;
    if (filter !== 'all') {
        filteredImages = portfolioImages.filter(img => img.category === filter);
    }
    
    if (filteredImages.length === 0) {
        galleryGrid.innerHTML = `
            <div class="loading" style="grid-column: 1/-1; text-align: center; padding: 60px;">
                <p>No images in this category yet.</p>
            </div>
        `;
        return;
    }
    
    const galleryHTML = filteredImages.map((image, index) => `
        <div class="gallery-card" data-category="${image.category}" style="animation-delay: ${index * 0.1}s">
            <img 
                src="${getCloudinaryImageUrl(image.publicId)}" 
                alt="${image.title}"
                class="gallery-image"
                loading="lazy"
            >
            <div class="card-content">
                <h3 class="card-title">${escapeHtml(image.title)}</h3>
                <p class="card-description">${escapeHtml(image.description)}</p>
            </div>
        </div>
    `).join('');
    
    galleryGrid.innerHTML = galleryHTML;
}

// Helper function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Gallery filter functionality
function initGalleryFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter gallery
            const filter = btn.getAttribute('data-filter');
            renderGallery(filter);
        });
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Active navigation highlighting
function setActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scrolling for navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Back to top button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }
}

// Scroll indicator
function initScrollIndicator() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const gallerySection = document.getElementById('gallery');
            if (gallerySection) {
                gallerySection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.gallery-card, .arch-node, .tech-badge').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
    initGalleryFilter();
    initNavbarScroll();
    setActiveNavLink();
    initSmoothScroll();
    initBackToTop();
    initMobileMenu();
    initScrollIndicator();
    initScrollAnimations();
});