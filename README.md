# ⚡ Tamil Nadu EB Bill Comparison
### DMK Tariff vs TVK 200-Units-Free Scheme

A full-stack, production-ready web app that lets users instantly calculate and compare their monthly electricity bill under the current DMK tariff and the proposed TVK 200-units-free scheme.

---

## 📸 Features

- **Real-time calculation** — type units, see bills instantly
- **Slab-by-slab breakdown** — know exactly what you pay per tier
- **Interactive charts** — Bar, Area, Line charts via Recharts
- **Tamil / English toggle** — full bilingual UI
- **Dark mode** — cinematic dark-first design
- **PDF export** — save your result as PDF
- **WhatsApp share** — one-tap sharing
- **Mobile responsive** — works on all screen sizes
- **MongoDB analytics** — stores all calculations for insights

---

## 🧮 Tariff Logic

### DMK Current Tariff

| Slab | Units | Rate |
|------|-------|------|
| Slab 1 | 0 – 100 | **FREE** |
| Slab 2 | 101 – 200 | ₹1.50 / unit |
| Slab 3 | 201 – 500 | ₹3.00 / unit |
| Slab 4 | 501 – 1000 | ₹4.50 / unit |
| Slab 5 | Above 1000 | ₹6.00 / unit |

### TVK Proposed Scheme

| Condition | Rule |
|-----------|------|
| ≤ 500 units | First **200 units FREE**, rest at normal slab rate |
| > 500 units | **Same as current DMK tariff** (no extra benefit) |

### Calculation Example (350 units)

```
DMK Bill:
  0–100    → FREE
  101–200  → 100 × ₹1.50 = ₹150
  201–350  → 150 × ₹3.00 = ₹450
  TOTAL    = ₹600

TVK Bill:
  0–200    → FREE
  201–350  → 150 × ₹3.00 = ₹450
  TOTAL    = ₹450

SAVINGS   = ₹150 (25%)
```

---

## 🗂 Project Structure

```
tneb-bill/
├── frontend/                 # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/
│   │   │   ├── ParticleBackground.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── UnitInput.jsx
│   │   │   ├── BillCards.jsx
│   │   │   ├── SlabTable.jsx
│   │   │   ├── BillChart.jsx
│   │   │   ├── ActionBar.jsx
│   │   │   ├── AnimatedNumber.jsx
│   │   │   └── Footer.jsx
│   │   ├── utils/
│   │   │   ├── calculations.js   # All bill logic
│   │   │   └── lang.jsx          # Tamil/English i18n
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── Dockerfile
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── backend/                  # Node.js + Express
│   ├── src/
│   │   ├── models/
│   │   │   └── BillCalculation.js   # Mongoose schema
│   │   ├── routes/
│   │   │   └── bill.js              # REST API routes
│   │   ├── controllers/
│   │   │   └── calculations.js      # Server-side bill logic
│   │   └── index.js                 # Express server
│   ├── Dockerfile
│   ├── .env.example
│   └── package.json
│
├── nginx/
│   └── nginx.conf            # Nginx reverse proxy
│
├── docker-compose.yml        # Orchestrates all services
├── .gitignore
└── README.md
```

---

## 🚀 Quick Start (Docker — Recommended)

### Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Run Everything

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/tneb-bill.git
cd tneb-bill

# 2. Start all services
docker compose up --build

# 3. Open browser
open http://localhost
```

That's it. Three containers start: **MongoDB**, **Node.js backend**, **Nginx + React frontend**.

---

## 🛠 Local Development (Without Docker)

### Frontend

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

### Backend

```bash
cd backend
cp .env.example .env
# Edit .env with your MongoDB URI if needed
npm install
npm run dev
# Runs on http://localhost:5000
```

### MongoDB (local)

```bash
# Using Docker for just MongoDB
docker run -d -p 27017:27017 --name mongo mongo:7
```

---

## 🌐 API Endpoints

### `POST /api/bill/calculate`
Calculate bill for given units.

**Request:**
```json
{ "units": 350 }
```

**Response:**
```json
{
  "success": true,
  "data": {
    "units": 350,
    "dmkBill": 600,
    "tvkBill": 450,
    "savings": 150,
    "percentSaved": 25
  }
}
```

### `GET /api/bill/stats`
Analytics summary.

```json
{
  "success": true,
  "data": {
    "totalCalculations": 1042,
    "avgUnits": 287,
    "avgSavings": 125,
    "totalSavings": 130250
  }
}
```

### `GET /api/bill/history?limit=10`
Recent calculations.

### `GET /api/health`
Service health check.

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, Vite 5 |
| Styling | Tailwind CSS 3 |
| Animation | Framer Motion 11 |
| Charts | Recharts 2 |
| HTTP Client | Axios |
| Icons | React Icons |
| PDF Export | jsPDF + html2canvas |
| Backend | Node.js 20, Express 4 |
| Database | MongoDB 7, Mongoose 8 |
| Reverse Proxy | Nginx |
| Containers | Docker, Docker Compose |

---

## 🔧 Environment Variables

### Backend (`backend/.env`)

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `5000` | Server port |
| `MONGO_URI` | `mongodb://mongo:27017/tneb_bill` | MongoDB connection string |
| `CORS_ORIGIN` | `*` | Allowed CORS origins |
| `NODE_ENV` | `development` | Environment |

---

## 📱 Mobile Support

Fully responsive — tested on 320px to 4K. The particle canvas, charts, and card layouts all adapt to screen size.

---

## ⚠️ Disclaimer

This is an **unofficial, independent** comparison tool for informational purposes only. It is **not affiliated** with any political party, the Tamil Nadu government, or TNEB. Tariff data is based on publicly available information and may change.

---

## 📄 License

MIT License — use freely, fork, and improve!
#
