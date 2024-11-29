<<<<<<< HEAD
import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Replace with your Prisma client import
import { verifyToken } from "@/lib/decodetoken"; // Adjust import path as needed
=======
import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/decodetoke"; // Create this utility for decoding tokens
>>>>>>> 7b9e7c64026fe50a96a887f01bcc9b37e6567a78

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");

<<<<<<< HEAD
=======
  console.log(token)

>>>>>>> 7b9e7c64026fe50a96a887f01bcc9b37e6567a78
  if (!token) {
    return NextResponse.json({ message: "Token is required" }, { status: 400 });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return NextResponse.json({ message: "Invalid or expired token" }, { status: 403 });
  }

<<<<<<< HEAD
  const { userID, date } = decoded;

=======
  console.log(decoded)

  const { userID, date } = decoded;

  console.log(userID)
>>>>>>> 7b9e7c64026fe50a96a887f01bcc9b37e6567a78
  try {
    const user = await prisma.user.findUnique({
      where: { clerkUserId: userID },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
<<<<<<< HEAD

    return NextResponse.json({ user, date });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
=======
console.log(user)
    return NextResponse.json({ user, date });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}





>>>>>>> 7b9e7c64026fe50a96a887f01bcc9b37e6567a78
