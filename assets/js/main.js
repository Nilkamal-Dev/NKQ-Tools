// Load header and footer components
document.addEventListener('DOMContentLoaded', function () {
    const root = typeof SITE_ROOT !== 'undefined' ? SITE_ROOT : '/';

    // Initialize search functionality
    initializeSearch();
    loadPopularTools();

    // Check if we are on a category page and load tools
    const path = window.location.pathname;
    if (path.includes('/tools/')) {
        // Extract category from path
        // Supports both /tools/category/ and /tools/category/index.html
        // and local file paths like .../tools/category/index.html
        const parts = path.split('/');
        let category = '';

        // Find 'tools' in the path and get the next segment
        for (let i = 0; i < parts.length; i++) {
            if (parts[i] === 'tools' && i + 1 < parts.length) {
                category = parts[i + 1];
                break;
            }
        }

        if (category && toolCategories[category]) {
            loadCategoryTools(category);
        }
    }
});

// Tool Categories Data
const toolCategories = {
    'calculators': {
        title: 'Calculators',
        icon: 'fa-calculator',
        tools: [
            { name: 'Age Calculator', path: '/tools/calculators/age-calculator.html' },
            { name: 'Binary to Decimal', path: '/tools/calculators/binary-to-decimal-converter.html' },
            { name: 'Discount Calculator', path: '/tools/calculators/discount-calculator.html' },
            { name: 'Loan EMI Calculator', path: '/tools/calculators/loan-emi-calculator.html' },
        ]
    },
    'converters': {
        title: 'Converters',
        icon: 'fa-exchange-alt',
        tools: [
            { name: 'Data Storage Converter', path: '/tools/converters/data-storage-converter.html' },
            { name: 'Length Converter', path: '/tools/converters/length-converter.html' },
            { name: 'Pressure Converter', path: '/tools/converters/pressure-converter.html' },
            { name: 'Speed Converter', path: '/tools/converters/speed-converter.html' },
            { name: 'Temperature Converter', path: '/tools/converters/temperature-converter.html' },
            { name: 'Volume Converter', path: '/tools/converters/volume-converter.html' },
            { name: 'Weight Converter', path: '/tools/converters/weight-converter.html' }
        ]
    },
    'developer-tools': {
        title: 'Developer Tools',
        icon: 'fa-code',
        tools: [
            { name: 'Base64 Encoder/Decoder', path: '/tools/developer-tools/base64-encoder-decoder.html' },
            { name: 'Color Code Picker', path: '/tools/developer-tools/color-code-picker.html' },
            { name: 'HTACCESS Redirect Generator', path: '/tools/developer-tools/htaccess-redirect-generator.html' },
            { name: 'HTML to Markdown', path: '/tools/developer-tools/html-to-markdown.html' },
            { name: 'IP Address Lookup', path: '/tools/developer-tools/ip-address-lookup.html' },
            { name: 'Markdown to HTML', path: '/tools/developer-tools/markdown-to-html.html' },
        ]
    },
    'image-tools': {
        title: 'Image Tools',
        icon: 'fa-image',
        tools: [
            { name: 'Base64 Converter', path: '/tools/image-tools/base64-converter.html' },
            { name: 'Image Compressor', path: '/tools/image-tools/image-compressor.html' },
            { name: 'Image Cropper', path: '/tools/image-tools/image-cropper.html' },
            { name: 'Image Resizer', path: '/tools/image-tools/image-resizer.html' },
            { name: 'QR Code Generator', path: '/tools/image-tools/qr-code-generator.html' },
            { name: 'WebP to PNG', path: '/tools/image-tools/webp-to-png.html' }
        ]
    },
    'security-tools': {
        title: 'Security Tools',
        icon: 'fa-shield-alt',
        tools: [
            { name: 'Password Generator', path: '/tools/security-tools/password-generator.html' },
            { name: 'Privacy Policy Generator', path: '/tools/security-tools/privacy-policy-generator.html' },
        ]
    },
    'seo-tools': {
        title: 'SEO Tools',
        icon: 'fa-search',
        tools: [
            { name: 'Meta Tag Generator', path: '/tools/seo-tools/meta-tag-generator.html' },
            { name: 'Page Speed Test', path: '/tools/seo-tools/page-speed-test.html' },
            { name: 'Site Audit', path: '/tools/seo-tools/site-audit.html' },
            { name: 'Sitemap Generator', path: '/tools/seo-tools/sitemap-generator.html' },
        ]
    },
    'text-tools': {
        title: 'Text Tools',
        icon: 'fa-font',
        tools: [
            { name: 'Case Converter', path: '/tools/text-tools/case-converter.html' },
            { name: 'Character Counter', path: '/tools/text-tools/character-counter.html' },
            { name: 'Grammar Checker', path: '/tools/text-tools/grammar-checker.html' },      
            { name: 'Word Counter', path: '/tools/text-tools/word-counter.html' }
        ]
    }
};

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('toolSearch');
    const searchButton = document.querySelector('.search-section .btn');

    if (searchInput) {
        searchInput.addEventListener('input', function (e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            filterTools(searchTerm);
        });

        // Add enter key support
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                const searchTerm = e.target.value.toLowerCase().trim();
                filterTools(searchTerm);
            }
        });
    }

    if (searchButton) {
        searchButton.addEventListener('click', function () {
            const searchTerm = searchInput.value.toLowerCase().trim();
            filterTools(searchTerm);
        });
    }
}

