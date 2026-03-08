// Configuration
const CONFIG = {
    N8N_WEBHOOK_URL: 'YOUR_N8N_PRODUCTION_URL_HERE' // PASTE YOUR URL HERE
};

// State Management
const state = {
    currentSection: 'overview',
    leads: [],
    isScraping: false
};

// Navigation
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.section');
const pageTitle = document.getElementById('page-title');
const pageSubtitle = document.getElementById('page-subtitle');

const sectionMeta = {
    overview: { title: 'Dashboard Overview', subtitle: 'Monitoring your automated lead generation pipeline.' },
    scraper: { title: 'Lead Scraper', subtitle: 'Configure and launch new extraction tasks.' },
    leads: { title: 'Leads Vault', subtitle: 'Detailed view of all captured business intelligence.' },
    analytics: { title: 'Scraping Analytics', subtitle: 'Performance metrics and growth trends.' }
};

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const target = item.getAttribute('data-section');
        switchSection(target);
    });
});

function switchSection(target) {
    state.currentSection = target;

    // Update UI
    navItems.forEach(n => n.classList.remove('active'));
    document.querySelector(`[data-section="${target}"]`).classList.add('active');

    sections.forEach(s => s.classList.remove('active'));
    document.getElementById(target).classList.add('active');

    // Update Header
    pageTitle.textContent = sectionMeta[target].title;
    pageSubtitle.textContent = sectionMeta[target].subtitle;

    if (target === 'leads' && state.leads.length === 0) {
        generateMockLeads();
    }

    if (target === 'analytics') {
        initCharts();
    }
}

// Mock Lead Generation
function generateMockLeads() {
    const names = ['The Gourmet Bistro', 'Cafe Sunshine', 'Ocean View Diner', 'TechNova Solutions', 'Green Leaf Organics', 'Blue Horizon Marketing', 'Metropolis Fitness', 'Urban Threads', 'Heritage Antiques', 'Stellar Software'];
    const locations = ['Mumbai, IN', 'New York, US', 'London, UK', 'Berlin, DE', 'Tokyo, JP', 'Sydney, AU', 'Paris, FR', 'Toronto, CA'];

    state.leads = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        name: names[Math.floor(Math.random() * names.length)],
        location: locations[Math.floor(Math.random() * locations.length)],
        phone: `+1 ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        email: `contact@${names[Math.floor(Math.random() * names.length)].toLowerCase().replace(/\s+/g, '')}.com`,
        status: Math.random() > 0.3 ? 'Operational' : 'Closed'
    }));

    renderLeads();
}

function renderLeads() {
    const tbody = document.getElementById('leads-table-body');
    if (!tbody) return;

    tbody.innerHTML = state.leads.map(lead => `
        <tr>
            <td><strong>${lead.name}</strong></td>
            <td>${lead.location}</td>
            <td>${lead.phone}</td>
            <td>${lead.email}</td>
            <td><span class="badge ${lead.status === 'Operational' ? 'badge-success' : 'badge-warning'}">${lead.status}</span></td>
        </tr>
    `).join('');
}

// Scraper Logic
const scraperForm = document.getElementById('scraper-form');
const startBtn = document.getElementById('start-btn');

scraperForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const keyword = document.getElementById('keyword').value;
    const location = document.getElementById('location').value;

    if (state.isScraping) return;

    state.isScraping = true;
    startBtn.innerHTML = '<span class="loader"></span> Initiating...';
    startBtn.style.opacity = '0.7';

    // Trigger N8N Webhook
    try {
        const response = await fetch(CONFIG.N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                keyword: keyword,
                location: location,
                timestamp: new Date().toISOString()
            })
        });

        if (!response.ok) throw new Error('Network response was not ok');

        state.isScraping = false;
        startBtn.innerHTML = 'Initialize Scraper';
        startBtn.style.opacity = '1';
        alert(`Scraper triggered successfully! Check N8N for progress.`);

        // Add to activity log
        const activityLog = document.getElementById('activity-log');
        const newRow = `
            <tr>
                <td>Just now</td>
                <td>Search Triggered</td>
                <td>"${keyword} in ${location}"</td>
                <td><span class="badge badge-warning">Processing</span></td>
            </tr>
        `;
        activityLog.insertAdjacentHTML('afterbegin', newRow);
        switchSection('overview');

    } catch (error) {
        console.error('Error triggering N8N:', error);
        state.isScraping = false;
        startBtn.innerHTML = 'Initialize Scraper';
        startBtn.style.opacity = '1';
        alert(`Failed to trigger scraper. Please check your N8N Webhook URL and connection.`);
    }
});

// Analytics Charts
let growthChart, sourceChart;

function initCharts() {
    const growthCtx = document.getElementById('growthChart')?.getContext('2d');
    const sourceCtx = document.getElementById('sourceChart')?.getContext('2d');

    if (growthCtx && !growthChart) {
        growthChart = new Chart(growthCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'New Leads',
                    data: [65, 78, 92, 85, 110, 145, 160],
                    borderColor: '#e8192c',
                    backgroundColor: 'rgba(232, 25, 44, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointBackgroundColor: '#e8192c'
                }]
            },
            options: {
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                    y: {
                        grid: { color: 'rgba(240, 237, 232, 0.05)' },
                        border: { display: false },
                        ticks: { color: '#888880', font: { family: 'Barlow Condensed' } }
                    },
                    x: {
                        grid: { display: false },
                        border: { display: false },
                        ticks: { color: '#888880', font: { family: 'Barlow Condensed' } }
                    }
                }
            }
        });
    }

    if (sourceCtx && !sourceChart) {
        sourceChart = new Chart(sourceCtx, {
            type: 'doughnut',
            data: {
                labels: ['Google Maps', 'Website', 'Direct'],
                datasets: [{
                    data: [70, 20, 10],
                    backgroundColor: ['#e8192c', '#9b0f1c', '#2a2a2a'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                cutout: '75%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#888880',
                            font: { family: 'Barlow Condensed', weight: '600' },
                            padding: 20
                        }
                    }
                }
            }
        });
    }
}
