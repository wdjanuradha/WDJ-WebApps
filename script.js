document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop();

    if (currentPage === 'index.html' || currentPage === '') {
        fetchFeaturedApps();
    } else if (currentPage === 'apps.html') {
        fetchAllApps();
    }
});

async function fetchFeaturedApps() {
    try {
        const response = await fetch('apps.json');
        const data = await response.json();
        renderApps(data.apps.slice(0, 3), '.featured-apps .app-grid'); // Display only the first 3 apps
    } catch (error) {
        console.error('Error fetching apps:', error);
    }
}

async function fetchAllApps() {
    try {
        const response = await fetch('apps.json');
        const data = await response.json();
        renderApps(data.apps, '.apps-showcase .app-grid');
    } catch (error) {
        console.error('Error fetching apps:', error);
    }
}

function renderApps(apps, containerSelector) {
    const appGrid = document.querySelector(containerSelector);
    if (!appGrid) {
        console.error('App grid container not found:', containerSelector);
        return;
    }
    appGrid.innerHTML = '';

    apps.forEach(app => {
        const appCard = createAppCard(app);
        appGrid.appendChild(appCard);
    });
}

function createAppCard(app) {
    const card = document.createElement('div');
    card.className = 'app-card';

    card.innerHTML = `
        <img src="${app.image}" alt="${app.name}">
        <div class="app-card-content">
            <h3>${app.name}</h3>
            <p>${app.description}</p>
            <a href="${app.link}" class="button" target="_blank">Launch App</a>
        </div>
    `;

    return card;
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add a simple loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});