// Filter tools based on search term
function filterTools(searchTerm) {
    const root = typeof SITE_ROOT !== 'undefined' ? SITE_ROOT : '/';

    // If search term is empty, show all cards and hide search results
    if (!searchTerm) {
        const allCards = document.querySelectorAll('.card');
        allCards.forEach(card => {
            card.style.display = 'block';
        });

        const categoriesSection = document.querySelector('.categories-section');
        const popularToolsSection = document.querySelector('.popular-tools-section');
        const searchResultsSection = document.getElementById('searchResultsSection');

        if (categoriesSection) categoriesSection.style.display = 'block';
        if (popularToolsSection) popularToolsSection.style.display = 'block';
        if (searchResultsSection) searchResultsSection.style.display = 'none';

        // Remove no results message if present
        const noResultsMessage = document.getElementById('noResultsMessage');
        if (noResultsMessage) noResultsMessage.remove();
        return;
    }

    // Filter category cards
    const categoryCards = document.querySelectorAll('.categories-section .card');
    let hasVisibleCategories = false;

    categoryCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-text').textContent.toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
            hasVisibleCategories = true;
        } else {
            card.style.display = 'none';
        }
    });

    // Filter tool cards
    const toolCards = document.querySelectorAll('.tool-card');
    let hasVisibleTools = false;

    toolCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase();
        const description = card.querySelector('.card-text').textContent.toLowerCase();

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            card.style.display = 'block';
            hasVisibleTools = true;
        } else {
            card.style.display = 'none';
        }
    });

    // Search in toolCategories data
    let matchedTools = [];
    Object.keys(toolCategories).forEach(categoryKey => {
        const category = toolCategories[categoryKey];
        category.tools.forEach(tool => {
            if (
                tool.name.toLowerCase().includes(searchTerm) ||
                (category.title && category.title.toLowerCase().includes(searchTerm))
            ) {
                matchedTools.push({
                    ...tool,
                    icon: category.icon,
                    category: category.title
                });
            }
        });
    });

    // Show/hide sections based on search results
    const categoriesSection = document.querySelector('.categories-section');
    const popularToolsSection = document.querySelector('.popular-tools-section');
    const searchResultsSection = document.getElementById('searchResultsSection');
    const searchResultsContainer = document.getElementById('searchResultsContainer');

    if (matchedTools.length > 0) {
        // Hide other sections
        if (categoriesSection) categoriesSection.style.display = 'none';
        if (popularToolsSection) popularToolsSection.style.display = 'none';
        if (searchResultsSection) searchResultsSection.style.display = 'block';

        // Render matched tools
        if (searchResultsContainer) {
            searchResultsContainer.innerHTML = matchedTools.map(tool => {
                const toolLink = root + tool.path.substring(1);
                return `
    <div class="col-md-4 mb-4">
        <div class="card h-100 tool-card">
            <div class="card-body">
                <h5 class="card-title"><i class="fas ${tool.icon}"></i> ${tool.name}</h5>
                <p class="card-text">${tool.category}</p>
                <a href="${toolLink}" class="btn btn-primary">Use Tool</a>
            </div>
        </div>
        </div>
    `}).join('');
        }
        // Remove no results message if present
        const noResultsMessage = document.getElementById('noResultsMessage');
        if (noResultsMessage) noResultsMessage.remove();
    } else {
        // Hide search results section
        if (searchResultsSection) searchResultsSection.style.display = 'none';
        // Show no results message
        const main = document.querySelector('main');
        let noResultsMessage = document.getElementById('noResultsMessage');
        if (!noResultsMessage) {
            noResultsMessage = document.createElement('div');
            noResultsMessage.id = 'noResultsMessage';
            noResultsMessage.className = 'alert alert-info text-center mt-4';
            noResultsMessage.textContent = 'No tools found matching your search.';
            main.appendChild(noResultsMessage);
        }

        // Hide other sections
        if (categoriesSection) categoriesSection.style.display = 'none';
        if (popularToolsSection) popularToolsSection.style.display = 'none';
    }
}

