import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { explainWithAI } from "@/lib/ai";

export async function POST(request) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = sessionCookie ? await decrypt(sessionCookie) : null;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
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
