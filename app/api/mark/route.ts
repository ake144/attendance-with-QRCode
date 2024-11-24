import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const date = searchParams.get("date");

    console.log(date, userId);

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

    console.log(parsedDate);

    // Convert date to string (YYYY-MM-DDT00:00:00.000Z) for consistent database storage
    const formattedDate = parsedDate.toISOString();

    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });

    console.log(user);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check for duplicate attendance record
    const existingAttendance = await prisma.attendance.findUnique({
      where: {
        userId_date: {
          userId,
          date: formattedDate,
        },
      },
    });

    console.log('existing', existingAttendance);

    if (existingAttendance) {
      return NextResponse.json(
        { message: "Attendance already marked for this date" },
        { status: 409 } // Conflict
      );
    }

    // Mark attendance
    const res = await prisma.attendance.create({
      data: {
        userId,
        date: formattedDate,
        isPresent: true,
      },
    });

    console.log(res);

    return NextResponse.json({
      message: "Attendance marked successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      date: formattedDate,
    });
  } catch (error) {
    // Handle the error by ensuring it's a string or a serializable object
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    console.error("Error marking attendance:", errorMessage);

    return NextResponse.json(
      { message: "Internal server error", error: errorMessage },
      { status: 500 }
    );
  }
}
