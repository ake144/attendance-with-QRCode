import prisma from "@/lib/db";


export async function POST(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");
        
        if (!request.body) {
            throw new Error("Request body cannot be empty.");
        }

        const userInfo = await request.json();

        console.log("Saving member info:", userInfo);

        if (!userId || !userInfo || typeof userInfo !== 'object' || Object.keys(userInfo).length === 0) {
            throw new Error("User ID and valid user info are required.");
        }

        const savedMember = await prisma.user.upsert({
            where: { id: userId },
            update: { ...userInfo },
            create: { id: userId, ...userInfo },
        });

        return new Response(JSON.stringify(savedMember), { status: 200 });
    } catch (e) {
        console.error("Error saving member info:", e);
        return new Response("Failed to save member info: " + e, { status: 500 });
    }
}



export async function GET(request: Request ) {
    
    const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");


    if (!userId) {
        throw new Error("userId is required");
    }

    try {
        const user = await prisma.user.findUnique({
            where: { clerkUserId: userId }
        });
        return new Response(JSON.stringify(user?.qrCode), { status: 200 });
    } catch (e) {
        console.error("Error fetching user info:", e);
        return new Response("Error fetching user info", { status: 500 });
    }
}

export async function PUT(request:Request) {
 
    const { searchParams } = new URL(request.url);
        const userId = searchParams.get("userId");

    const userInfo = await request.json();
    if (!userId || !userInfo) {
        throw new Error("userId and userInfo are required");
    }

    try{
        await prisma.user.update({
            where: { clerkUserId: userId },
            data: {
                name: userInfo.name,
                email: userInfo.email,
                phone: userInfo.phone,
                qrCode: userInfo.qrCode
            }
        });
    }
    catch(e){
        console.error("Error saving member info:", e);
        throw e;
    }   
     
}