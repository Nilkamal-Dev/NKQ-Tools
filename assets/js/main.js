// =========================
// NKQ Tools - Main JS
// Optimized & Clean Version
// =========================

// GitHub Pages support
const SITE_ROOT = window.location.hostname.includes('github.io')
    ? '/NKQ-Tools/'
    : '/';

// =========================
// Tool Categories
// =========================

const toolCategories = {
    calculators: {
        title: 'Calculators',
        icon: 'fa-calculator',
        tools: [
            { name: 'Age Calculator', path: 'tools/calculators/age-calculator.html' },
            { name: 'Binary to Decimal', path: 'tools/calculators/binary-to-decimal-converter.html' },
            { name: 'Discount Calculator', path: 'tools/calculators/discount-calculator.html' },
            { name: 'Loan EMI Calculator', path: 'tools/calculators/loan-emi-calculator.html' }
        ]
    },

    converters: {
        title: 'Converters',
        icon: 'fa-exchange-alt',
        tools: [
            { name: 'Data Storage Converter', path: 'tools/converters/data-storage-converter.html' },
            { name: 'Length Converter', path: 'tools/converters/length-converter.html' },
            { name: 'Pressure Converter', path: 'tools/converters/pressure-converter.html' },
            { name: 'Speed Converter', path: 'tools/converters/speed-converter.html' },
            { name: 'Temperature Converter', path: 'tools/converters/temperature-converter.html' },
            { name: 'Volume Converter', path: 'tools/converters/volume-converter.html' },
            { name: 'Weight Converter', path: 'tools/converters/weight-converter.html' }
        ]
    },

    'developer-tools': {
        title: 'Developer Tools',
        icon: 'fa-code',
        tools: [
            { name: 'Base64 Encoder/Decoder', path: 'tools/developer-tools/base64-encoder-decoder.html' },
            { name: 'Color Code Picker', path: 'tools/developer-tools/color-code-picker.html' },
            { name: 'HTML to Markdown', path: 'tools/developer-tools/html-to-markdown.html' },
            { name: 'IP Address Lookup', path: 'tools/developer-tools/ip-address-lookup.html' },
            { name: 'Markdown to HTML', path: 'tools/developer-tools/markdown-to-html.html' }
        ]
    },

    'image-tools': {
        title: 'Image Tools',
        icon: 'fa-image',
        tools: [
            { name: 'Image Compressor', path: 'tools/image-tools/image-compressor.html' },
            { name: 'Image Cropper', path: 'tools/image-tools/image-cropper.html' },
            { name: 'Image Resizer', path: 'tools/image-tools/image-resizer.html' },
            { name: 'QR Code Generator', path: 'tools/image-tools/qr-code-generator.html' },
            { name: 'WebP to PNG', path: 'tools/image-tools/webp-to-png.html' }
        ]
    },

    'security-tools': {
        title: 'Security Tools',
        icon: 'fa-shield-alt',
        tools: [
            { name: 'Password Generator', path: 'tools/security-tools/password-generator.html' },
            { name: 'Privacy Policy Generator', path: 'tools/security-tools/privacy-policy-generator.html' }
        ]
    },

    'seo-tools': {
        title: 'SEO Tools',
        icon: 'fa-search',
        tools: [
            { name: 'Meta Tag Generator', path: 'tools/seo-tools/meta-tag-generator.html' },
            { name: 'Page Speed Test', path: 'tools/seo-tools/page-speed-test.html' },
            { name: 'Site Audit', path: 'tools/seo-tools/site-audit.html' },
            { name: 'Sitemap Generator', path: 'tools/seo-tools/sitemap-generator.html' }
        ]
    },

    'text-tools': {
        title: 'Text Tools',
        icon: 'fa-font',
        tools: [
            { name: 'Case Converter', path: 'tools/text-tools/case-converter.html' },
            { name: 'Character Counter', path: 'tools/text-tools/character-counter.html' },
            { name: 'Grammar Checker', path: 'tools/text-tools/grammar-checker.html' },
            { name: 'Word Counter', path: 'tools/text-tools/word-counter.html' }
        ]
    }
};

// =========================
// Popular Tools
// =========================

const popularTools = [
    {
        name: 'Password Generator',
        path: 'tools/security-tools/password-generator.html',
        category: 'security-tools'
    },
    {
        name: 'QR Code Generator',
        path: 'tools/image-tools/qr-code-generator.html',
        category: 'image-tools'
    },
    {
        name: 'Meta Tag Generator',
        path: 'tools/seo-tools/meta-tag-generator.html',
        category: 'seo-tools'
    }
];

