import prisma from "@/lib/db";

export async function POST(request: Request) {
    if (request.method === 'OPTIONS') {
        return new Response(null, {
            status: 204,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
        });
    }

    try {
        const body = await request.json(); // Read JSON body
        const { userId, date } = body; // Extract userId and date

        if (!userId || !date) {
            return new Response("userId and date are required", { status: 400 });
        }

        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            return new Response("Invalid date format", { status: 400 });
        }

        await prisma.attendance.upsert({
            where: { userId_date: { userId, date: parsedDate } },
            update: { isPresent: true },
            create: { userId, date: parsedDate, isPresent: true },
        });

        return new Response(JSON.stringify({ message: "Attendance marked successfully" }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });
    } catch (error) {
        console.error("Error saving attendance info:", error);
        return new Response("Failed to mark attendance", { status: 500 });
    }
}
