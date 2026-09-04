import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";

export async function GET(request, { params }) {
  try {
    const resolvedParams = await params;
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;
    const session = sessionCookie ? await decrypt(sessionCookie) : null;

    if (!session) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    const attempt = await prisma.attempt.findUnique({
      where: { id: resolvedParams.id },
      include: {
        quiz: {
          include: {
            questions: {
              include: { options: true }
            }
          }
        },
        answers: true,
        user: { select: { id: true, name: true, email: true } }
      }
    });

    if (!attempt) {
      return NextResponse.json({ error: "Attempt not found" }, { status: 404 });
    }

    // Only allow ADMIN or the student who made the attempt to view it
    if (session.role !== "ADMIN" && attempt.userId !== session.userId) {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
    }

    if (attempt.status === "IN_PROGRESS") {
      return NextResponse.json({ error: "Attempt is not completed yet" }, { status: 400 });
    }

    return NextResponse.json(attempt);

  } catch (error) {
    return NextResponse.json({ error: "Failed to load attempt results" }, { status: 500 });
  }
}
