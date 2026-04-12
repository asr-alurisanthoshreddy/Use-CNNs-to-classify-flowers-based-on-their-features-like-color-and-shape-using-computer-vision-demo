# HSSAN — Setup Guide

**Hybrid Spectral-Spatial Attention Network** — AI-powered flower classification app.

---

## Requirements

Before you start, make sure you have these installed on your machine:

| Tool | Version | Download |
|------|---------|----------|
| Node.js | 20 or higher | https://nodejs.org |
| npm | comes with Node.js | — |
| Git (optional) | any | https://git-scm.com |

You also need one free API key:

| Key | Where to get it |
|-----|----------------|
| `GEMINI_API_KEY` | https://aistudio.google.com/app/apikey → click **Create API key** |

---

## Step 1 — Get the Project

Download the zip from Replit and extract it, or clone it if you have Git:

```bash
# If you downloaded a zip, just extract it and open the folder
# If you have Git:
git clone <your-repo-url>
cd <project-folder>
```

---

## Step 2 — Open in VS Code

```bash
code .
```

Or open VS Code manually and use **File → Open Folder** to select the project folder.

---

## Step 3 — Set Up Your API Key

1. In the project root, find the file `.env.example`
2. Make a copy of it and rename the copy to `.env`
3. Open `.env` and replace the placeholder value with your real key:

```env
GEMINI_API_KEY=AIzaSy_your_real_key_here
```

> The `.env` file is private — never share it or commit it to Git.

---

## Step 4 — Install Dependencies

Open the **VS Code Terminal** (`Ctrl + `` ` `` ` on Windows/Linux, `Cmd + `` ` `` ` on Mac) and run:

```bash
npm install
```

This installs all packages. It may take a minute the first time.

---

## Step 5 — Run the Project

```bash
npm run dev
```

You should see:

```
[express] serving on port 5000
```

Now open your browser and go to:

```
http://localhost:5000
```

The app is running. Upload a flower image and it will classify it.

---

## How It Works

```
Upload Image
     │
     ▼
 Gemini API (gemini-1.5-flash)
     │
     ▼
Species name + Confidence score
+ Phytochemical compounds
+ Geographic distribution
     │
     ▼
Results shown inline on the page
```

- **Gemini 1.5 Flash** analyzes the image and returns all information in one call
- No database is used — results are shown inline and not stored anywhere

---

## Project Structure

```
HSSAN/
├── client/                  # React frontend (Vite)
│   └── src/
│       ├── pages/
│       │   └── Home.tsx     # Main page with upload + results
│       ├── components/
│       │   ├── Navbar.tsx
│       │   └── UploadZone.tsx
│       └── hooks/
│           └── use-predictions.ts
├── server/                  # Express backend
│   ├── index.ts             # Server entry point (loads .env)
│   └── routes.ts            # POST /api/predict — Gemini analysis
├── shared/
│   ├── schema.ts            # TypeScript types
│   └── routes.ts            # API contract
├── .env.example             # Template — copy to .env and fill in your key
├── SETUP.md                 # This file
└── package.json
```

---

## Available Scripts

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start development server (hot reload) |
| `npm run build` | Build for production |
| `npm run start` | Run the production build |
| `npm run check` | TypeScript type check |

---

## Troubleshooting

**"Failed to analyze image" or API error**
- The error message now shows the exact reason — read it carefully in the red notification
- Most common cause: `.env` file missing, wrong location, or key pasted incorrectly
- Make sure your `.env` file is in the **root of the project** (same folder as `package.json`)
- Make sure the key has no extra spaces or quotes — correct format:
  ```
  GEMINI_API_KEY=AIzaSyABCDEFGH...
  ```
  Not:
  ```
  GEMINI_API_KEY = "AIzaSyABCDEFGH..."
  ```
- Verify your key is active at [aistudio.google.com](https://aistudio.google.com/app/apikey)

**`NODE_ENV` error on Windows when running `npm run dev`**
- Windows does not support `NODE_ENV=development` in scripts without a helper
- Run the server directly instead:
  ```bash
  npx cross-env NODE_ENV=development tsx server/index.ts
  ```
  Or set the variable manually in PowerShell then run tsx:
  ```powershell
  $env:NODE_ENV="development"; npx tsx server/index.ts
  ```

**Port already in use**
- Something else is using port 5000. You can change the port:
  ```bash
  PORT=3000 npm run dev
  ```

**npm install fails**
- Make sure you are using Node.js 20 or higher: `node --version`
- Delete `node_modules` and `package-lock.json` and try again:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```

---

## Recommended VS Code Extensions

- **ESLint** — code linting
- **Prettier** — auto formatting
- **Tailwind CSS IntelliSense** — autocomplete for Tailwind classes
- **TypeScript Error Lens** — inline TypeScript errors