// =========================
// DOM Ready
// =========================

document.addEventListener('DOMContentLoaded', () => {
    initializeSearch();
    loadPopularTools();
    detectCategoryPage();
});

// =========================
// Detect Category Page
// =========================

function detectCategoryPage() {
    const match = window.location.pathname.match(/tools\/([^/]+)/);

    if (!match) return;

    const category = match[1];

    if (toolCategories[category]) {
        loadCategoryTools(category);
    }
}

// =========================
// Create Tool Card
// =========================

function createToolCard(tool, icon, category = '') {
    return `
        <div class="col-md-4 mb-4">
            <div class="card h-100 tool-card">
                <div class="card-body">
                    <h5 class="card-title">
                        <i class="fas ${icon}"></i> ${tool.name}
                    </h5>

                    ${category ? `<p class="card-text">${category}</p>` : ''}

                    <a href="${SITE_ROOT + tool.path}" class="btn btn-primary">
                        Use Tool
                    </a>
                </div>
            </div>
        </div>
    `;
}

// =========================
// Load Popular Tools
// =========================

function loadPopularTools() {
    const container = document.querySelector('.popular-tools-section .row');

    if (!container) return;

    container.innerHTML = popularTools.map(tool => {
        const category = toolCategories[tool.category];

        return createToolCard(
            tool,
            category.icon,
            category.title
        );
    }).join('');
}

// =========================
// Load Category Tools
// =========================

function loadCategoryTools(category) {
    const categoryData = toolCategories[category];

    if (!categoryData) return;

    const container = document.querySelector('.tools-container');

    if (!container) return;

    container.innerHTML = categoryData.tools.map(tool =>
        createToolCard(tool, categoryData.icon)
    ).join('');
}

// =========================
// Search Functionality
// =========================

function initializeSearch() {
    const searchInput = document.getElementById('toolSearch');
    const searchButton = document.querySelector('.search-section .btn');

    if (!searchInput) return;

    let timeout;

    searchInput.addEventListener('input', e => {
        clearTimeout(timeout);

        timeout = setTimeout(() => {
            filterTools(e.target.value.toLowerCase().trim());
        }, 200);
    });

    searchInput.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            filterTools(searchInput.value.toLowerCase().trim());
        }
    });

    if (searchButton) {
        searchButton.addEventListener('click', () => {
            filterTools(searchInput.value.toLowerCase().trim());
        });
    }
}

// =========================
// Filter Tools
// =========================

function filterTools(searchTerm) {

    const categoriesSection = document.querySelector('.categories-section');
    const popularSection = document.querySelector('.popular-tools-section');
    const resultsSection = document.getElementById('searchResultsSection');
    const resultsContainer = document.getElementById('searchResultsContainer');

    if (!searchTerm) {
        if (categoriesSection) categoriesSection.style.display = 'block';
        if (popularSection) popularSection.style.display = 'block';
        if (resultsSection) resultsSection.style.display = 'none';

        const noResults = document.getElementById('noResultsMessage');
        if (noResults) noResults.remove();

        return;
    }

    let matchedTools = [];

    Object.keys(toolCategories).forEach(categoryKey => {
        const category = toolCategories[categoryKey];

        category.tools.forEach(tool => {

            if (
                tool.name.toLowerCase().includes(searchTerm) ||
                category.title.toLowerCase().includes(searchTerm)
            ) {
                matchedTools.push({
                    ...tool,
                    icon: category.icon,
                    category: category.title
                });
            }

        });
    });

    if (matchedTools.length > 0) {

        if (categoriesSection) categoriesSection.style.display = 'none';
        if (popularSection) popularSection.style.display = 'none';
        if (resultsSection) resultsSection.style.display = 'block';

        resultsContainer.innerHTML = matchedTools.map(tool =>
            createToolCard(tool, tool.icon, tool.category)
        ).join('');

        const noResults = document.getElementById('noResultsMessage');
        if (noResults) noResults.remove();

    } else {

        if (resultsSection) resultsSection.style.display = 'none';

        let noResults = document.getElementById('noResultsMessage');

        if (!noResults) {
            noResults = document.createElement('div');

            noResults.id = 'noResultsMessage';
            noResults.className = 'alert alert-info text-center mt-4';
            noResults.textContent = 'No tools found matching your search.';

            document.querySelector('main').appendChild(noResults);
        }

        if (categoriesSection) categoriesSection.style.display = 'none';
        if (popularSection) popularSection.style.display = 'none';
    }
}
