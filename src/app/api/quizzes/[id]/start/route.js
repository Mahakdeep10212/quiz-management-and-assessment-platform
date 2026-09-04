import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";

export async function POST(request, { params }) {
  try {
    const resolvedParams = await params;
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = sessionCookie ? await decrypt(sessionCookie) : null;

    if (!session || session.role !== "STUDENT") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id: resolvedParams.id }
    });

    if (!quiz || quiz.status !== "PUBLISHED") {
      return NextResponse.json({ error: "Quiz not found or not published" }, { status: 404 });
    }

    // Check attempts
    const attemptsCount = await prisma.attempt.count({
      where: {
        quizId: quiz.id,
        userId: session.userId,
        status: { in: ['COMPLETED', 'EXPIRED'] }
      }
    });

    if (attemptsCount >= quiz.maxAttempts) {
      return NextResponse.json({ error: "Maximum attempts reached" }, { status: 403 });
    }

    // Check if there's an IN_PROGRESS attempt
    let activeAttempt = await prisma.attempt.findFirst({
      where: {
        quizId: quiz.id,
        userId: session.userId,
        status: 'IN_PROGRESS'
      }
    });

    if (!activeAttempt) {
      activeAttempt = await prisma.attempt.create({
        data: {
          quizId: quiz.id,
          userId: session.userId,
          status: 'IN_PROGRESS',
        }
      });
    }

    // Redirect to the quiz taking UI
    return NextResponse.redirect(new URL(`/quiz/${activeAttempt.id}/attempt`, request.url), 303);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to start quiz" }, { status: 500 });
  }
}
