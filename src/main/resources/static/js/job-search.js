// ===== Job Search Page JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    
    // Search functionality
    const searchInputs = document.querySelectorAll('.search-input');
    const searchButton = document.querySelector('.btn-search-main');
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            performSearch();
        });
    }
    
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    });
    
    function performSearch() {
        const keyword = searchInputs[0]?.value || '';
        const location = searchInputs[1]?.value || '';
        
        console.log('Searching for:', { keyword, location });
        alert(`Tìm kiếm: "${keyword}" tại "${location}"`);
        // TODO: Implement actual search logic
    }
    
    // Filter functionality
    const filterSelects = document.querySelectorAll('.filter-select');
    const clearFiltersBtn = document.querySelector('.btn-clear-filters');
    
    filterSelects.forEach(select => {
        select.addEventListener('change', function() {
            console.log('Filter changed:', this.value);
            // TODO: Implement filter logic
        });
    });
    
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            filterSelects.forEach(select => {
                select.selectedIndex = 0;
            });
            console.log('Filters cleared');
        });
    }
    
    // Sort functionality
    const sortSelect = document.querySelector('.sort-dropdown select');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            console.log('Sort by:', this.value);
            // TODO: Implement sort logic
        });
    }
    
    // Favorite button functionality
    const favoriteButtons = document.querySelectorAll('.btn-favorite');
    
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
            
            const svg = this.querySelector('svg');
            if (this.classList.contains('active')) {
                svg.setAttribute('fill', 'currentColor');
                console.log('Added to favorites');
            } else {
                svg.setAttribute('fill', 'none');
                console.log('Removed from favorites');
            }
        });
    });
    
    // Apply button functionality
    const applyButtons = document.querySelectorAll('.btn-apply');
    
    applyButtons.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const jobTitle = this.closest('.job-card-search').querySelector('.job-title-search').textContent.trim();
            alert(`Ứng tuyển vào vị trí: ${jobTitle}`);
            // TODO: Implement apply logic
        });
    });
    
    // Saved searches functionality
    const savedSearches = document.querySelector('.saved-searches');
    
    if (savedSearches) {
        savedSearches.addEventListener('click', function() {
            alert('Hiển thị doanh nghiệp yêu thích');
            // TODO: Implement saved searches logic
        });
    }
    
    // Smooth scroll to top
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
        }
    });
    
    // Job card click tracking
    const jobCards = document.querySelectorAll('.job-card-search');
    
    jobCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't trigger if clicking buttons
            if (e.target.closest('.btn-favorite') || e.target.closest('.btn-apply')) {
                return;
            }
            
            const jobTitle = this.querySelector('.job-title-search').textContent.trim();
            console.log('Viewing job:', jobTitle);
            // TODO: Navigate to job detail page
        });
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    jobCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
    
});
