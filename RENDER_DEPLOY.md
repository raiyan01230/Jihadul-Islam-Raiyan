# Deploying Raiyan Portfolio to Render.com

This project is pre-configured for zero-error deployment on **Render** as a unified Node.js Web Service (Express backend + Vite-built React frontend).

---

## Option 1: One-Click Render Blueprint (`render.yaml`)

1. Push this repository to GitHub / GitLab.
2. In your **Render Dashboard**, click **New +** -> **Blueprint**.
3. Connect your repository. Render will automatically read `render.yaml`.
4. Set your `GEMINI_API_KEY` secret when prompted (optional — if omitted, the AI Copilot automatically falls back to its built-in portfolio knowledge engine).
5. Click **Apply** and wait for the build to complete.

---

## Option 2: Manual Web Service Setup

1. In Render Dashboard, click **New +** -> **Web Service**.
2. Connect your GitHub repository and configure:
   - **Runtime:** `Node`
   - **Build Command:** `npm install --include=dev && npm run build`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/api/health`
3. Under **Environment Variables**, add:
   - `NODE_ENV` = `production`
   - `GEMINI_API_KEY` = `your_google_gemini_api_key` *(optional)*
4. Click **Create Web Service**.

---

## Included Render Fixes & Features

- **Dynamic Port Binding:** `server.ts` binds to `process.env.PORT` (`0.0.0.0`) automatically as required by Render.
- **Zero Production Vite Dependency:** Vite middleware is dynamically imported only in development (`NODE_ENV !== "production"`), keeping production memory usage low.
- **Health Check Endpoint:** `GET /api/health` and `GET /healthz` return `200 OK` with uptime and configuration status.
- **API Endpoints Ready:**
  - `POST /api/chat` — Gemini 4 AI Copilot (`gemini-4-hydrogen` + `gemini-3.1-flash-lite` + rule-engine fallback)
  - `POST /api/contact` — Contact message submission & auto-reply envelope
  - `POST /api/purchase` — Service order placement & invoice generator
