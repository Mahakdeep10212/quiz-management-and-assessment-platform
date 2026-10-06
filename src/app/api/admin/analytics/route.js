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

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    const [
      totalStudents,
      totalQuizzes,
      publishedQuizzes,
      totalQuestions,
      totalAttempts,
      avgAgg,
      recentAttempts
    ] = await Promise.all([
      prisma.user.count({ where: { role: 'STUDENT' } }),
      prisma.quiz.count(),
      prisma.quiz.count({ where: { status: 'PUBLISHED' } }),
      prisma.question.count(),
      prisma.attempt.count({ where: { status: { in: ['COMPLETED', 'EXPIRED'] } } }),
      prisma.attempt.aggregate({
        where: { status: { in: ['COMPLETED', 'EXPIRED'] } },
        _avg: { percentage: true }
      }),
      prisma.attempt.findMany({
        where: {
          status: { in: ['COMPLETED', 'EXPIRED'] },
          completedAt: { gte: sevenDaysAgo }
        },
        select: {
          completedAt: true,
          percentage: true,
          quiz: { select: { passingScore: true } }
        }
      })
    ]);

    const averageScore = avgAgg._avg.percentage ? avgAgg._avg.percentage.toFixed(1) : 0;

    let passedRecent = 0;
    const attemptsByDate = {};

    recentAttempts.forEach(a => {
      if (a.completedAt) {
        const dateStr = new Date(a.completedAt).toISOString().split('T')[0];
        attemptsByDate[dateStr] = (attemptsByDate[dateStr] || 0) + 1;
      }
      if (a.percentage >= (a.quiz?.passingScore || 50)) {
        passedRecent++;
      }
    });

    // Approximate pass ratio from total or recent
    const passRatio = recentAttempts.length > 0 ? passedRecent / recentAttempts.length : 0.7;
    const passedAttempts = Math.round(totalAttempts * passRatio);
    const failedAttempts = totalAttempts - passedAttempts;

    // Daily attempts chart data (last 7 days)
    const last7Days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - i);
      return d.toISOString().split('T')[0];
    }).reverse();

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
