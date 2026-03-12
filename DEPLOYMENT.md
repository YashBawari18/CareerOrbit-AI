# 🚀 CareerOrbit-AI Deployment Guide

Follow these simple steps to deploy your project with a "never-fail" backend setup on Render.

## 1. Prepare your Repository
Ensure your latest code is pushed to a GitHub or GitLab repository.

## 2. Deploy to Render (The "Easy" Way)
Render will automatically read your `render.yaml` file and set up everything:
1. Log in to [Render](https://render.com).
2. Click **New +** and select **Blueprint**.
3. Connect your GitHub/GitLab repository.
4. Render will detect `render.yaml`. Click **Apply**.
5. Render will automatically:
   - Create a PostgreSQL database.
   - Deploy your Node.js backend.
   - Auto-restart the backend if it ever crashes.
   - Use the `/health` endpoint to monitor uptime.

## 3. Deployment to Vercel (For Frontend)
Your frontend is likely optimized for Vercel:
1. Log in to [Vercel](https://vercel.com).
2. Import your repository.
3. Add the following Environment Variable:
   - `VITE_API_URL`: The URL of your Render backend (e.g., `https://careerorbit-api.onrender.com`).
4. Click **Deploy**.

## 4. Why this setup "Never Fails":
- **Auto-Restarts**: Render monitors your process and restarts it immediately if it stops.
- **Health Checks**: The load balancer only sends traffic to your backend when it's confirmed "healthy".
- **Mock Mode**: If the database is down, the backend is designed to run in "MOCK MODE" so the API remains responsive.
- **Zero-Downtime Deploys**: Render keeps the old version running until the new version passes the health check.

## 5. Maintenance
- **Logs**: Monitor "Events" and "Logs" in the Render dashboard.
- **Environment Variables**: Add any new keys (like API keys) in the Render dashboard under "Environment".
