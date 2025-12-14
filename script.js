// Load header and footer dynamically
function loadHeader() {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            initializeHeaderSearch();
        })
        .catch(error => console.error('Error loading header:', error));
}

function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error loading footer:', error));
}

// Initialize header search functionality
function initializeHeaderSearch() {
    const searchForm = document.getElementById('headerSearchForm');
    const searchInput = document.getElementById('headerSearchInput');
    
    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim().toLowerCase();
            if (query) {
                window.location.href = `index.html?search=${encodeURIComponent(query)}`;
            }
        });
    }
}

// Tool search functionality for index page
function initializeToolSearch() {
    const searchInput = document.getElementById('toolSearchInput');
    const toolCards = document.querySelectorAll('.tool-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim().toLowerCase();
            
            toolCards.forEach(card => {
                const title = card.querySelector('h5').textContent.toLowerCase();
                const description = card.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(query) || description.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
    
    // Handle URL search parameter
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('search');
    if (searchQuery && searchInput) {
        searchInput.value = searchQuery;
        searchInput.dispatchEvent(new Event('input'));
    }
}

// Initialize Bootstrap dropdowns
function initializeBootstrap() {
    // Bootstrap 5 dropdown initialization
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.preventDefault();
            const menu = this.nextElementSibling;
            if (menu) {
                menu.classList.toggle('show');
            }
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
    initializeToolSearch();
    initializeBootstrap();
});

// Utility function to copy text to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        alert('Copied to clipboard!');
    }, function(err) {
        console.error('Failed to copy: ', err);
    });
}

// Utility function to download file
function downloadFile(content, filename, contentType) {
    const blob = new Blob([content], { type: contentType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

