# 🚀 Render Deployment Guide for Agri-Ecosystem

This guide explains how to deploy the entire ecosystem (all three inter-linked apps and the backend) on [Render](https://render.com) for your MVP prototype.

The codebase has been updated to use environment variables (`import.meta.env.*`). This allows the different applications to "talk" to each other securely once they are hosted on different domains!

---

## 🏗️ 1. Hosting the Backend (ShambaIQ API Server)
The API runs the live satellite weather engine for ShambaIQ.
1. In Render, create a **New Web Service**.
2. Connect your GitHub repository.
3. Configure the settings:
   - **Name**: `shambaiq-api`
   - **Root Directory**: `SHAMBAIQ`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` (or `node server/index.js`)
4. Click **Deploy**. Once finished, copy the **Render URL** (e.g., `https://shambaiq-api.onrender.com`).

---

## 🚜 2. Hosting ShambaIQ (Tactical Frontend)
1. In Render, create a **New Static Site**.
2. Connect your repository.
3. Configure the settings:
   - **Name**: `shambaiq-app`
   - **Root Directory**: `SHAMBAIQ`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add the following **Environment Variables**:
   - `VITE_API_URL` = `[URL from Step 1]` (e.g., `https://shambaiq-api.onrender.com`)
   - `VITE_ASAL_URL` = (Leave blank for now, you will add it in Step 3!)
5. Click **Deploy** and copy the **Render URL** for this frontend app.
6. Make sure to go into Render settings for this site -> **Redirects/Rewrites**, add a rule:
   - Source: `/*`
   - Destination: `/index.html`
   - Action: `Rewrite`

---

## 🏛️ 3. Hosting ASAL-agri intelligence (Strategic Frontend)
1. In Render, create a **New Static Site**.
2. Connect your repository.
3. Configure the settings:
   - **Name**: `asal-hub`
   - **Root Directory**: `ASAL-agri intelligence`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add the following **Environment Variables**:
   - `VITE_SHAMBAIQ_URL` = `[URL from Step 2]`
5. Click **Deploy** and copy the **Render URL**.
6. Again, go to **Redirects/Rewrites**, add a rule:
   - Source: `/*`
   - Destination: `/index.html`
   - Action: `Rewrite`
7. _Important:_ Now that you have the ASAL URL, go back to the `shambaiq-app` Environment Variables and set `VITE_ASAL_URL` to this new ASAL URL, then **Manual Deploy -> Clear build cache & deploy**.

---

## 🛡️ 4. Hosting AGRI-GATEWAY (The Master Portal)
1. In Render, create a **New Static Site**.
2. Connect your repository.
3. Configure the settings:
   - **Name**: `agri-gateway`
   - **Root Directory**: `AGRI-GATEWAY`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add the following **Environment Variables**:
   - `VITE_SHAMBAIQ_URL` = `[URL from Step 2]`
   - `VITE_ASAL_URL` = `[URL from Step 3]`
5. Click **Deploy**.
6. Set the same **Redirects/Rewrites** rule (`/*` -> `/index.html`).

---

🎉 **You are now done!** 
Your entire MVP is live in the cloud. Users will log in via the `AGRI-GATEWAY` URL and smoothly transition to the other platforms via securely encoded URL drops.
