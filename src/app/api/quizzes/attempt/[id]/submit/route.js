import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { calculateScore } from "@/lib/scoring";

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

    // Execute atomic submission in an interactive transaction to prevent race conditions
    const result = await prisma.$transaction(async (tx) => {
      const attempt = await tx.attempt.findUnique({
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
        return { error: "Attempt not found", status: 404 };
      }

      if (attempt.status !== "IN_PROGRESS") {
        return { error: "Attempt already submitted", status: 400 };
      }

      const startedAt = new Date(attempt.startedAt).getTime();
      const durationMs = attempt.quiz.duration * 60 * 1000;
      const expiresAt = startedAt + durationMs;
      const now = Date.now();

      const isExpired = now > expiresAt + 10000; // 10 seconds grace period

      const {
        correctCount,
        incorrectCount,
        unansweredCount,
        obtainedMarks,
        percentage,
        answerRecords
      } = calculateScore(attempt.quiz.questions, answers || {});

      const finalAnswerRecords = answerRecords.map((record) => ({
        ...record,
        attemptId: attempt.id
      }));

      const timeTaken = isExpired ? Math.floor(durationMs / 1000) : Math.floor((now - startedAt) / 1000);
      const finalStatus = isExpired ? "EXPIRED" : "COMPLETED";

      // Delete any previous answers for this attempt to guarantee idempotency
      await tx.answer.deleteMany({
        where: { attemptId: attempt.id }
      });

      await tx.answer.createMany({
        data: finalAnswerRecords
      });

      await tx.attempt.update({
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
      });

      return { success: true, attemptId: attempt.id };
    });

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: result.status });
    }

    return NextResponse.json({ message: "Quiz submitted successfully", attemptId: result.attemptId });
  } catch (error) {
    console.error("Quiz submission error:", error);
    return NextResponse.json({ error: "Failed to submit quiz" }, { status: 500 });
  }
}
