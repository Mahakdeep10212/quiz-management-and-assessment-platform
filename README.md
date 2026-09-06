# SkillPulse - Intelligent Quiz & Online Assessment Platform

A production-grade, full-stack online quiz and skill assessment platform built with Next.js 16, React 19, Tailwind CSS, Prisma, and PostgreSQL.

[![Repository](https://img.shields.io/badge/GitHub-SkillPulse-indigo.svg)](https://github.com/Mahakdeep10212/quiz-management-and-assessment-platform)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)](https://nextjs.org/)

---

## ⚡ Highlights & Features

### 🤖 Generative AI Capabilities
- **✨ AI Quiz & Question Generator**: Synthesize complete assessment modules (questions, options, correct answers, and rich explanations) for any custom topic in seconds using Google Gemini with structured JSON output enforcement.
- **🧠 Interactive AI Tutor**: Personalized post-exam feedback assistant that breaks down candidate misconceptions, explains underlying principles, and provides memory aids for any question.

### 👨‍💼 For Administrators
- **Real-Time Analytics & Dashboard**: Visual KPI metrics, attempt distribution charts, and completion stats powered by Recharts.
- **Category & Topic Management**: Create, update, and manage customizable domain modules.
- **Quiz Engine**: Configure durations, passing scores, maximum attempts, and difficulty tiers with draft/publish toggling.
- **Question Bank with Explanations**: Manage multi-choice questions (MCQs), configurable options, and rationales.
- **User Governance**: Audit user assessment histories and manage account access status.

### 🎓 For Candidates & Students
- **Smart Assessment Room**: Server-validated timer prevents local time tampering and triggers automatic submission upon expiration.
- **Immediate Detailed Feedback**: Instant score calculation, pass/fail status, and question-by-question review with explanations.
- **Performance Analytics**: Personalized dashboard tracking historical scores, accuracy percentages, and test trends.
- **Global Leaderboard**: Benchmark ranking against peers across topics and domains.

---

## 🛠 Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS, Lucide Icons, Recharts, React Hook Form
- **AI & LLM**: Google Gemini API (`gemini-2.5-flash`), OpenAI API, Structured Prompt Engineering
- **Backend**: Next.js Route Handlers (Edge & Node runtime)
- **Database**: PostgreSQL (Native or Zero-Config Embedded PGlite)
- **ORM**: Prisma Client & Prisma Migrate with `@prisma/adapter-pg`
- **Authentication**: Custom JWT encryption (`jose`), bcrypt password hashing, and secure HTTP-only cookies
- **Testing**: Vitest, React Testing Library, and Playwright E2E

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Mahakdeep10212/quiz-management-and-assessment-platform.git
cd quiz-management-and-assessment-platform
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the project root (default configuration works out of the box with the embedded database):
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/skillpulse?schema=public"
AUTH_SECRET="skillpulse-super-secret-jwt-key-32-chars-minimum"
```

### 3. Start Database & Initialize Data

You can run SkillPulse with **zero external database setup** using the built-in embedded PostgreSQL server:

#### Terminal 1: Start the Embedded Database Server
```bash
npm run db:start
```
> *Note: If you have your own external PostgreSQL server (e.g. Supabase, Neon, or local PostgreSQL), simply set its connection string in `.env` and skip `npm run db:start`.*

#### Terminal 2: Initialize Schema & Seed
```bash
# Push schema to database
npm run db:push

# Seed categories, 27 comprehensive quizzes, questions, and demo users
npm run seed
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔑 Default Seed Credentials

After running `npm run seed`:

- **Admin Account**:
  - Email: `admin@example.com`
  - Password: `password123`
- **Student Account**:
  - Email: `student1@example.com`
  - Password: `password123`

---

## 🧪 Running Tests

```bash
# Run unit tests
npm run test

# Run tests with coverage
npm run test:coverage

# Run Playwright E2E tests
npm run test:e2e
```

---

## 📄 License
This project is open-source under the MIT License.
