# HSSAN — Hybrid Spectral-Spatial Attention Network

## Overview
A full-stack flower classification web app. Upload a flower image to receive species identification, confidence score, phytochemical properties, and geographic distribution.

## Tech Stack
- **Frontend**: React + Vite + TailwindCSS + shadcn/ui + framer-motion
- **Backend**: Express.js + TypeScript (tsx)
- **AI API**: Google Gemini 1.5 Flash (vision + text)
- **No database** — results are returned and displayed inline only

## Architecture
- `server/routes.ts` — Single POST `/api/predict` endpoint powered by Gemini
- `shared/schema.ts` — Response types only (`PredictionResult`)
- `shared/routes.ts` — API contract definition
- `client/src/pages/Home.tsx` — Upload zone + inline result display
- `client/src/hooks/use-predictions.ts` — `useAnalyze` mutation hook

## Required Secrets
Set this in Replit Secrets (or `.env` for local development):
- `GEMINI_API_KEY` — from [Google AI Studio](https://aistudio.google.com/app/apikey)

## Running
The `Start application` workflow runs `npm run dev` which starts Express on port 5000 (serves both API and Vite frontend).
