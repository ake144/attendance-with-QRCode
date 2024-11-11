import prisma from "@/lib/db";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
        return new Response("userId is required", { status: 400 });
    }

    try {
        const attendanceRecords = await prisma.attendance.findMany({
            where: { userId },
        });
        return new Response(JSON.stringify(attendanceRecords), { status: 200 });
    } catch (e) {
        console.error("Error fetching attendance records:", e);
        return new Response("Error fetching attendance records", { status: 500 });
    }
}