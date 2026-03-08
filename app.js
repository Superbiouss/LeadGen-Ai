// Configuration
const CONFIG = {
    N8N_WEBHOOK_URL: localStorage.getItem('N8N_WEBHOOK_URL') || 'http://localhost:5678/webhook/start-lead-gen',
    LEADS_API_URL: localStorage.getItem('LEADS_API_URL') || ''
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
    analytics: { title: 'Scraping Analytics', subtitle: 'Performance metrics and growth trends.' },
    settings: { title: 'System Settings', subtitle: 'Configure your N8N integrations and API endpoints.' }
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
        fetchLeads();
    }

    if (target === 'settings') {
        loadSettings();
    }

    if (target === 'analytics') {
        initCharts();
    }
}

// Initial state
function init() {
    renderLeads();
    initCharts();
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
            <td>
                ${lead.maps_url ? `<a href="${lead.maps_url}" target="_blank" class="link-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                </a>` : '-'}
            </td>
        </tr>
    `).join('');

    // Dynamic Stats
    const totalLeads = state.leads.length;
    const verifiedEmails = state.leads.filter(l => l.email && l.email !== 'N/A').length;

    const totalLeadsEl = document.querySelector('.stat-card:nth-child(1) .stat-value');
    const verifiedEmailsEl = document.querySelector('.stat-card:nth-child(2) .stat-value');

    if (totalLeadsEl) totalLeadsEl.innerHTML = `${totalLeads.toLocaleString()} <span class="stat-trend trend-up">Vault</span>`;
    if (verifiedEmailsEl) verifiedEmailsEl.innerHTML = `${verifiedEmails.toLocaleString()} <span class="stat-trend trend-up">Live</span>`;
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

    // Trigger N8N Webhook with Timeout
    try {
        const url = new URL(CONFIG.N8N_WEBHOOK_URL);
        url.searchParams.append('keyword', keyword);
        url.searchParams.append('location', location);
        url.searchParams.append('maxResults', document.getElementById('max-results').value || 20);

        // Add to activity log immediately
        const activityLog = document.getElementById('activity-log');
        const logId = Date.now();
        const newRow = `
            <tr id="log-${logId}">
                <td>Just now</td>
                <td>Search Triggered</td>
                <td>"${keyword} in ${location}"</td>
                <td><span class="badge badge-warning">Processing</span></td>
            </tr>
        `;
        activityLog.insertAdjacentHTML('afterbegin', newRow);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

        const response = await fetch(url.toString(), {
            method: 'GET',
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error('Network response was not ok');

        state.isScraping = false;
        startBtn.innerHTML = 'Initialize Scraper';
        startBtn.style.opacity = '1';

        // Update log status to complete
        const logStatus = document.querySelector(`#log-${logId} .badge`);
        if (logStatus) {
            logStatus.className = 'badge badge-success';
            logStatus.textContent = 'Complete';
        }

        alert(`Scraper triggered successfully! \n\nCheck n8n 'Executions' to verify if leads were found or filtered out.`);
        switchSection('overview');

    } catch (error) {
        console.error('Error triggering N8N:', error);
        state.isScraping = false;
        startBtn.innerHTML = 'Initialize Scraper';
        startBtn.style.opacity = '1';

        // Update log status to failed/timeout
        const logId = document.querySelector('#activity-log tr')?.id;
        const logStatus = document.querySelector(`#${logId} .badge`);
        if (logStatus) {
            logStatus.className = 'badge badge-danger';
            logStatus.textContent = error.name === 'AbortError' ? 'Timeout' : 'Failed';
        }

        const msg = error.name === 'AbortError'
            ? 'The scraper is taking a long time. It might still be running in n8n, check your "Executions" tab.'
            : 'Failed to trigger scraper. Please check your N8N URL.';
        alert(msg);
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
// Settings Logic
function loadSettings() {
    document.getElementById('webhook-url').value = CONFIG.N8N_WEBHOOK_URL;
    document.getElementById('leads-api-url').value = CONFIG.LEADS_API_URL;
}

const settingsForm = document.getElementById('settings-form');
settingsForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    CONFIG.N8N_WEBHOOK_URL = document.getElementById('webhook-url').value;
    CONFIG.LEADS_API_URL = document.getElementById('leads-api-url').value;

    localStorage.setItem('N8N_WEBHOOK_URL', CONFIG.N8N_WEBHOOK_URL);
    localStorage.setItem('LEADS_API_URL', CONFIG.LEADS_API_URL);

    alert('Settings saved successfully!');
});

document.getElementById('reset-settings')?.addEventListener('click', () => {
    localStorage.removeItem('N8N_WEBHOOK_URL');
    localStorage.removeItem('LEADS_API_URL');
    location.reload();
});

// Real Lead Fetching
async function fetchLeads() {
    if (!CONFIG.LEADS_API_URL) {
        console.log('Leads API URL not configured.');
        const tbody = document.getElementById('leads-table-body');
        if (tbody) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #888880; padding: 40px;">Please configure <strong>Leads Data API URL</strong> in Settings to view your leads.</td></tr>';
        }
        return;
    }

    try {
        const tbody = document.getElementById('leads-table-body');
        if (tbody && state.leads.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #888880; padding: 40px;">Fetching latest leads from vault...</td></tr>';
        }

        const response = await fetch(CONFIG.LEADS_API_URL);
        if (!response.ok) throw new Error('Failed to fetch leads');

        const data = await response.json();
        const leadsData = Array.isArray(data) ? data : (data.data || []);

        if (leadsData.length === 0) {
            state.leads = [];
            if (tbody) {
                tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #888880; padding: 40px;">No leads found in your vault yet. Run a scan to get started!</td></tr>';
            }
            return;
        }

        state.leads = leadsData.map((lead, i) => ({
            id: i,
            name: lead['Business Name'] || lead.name || 'Unknown',
            location: lead['Address / Location'] || lead.location || 'Unknown',
            phone: lead['Phone Number'] || lead.phone || 'N/A',
            email: lead['Email'] || lead.email || 'N/A',
            status: lead['Status'] || lead.status || 'Active',
            maps_url: lead['Google Maps URL'] || lead.google_maps_url || null
        }));

        renderLeads();
    } catch (error) {
        console.error('Error fetching real leads:', error);
        const tbody = document.getElementById('leads-table-body');
        if (tbody) {
            tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #e8192c; padding: 40px;">Error connecting to Leads API. Check your Settings.</td></tr>';
        }
    }
}

// Start application
init();
