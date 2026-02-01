// ===== Employer Page JavaScript =====

// Function to load HTML content into a placeholder
async function loadHTML(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Failed to load ${filePath}`);
        const html = await response.text();
        const element = document.getElementById(elementId);
        if (element) {
            element.innerHTML = html;
        }
    } catch (error) {
        console.error('Error loading HTML:', error);
    }
}

// Load employer header and footer when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Load employer header and footer in parallel
    Promise.all([
        loadHTML('header-employer-placeholder', 'includes/header-employer.html'),
        loadHTML('footer-placeholder', 'includes/footer.html')
    ]).then(() => {
        // Setup login dropdown after header is loaded
        setTimeout(setupLoginDropdown, 100);
    });
});

// Setup login dropdown toggle
function setupLoginDropdown() {
    const loginLink = document.querySelector('.login-link');
    const loginWrapper = document.querySelector('.login-dropdown-wrapper');
    
    if (!loginLink || !loginWrapper) return;
    
    // Toggle dropdown on click
    loginLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        loginWrapper.classList.toggle('active');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!loginWrapper.contains(e.target)) {
            loginWrapper.classList.remove('active');
        }
    });
    
    // Prevent dropdown from closing when clicking inside it
    const loginDropdown = document.querySelector('.login-dropdown');
    if (loginDropdown) {
        loginDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        // Prevent closing when interacting with inputs, buttons, etc.
        const interactiveElements = loginDropdown.querySelectorAll('input, button, a');
        interactiveElements.forEach(element => {
            element.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        });
    }
}

// Password toggle function
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
    }
}

// Handle login
function handleLogin() {
    alert('Chức năng đăng nhập sẽ được triển khai sau');
}
