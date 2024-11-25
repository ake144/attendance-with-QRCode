import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/decodetoke"; // Create this utility for decoding tokens

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

  console.log(token)

  if (!token) {
    return NextResponse.json({ message: "Token is required" }, { status: 400 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 403 });
  }

  console.log(decoded)

  const { userID, date } = decoded;

  console.log(userID)
  try {
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userID },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
console.log(user)
    return NextResponse.json({ user, date });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}





