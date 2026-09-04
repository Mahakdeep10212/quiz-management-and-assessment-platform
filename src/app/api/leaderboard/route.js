import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const users = await prisma.user.findMany({
      where: { role: 'STUDENT', status: 'ACTIVE' },
      select: {
        id: true,
        name: true,
        attempts: {
          where: { status: { in: ['COMPLETED', 'EXPIRED'] } },
          select: { percentage: true }
        }
      }
    });

    const leaderboard = users.map(user => {
      const attempts = user.attempts;
      const totalAttempted = attempts.length;
      let totalPercentage = 0;
      
      attempts.forEach(a => {
        totalPercentage += a.percentage || 0;
      });

      const avgScore = totalAttempted > 0 ? (totalPercentage / totalAttempted) : 0;

      return {
        id: user.id,
        name: user.name,
        quizzesCompleted: totalAttempted,
        avgScore: parseFloat(avgScore.toFixed(1))
      };
    }).filter(user => user.quizzesCompleted > 0) // Only show users who have completed at least one quiz
      .sort((a, b) => {
        if (b.avgScore !== a.avgScore) return b.avgScore - a.avgScore;
        return b.quizzesCompleted - a.quizzesCompleted; // Tie breaker
      });

    // Add rank
    leaderboard.forEach((user, index) => {
      user.rank = index + 1;
    });

    return NextResponse.json(leaderboard);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
  }
}
