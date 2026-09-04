import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = sessionCookie ? await decrypt(sessionCookie) : null;

    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const [
      totalStudents,
      totalQuizzes,
      publishedQuizzes,
      totalQuestions,
      attempts
    ] = await Promise.all([
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.quiz.count(),
      prisma.quiz.count({ where: { status: 'PUBLISHED' } }),
      prisma.question.count(),
      prisma.attempt.findMany({
        where: { status: { in: ['COMPLETED', 'EXPIRED'] } },
        include: { quiz: true }
      })
    ]);

    const totalAttempts = attempts.length;
    let passedAttempts = 0;
    let totalPercentage = 0;

    attempts.forEach(a => {
      totalPercentage += a.percentage || 0;
      if (a.percentage >= a.quiz.passingScore) {
        passedAttempts++;
      }
    });

    const failedAttempts = totalAttempts - passedAttempts;
    const averageScore = totalAttempts > 0 ? (totalPercentage / totalAttempts).toFixed(1) : 0;

    // Daily attempts chart data (last 7 days)
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

    const attemptsByDate = attempts.reduce((acc, a) => {
      const date = new Date(a.completedAt).toISOString().split('T')[0];
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    const chartData = last7Days.map(date => ({
      name: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
      attempts: attemptsByDate[date] || 0
    }));

    return NextResponse.json({
      stats: {
        totalStudents,
        totalQuizzes,
        publishedQuizzes,
        draftQuizzes: totalQuizzes - publishedQuizzes,
        totalQuestions,
        totalAttempts,
        averageScore,
        passedAttempts,
        failedAttempts
      },
      chartData
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
