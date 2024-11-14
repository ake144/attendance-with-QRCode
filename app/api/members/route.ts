import prisma from "@/lib/db";
import { UserInfo } from "@/types/type";
import { Role } from '@prisma/client';


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



export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response("User ID is required", { status: 400 });
  }

  try {
    // Parse request body as JSON
    const userInfo: Partial<UserInfo> = await request.json();


    // Validate 'role' field if provided
    if (userInfo.role && !Object.values(Role).includes(userInfo.role as Role)) {
      return new Response("Invalid role value", { status: 400 });
    }

    // Update user info dynamically, only including fields that exist in userInfo
    const updateData = {
      ...userInfo,
      role: userInfo.role ? (userInfo.role as Role) : undefined,
    };


    const updatedUser = await prisma.user.update({
      where: { clerkUserId: userId },
      data: updateData,
    });

    console.log("Updated user:", updatedUser);
    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating user info:", error);
    return new Response("Error updating user info", { status: 500 });
  }
}

  