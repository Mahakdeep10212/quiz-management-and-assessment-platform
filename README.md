# SkillPulse - Intelligent Quiz & Online Assessment Platform

A production-grade, full-stack online quiz and skill assessment platform built with Next.js 15, React 19, Tailwind CSS, Prisma, and PostgreSQL.

[![Repository](https://img.shields.io/badge/GitHub-SkillPulse-indigo.svg)](https://github.com/Mahakdeep10212/quiz-management-and-assessment-platform)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)

---

## ⚡ Highlights & Features

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

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS, Lucide Icons, Recharts, React Hook Form
- **Backend**: Next.js Route Handlers (Edge & Node runtime)
- **Database**: PostgreSQL
- **ORM**: Prisma Client & Prisma Migrate
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
Create a `.env` file in the project root:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/skillpulse?schema=public"
AUTH_SECRET="your-super-secret-jwt-key-change-this"
```

### 3. Initialize the Database
```bash
# Push schema to PostgreSQL
npx prisma db push

# Generate Prisma client
npx prisma generate

# Seed sample categories, quizzes, and questions
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
