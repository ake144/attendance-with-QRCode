import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Replace with your Prisma client import
import { verifyToken } from "@/lib/decodetoken"; // Adjust import path as needed

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json({ message: "Token is required" }, { status: 400 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 403 });
  }

  const { userID, date } = decoded;

  try {
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userID },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user, date });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
