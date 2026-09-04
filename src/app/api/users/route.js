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

    const users = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      select: {
        id: true,
        name: true,
        email: true,
        status: true,
        createdAt: true,
        attempts: {
          select: {
            id: true,
            percentage: true,
            quiz: {
              select: { passingScore: true }
            }
          }
        }
      },
      orderBy: { createdAt: "desc" }
    });

    // Compute derived stats for each user
    const usersWithStats = users.map(user => {
      const attempts = user.attempts;
      const totalAttempted = attempts.length;
      let highestScore = 0;
      let totalPercentage = 0;
      
      attempts.forEach(a => {
        if (a.percentage > highestScore) highestScore = a.percentage;
        totalPercentage += a.percentage || 0;
      });

      const avgScore = totalAttempted > 0 ? (totalPercentage / totalAttempted).toFixed(1) : 0;

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        status: user.status,
        createdAt: user.createdAt,
        totalAttempted,
        avgScore: parseFloat(avgScore),
        highestScore: parseFloat(highestScore.toFixed(1))
      };
    });

    return NextResponse.json(usersWithStats);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}
