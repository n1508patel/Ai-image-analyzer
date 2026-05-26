# Visionary — AI Image Analyzer

A full-stack MERN app that uses Claude's vision API to generate captions, detect objects, analyze mood, and extract color palettes from any image. All analyses are saved to MongoDB.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| AI | Anthropic Claude (vision) |

---

## Features

- Drag-and-drop or click-to-upload image input
- AI-generated caption, mood, tags, objects, and color palette
- Detailed analysis paragraph per image
- Full history saved to MongoDB (view + delete)
- Dark editorial UI

---

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier works)
- Anthropic API key — [console.anthropic.com](https://console.anthropic.com)

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/ai-image-analyzer.git
cd ai-image-analyzer
```

### 2. Set up the server
```bash
cd server
npm install
cp .env.example .env
# Fill in MONGO_URI and ANTHROPIC_API_KEY in .env
npm run dev
```

### 3. Set up the client
```bash
cd ../client
npm install
npm run dev
```

App runs at `http://localhost:5173` — backend at `http://localhost:5000`.

---

## Project Structure

```
ai-image-analyzer/
├── client/                  # React (Vite)
│   └── src/
│       ├── api/             # Axios helpers
│       ├── components/      # ImageUploader, ResultCard, HistorySidebar
│       ├── hooks/           # useAnalyzer
│       └── App.jsx
├── server/                  # Node + Express
│   ├── config/db.js
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── .gitignore
└── README.md
```

---

## API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| POST | `/api/analyze` | Analyze an image (base64) |
| GET | `/api/analyze` | Fetch last 20 analyses |
| DELETE | `/api/analyze/:id` | Delete an analysis |

---

## License
MIT
