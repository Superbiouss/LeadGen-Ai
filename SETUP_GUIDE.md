# 🛠️ LeadGen AI: Full Setup Guide

Follow this guide to ignite your lead generation engine and connect it to your dashboard. This process involves four phases: N8N Workflow, Google Maps API, Dashboard Configuration, and Ignition.

---

## Phase 1: The Engine (N8N Workflow)

The dashboard triggers a workflow in N8N. You need to build or import this workflow.

1.  **Create a New Workflow**: Open your N8N instance and create a blank workflow.
2.  **Add Webhook Node**:
    - **HTTP Method**: `POST`
    - **Path**: `lead-scraper-trigger`
    - **Response**: `When last node finishes`
3.  **Add Google Maps Node**:
    - Connect it after the Webhook.
    - Use the `keyword` and `location` from the Webhook payload.
4.  **Add Data Processing**: (Optional) Add nodes to find emails or phone numbers from the search results.
5.  **Add Google Sheets Node**: 
    - Set this to append the leads to a specific spreadsheet.
6.  **Activate Workflow**: Save and click **Execute Workflow** to get your **Production Webhook URL**.

---

## Phase 2: The Fuel (Google Maps API)

You need a Google Maps API Key to allow N8N to search for businesses.

1.  **Google Cloud Console**: Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  **Enable APIs**: Enable the **Places API (New)** and **Geocoding API**.
3.  **Create API Key**: Go to **APIs & Services > Credentials** and create an **API Key**.
4.  **Configure N8N**: Add this API Key to your Google Maps node in N8N.

---

## Phase 3: The Cockpit (Dashboard Config)

Now, link the dashboard to your "Engine" (N8N).

1.  **Open Project**: Navigate to your project folder.
2.  **Open `app.js`**: Locate the top section of the file.
    ```javascript
    const CONFIG = {
        N8N_WEBHOOK_URL: 'YOUR_N8N_PRODUCTION_URL_HERE'
    };
    ```
3.  **Paste URL**: Replace `'YOUR_N8N_PRODUCTION_URL_HERE'` with the **Production Webhook URL** you copied in Phase 1.
4.  **Save File**: Ensure the file is saved.

---

## Phase 4: Ignition (Testing)

Time to run the system.

1.  **Launch Dashboard**: Open `index.html` in your browser.
2.  **Navigate to Scraper**: Click on the **Lead Scraper** tab in the sidebar.
3.  **Trigger Search**:
    - Enter a keyword (e.g., "Gyms").
    - Enter a location (e.g., "Austin, TX").
    - Click **Initialize Scraper**.
4.  **Verify**:
    - You should see an alert: "Scraper triggered successfully!".
    - Check your n8n **Executions** tab to see the live workflow running.
    - Check your Google Sheets for the new leads appearing in real-time.

---

> [!IMPORTANT]
> Always ensure your N8N workflow is set to **Active** for it to respond to the dashboard's production URL. Use the "Test URL" only during development.
