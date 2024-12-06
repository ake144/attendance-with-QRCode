import prisma from "@/lib/db";


export  async function POST(req:Request) {
  try {
    const { startDate, endDate, order = "desc" } = await req.json();



    if (!startDate || !endDate) {
      return  new Response("Start date and end date are required.", { status: 400 });
    }

    // Fetch attendance data
    const attendanceData = await prisma.attendance.groupBy({
      by: ["userId"],
      where: {
        date: {
          gte: new Date(startDate),
          lte: new Date(endDate),
        },
        isPresent: true, // Only count present days
      },
      _count: {
        userId: true, // Count the attendance records for each user
      },
      orderBy: {
        _count: {
          userId: order, // Sort by attendance count (asc or desc)
        },
      },
    });

    // Include user details (name, phone, isFavorite)
    const usersWithAttendance = await Promise.all(
      attendanceData.map(async (record) => {
        const user = await prisma.user.findUnique({
          where: { clerkUserId: record.userId },
          select: { name: true, phone: true},
        });
        return {
          ...user,
          attendanceCount: record._count.userId,
        };
      })
    );

    
    return new Response(JSON.stringify(usersWithAttendance), {
      headers: {
        "Content-Type": "application/json",
      },
    });

  } catch (error) {
    console.error("Error fetching attendance data:", error);
  return new Response("Internal server error", { status: 500 });
  }
}