const popularTools = [
    { name: 'Password Generator', path: '/tools/security-tools/password-generator.html', category: 'security-tools' },
    { name: 'JSON Formatter', path: '/tools/developer-tools/json-formatter.html', category: 'developer-tools' },
    { name: 'QR Code Generator', path: '/tools/image-tools/qr-code-generator.html', category: 'image-tools' },
    { name: 'YouTube Tags Extractor', path: '/tools/social-media-tools/youtube-tags-extractor.html', category: 'social-media-tools' }
];

// Load popular tools on the homepage
function loadPopularTools() {
    const popularToolsContainer = document.querySelector('.popular-tools-section .row');
    if (!popularToolsContainer) return;

    const root = typeof SITE_ROOT !== 'undefined' ? SITE_ROOT : '/';

    popularToolsContainer.innerHTML = popularTools.map(tool => {
        const category = toolCategories[tool.category];
        const toolLink = root + tool.path.substring(1);
        return `
    <div class="col-md-4 mb-4">
        <div class="card h-100 tool-card">
            <div class="card-body">
                <h5 class="card-title">
                    <i class="fas ${category.icon}"></i> ${tool.name}
                </h5>
                <p class="card-text">${category.title}</p>
                <a href="${toolLink}" class="btn btn-primary">Use Tool</a>
            </div>
        </div>
        </div>
    `;
    }).join('');
}

// Load tools for a specific category
function loadCategoryTools(category) {
    const categoryData = toolCategories[category];
    if (!categoryData) return;

    const toolsContainer = document.querySelector('.tools-container');
    if (!toolsContainer) return;

    const root = typeof SITE_ROOT !== 'undefined' ? SITE_ROOT : '/';

    toolsContainer.innerHTML = categoryData.tools.map(tool => {
        const toolLink = root + tool.path.substring(1);
        return `
    <div class="col-md-4 mb-4">
        <div class="card h-100 tool-card">
            <div class="card-body">
                <h5 class="card-title">
                    <i class="fas ${categoryData.icon}"></i> ${tool.name}
                </h5>
                <a href="${toolLink}" class="btn btn-primary">Use Tool</a>
            </div>
        </div>
        </div>
    `}).join('');
}

// Handle navigation
document.addEventListener('click', function (e) {
    if (e.target.matches('.nav-link')) {
        const href = e.target.getAttribute('href');
        // Basic check to see if it's a category link
        if (href.includes('/tools/') && !href.endsWith('.html')) {
            const parts = href.split('/');
            const category = parts[parts.length - 2]; // Assuming format /tools/category/
            if (category && toolCategories[category]) {
                loadCategoryTools(category);
            }
        }
    }
});
