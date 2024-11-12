import prisma from "@/lib/db";

export async function GET() {
    try {
        const users = await prisma.user.findMany();

        // Check if the response is null or undefined and handle it
        if (!users) {
            return new Response("No users found", { status: 404 });
        }

        return new Response(JSON.stringify(users), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (e) {
        console.error("Error fetching user info:", e);
        return new Response(JSON.stringify({ error: "Error fetching user info" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}
