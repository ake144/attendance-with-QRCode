// app/api/mark/route.ts
import { NextResponse } from 'next/server';
import prisma from "@/lib/db"; // Adjust based on your setup

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const date = searchParams.get("date");

    if (!userId || !date) {
        return NextResponse.json({ message: "userId and date are required" }, { status: 400 });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        return NextResponse.json({ message: "Invalid date format" }, { status: 400 });
    }

    try {
        await prisma.attendance.create({
            data: {
                userId,
                date: parsedDate,
                isPresent: true,
            },
        });
        return NextResponse.json({ message: "Attendance marked successfully" });
    } catch (error) {
        console.error("Error marking attendance:", error);
        return NextResponse.json({ message: "Internal server error", error: error }, { status: 500 });
    }
}