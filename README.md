# 🎙️ AI Voice Receptionist Backend

A high-performance Node.js & Express backend designed for Voice AI platforms (such as **Vapi**, **Retell AI**, or custom WebRTC clients) with two core capabilities:
1. **📅 Smart Booking API**: Checks slot availability, logs appointments locally to `bookings.json`, and asynchronously syncs data to **Google Sheets**.
2. **🔀 Resilient LLM Fallback Router**: An OpenAI-compatible `/v1/chat/completions` endpoint that proxies and seamlessly cascades through a prioritized chain of LLMs (**Groq LLaMA 3.3 70B &rarr; Groq LLaMA 3.1 70B &rarr; Google Gemini 2.0 Flash &rarr; Voice Recovery Message**).

---

## 🌟 Key Features

- **Zero Call Dropping**: If an LLM provider encounters rate limits (429), model deprecation (400/404), server outages (5xx), or timeouts, the router automatically cascades to the next available model without interrupting the user call.
- **Graceful Voice Assistant Safeguard**: If all upstream providers fail simultaneously, the system returns a 200 OK assistant response saying: *"I'm having trouble connecting right now, let me have someone call you back."*
- **Streaming & Non-Streaming**: Supports standard JSON completions as well as Server-Sent Events (`stream: true`) SSE chunks compatible with Vapi and OpenAI SDKs.
- **Google Sheets Sync**: Records appointments to Google Sheets via service account auth with non-blocking error isolation.
- **Full CORS Support**: Enabled across all endpoints for web and mobile clients.
- **Real-Time Logging**: Console & file-based logging (`logs/router.log`) tracking model routing, fallback cascades, and latency metrics.

---

## 📋 Architecture & LLM Routing Hierarchy

