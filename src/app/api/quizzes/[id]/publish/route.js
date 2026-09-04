import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";

export async function PATCH(request, { params }) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = sessionCookie ? await decrypt(sessionCookie) : null;

    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { status } = await request.json();

    if (!['DRAFT', 'PUBLISHED', 'UNPUBLISHED'].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    const resolvedParams = await params;
    const id = resolvedParams.id;

    // Optional: add validation here to prevent publishing a quiz with 0 questions
    if (status === 'PUBLISHED') {
      const quiz = await prisma.quiz.findUnique({
        where: { id },
        include: { _count: { select: { questions: true } } }
      });
      if (quiz?._count?.questions === 0) {
        return NextResponse.json({ error: "Cannot publish a quiz with no questions" }, { status: 400 });
      }
    }

    const updatedQuiz = await prisma.quiz.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json(updatedQuiz);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update quiz status" }, { status: 500 });
  }
}
