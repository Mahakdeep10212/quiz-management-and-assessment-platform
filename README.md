# Labmentix - Quiz Management & Online Assessment Platform

A production-quality full-stack online quiz and assessment platform built with Next.js, React, Tailwind CSS, Prisma, and PostgreSQL.

## Features

### For Admins
- Comprehensive Dashboard with Real-time Analytics and Charts
- Manage Categories (Create, Edit, Delete)
- Manage Quizzes (Create, Edit, Delete, Publish, Unpublish)
- Manage Questions (Add, Edit, Delete MCQs with explanations)
- Manage Users (View history, activate/deactivate accounts)
- Configure Quiz settings (Duration, Passing Percentage, Max Attempts, Difficulty)

### For Students
- Secure Registration and Login
- Browse and Filter Published Quizzes
- Timed Quiz Environment (Server-side validated timer to prevent cheating)
- View Results immediately after submission (Score, Pass/Fail, Time Taken)
- Detailed Review of answers with explanations
- Personal Dashboard tracking performance and history
- Global Leaderboard to compete with peers

## Tech Stack
- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS, Lucide React, Recharts, React Hook Form
- **Backend**: Next.js Route Handlers (REST-style API)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: Custom JWT (jose) and bcrypt with secure HTTP-only cookies

## Architecture
The application uses a monolithic full-stack approach with Next.js App Router.
- `src/app/api`: Backend REST APIs protecting routes via session cookies.
- `src/app/admin`: Protected admin-only dashboard and management UI.
- `src/app/dashboard`, `/quizzes`, `/quiz`: Protected student routes.
- `src/lib/auth.js`: Handles JWT encryption/decryption and bcrypt password hashing.
- `src/middleware.js`: Edge middleware for Role-Based Access Control (RBAC).

## Database Schema Overview
- **User**: Stores admin and student accounts.
- **Category**: Classifies quizzes.
- **Quiz**: The core assessment entity.
- **Question & Option**: Stores MCQs. Options are linked to Questions.
- **Attempt & Answer**: Tracks student sessions, scores, and specific selected answers.

## Setup Instructions

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   Rename `.env.example` to `.env` and configure your database connection:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/labmentix?schema=public"
   AUTH_SECRET="your-super-secret-jwt-key"
   ```

3. **Initialize Database**
   Push the schema to your database:
   ```bash
   npx prisma db push
   ```

4. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

5. **Seed Development Data**
   Seed the database with sample users, categories, quizzes, and questions:
   ```bash
   npm run seed
   ```

6. **Start the Development Server**
   ```bash
   npm run dev
   ```

## Development Login Credentials
If you seeded the database using `npm run seed`, you can use the following credentials:

**Admin:**
- Email: `admin@example.com`
- Password: `password123`

**Student:**
- Email: `student1@example.com`
- Password: `password123`

## Future Enhancements
- Support for True/False, Fill in the blanks, and multi-select questions.
- Email notifications for quiz results.
- Export results to CSV/Excel.
- Dark mode toggle.
