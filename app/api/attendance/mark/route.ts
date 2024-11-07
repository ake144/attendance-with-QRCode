import prisma from "@/lib/db"
import { NextResponse } from "next/server"


export async function POST(request:Request){
    const {userId} = await request.json()

    console.log(userId)
    const specifiedDays = ["Monday", "Wednesday", "Friday"];
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" });


    if (!specifiedDays.includes(today)) {
    return NextResponse.json({ error: "Not a valid attendance day" },{status:500});
      }

    try{
        const todayDate = new Date().toISOString().split("T")[0];

        if(userId){
           const existingAttendance = await prisma.attendance.findFirst({
                where: {
                     userId: userId,
                     date: todayDate
                }
            })


          
            if(existingAttendance){
                return NextResponse.json({message: 'Attendance already marked'}, {status: 400})
            }
            await prisma.attendance.create({
                data: {
                    userId,
                    date: todayDate,
                    isPresent: true
                }
            })
                return NextResponse.json( {message: "Attendance marked successfully"}, {status: 200})
        }
        return NextResponse.json({message: 'Please provide userId, date and isPresent'}, {status: 400})
    }
    catch(e){
        console.log(e)
    }
    
}