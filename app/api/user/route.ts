import prisma from "@/lib/db";

export async function GET(request:Request){

    const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

    if (!userId) {
        throw new Error("userId is required");
    }

    try {
        const user = await prisma.user.findUnique({
            where: { clerkUserId: userId }
        });
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (e) {
        console.error("Error fetching user info:", e);
        return new Response("Error fetching user info", { status: 500 });
    }
     
}