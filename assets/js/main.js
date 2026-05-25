// ==========================
// NKQ TOOLS GLOBAL MAIN JS
// ==========================

// --------------------------
// SEARCH SYSTEM
// --------------------------

const searchInput = document.getElementById('toolSearch');
const searchButton = document.getElementById('searchButton');
const toolCards = document.querySelectorAll('.tool-card');
const noResults = document.getElementById('noResults');

function searchTools() {

    if (!searchInput) return;

    const value = searchInput.value.toLowerCase().trim();

    let visibleCards = 0;

    toolCards.forEach(card => {

        const title =
            card.querySelector('h3')?.textContent.toLowerCase() || '';

        const description =
            card.querySelector('p')?.textContent.toLowerCase() || '';

        if (
            title.includes(value) ||
            description.includes(value)
        ) {
            card.style.display = 'block';
            visibleCards++;
        } else {
            card.style.display = 'none';
        }

    });

    // No results message
    if (noResults) {

        if (visibleCards === 0) {
            noResults.style.display = 'block';
        } else {
            noResults.style.display = 'none';
        }

    }
}

// Search while typing
if (searchInput) {
    searchInput.addEventListener('input', searchTools);
}

// Search button
if (searchButton) {
    searchButton.addEventListener('click', searchTools);
}

// --------------------------
// MOBILE MENU
// --------------------------

const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {

    menu
