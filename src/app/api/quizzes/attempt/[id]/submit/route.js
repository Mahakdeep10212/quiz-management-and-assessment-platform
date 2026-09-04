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

    const { answers } = await request.json(); // answers format: { questionId: selectedOptionId }

    const attempt = await prisma.attempt.findUnique({
      where: { id: resolvedParams.id },
      include: {
        quiz: {
          include: {
            questions: {
              include: { options: true }
            }
          }
        }
      }
    });

    if (!attempt || attempt.userId !== session.userId) {
      return NextResponse.json({ error: "Attempt not found" }, { status: 404 });
    }

    if (attempt.status !== "IN_PROGRESS") {
      return NextResponse.json({ error: "Attempt already submitted" }, { status: 400 });
    }

    const startedAt = new Date(attempt.startedAt).getTime();
    const durationMs = attempt.quiz.duration * 60 * 1000;
    const expiresAt = startedAt + durationMs;
    const now = Date.now();

    const isExpired = now > expiresAt + 10000; // 10 seconds grace period

    const { calculateScore } = require("@/lib/scoring");
    
    const {
      correctCount,
      incorrectCount,
      unansweredCount,
      totalMarks,
      obtainedMarks,
      percentage,
      answerRecords
    } = calculateScore(attempt.quiz.questions, answers);

    // Map answer records to include attemptId
    const finalAnswerRecords = answerRecords.map(record => ({
      ...record,
      attemptId: attempt.id
    }));
    const timeTaken = isExpired ? durationMs / 1000 : Math.floor((now - startedAt) / 1000);
    const finalStatus = isExpired ? "EXPIRED" : "COMPLETED";

    // Save results in transaction
    await prisma.$transaction([
      prisma.answer.createMany({
        data: finalAnswerRecords
      }),
      prisma.attempt.update({
        where: { id: attempt.id },
        data: {
          score: obtainedMarks,
          percentage,
          correctAnswers: correctCount,
          incorrectAnswers: incorrectCount,
          unanswered: unansweredCount,
          timeTaken,
          status: finalStatus,
          completedAt: new Date()
        }
      })
    ]);

    return NextResponse.json({ message: "Quiz submitted successfully", attemptId: attempt.id });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to submit quiz" }, { status: 500 });
  }
}
