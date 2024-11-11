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

    // Parse the JSON body
    const { searchParams } = new URL(request.url);
    const dataParam = searchParams.get("data");


 

    try {

    if (dataParam) {
        const { userId, date } = JSON.parse(decodeURIComponent(dataParam));


        if (!userId) {
            return new Response("userId is required", { status: 400 });
        }
    
     if (isNaN(date.getTime())) {
        return new Response("Invalid date format", { status: 400 });
    }
    
        await prisma.attendance.upsert({
            where: { userId_date: { userId, date } },
            update: { isPresent: true },
            create: { userId, date, isPresent: true },
        });

        return new Response(JSON.stringify({ message: "Attendance marked successfully" }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
            },
        });

    } else {
        return new Response("date is required", { status: 400 });
  
    }
    } catch (error) {
        console.error("Error saving attendance info:", error);
        return new Response("Failed to mark attendance", { status: 500 });
    }
}
