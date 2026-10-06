import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";

export async function PUT(request, { params }) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = sessionCookie ? await decrypt(sessionCookie) : null;

    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const resolvedParams = await params;
    const { questionText, marks, explanation, difficulty, options } = await request.json();

    if (!questionText || !options || options.length < 2) {
      return NextResponse.json({ error: "Invalid question data. Minimum 2 options required." }, { status: 400 });
    }

    const correctOptions = options.filter(o => o.isCorrect);
    if (correctOptions.length !== 1) {
      return NextResponse.json({ error: "Exactly one correct option is required" }, { status: 400 });
    }

    // Safely update question and options without breaking existing student attempt answers
    const existingOptions = await prisma.option.findMany({
      where: { questionId: resolvedParams.id }
    });

    const updatedQuestion = await prisma.$transaction(async (tx) => {
      await tx.question.update({
        where: { id: resolvedParams.id },
        data: {
          questionText,
          marks: parseInt(marks) || 1,
          explanation,
          difficulty
        }
      });

      // Update existing options or create new ones
      for (let i = 0; i < options.length; i++) {
        const opt = options[i];
        const existing = opt.id 
          ? existingOptions.find(eo => eo.id === opt.id) 
          : existingOptions[i];

        if (existing) {
          await tx.option.update({
            where: { id: existing.id },
            data: {
              optionText: opt.optionText,
              isCorrect: Boolean(opt.isCorrect)
            }
          });
        } else {
          await tx.option.create({
            data: {
              questionId: resolvedParams.id,
              optionText: opt.optionText,
              isCorrect: Boolean(opt.isCorrect)
            }
          });
        }
      }

      // If fewer options were provided, delete unreferenced leftover options
      if (existingOptions.length > options.length) {
        const remainingExisting = existingOptions.slice(options.length);
        for (const rem of remainingExisting) {
          const answerCount = await tx.answer.count({ where: { selectedOptionId: rem.id } });
          if (answerCount === 0) {
            await tx.option.delete({ where: { id: rem.id } });
          }
        }
      }

      return tx.question.findUnique({
        where: { id: resolvedParams.id },
        include: { options: true }
      });
    });

    return NextResponse.json(updatedQuestion);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update question" }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = sessionCookie ? await decrypt(sessionCookie) : null;

    if (!session || session.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const resolvedParams = await params;
    await prisma.question.delete({
      where: { id: resolvedParams.id }
    });

    return NextResponse.json({ message: "Question deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete question" }, { status: 500 });
  }
}
