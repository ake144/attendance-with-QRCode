import prisma from "@/lib/db";

export async function POST(request: Request) {
    try {
        // Parse the JSON body
        const userInfo = await request.json();
        const userId = userInfo.userId;

        // Validate input data
        if (!userId) {
            return new Response("userId is required", { status: 400 });
        }

        // Create attendance record in the database
        await prisma.attendance.create({
            data: {
                date: new Date(),
                userId: userId,
                isPresent: true,
            },
        });

        // Return a success response
        return new Response(JSON.stringify({ message: "Attendance marked successfully" }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error saving attendance info:", error);
        return new Response("Failed to mark attendance", { status: 500 });
    }
}