```mermaid
flowchart TD
    Vapi[Voice AI / Vapi Client] -->|POST /v1/chat/completions| Router[LLM Fallback Router]
    
    Router -->|1. Try Primary| Groq1["Groq: llama-3.3-70b-versatile"]
    Groq1 -->|Success| Response[OpenAI Compatible JSON / SSE Stream]
    Groq1 -.->|400/404/429/5xx Error| Groq2["Groq: llama-3.1-70b-versatile"]
    
    Groq2 -->|Success| Response
    Groq2 -.->|Error| Gemini["Gemini: gemini-2.0-flash"]
    
    Gemini -->|Format Translation| Response
    Gemini -.->|Error| Fallback["Voice Recovery Message: 'I'm having trouble connecting...'"]
    Fallback --> Response
```

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory (see [.env.example](file:///.env.example)):

| Variable | Required | Description |
| :--- | :--- | :--- |
| `PORT` | Optional | Port for the Express server (default: `3000`). |
| `GROQ_API_KEY` | **Yes** (for Groq) | API key from [Groq Console](https://console.groq.com/keys). |
| `GEMINI_API_KEY` | **Yes** (for Gemini) | API key from [Google AI Studio](https://aistudio.google.com/app/apikey). |
| `GOOGLE_CLIENT_EMAIL` | Optional | Service account email (e.g. `voice-bot@project.iam.gserviceaccount.com`). |
| `GOOGLE_PRIVATE_KEY` | Optional | Service account private key (including `-----BEGIN PRIVATE KEY-----`). |
| `GOOGLE_SHEET_ID` | Optional | Google Sheet ID from sheet URL (`https://docs.google.com/spreadsheets/d/<ID>/edit`). |

> [!NOTE]
> If Google Sheets environment variables are omitted, local booking to `bookings.json` will continue without errors and a warning will be logged.

---

## 🚀 Quick Start (Local Run)

### 1. Clone & Install Dependencies
```bash
git clone <your-repo-url>
cd AI-Voice-Receptionist
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env and enter your API keys
```

### 3. Run Development Server
```bash
npm run dev
```

The server will start at `http://localhost:3000`.

### 4. Run Automated Test Suite
Run the built-in end-to-end verification script testing the Booking API, Google Sheets handling, LLM completions, fallback simulation, and SSE streaming:
```bash
npm test
```

---

## 📡 API Reference

### 1. Availability Check
- **Endpoint**: `POST /check-availability`
- **Request Body**:
```json
{
  "date": "2026-10-15",
  "time": "14:00"
}
```
- **Response** `200 OK`:
```json
{
  "available": true
}
```

---

### 2. Book Appointment
- **Endpoint**: `POST /book-appointment`
- **Request Body**:
```json
{
  "name": "Sarah Connor",
  "date": "2026-10-15",
  "time": "14:00",
  "reason": "Consultation on AI automation"
}
```
- **Response** `201 Created`:
```json
{
  "success": true,
  "message": "Appointment successfully booked for Sarah Connor on 2026-10-15 at 14:00.",
  "booking": {
    "id": "bk_1788018300331_i8g0ny",
    "name": "Sarah Connor",
    "date": "2026-10-15",
    "time": "14:00",
    "reason": "Consultation on AI automation",
    "createdAt": "2026-10-15T14:00:00.000Z"
  }
}
```
- **Response** `409 Conflict` (if slot is already taken):
```json
{
  "success": false,
  "message": "The slot on 2026-10-15 at 14:00 is already booked. Please choose another time."
}
```

---

### 3. Get All Bookings
- **Endpoint**: `GET /bookings`
- **Response** `200 OK`:
```json
[
  {
    "id": "bk_1788018300331_i8g0ny",
    "name": "Sarah Connor",
    "date": "2026-10-15",
    "time": "14:00",
    "reason": "Consultation on AI automation",
    "createdAt": "2026-10-15T14:00:00.000Z"
  }
]
```

---

### 4. OpenAI-Compatible Chat Completions & LLM Fallback Router
- **Endpoint**: `POST /v1/chat/completions`
- **Request Body**:
```json
{
  "messages": [
    {
      "role": "system",
      "content": "You are a professional voice receptionist for Acme Corp."
    },
    {
      "role": "user",
      "content": "Hi, I'd like to check if you have any openings this Friday."
    }
  ],
  "temperature": 0.7,
  "stream": false
}
```
- **Response Headers**:
  - `x-llm-provider`: Provider that served the request (e.g. `groq` or `gemini`)
  - `x-llm-model`: Model that served the request (e.g. `llama-3.3-70b-versatile` or `gemini-2.0-flash`)
  - `x-fallback-occurred`: `true` if primary provider failed and fallback was used.
- **Response Body** `200 OK`:
```json
{
  "id": "chatcmpl-123456789",
  "object": "chat.completion",
  "created": 1788018300,
  "model": "llama-3.3-70b-versatile",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Hello! I would be happy to help check Friday's availability for you. What time works best?"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 35,
    "completion_tokens": 22,
    "total_tokens": 57
  }
}
```

---

## 🎙️ Configuring with Vapi

1. Open your [Vapi Dashboard](https://dashboard.vapi.ai/).
2. Create or edit an **Assistant**.
3. Under **Model / Provider**:
   - Select **Custom LLM** (or OpenAI Compatible provider).
   - **Base URL**: `https://<your-deployed-service-url>/v1` (e.g., `https://ai-voice-receptionist.onrender.com/v1`).
   - **Model**: `llama-3.3-70b-versatile` (or any string; our router manages the fallback cascade dynamically).
4. Under **Tools / Functions**, configure Vapi functions for:
   - `checkAvailability` &rarr; pointing to `https://<your-deployed-service-url>/check-availability`
   - `bookAppointment` &rarr; pointing to `https://<your-deployed-service-url>/book-appointment`

---

## 📊 Google Sheets Setup Guide

1. Create a Google Cloud Project in [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the **Google Sheets API**.
3. Create a **Service Account** and generate a **JSON Key**.
4. Copy `client_email` to `GOOGLE_CLIENT_EMAIL` in your `.env`.
5. Copy `private_key` to `GOOGLE_PRIVATE_KEY` in your `.env`.
6. Create a Google Sheet and share it with the service account email (giving it **Editor** permission).
7. Copy the Spreadsheet ID from the URL (`https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit`) to `GOOGLE_SHEET_ID`.

---

## ☁️ Deploying to Render

1. Push your repository to **GitHub**:
```bash
git add .
git commit -m "feat: complete voice receptionist backend with LLM fallback router"
git push origin main
```
2. Log in to [Render](https://render.com) and click **New +** &rarr; **Web Service**.
3. Connect your GitHub repository.
4. Set the following settings:
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free (or Starter)
5. Under **Environment Variables**, add:
   - `GROQ_API_KEY`
   - `GEMINI_API_KEY`
   - `GOOGLE_CLIENT_EMAIL`
   - `GOOGLE_PRIVATE_KEY`
   - `GOOGLE_SHEET_ID`
6. Click **Deploy Web Service**. Render will assign a public URL (e.g., `https://ai-voice-receptionist-backend.onrender.com`).
