import prisma from "@/lib/db";

export async function POST(request: Request) {
    const userId = new URLSearchParams(request.url).get("userId");
    const userInfo = await request.json();

    if (!userId || !userInfo) {
        throw new Error("userId and userInfo are required");
    }

    try {
        await prisma.attendance.create({
            data: {
               date: new Date(),
                userId: userId,
                isPresent: true
            }

        });
    } catch (e) {
        console.error("Error saving member info:", e);
        throw e;
    }
}