# 💊 MedsMinder AI — Intelligent Clinical Automation & Native Alert Engine

MedsMinder AI is a fully functional, high-impact healthcare solution designed for the **Beyond Tomorrow Hackathon 2026**. It sits at the intersection of **Healthcare Technology**, **Smart Automation**, and **Artificial Intelligence**.

The platform targets medical non adherence by enabling users to upload messy, handwritten prescriptions or pill bottle labels. An intelligent backend pipeline extracts clinical data and seamlessly delivers real-time, operating system-level native notification alerts straight to the patient.

---

## 🚀 Core Features

- **AI Vision Parsing Engine**: Leverages advanced multimodal AI to parse unstructured handwritten ink layers and medical shorthand (e.g., BD, PRN, AC, PC).
- **Structured JSON Synthesis**: Constraints the LLM generation payload using strict JSON formatting schema mapping to isolate system notification text from deep user-facing markdown text.
- **Native Web Push Automation**: Uses the native browser Notification API to push dynamic operating-system-level notifications directly onto the desktop frame environment.
- **Responsive Dashboard Layout**: Built with a responsive, utility-first design utilizing Tailwind CSS optimized for modern cross-platform usability.

---

## 🛠️ Technology Stack

- **Frontend Interface**: Next.js 16 (App Router, React Server & Client Components)
- **Styling & Animation Layout**: Tailwind CSS
- **Machine Learning Architecture**: Google Gemini 2.5 Flash API (`@google/generative-ai`)
- **Runtime & Compilation Pipeline**: Node.js & Turbopack Core Compiler

---

## 📐 System Workflow Architecture

[User Interface (Next.js/Tailwind)]│▼ (FormData Image Payload)[Secure Dynamic Backend Route (/api/analyze)]│▼ (Base64 Binary Buffer Translation)[Google Gemini 2.5 Flash API]│▼ (Enforced Response MimeType: Structured JSON)[Dynamic Value Extraction Node]───────┴───────│               │▼               ▼[Detailed Markdown]   [Real-time Notification Summary]│               │▼               ▼(Rendered on Screen)  (Native OS Notification Fired Instantly)



---

## ⚙️ Local Installation & Development

Follow these steps to run the complete architectural instance locally on your developer machine:

### 1. Clone and Navigate to Project
```bash
git clone https://github.com
cd medsminder
```

### 2. Install Project Dependencies
```bash
npm install
```

### 3. Setup Your Secure Key
Create a `.env.local` file in the project root directory:
```text
GEMINI_API_KEY=your_actual_api_key_here
```
*(Note: For rapid verification loops during development, keys can also be securely initialized natively within the API node constructor).*

### 4. Boot up local Development Server
```bash
npm run dev
```
Open **`http://localhost:3000`** within your browser to experience the functional deployment matrix.

---

## 🎯 Alignment with Hackathon Criteria (25% Each)

1. **Innovation & Creativity (25%)**: Transforms standard text extraction into an adaptive translation tool that simplifies confusing professional Latin clinical codes into readable layman instructions.
2. **Technical Implementation (25%)**: Implements a clean Next.js architecture separating UI rendering from API orchestration, using Base64 binary file stream processing safely on the server side.
3. **Real-World Impact & Scalability (25%)**: Directly fights low medical literacy and high prescription misread frequencies in emerging markets. Easily scalable to Twilio SMS gateways, Web3 record ledgers, or watchOS complications.
4. **Design & Presentation (25%)**: Features an interactive layout complete with dropzone triggers, image state caching, animated pulse engine indicators, and immediate, real native notification pings to eliminate conceptual friction for the judging panel.