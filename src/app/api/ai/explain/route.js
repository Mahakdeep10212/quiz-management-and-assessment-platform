import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { explainWithAI } from "@/lib/ai";
import { checkRateLimit } from "@/lib/rateLimit";

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = sessionCookie ? await decrypt(sessionCookie) : null;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    if (session.role !== "ADMIN") {
      const rateLimit = checkRateLimit(`ai-explain:${session.userId}`, 20, 60 * 60 * 1000);
      if (!rateLimit.success) {
        return NextResponse.json(
          { error: "Hourly AI tutor quota reached (20 requests/hour). Please try again later." },
          { status: 429 }
        );
      }
    }

    const { questionId, selectedOptionId } = await request.json();

    if (!questionId) {
      return NextResponse.json({ error: "questionId is required" }, { status: 400 });
    }

    const question = await prisma.question.findUnique({
      where: { id: questionId },
      include: { options: true }
    });

    if (!question) {
      return NextResponse.json({ error: "Question not found" }, { status: 404 });
    }

    if (session.role !== "ADMIN") {
      // Prevent cheating: verify student doesn't have an active unsubmitted attempt for this quiz
      const activeAttempt = await prisma.attempt.findFirst({
        where: {
          quizId: question.quizId,
          userId: session.userId,
          status: "IN_PROGRESS"
        }
      });
      if (activeAttempt) {
        return NextResponse.json(
          { error: "AI tutor is disabled while an exam attempt is in progress." },
          { status: 403 }
        );
      }

      // Ensure the student actually completed an attempt for this quiz before asking for explanations
      const finishedAttempt = await prisma.attempt.findFirst({
        where: {
          quizId: question.quizId,
          userId: session.userId,
          status: { in: ["COMPLETED", "EXPIRED"] }
        }
      });
      if (!finishedAttempt) {
        return NextResponse.json(
          { error: "You may only request explanations after completing the quiz." },
          { status: 403 }
        );
      }
    }

    const correctOption = question.options.find((o) => o.isCorrect);
    const selectedOption = question.options.find((o) => o.id === selectedOptionId);

    const explanationText = await explainWithAI({
      questionText: question.questionText,
      selectedOptionText: selectedOption ? selectedOption.optionText : null,
      correctOptionText: correctOption ? correctOption.optionText : "Not specified",
      explanation: question.explanation
    });

    return NextResponse.json({
      explanation: explanationText,
      questionId: question.id
    });
  } catch (error) {
    console.error("[API/AI/EXPLAIN] Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate AI explanation" },
      { status: 500 }
    );
  }
}
