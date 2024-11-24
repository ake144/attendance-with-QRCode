// app/api/mark/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const date = searchParams.get("date");

    // Validate inputs
    if (!userId || !date) {
      return NextResponse.json(
        { message: "userId and date are required" },
        { status: 400 }
      );
    }


    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return NextResponse.json(
        { message: "Invalid date format. Use ISO 8601 format (e.g., 2024-11-24)." },
        { status: 400 }
      );
    }


    // Convert date to string (YYYY-MM-DD) for consistent database storage
    const formattedDate = parsedDate.toISOString().split("T")[0];

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });


    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check for duplicate attendance record
    const existingAttendance = await prisma.attendance.findFirst({
      where: {
        userId,
        date: formattedDate,
      },
    });

    
    if (existingAttendance) {
      return NextResponse.json(
        { message: "Attendance already marked for this date" },
        { status: 409 } // Conflict
      );
    }

    // Mark attendance
    await prisma.attendance.create({
      data: {
        userId,
        date: formattedDate,
        isPresent: true,
      },
    });

    return NextResponse.json({
      message: "Attendance marked successfully",
      user: {
        userId: user.id,
        name: user.name,
        email: user.email,
      },
      date: formattedDate,
    });
  } catch (error) {
    console.error("Error marking attendance:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
}
