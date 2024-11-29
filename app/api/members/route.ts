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




export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return new Response("User ID is required", { status: 400 });
  }

  try {

    const formData = await request.formData();

    const userInfo = {
      name: formData.get("name") as string | undefined,
      email: formData.get("email") as string | undefined,
      phone: formData.get("phone") as string | undefined,
      age: Number(formData.get("age")), 
      maritalStatus: formData.get("maritalStatus") as string | undefined,
      sex: formData.get("sex") as string | undefined,
      address: formData.get("address") as string | undefined,
      profilePic : formData.get("profilePic") as string | undefined,
      occupation: formData.get("occupation") as string | undefined,
    };

    const updatedUser = await prisma.user.update({
      where: { clerkUserId: userId },
      data: userInfo,
    });

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating user info:", error);
    return new Response("Error updating user info", { status: 500 });
  }
}

