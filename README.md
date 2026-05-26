# Visionary — AI Image Analyzer

A full-stack MERN app that uses groq ai API to generate captions, detect objects, analyze mood, and extract color palettes from any image. All analyses are saved to MongoDB.

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express |
| Database | MongoDB + Mongoose |
| AI | Groq Ai|

---

## Features

- Drag-and-drop or click-to-upload image input
- AI-generated caption, mood, tags, objects, and color palette
- Detailed analysis paragraph per image
- Full history saved to MongoDB (view + delete)
- Dark editorial UI

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
