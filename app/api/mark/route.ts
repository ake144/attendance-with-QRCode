import prisma from "@/lib/db";

export async function POST(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        const dateParam = searchParams.get("date");

        // Validate input data
        if (!userId) {
            return new Response("userId is required", { status: 400 });
        }

        if (!dateParam) {
            return new Response("date is required", { status: 400 });
        }

        // Parse date parameter
        const date = new Date(dateParam);
        if (isNaN(date.getTime())) {
            return new Response("Invalid date format", { status: 400 });
        }

        console.log("Marking attendance for", userId, "on", date);

        // Create or update attendance record in the database
        await prisma.attendance.upsert({
            where: {
                userId_date: { userId, date },  // Combine userId and date as a unique constraint if you have a composite key
            },
            update: { isPresent: true },
            create: { userId, date, isPresent: true },
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


export async function GET(request: Request ) {
    
    return new Response(JSON.stringify({ message: "Attendance marked successfully" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
    });
 }
 