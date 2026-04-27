# Groq Chat App 🚀

A practical full-stack Groq-powered chat app with a Next.js frontend and an Express backend. Built to feel clean, fast, and usable.

This project is meant to be a real, working starter for chat apps, not just a demo skeleton.

## Highlights ✨

- Groq LLM chat using the OpenAI-compatible Groq endpoint.
- Express API with a single `/api/chat` endpoint.
- Next.js UI with Markdown rendering, history, and auto-scroll.
- Clean, responsive UI tuned for long answers.

## Tech Stack 🛠️

- Frontend: Next.js (App Router), React, Tailwind (v4), Axios, react-markdown
- Backend: Express, TypeScript, groq-sdk, OpenAI client (Groq base URL)

## Current Scope 🎯

Implemented and active ✅:

- Chat endpoint and Groq completion flow
- Frontend chat UI with Markdown rendering
- History + clear action + auto-scroll

Temporarily paused ⏸️:

- None for now

## Project Structure 🌳

```text
.
├── backend
│   ├── src
│   │   ├── ai.ts
│   │   ├── controService.ts
│   │   └── index.ts
│   ├── package.json
│   └── .env
└── frontend
    ├── app
    │   ├── globals.css
    │   ├── layout.tsx
    │   └── page.tsx
    ├── package.json
    └── .env
```

## Getting Started ⚡

### 1) Backend 📦

Install dependencies:

```bash
cd backend
pnpm install
```

Create `backend/.env`:

```bash
GROQ_API_KEY=your-groq-api-key
PORT=4000
```

Run the backend:

```bash
pnpm run dev
```

The API will be available at:

```
http://localhost:4000/api/chat
```

### 2) Frontend 📦

Install dependencies:

```bash
cd frontend
pnpm install
```

Create `frontend/.env`:

```bash
NEXT_PUBLIC_BACKEND_BASE_URL=http://localhost:4000/api
```

Run the frontend:

```bash
pnpm run dev
```

Open:

```
http://localhost:3000
```

## API Overview 📡

### POST /api/chat

Request body:

```json
{
  "userInput": "Hello!"
}
```

Response:

```json
{
  "message": "..."
}
```

## Notes 🧠

- Keep secrets out of source control.
- If you change backend port, update `NEXT_PUBLIC_BACKEND_BASE_URL`.

## 👤 Author

[**Prigeesh**](https://github.com/Sai-guru)
