import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";

export async function GET(request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = sessionCookie ? await decrypt(sessionCookie) : null;

    if (!session || session.role !== "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const attempts = await prisma.attempt.findMany({
      where: { 
        userId: session.userId,
        status: { in: ['COMPLETED', 'EXPIRED'] }
      },
      include: {
        quiz: {
          select: {
            title: true,
            passingScore: true,
            category: { select: { name: true } }
          }
        }
      },
      orderBy: { startedAt: "asc" } // Oldest first to build trend
    });

    const totalCompleted = attempts.length;
    let passed = 0;
    let highestScore = 0;
    let totalScore = 0;

    const categoryMap = {};

    attempts.forEach(a => {
      totalScore += a.percentage;
      if (a.percentage > highestScore) highestScore = a.percentage;
      if (a.percentage >= (a.quiz?.passingScore || 0)) passed++;

      const catName = a.quiz?.category?.name || "Uncategorized";
      if (!categoryMap[catName]) categoryMap[catName] = { total: 0, count: 0 };
      categoryMap[catName].total += a.percentage;
      categoryMap[catName].count++;
    });

    const averageScore = totalCompleted > 0 ? (totalScore / totalCompleted).toFixed(1) : 0;
    const passRate = totalCompleted > 0 ? ((passed / totalCompleted) * 100).toFixed(1) : 0;

    // Last 10 attempts for line chart
    const recentAttempts = attempts.slice(-10);
    const chartData = recentAttempts.map(a => ({
      name: a.quiz?.title?.substring(0, 15) + (a.quiz?.title?.length > 15 ? '...' : ''),
      score: a.percentage
    }));

    // Category performance
    const categoryPerformance = Object.keys(categoryMap).map(cat => ({
      category: cat,
      avgScore: Math.round(categoryMap[cat].total / categoryMap[cat].count)
    }));

    return NextResponse.json({
      stats: {
        totalCompleted,
        averageScore,
        highestScore,
        passRate
      },
      chartData,
      categoryPerformance
    });

  } catch (error) {
    console.error("Performance API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
